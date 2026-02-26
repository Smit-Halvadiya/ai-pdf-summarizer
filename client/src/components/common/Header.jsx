import React, { useEffect, useState } from 'react'
import { LuFileText } from "react-icons/lu";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Header = () => {



    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // useEffect(() => {


    //     if (isSignedIn) {
    //         login()
    //     } else {
    //         logout()
    //     }

    // }, []);

    return (

        <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm flex justify-between items-center px-4 sm:px-6 lg:px-10 py-3 sm:py-4 text-sm sm:text-base fixed top-0 left-0 z-50">

            {/* Logo */}
            <div className="logo font-extrabold text-gray-900 flex items-center gap-2">
                <Link to="/" className="flex items-center gap-1 hover:opacity-80 transition">
                    <LuFileText className="text-indigo-600 text-xl sm:text-2xl" />
                    <span className="text-base sm:text-lg">Sommaire</span>
                </Link>
            </div>

            {/* Center Links */}
            <div className="flex gap-4 sm:gap-8 md:gap-10 items-center">
                <div className="pricing hidden sm:block">
                    <Link
                        to="/dashboard"
                        className="text-gray-700 font-medium hover:text-indigo-600 transition"
                    >
                        Summaries
                    </Link>
                </div>
            </div>

            {/* Auth Section */}
            <div className="auth flex items-center gap-2 sm:gap-4">

                {user && (
                    <Link
                        to="/upload-pdf"
                        className="hidden sm:inline-flex px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full shadow hover:opacity-90 transition text-xs sm:text-sm"
                    >
                        Upload a PDF
                    </Link>
                )}

                <button
                    className="hidden sm:inline-flex px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r  rounded-full shadow hover:opacity-90 transition text-xs sm:text-sm cursor-pointer"
                    onClick={handleLogout}
                >
                    {user ? "Logout" : "Login"}
                </button>

            </div>
        </nav>



    )
}

export default Header