// _______________________________________________________________________________________
// _______________________________________________________________________________________
// _______________________________________________________________________________________
// _______________________________________________________________________________________
// _______________________________________________________________________________________

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProfile } from "../features/Profile/ProfileSlice";

// function ProfilePage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const profile = useSelector((state) => state.Profile.profile);
//   const profileStatus = useSelector((state) => state.Profile.status);
//   const [isLoading, setIsLoading] = useState(true);

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

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
//   console.log(profile.users.name);
//   return <></>;
// }

// export default ProfilePage;
// // _______________________________________________________________________________________
// _______________________________________________________________________________________
// _______________________________________________________________________________________
// _______________________________________________________________________________________
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/Profile/ProfileSlice";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaCheckCircle,
  FaMoneyBillWave,
} from "react-icons/fa";
import Navbar from "../components/NavBar";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.Profile.profile);
  const profileStatus = useSelector((state) => state.Profile.status);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editFields, setEditFields] = useState({
    name: "",
    phoneNum: "",
    location: "",
    password: "",
  });

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile]);

  useEffect(() => {
    if (profileStatus === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      if (profile) {
        setEditFields({
          name: profile.users.name || "",
          phoneNum: profile.users.phonNum || "",
          location: profile.users.location || "",
          password: "", // We don't populate the password
        });
      }
    }
  }, [profileStatus, profile]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFields((prev) => ({ ...prev, [name]: value }));
  };

  const ProfileField = ({ label, name, value, isPassword }) => (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={isPassword ? "password" : "text"}
        name={name}
        className={`w-full p-3 border ${
          isEditing ? "border-blue-500" : "border-gray-300"
        } rounded-lg bg-white`}
        value={isEditing ? editFields[name] : value}
        onChange={handleInputChange}
        readOnly={!isEditing}
      />
      {isEditing && (
        <button onClick={handleEditClick} className="ml-2">
          {isEditing ? <FaTimes /> : <FaEdit />}
        </button>
      )}
    </div>
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-mint p-8 text-white">
                <div className="text-center">
                  <img
                    src={
                      profile.users.profile_image ||
                      "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto mb-4"
                  />
                  <h2 className="text-2xl   font-bold mb-2">
                    {profile.users.name}
                  </h2>
                  <p className=" mb-4">{profile.users.email}</p>
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold mb-6 text-mintD">
                  Profile Information
                </h3>
                <ProfileField
                  label="Name"
                  name="name"
                  value={profile.users.name}
                />
                <ProfileField
                  label="Email"
                  name="email"
                  value={profile.users.email}
                />

                <ProfileField
                  label="Password"
                  name="password"
                  value={editFields.password}
                  isPassword
                />
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={handleEditClick}
                    className="px-6 py-3 bg-[#1a6960] text-white rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center"
                  >
                    <FaSave className="mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
