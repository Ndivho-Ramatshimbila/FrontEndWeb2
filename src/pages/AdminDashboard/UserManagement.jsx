// src/pages/AdminDashboard/UserManagement.jsx
import React, { useState, useEffect } from "react";
import "../../styles/pages/_usermanagement.scss";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "attendee" });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [selectedIds, setSelectedIds] = useState([]);

  // Load users from localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

  // Save users and re-filter whenever data or filters change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    filterUsers();
  }, [users, search, roleFilter]);

  // Filter users by search (name, email, or role) and selected role filter
  const filterUsers = () => {
    let temp = [...users];

    // 🔍 Search by name, email, or role
    if (search) {
      temp = temp.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase()) ||
          u.role.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🎭 Filter by selected role
    if (roleFilter !== "all") {
      temp = temp.filter((u) => u.role === roleFilter);
    }

    setFilteredUsers(temp);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Edit user
  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      alert("Name and Email are required");
      return;
    }
    const updatedUsers = users.map((u) =>
      u.id === selectedUser.id ? { ...u, ...formData } : u
    );
    setUsers(updatedUsers);
    setIsEditing(false);
    setSelectedUser(null);
  };

  // Delete a single user
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;
    setUsers(users.filter((u) => u.id !== id));
    setSelectedIds(selectedIds.filter((i) => i !== id));
  };

  // Bulk delete users
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedIds.length} user(s)?`
    );
    if (!confirmed) return;
    setUsers(users.filter((u) => !selectedIds.includes(u.id)));
    setSelectedIds([]);
  };

  // Select / Deselect users
  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // View user details
  const handleView = (user) => {
    alert(`Name: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}`);
  };

  // Add new user
  const handleAddNew = () => {
    setFormData({ name: "", email: "", role: "attendee" });
    setIsAdding(true);
  };

  const handleAddSave = () => {
    if (!formData.name || !formData.email) {
      alert("Name and Email are required");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
    };

    setUsers([...users, newUser]);
    setIsAdding(false);
    setFormData({ name: "", email: "", role: "attendee" });
  };

  return (
    <div className="user-management-page">
      <h1>User Management</h1>

      {/* Filters and Actions */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name, email, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="all">All Roles</option>
          <option value="attendee">Attendees</option>
          <option value="organizer">Organizers</option>
        </select>

        <div className="actions">
          <button className="add-user-btn" onClick={handleAddNew}>
            + Add New User
          </button>

          {selectedIds.length > 0 && (
            <button className="bulk-delete-btn" onClick={handleBulkDelete}>
              Delete Selected ({selectedIds.length})
            </button>
          )}
        </div>
      </div>

      {/* Users Table */}
      <table className="users-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedIds.length === currentUsers.length && currentUsers.length > 0}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedIds(currentUsers.map((u) => u.id));
                  } else {
                    setSelectedIds([]);
                  }
                }}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(user.id)}
                    onChange={() => toggleSelect(user.id)}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="view-btn" onClick={() => handleView(user)}>
                    View
                  </button>
                  <button className="edit-btn" onClick={() => handleEdit(user)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit User</h2>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select name="role" value={formData.role} onChange={handleInputChange}>
                <option value="attendee">Attendee</option>
                <option value="organizer">Organizer</option>
              </select>
            </div>
            <div className="modal-actions">
              <button onClick={handleSave}>Save</button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setSelectedUser(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {isAdding && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New User</h2>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter user name"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter user email"
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select name="role" value={formData.role} onChange={handleInputChange}>
                <option value="attendee">Attendee</option>
                <option value="organizer">Organizer</option>
              </select>
            </div>
            <div className="modal-actions">
              <button onClick={handleAddSave}>Add User</button>
              <button onClick={() => setIsAdding(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
