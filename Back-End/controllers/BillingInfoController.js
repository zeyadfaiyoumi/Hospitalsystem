// const pool = require("../config/db");

// exports.getBillingInfo = async (req, res) => {
//   try {
//     // الحصول على userId من التوكن
//     const userId = req.user;

//     // استعلام لجلب بيانات الفواتير للمستخدم من جدول billing وربطها بجدول appointments باستخدام appointment_id وbill_id
//     const query = `
//       SELECT
//         billing.bill_id,
//         billing.patient_id,
//         billing.amount,
//         billing.status,
//         billing.payment_date,
//         appointments.doctor_id,
//         appointments.appointment_start,
//         appointments.appointment_end,
//         appointments.booking_status
//       FROM billing
//       JOIN appointments
//       ON billing.appointment_id = appointments.appointment_id
//       WHERE billing.patient_id = $1;
//     `;

//     // تشغيل الاستعلام باستخدام pool وتمرير userId (الذي يمثل patient_id)
//     const result = await pool.query(query, [userId]);

//     // استرجاع النتائج
//     const billingInfo = result.rows;

//     // إرجاع البيانات كـ JSON
//     res.status(200).json({ billingInfo });
//   } catch (error) {
//     // التعامل مع الأخطاء
//     res
//       .status(500)
//       .json({ message: "Internal server error", error: error.message });
//   }
// };
const pool = require("../config/db");

exports.getBillingInfo = async (req, res) => {
  try {
    // الحصول على userId من التوكن
    const userId = req.user;

    // استعلام لجلب بيانات الفواتير والمستخدمين من جدول billing وusers
    const query = `
      SELECT 
        billing.bill_id, 
        billing.patient_id, 
        billing.amount, 
        billing.status, 
        billing.payment_date, 
        appointments.doctor_id, 
        users.user_id, 
        users.name AS doctor_name, 
        users.email AS doctor_email,
        appointments.appointment_start, 
        appointments.appointment_end, 
        appointments.booking_status
      FROM billing
      JOIN appointments ON billing.appointment_id = appointments.appointment_id
      JOIN users ON appointments.doctor_id = users.user_id
      WHERE billing.patient_id = $1;
    `;

    // تشغيل الاستعلام باستخدام pool وتمرير userId (الذي يمثل patient_id)
    const result = await pool.query(query, [userId]);

    // استرجاع النتائج
    const billingInfo = result.rows;

    // إرجاع البيانات كـ JSON
    res.status(200).json({ billingInfo });
  } catch (error) {
    // التعامل مع الأخطاء
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
