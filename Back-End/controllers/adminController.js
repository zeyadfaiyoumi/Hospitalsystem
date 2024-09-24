const pool = require("../config/db");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com", // يمكن أن يكون 'smtp.outlook.com' أيضاً
  port: 587, // استخدم المنفذ 587 مع TLS
  secure: false, // استخدم false للمنفذ 587 مع TLS
  auth: {
    user: "aboodmksw2024@outlook.com", // بريدك الإلكتروني
    pass: "ABOOD#1234", // كلمة مرور التطبيق
  },
  tls: {
    rejectUnauthorized: false, // هذا قد يساعد إذا كانت هناك مشكلات في الشهادات
  },
});

exports.getPatient = async (req, res) => {
  try {
    const Patient = await pool.query("SELECT * FROM users WHERE role = $1", [
      "patient",
    ]);

    res.json(Patient.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.BanPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const Ban = await pool.query(
      "UPDATE users SET isactive = NOT isactive WHERE user_id = $1",
      [id]
    );
    const { rows: userExists } = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [id]
    );
    if (Ban.rowCount > 0 && userExists.length > 0) {
      // Send email notification
      if (userExists[0].isactive) {
        const mailOptions = {
          from: "aboodmksw2024@outlook.com",
          to: userExists[0].email,
          subject: "Your Account Has Been Unblocked",
          text: `
                Hello ${userExists[0].name},
            
                We are pleased to inform you that your account has been successfully unblocked. You can now log in and continue using our services. 
                We kindly remind you to adhere to our terms and conditions to avoid any future issues.
            
                If you encounter any problems, feel free to contact our support team.
            
                Thank you for being part of Eye-Care.
            
                Best regards,
                The Eye-Care Team
              `,
        };
        await transporter.sendMail(mailOptions);
      } else {
        const mailOptions = {
          from: "aboodmksw2024@outlook.com",
          to: userExists[0].email,
          subject: "Your Account Has Been Blocked",
          text: `
                        Hello ${userExists[0].name},
                    
                        We regret to inform you that your account has been blocked due to violations of our terms and conditions. 
                        Please review the terms and reach out to us if you believe this was a mistake.
                    
                        Thank you for your understanding.
                    
                        Best regards,
                        The Eye-Care Team
                      `,
        };
        await transporter.sendMail(mailOptions);
      }

      res.send({ message: "Ban Patient successfully" });
    } else {
      res.status(404).json({ error: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDoctor = async (req, res) => {
  try {
    const Doctor = await pool.query("SELECT * FROM users WHERE role = $1", [
      "doctor",
    ]);

    res.json(Doctor.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getContactMessages = async (req, res) => {
  try {
    const ContactMessages = await pool.query("SELECT * FROM contactmessages");

    res.json(ContactMessages.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.ReplyContactMessages = async (req, res) => {
  const { id } = req.params; // id الخاص بالرسالة
  const { replyMessage } = req.body; // الرد على الرسالة

  // التحقق من وجود رد في الطلب
  if (!replyMessage) {
    return res.status(400).json({ message: "replyMessage is required" });
  }

  try {
    // تحديث الرسالة بالرد
    const updateQuery = `
      UPDATE contactmessages 
      SET reply = $1 
      WHERE message_id = $2
      RETURNING *`;

    const updatedMessage = await pool.query(updateQuery, [replyMessage, id]);

    // التحقق من نجاح التحديث
    if (updatedMessage.rowCount === 0) {
      return res.status(404).json({ message: "Message not found" });
    }

    const contactMessage = updatedMessage.rows[0];

    // إرسال الإيميل (اختياري، عليك إلغاء تعليق الكود وإضافة الترانسبورتر الصحيح)
    const mailOptions = {
      from: "aboodmksw2024@outlook.com",
      to: contactMessage.email,
      subject: "Your Account Has Been Blocked",
      text: `
        Hello ${contactMessage.username},
        ${contactMessage.reply}
        Best regards,
        The Eye-Care Team
      `,
    };
    await transporter.sendMail(mailOptions);

    res.json(contactMessage);
  } catch (error) {
    // معالجة الأخطاء
    res.status(500).json({ error: error.message });
  }
};


exports.getAppointments = async (req, res) => {
  try {
    const appointmentsQuery = `
      SELECT 
        a.*,
        u_doctor.name AS doctor_name,
        u_patient.name AS patient_name,
        b.amount AS billing_amount
      FROM 
        appointments a
      JOIN 
        users u_doctor ON a.doctor_id = u_doctor.user_id
      JOIN 
        users u_patient ON a.patient_id = u_patient.user_id
      JOIN 
        billing b ON a.appointment_id = b.appointment_id
    `;

    const appointmentsResult = await pool.query(appointmentsQuery);

    res.json(appointmentsResult.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.appointments = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params; // احصل على id من معلمات URL

  try {
    const result = await pool.query("UPDATE appointments SET status = $1 WHERE appointment_id = $2", [status, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.json({ message: "Appointment updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.getAdmin = async (req, res) => {
  try {
    const userId = req.user;

    // جلب المستخدم بشرط أن يكون دوره "admin"
    const { rows: Admin } = await pool.query(
      "SELECT * FROM users WHERE user_id = $1 AND role = 'admin'",
      [userId]
    );
    if (!Admin.length) {
      return res.status(400).json({ message: "Admin not found or access denied" });
    }
    return res.status(200).json({ user: Admin[0] });
  } catch (err) {
    console.error("Error in getAdmin:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.LogOutAdmin= async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'You have successfully logged out' });
  } catch (err) {
    console.error("Error in logged out:", err.message);
  }
};
