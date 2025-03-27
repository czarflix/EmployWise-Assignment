import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create the context
const UserContext = createContext();

// Create a custom hook to use the user context
export const useUsers = () => {
  return useContext(UserContext);
};

// Create the provider component
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Load users from localStorage on initial render
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
      setLoading(false);
    } else {
      fetchUsers(currentPage);
    }
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  // Fetch users from API
  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`
      );
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
      setCurrentPage(page);
      setError("");
      // Save to localStorage
      localStorage.setItem("users", JSON.stringify(response.data.data));
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Get a single user by ID
  const getUserById = (id) => {
    return users.find((user) => user.id === parseInt(id));
  };

  // Update a user
  const updateUser = async (id, userData) => {
    try {
      // Make API call (this is a mock API so it won't actually update the data permanently)
      await axios.put(`https://reqres.in/api/users/${id}`, userData);

      // Update the user in our local state
      const updatedUsers = users.map((user) => {
        if (user.id === parseInt(id)) {
          return { ...user, ...userData };
        }
        return user;
      });

      setUsers(updatedUsers);
      // Update localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return true;
    } catch (err) {
      toast.error("Failed to update user");
      return false;
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      const updatedUsers = users.filter((user) => user.id !== parseInt(id));
      setUsers(updatedUsers);
      // Update localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return true;
    } catch (err) {
      toast.error("Failed to delete user");
      return false;
    }
  };

  // Change page
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchUsers(page);
    }
  };

  const value = {
    users,
    loading,
    error,
    currentPage,
    totalPages,
    fetchUsers,
    getUserById,
    updateUser,
    deleteUser,
    changePage,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};