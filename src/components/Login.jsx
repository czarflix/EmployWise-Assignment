import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "../contexts/ThemeContext";

const Login = ({ onLogin }) => {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate form
    if (!email || !password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });

      if (response.data && response.data.token) {
        // Call the onLogin function passed from App component
        onLogin(response.data.token);
        toast.success("Login successful!");
        navigate("/users");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Login failed. Please check your credentials."
      );
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-5 bg-background dark:bg-gray-800">
      <div className="w-full max-w-[450px] p-10 rounded-2xl bg-card-bg dark:bg-gray-700 shadow-card border border-card-border transition-all duration-300">
        <div className="text-center mb-8 relative">
          <div className="absolute top-0 right-0">
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
          </div>
          <div className="text-4xl font-bold text-primary mb-4">👥</div>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-muted text-base dark:text-gray-400">
            Please sign in to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                className="w-full py-3 px-4 rounded-lg border border-input-border bg-input-bg text-input-text transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/25"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
                ✉️
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full py-3 px-4 rounded-lg border border-input-border bg-input-bg text-input-text transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/25"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
                🔒
              </span>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-danger/20 border border-danger/30 text-danger">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="h-12 text-base font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/10">
          <div className="font-semibold mb-2 text-sm text-foreground">
            Demo Credentials
          </div>
          <div className="text-sm mb-1 flex">
            <span className="font-medium w-20 text-foreground text-left">
              Email:
            </span>
            <span className="text-muted">eve.holt@reqres.in</span>
          </div>
          <div className="text-sm flex">
            <span className="font-medium w-20 text-foreground text-left">
              Password:
            </span>
            <span className="text-muted">cityslicka</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
