import React, { useState,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api"; // axios instance
import { useAuth } from "../context/AuthContext";


const Signup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if (user) {
        navigate("/dashboard");
      }
    }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/user/register", formData);

      if (res.data.success) {
        alert("Account created successfully 🎉");
        navigate("/login");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 pt-24 px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Sign up to start using Sommaire
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium shadow hover:opacity-90 transition"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;