import React, { useState } from "react";
import { LuFileText } from "react-icons/lu";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // ✅ Missing state added

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav
        className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm 
        flex justify-between items-center 
        px-4 sm:px-6 lg:px-10 
        py-3 sm:py-4 
        text-sm sm:text-base 
        fixed top-0 left-0 z-50"
      >
        {/* Logo */}
        <div className="font-extrabold text-gray-900 flex items-center gap-2">
          <Link to="/" className="flex items-center gap-1 hover:opacity-80 transition">
            <LuFileText className="text-indigo-600 text-xl sm:text-2xl" />
            <span className="text-base sm:text-lg">Sommaire</span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          <Link
            to="/dashboard"
            className="text-gray-700 font-medium hover:text-indigo-600 transition"
          >
            Summaries
          </Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          {user && (
            <Link
              to="/upload-pdf"
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 
              text-white rounded-full shadow hover:opacity-90 transition text-sm"
            >
              Upload a PDF
            </Link>
          )}

          <button
            className="px-4 py-2 bg-gray-100 rounded-full shadow 
            hover:bg-gray-200 transition text-sm cursor-pointer"
            onClick={handleLogout}
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden fixed top-[64px] left-0 w-full bg-white shadow-lg border-t border-gray-200 z-40">
          <div className="flex flex-col items-center gap-4 py-6">
            <Link
              to="/dashboard"
              className="text-gray-700 font-medium hover:text-indigo-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Summaries
            </Link>

            {user && (
              <Link
                to="/upload-pdf"
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 
                text-white rounded-full shadow hover:opacity-90 transition text-sm"
                onClick={() => setIsOpen(false)}
              >
                Upload a PDF
              </Link>
            )}

            <button
              className="px-4 py-2 bg-gray-100 rounded-full shadow 
              hover:bg-gray-200 transition text-sm cursor-pointer"
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;