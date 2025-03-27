import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Remove unused axios import
import { toast } from "react-toastify";
import { useUsers } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext";

const UserList = () => {
  const { theme } = useTheme();
  const {
    users,
    loading,
    error,
    currentPage,
    totalPages,
    fetchUsers,
    deleteUser: deleteUserContext,
  } = useUsers();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Initialize filtered users when users change
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  // Handle pagination
  const { changePage } = useUsers();

  // Handle pagination
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      changePage(page);
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const success = await deleteUserContext(userId);
      if (success) {
        toast.success("User deleted successfully");
      } else {
        toast.error("Failed to delete user");
      }
    }
  };

  // Render pagination
  const renderPagination = () => {
    return (
      <div className="pagination">
        <button
          className="page-link"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`page-link ${currentPage === page ? "active" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="page-link"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-[800px] mx-auto bg-card-bg dark:bg-gray-700 rounded-xl shadow-card p-6 transition-all duration-300">
      <div className="flex justify-between items-center mb-5 pb-4 border-b border-card-border">
        <h2 className="text-foreground font-semibold text-xl">
          User Management
        </h2>
        <button
          onClick={fetchUsers}
          className="flex items-center gap-2 bg-input-bg text-foreground border border-input-border rounded-lg px-4 py-2 font-medium transition-all duration-200 hover:transform hover:-translate-y-0.5 hover:shadow-hover"
        >
          <span className="text-base font-bold">↻</span> Refresh
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          className="w-full py-3 px-4 rounded-lg border border-input-border bg-input-bg text-input-text transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/25 shadow-search"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-danger/20 border border-danger/30 text-danger">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 text-muted">
          <div className="w-10 h-10 border-3 border-primary/10 border-t-primary rounded-full animate-spin mb-4" />
          <p>Loading users...</p>
        </div>
      ) : (
        <>
          {filteredUsers.length === 0 ? (
            <div className="p-3 rounded-lg bg-info/20 border border-info/30 text-info">
              No users found
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between  p-4 rounded-lg bg-card-bg shadow-hover border border-card-border transition-all duration-300 hover:transform hover:-translate-y-0.5 hover:shadow-card md:flex-row flex-col md:items-center items-start"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-[60px] h-[60px] rounded-full overflow-hidden shadow-hover border-2 border-card-bg">
                      <img
                        src={user.avatar}
                        alt={`${user.first_name} ${user.last_name}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {user.first_name} {user.last_name}
                      </h3>
                      <p className="text-sm text-muted">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 md:mt-0 mt-4 md:w-auto w-full justify-center md:justify-end">
                    <Link
                      to={`/users/${user.id}/edit`}
                      className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover transform hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center justify-center"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="px-4 py-2 rounded-lg bg-danger text-primary-foreground hover:bg-danger/90 transform hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center justify-center"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && renderPagination()}
        </>
      )}
    </div>
  );
};

export default UserList;
