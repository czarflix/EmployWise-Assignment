import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useUsers } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext";

const EditUser = () => {
  const { theme } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Get user context
  const { getUserById, updateUser: updateUserContext } = useUsers();

  // Fetch user details
  useEffect(() => {
    // First try to get user from context
    const userFromContext = getUserById(id);

    if (userFromContext) {
      setUser(userFromContext);
      setLoading(false);
    } else {
      // Fallback to API if not in context
      const fetchUser = async () => {
        try {
          const response = await axios.get(`https://reqres.in/api/users/${id}`);
          setUser(response.data.data);
          setError("");
        } catch (err) {
          setError("Failed to fetch user details");
          toast.error("Failed to fetch user details");
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [id, getUserById]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    // Validate form
    if (!user.first_name || !user.last_name || !user.email) {
      setError("All fields are required");
      setSubmitting(false);
      return;
    }

    try {
      // Update user in context (which also updates localStorage)
      const success = await updateUserContext(id, user);

      if (success) {
        toast.success("User updated successfully");
        navigate("/users");
      } else {
        throw new Error("Failed to update user");
      }
    } catch (err) {
      setError("Failed to update user");
      toast.error("Failed to update user");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading user details...</div>;
  }

  return (
    <div className={`edit-user-container ${theme === "dark" ? "dark" : ""}`}>
      <h2>Edit User</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-success"
            disabled={submitting}
          >
            {submitting ? "Updating..." : "Update User"}
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => navigate("/users")}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;