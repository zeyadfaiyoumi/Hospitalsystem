import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Eye, Mail, Lock, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || "An error occurred during login.",
      });
    }
  };
  useEffect(() => {
    if (user) {
      // Check user's role and navigate accordingly
      if (user.role === "admin") {
        navigate("/Dashboard");
      } else if (user.role === "doctor") {
        navigate("/Dashboard/DoctorDashboard");
      } else {
        navigate("/"); // Default page for other roles
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-mintL flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <Eye className="absolute top-10 left-10 h-16 w-16 text-mint opacity-20" />
      <UserCheck className="absolute bottom-10 right-10 h-20 w-20 text-mintD opacity-20" />
      <Eye className="absolute top-1/4 right-1/4 h-24 w-24 text-mint opacity-20" />
      <UserCheck className="absolute bottom-1/4 left-1/4 h-18 w-18 text-mintD opacity-20" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl"
      >
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
            Login to Your Account
          </h2>
          <p className="mt-2 text-center text-xl text-mint">
            Access your eye care services
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-mintD focus:border-mintD focus:z-10 text-lg"
                  placeholder="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <Mail className="absolute right-3 top-3 h-6 w-6 text-mint" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-mintD focus:border-mintD focus:z-10 text-lg"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <Lock className="absolute right-3 top-3 h-6 w-6 text-mint" />
              </div>
            </div>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-mintD hover:bg-mint focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mintD transition-colors duration-300"
              disabled={loading}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Eye className="h-6 w-6 text-mintL group-hover:text-white" />
              </span>
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </div>
        </form>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-center text-lg text-red-600"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
