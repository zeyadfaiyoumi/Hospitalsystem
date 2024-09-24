import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const SoftAlert = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const response = await axios.post("http://localhost:5000/api/addDoctor", {
            email,
            password,
            name,
            gender,
        });

        if (response.data) {
            await Swal.fire({
                title: "Success!",
                text: "Doctor added and email sent successfully.",
                icon: "success",
                confirmButtonText: "OK",
            });

            setEmail("");
            setPassword("");
            setName("");
            setGender("");

            onClose();
        } else {
            throw new Error("No data received from server");
        }
    } catch (err) {
        console.error("Error details:", err);
        setError(
            "Failed to register the doctor. " +
                (err.response?.data?.message || err.message)
        );

        await Swal.fire({
            title: "Error!",
            text: "Failed to register the doctor. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
        });
    }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <h2 className="text-lg font-bold mb-4 text-[#1f7b6f]">
          Add New Doctor
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f7b6f]"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f7b6f]"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f7b6f]"
            required
          />
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
                className="form-radio"
                required
              />
              <span className="mr-2">Male</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
                className="form-radio"
                required
              />
              <span className="mr-2">Female</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-[#1f7b6f] hover:bg-[#1a6960] text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
          >
            Register
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SoftAlert;
