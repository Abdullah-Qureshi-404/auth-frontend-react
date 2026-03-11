import React, { useEffect, useState } from "react";
import API from "../Api/api";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function UpdateProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    city: "",
    country: "",
  });
  const [message, setMessage] = useState("");
  const token = Cookies.get("auth_token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogout = (e) => {
    Cookies.remove("auth_token");
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("auth_token");

      const filteredData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value.trim() !== "")
      );

      const response = await API.post("/login/updateProfile", filteredData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setMessage(response.data.message || "Profile updated successfully!");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Update failed!");
      } else {
        setMessage("Something went wrong!");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 relative">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Update Profile
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-3 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <button
          type="submit"
          // disabled={disabled}
          className={`bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 px-4 w-full font-medium shadow-md transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>{" "}
              Updating ....
            </>
          ) : (
            "Update"
          )}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </form>

      <button
        onClick={handleLogout}
        className="absolute top-4 right-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Logout
      </button>

      <Link
        to={`/reset-password/${token}`}
        className="absolute bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Reset Password
      </Link>
    </div>
  );
}

export default UpdateProfile;
