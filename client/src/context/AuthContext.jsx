import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= LOGIN =================
  const login = async (email, password) => {
    try {
      const res = await api.post("/user/login", { email, password });
        // console.log("accessToken", accessToken);
        
      const { accessToken, refreshToken, user } = res.data.data;

      localStorage.setItem("accessToken", accessToken);
      
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);

      return { success: true };

    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Login failed",
      };
    }
  };

  // ================= LOGOUT =================
  const logout = async () => {
    const res = await api.post("/user/logout");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    setUser(null);
  };

  // ================= AUTO LOGIN ON REFRESH =================
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};