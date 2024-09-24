import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/auth/authSlice';
import { Eye, User, Mail, Lock, UserCheck, Stethoscope, Glasses } from 'lucide-react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(register({ email, password, name, gender }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register({ email, password, name, gender })).unwrap();
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Welcome to our eye care clinic!',
        timer: 1500,
        showConfirmButton: false
      });
      navigate('/'); // Redirect to home page after successful registration
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: err.message || 'An error occurred during registration.',
      });
    }
  };
  return (
    <div className="min-h-screen bg-mintL flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <Eye className="absolute top-10 left-10 h-16 w-16 text-mint opacity-20" />
      <Stethoscope className="absolute bottom-10 right-10 h-20 w-20 text-mintD opacity-20" />
      <Glasses className="absolute top-1/4 right-1/4 h-24 w-24 text-mint opacity-20" />
      <User className="absolute bottom-1/4 left-1/4 h-18 w-18 text-mintD opacity-20" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl"
      >
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-center text-xl text-mint">
            Join us for exceptional eye care
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-mintD focus:border-mintD focus:z-10 text-lg"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <User className="absolute right-3 top-3 h-6 w-6 text-mint" />
              </div>
            </div>
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
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-mintD focus:border-mintD focus:z-10 text-lg"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute right-3 top-3 h-6 w-6 text-mint" />
              </div>
            </div>
            <div className="mb-4">
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
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-mintD focus:border-mintD focus:z-10 text-lg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="absolute right-3 top-3 h-6 w-6 text-mint" />
              </div>
            </div>
            <div>
              <label htmlFor="gender" className="sr-only">
                Gender
              </label>
              <div className="relative">
                <select
                  id="gender"
                  name="gender"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-mintD focus:border-mintD focus:z-10 text-lg"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  
                </select>
                <UserCheck className="absolute right-3 top-3 h-6 w-6 text-mint" />
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
              {loading ? 'Registering...' : 'Create Account'}
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

export default Register;
