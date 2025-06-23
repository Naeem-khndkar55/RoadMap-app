import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gradient-to-r from-gray-900 to-emerald-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Task Zero
        </Link>
        <Link
          to="/dashboard"
          className="block px-4 py-2 hover:underline-offset-2"
          onClick={() => setDropdownOpen(false)}
        >
          Task List
        </Link>
        {isAuthenticated ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden">
                <img
                  src="https://i.pravatar.cc/36"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="hidden sm:inline text-sm font-medium">
                {user?.name}
              </span>
              <ChevronDownIcon className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded shadow-lg z-50">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Task List
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/login" className="hover:text-emerald-300 transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-emerald-300 transition">
              Register
            </Link>
          </nav>
        )}
      </div>

      {isAuthenticated && (
        <div className="container mx-auto px-4 py-6">
          <p className="text-sm text-emerald-300">
            Hi {user?.name?.split(" ")[0]}
          </p>
          <h1 className="text-2xl font-bold text-white">
            Welcome to Dashboard
          </h1>
        </div>
      )}
    </header>
  );
};

export default Header;
