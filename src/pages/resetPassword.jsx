import React, { useState } from "react";
import API from "../Api/api";
import InputField from "../components/InputField";
import Button from "../components/button";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  //   console.log("Reset Token: ", token);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!password) {
      setError("Password is required");
      return;
    } else if (!confirmPassword) {
      setError("Confirm Password is required");
      return;
    } else if (password !== confirmPassword) {
      setError("Password and Confirm Password should be the same");
      return;
    } else {
      setError("");
    }
    setLoading(true);
    try {
      const response = await API.post(`/reset-password/${token}`, {
        password,
        confirmPassword,
      });
      console.log("Password Reset Successfully", response.data);
      setMessage("Password Reset Successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Reset Your Password
        </h2>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <InputField
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <InputField
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          {/* Error message */}
          {error && (
            <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
          )}

          {/* Message */}
          {message && (
            <div className="text-green-500 mt-2 text-center ">{message}</div>
          )}
          <Button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Resetting Password
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
