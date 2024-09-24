const pool = require("../config/db");

exports.getAllUsers = async (req, res) => {
  try {
    // استعلام لجلب المستخدم بناءً على الـ user.id
    // const query = "SELECT * FROM users WHERE user_id = $1";
    const userId = req.user;

    // تشغيل الاستعلام باستخدام pool
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      userId,
    ]);

    // استرجاع النتائج
    const users = result.rows[0];

    res.status(200).json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// _____________________________________________
// _____________________________________________
// _____________________________________________

// دالة لتعديل بيانات المستخدم
exports.editUser = async (req, res) => {
  const userId = req.user; // احصل على ID المستخدم من التوكن أو الجلسة
  const { name, password } = req.body;

  try {
    // تحقق مما إذا كان هناك بيانات للتحديث
    if (!name && !password) {
      return res.status(400).json({ message: "No fields to update" });
    }

    // إعداد استعلام التحديث
    let query = "UPDATE users SET ";
    const values = [];
    const updates = [];

    if (name) {
      updates.push(`name = $1`);
      values.push(name);
    }
    if (password) {
      const hashedPassword = await hashPassword(password); // تشفير كلمة المرور
      updates.push(`password = $2`);
      values.push(hashedPassword);
    }

    // إضافة شرط الـ user_id
    query += updates.join(", ") + " WHERE user_id = $3";
    values.push(userId);

    // تشغيل الاستعلام
    await pool.query(query, values);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
