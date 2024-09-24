const Stripe = require("stripe");
const pool = require("../config/db"); // استيراد ملف الاتصال بقاعدة البيانات

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  const currency = "usd"; // تحديد العملة

  // إنشاء PaymentIntent مع Stripe
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // تحويل المبلغ إلى سنتات
    currency,
  });

  // حفظ البيانات في قاعدة البيانات PostgreSQL
  const result = await pool.query(
    `INSERT INTO billing (patient_id, appointment_id, amount, status, payment_date) 
      VALUES ($1, $2, $3, $4, $5) RETURNING bill_id`,
    [
      req.user, // patient_id, إذا كان لديك قيمة افتراضية، يمكنك تعديل هذا
      11, // appointment_id, إذا كان لديك قيمة افتراضية، يمكنك تعديل هذا
      amount,
      "paid",
      new Date(), // تاريخ الدفع الحالي
    ]
  );

  res.json({
    clientSecret: paymentIntent.client_secret,
  });
};

module.exports = {
  createPaymentIntent,
};
