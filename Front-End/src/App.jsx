import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home"; // صفحة البداية
import Login from "./pages/Login"; // مكون تسجيل الدخول
import Register from "./pages/Register"; // مكون التسجيل
import CheckoutPage from "./pages/Checkout";

{
  /* Admin Dashboard */
}
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Admin-Dashboard/Page/Home/Home";
import UserDashboard from "./pages/Admin-Dashboard/Page/Users/UserDashboard";
import DoctorsDashboard from "./pages/Admin-Dashboard/Page/Doctors/DoctorsDashboard";
import ContactUsDashboard from "./pages/Admin-Dashboard/Page/ContactUs/ContactUsDashboard";
import AppointmentsDashboard from "./pages/Admin-Dashboard/Page/Appointments/Appointments";
{
  /* End Of Admin Dashboard */
}
import DoctorDashboard from "./pages/doctorDashboard/doctor";
import "./index.css";

// import HomePage from './pages/HomePage'; // Adjust paths as needed
// import LoginPage from './pages/LoginPage';
// import UserProfilePage from './pages/UserProfilePage';
// import AppointmentPage from './pages/AppointmentPage';
// import PatientRecordPage from './pages/PatientRecordPage';
// import BillingPage from './pages/BillingPage';
// import AboutUsPage from './pages/AboutUsPage';
// import ContactUsPage from './pages/ContactUsPage';
// import AdminDashboard from './pages/AdminDashboard';

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home/Home'; // صفحة البداية
// import Login from './pages/Login'; // مكون تسجيل الدخول
// import Register from './pages/Register'; // مكون التسجيل
// import Profile from './features/user/Profile'; // مكون الملف الشخصي
// import NavBar from './components/NavBar'; // المكون الأساسي لعرض الـ Navbar
import Doctors from "./pages/Doctors";
import DoctorDetails from "./pages/DoctorDetails";
import OrdersPage from "./pages/BillingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/Doctors" element={<Doctors />} />
        <Route path="/Doctors/:id" element={<DoctorDetails />} />
        <Route path="/OrdersPage" element={<OrdersPage />} />

        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* إضافة باقي المسارات مثل المواعيد والسجلات والفواتير */}
        {/* <Route path="/appointments" element={<AppointmentPage />} />
        <Route path="/records" element={<PatientRecordPage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/admin" element={<AdminDashboard />} /> */}

        <Route path="/CheckoutPage" element={<CheckoutPage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/Dashboard/DoctorDashboard"
          element={<DoctorDashboard />}
        />
        {/* Admin Dashboard */}
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Dashboard/users" element={<UserDashboard />} />
        <Route path="/Dashboard/Doctors" element={<DoctorsDashboard />} />
        <Route
          path="/Dashboard/Appointments"
          element={<AppointmentsDashboard />}
        />
        <Route path="/Dashboard/ContactUS" element={<ContactUsDashboard />} />
        {/* End Of Admin Dashboard */}
      </Routes>
    </Router>
  );
}

export default App;
