const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const Stripe = require("stripe");
const pool = require("./config/db"); // Import the database pool
const authRoutes = require("./routes/authRoutes"); // Import your auth routes
const payment = require("./routes/payment");
const Profile = require("./routes/profileRout");
const userRoutes = require("./routes/appointmentRoutes");
const Billing = require("./routes/BillingInfoRouts");
const staffRouter = require("./routes/staffRouter");
const medicalRecordsRouter = require("./routes/medicalRecordsRouter");
const feedbackRoutes = require("./routes/feedbackRoutes");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Test the database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Connected to the PostgreSQL database");
  release();
});

// Use routes (your route imports will go here)

app.use("/api/auth", authRoutes);

app.use("/api/auth", payment);
app.use("/api/auth", Profile);
app.use("/api/users", userRoutes);
app.use("/api/auth", Billing);
app.use("/api/feedback", feedbackRoutes);
// http://localhost:5173/api/auth/pay
app.use("/api/staff", staffRouter);
app.use("/api/medical-records", medicalRecordsRouter);

// Start the server
const PORT = process.env.PORT || 5000;

{
  /* Admin Dashboard */
}
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

const addDoctorRoutes = require("./routes/addDoctorRoutes");
app.use("/api/addDoctor", addDoctorRoutes);
{
  /* End Of Admin Dashboard */
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
