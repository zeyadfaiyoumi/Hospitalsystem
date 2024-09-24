// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProfile } from "../features/Profile/ProfileSlice";
// import axios from "axios";
// function OrdersPage() {
//   const dispatch = useDispatch();
//   const profile = useSelector((state) => state.Profile.profile);
//   const profileStatus = useSelector((state) => state.Profile.status);
//   const [isLoading, setIsLoading] = useState(true);
//   const [fetchedOrders, setFetchedOrders] = useState([]);

//   useEffect(() => {
//     if (!profile) {
//       dispatch(fetchProfile());
//     }
//   }, [dispatch, profile]);

//   useEffect(() => {
//     if (profileStatus === "idle") {
//       dispatch(fetchProfile());
//     }
//   }, [dispatch, profileStatus]);

//   useEffect(() => {
//     setIsLoading(profileStatus === "loading");
//   }, [profileStatus]);
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/auth/Billing",
//           { withCredentials: true }
//         );
//         setFetchedOrders(response.data.billingInfo); // Assuming the data is in billingInfo
//         console.log(response.data);

//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (isLoading) {
//     return <div className="text-center mt-10 text-xl">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-[#f0f8f7] p-8">
//       <h1 className="text-4xl font-bold text-center text-[#1f7b6f] mb-8">
//         Orders List
//       </h1>
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <div className="bg-[#f7f7f7] rounded-lg p-4 mb-6 hover:bg-[#ebf0ef] transition duration-300">
//           <h2 className="text-2xl font-semibold mb-2 text-[#1a6960]">Orders</h2>
//           <p className="text-gray-700">
//             <span className="font-bold">Doctor:</span>
//             {fetchedOrders.amount}
//           </p>
//           <p className="text-gray-700">
//             <span className="font-bold">Patient:</span>
//             {profile.users.name}
//           </p>
//           <p className="text-gray-700">
//             <span className="font-bold">Appointment:</span>{" "}
//           </p>
//           <p className="text-gray-700">
//             <span className="font-bold">Amount Paid:</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OrdersPage;
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/Profile/ProfileSlice";
import axios from "axios";
import Navbar from "../components/NavBar";

function OrdersPage() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.Profile.profile);
  const profileStatus = useSelector((state) => state.Profile.status);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedOrders, setFetchedOrders] = useState([]);

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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/Billing",
          {
            withCredentials: true,
          }
        );
        console.log(response.data); // تحقق من البيانات هنا
        setFetchedOrders(response.data.billingInfo || []); // تأكد من أن تكون مصفوفة
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen pt-20">
        <h1 className="text-4xl font-bold text-center text-[#1f7b6f] mb-8">
          Orders List
        </h1>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="bg-[#f7f7f7] rounded-lg p-4 mb-6 hover:bg-[#ebf0ef] transition duration-300">
            <h2 className="text-2xl font-semibold mb-2 text-[#1a6960]">
              Orders
            </h2>
            {fetchedOrders.length > 0 ? (
              fetchedOrders.map((order) => (
                <div key={order.bill_id} className="mb-4">
                  <p className="text-gray-700">
                    <span className="font-bold">Doctor:</span>{" "}
                    {order.doctor_name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Patient:</span>{" "}
                    {profile.users.name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Appointment:</span>{" "}
                    {order.appointment_start}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Amount Paid:</span>{" "}
                    {order.amount}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-700">No orders found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrdersPage;
