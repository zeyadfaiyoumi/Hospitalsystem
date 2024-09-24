// import React from "react";
// import { CreditCard, Calendar, Clock, User, DollarSign } from "lucide-react";
// import NavBar from "../components/NavBar";

// const CheckoutPage = () => {
//   return (
//     <>
//       <div className="bg-gradient-to-br from-white to-[#eafffb] min-h-screen flex items-center justify-center p-4 font-sans">
//         <NavBar />
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl overflow-hidden mt-16 p-8">
//           <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//             Booking Confirmation
//           </h1>
//           <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
//             {/* Booking Details */}
//             <div className="md:w-1/2 bg-mintD text-white rounded-xl p-6">
//               <h2 className="text-3xl font-bold mb-6">Booking Details</h2>
//               <div className="space-y-4">
//                 <InfoItem
//                   icon={<User className="w-5 h-5" />}
//                   label="Patient Name"
//                   value="Ahmed Mohammed"
//                 />
//                 <InfoItem
//                   icon={<User className="w-5 h-5" />}
//                   label="Doctor Name"
//                   value="Dr. Sarah Ahmed"
//                 />
//                 <InfoItem
//                   icon={<Calendar className="w-5 h-5" />}
//                   label="Appointment Date"
//                   value="September 20, 2024"
//                 />
//                 <InfoItem
//                   icon={<Clock className="w-5 h-5" />}
//                   label="Appointment Time"
//                   value="10:00 AM"
//                 />
//                 <InfoItem
//                   icon={<CreditCard className="w-5 h-5" />}
//                   label="Examination Type"
//                   value="Comprehensive Eye Exam"
//                 />
//                 <InfoItem
//                   icon={<DollarSign className="w-5 h-5" />}
//                   label="Amount Due"
//                   value="50 JOD"
//                 />
//               </div>
//             </div>

//             {/* Payment Form */}
//             <div className="md:w-1/2 bg-gray-50 rounded-xl p-6">
//               <h2 className="text-3xl font-bold text-gray-800 mb-6">
//                 Complete Payment
//               </h2>
//               <form className="space-y-6">
//                 <InputField
//                   label="Card Number"
//                   id="cardNumber"
//                   placeholder="0000 0000 0000 0000"
//                 />
//                 <div className="flex space-x-4">
//                   <InputField
//                     label="Expiry Date"
//                     id="expDate"
//                     placeholder="MM / YY"
//                     className="flex-1"
//                   />
//                   <InputField
//                     label="CVV"
//                     id="cvv"
//                     placeholder="123"
//                     className="flex-1"
//                   />
//                 </div>
//                 <InputField
//                   label="Cardholder Name"
//                   id="name"
//                   placeholder="Full Name"
//                 />
//                 <button
//                   type="submit"
//                   className="w-full bg-mintD text-white py-3 px-4 rounded-lg hover:opacity-90 transition duration-300 font-semibold text-lg shadow-lg"
//                 >
//                   Confirm Booking and Pay
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// const InfoItem = ({ icon, label, value }) => (
//   <div className="flex items-center space-x-3">
//     {icon}
//     <div>
//       <p className="text-sm opacity-75">{label}</p>
//       <p className="font-semibold">{value}</p>
//     </div>
//   </div>
// );

// const InputField = ({ label, id, placeholder, className = "" }) => (
//   <div className={className}>
//     <label
//       htmlFor={id}
//       className="block text-sm font-medium text-gray-700 mb-1"
//     >
//       {label}
//     </label>
//     <input
//       type="text"
//       id={id}
//       className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//       placeholder={placeholder}
//     />
//   </div>
// );

// export default CheckoutPage;

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CreditCard, Calendar, Clock, User, DollarSign } from "lucide-react";
import Swal from "sweetalert2";
import NavBar from "../components/NavBar";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/Profile/ProfileSlice";

// Initialize Stripe
const stripePromise = loadStripe(
  "pk_test_51Po3xJA4L1QDrrEEECST7zzuz3EwgAvliyrzirIXNUtRvRBxHoSGucEZfKX6JyA1Z5A5OpSdpSh5VUuvkwGTFAj2007tEPrtx7"
);

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.Profile.profile);
  const profileStatus = useSelector((state) => state.Profile.status);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile]);

  useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(fetchProfile());
    }
  }, [dispatch, profileStatus]);

  useEffect(() => {
    setIsLoading(profileStatus === "loading");
  }, [profileStatus]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(profile.users.name);
  return (
    <>
      <div className="bg-gradient-to-br from-white to-[#eafffb] min-h-screen flex items-center justify-center p-4 font-sans">
        <NavBar />
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl overflow-hidden mt-16 p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Booking Confirmation
          </h1>
          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
            {/* Booking Details */}
            <div className="md:w-1/2 bg-mintD text-white rounded-xl p-6">
              <h2 className="text-3xl font-bold mb-6">Booking Details</h2>
              <div className="space-y-4">
                <InfoItem
                  icon={<User className="w-5 h-5" />}
                  label="Patient Name"
                  value={profile.users.name}
                />
                <InfoItem
                  icon={<User className="w-5 h-5" />}
                  label="Doctor Name"
                  value="Dr. Sarah Ahmed"
                />
                <InfoItem
                  icon={<Calendar className="w-5 h-5" />}
                  label="Appointment Date"
                  value="September 20, 2024"
                />
                <InfoItem
                  icon={<Clock className="w-5 h-5" />}
                  label="Appointment Time"
                  value="10:00 AM"
                />
                <InfoItem
                  icon={<CreditCard className="w-5 h-5" />}
                  label="Examination Type"
                  value="Comprehensive Eye Exam"
                />
                <InfoItem
                  icon={<DollarSign className="w-5 h-5" />}
                  label="Amount Due"
                  value="50 JOD"
                />
              </div>
            </div>

            {/* Payment Form */}
            <div className="md:w-1/2 bg-gray-50 rounded-xl p-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Complete Payment
              </h2>
              <PaymentComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3">
    {icon}
    <div>
      <p className="text-sm opacity-75">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

const InputField = ({ label, id, placeholder, className = "" }) => (
  <div className={className}>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      type="text"
      id={id}
      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
      placeholder={placeholder}
    />
  </div>
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const total = 50; // ثابت: المبلغ المستحق
  const handleStripeSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    try {
      // استدعاء الخادم لإنشاء PaymentIntent
      const response = await axios.post(
        "http://localhost:5000/api/auth/pay",

        {
          amount: total,
        },
        { withCredentials: true }
      );

      const { clientSecret } = response.data;

      // استخدام Stripe لتأكيد الدفع
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              email: email,
              name: fullName,
            },
          },
        });

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent.status === "succeeded") {
        Swal.fire({
          title: "Payment Successful!",
          text: "Thank you for your payment.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }

      setProcessing(false);
    } catch (error) {
      setError("Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleStripeSubmit} className="space-y-6">
      <InputField
        label="Full Name"
        id="name"
        placeholder="Enter your full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <InputField
        label="Email"
        id="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card Details
        </label>
        <CardElement
          className="p-3 border border-gray-300 rounded-md shadow-sm"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <div className="mb-4 text-center">
        <p className="text-lg font-semibold text-gray-800">
          Total: {total} JOD
        </p>
      </div>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full p-4 text-white font-semibold rounded-md shadow-md flex items-center justify-center ${
          processing ? "bg-gray-600" : "bg-mintD"
        } transition duration-150`}
      >
        {processing ? "Processing..." : "Confirm Booking and Pay"}
      </button>
    </form>
  );
};

const PaymentComponent = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutPage;
