const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const pool = require('../config/db'); // PostgreSQL connection

// Create a transporter for nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // يمكن أن يكون 'smtp.outlook.com' أيضاً
    port: 587, // استخدم المنفذ 587 مع TLS
    secure: false, // استخدم false للمنفذ 587 مع TLS
    auth: {
      user: 'aboodmksw2024@outlook.com', // بريدك الإلكتروني
      pass: 'ABOOD#1234' // كلمة مرور التطبيق
    },
    tls: {
      rejectUnauthorized: false // هذا قد يساعد إذا كانت هناك مشكلات في الشهادات
    }
  });

// Register controller
exports.addDoctor = async (req, res) => {
  const { name, email, password, gender } = req.body;
  try {
    // Validate input
    if (!name || !email || !password || !gender) {
      return res.status(400).json({ message: 'Name, email, password, and gender are required' });
    }

    // Check if email already exists
    const { rows: userExists } = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    if (userExists.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows: newUser } = await pool.query(
      `INSERT INTO users (name, email, password, role, gender) 
      VALUES ($1, $2, $3, 'doctor', $4) RETURNING *`,
      ["Dr."+name, email, hashedPassword, gender]
    );

    // Send email notification
    const mailOptions = {
      from: 'aboodmksw2024@outlook.com',
      to: email,
      subject: 'Doctor Account Created',
      text: `
        Hello ${name},

        Your account has been successfully created as a doctor.

        Here are your account details:
        Name: ${name}
        Email: ${email}
        Password: ${password} 
        Gender: ${gender}
        (Please change your password after logging in)
        Best regards,
        The Eye-Care Team
      `
    };

    await transporter.sendMail(mailOptions);

    // Send success response
    return res.status(201).json({ message: 'Doctor added successfully', user: newUser[0] });

  } catch (err) {
    console.error('Error in register:', err.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

