import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = ({ onLogout }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-navbar-bg dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/users"
          className="text-navbar-text dark:text-white hover:text-navbar-text-hover text-xl font-bold flex items-center gap-2 transition-colors duration-200"
        >
          <span className="text-2xl">👥</span> EmployWise
        </Link>
        <ul className="flex items-center space-x-6">
          <li>
            <Link
              to="/users"
              className="text-navbar-text hover:text-navbar-text-hover transition-colors duration-200"
            >
              Users
            </Link>
          </li>
          <li>
            <button
              onClick={toggleTheme}
              className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/25"
              aria-label="Toggle theme"
            >
              <span className="sr-only">Toggle theme</span>
              <span
                className={`${
                  theme === "dark" ? "translate-x-6" : "translate-x-1"
                }
                  inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ease-in-out`}
              />
              <span className="absolute left-1 text-xs">
                {theme === "dark" ? "🌙" : "☀️"}
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={onLogout}
              className="text-navbar-text dark:text-white hover:text-navbar-text-hover flex items-center gap-2 transition-colors duration-200"
            >
              <span className="transform rotate-180">↪</span> Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
