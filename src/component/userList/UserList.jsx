import React, { useState } from 'react';
import './UserList.css';
import toast from 'react-hot-toast';
import { deleteUser } from '../../service/UserService';

const UserList = ({ user, setUser, deleteUserById }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = user.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await deleteUser(id); // Make sure this function is passed as prop
      setUser((prev) => prev.filter((u) => u.userId !== id));
      toast.success("User has been deleted");
    } catch (e) {
      console.error(e);
      toast.error("Error while deleting the user");
    }
  };

  return (
    <div className="user-list-container" style={{ height: "100vh", overflowY: "auto" }}>
      {/* Search Bar */}
      <div className="search-bar input-group mb-3">
        <input
          type="text"
          name="keyword"
          id="keyword"
          className="form-control"
          placeholder="Search users..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <span className="input-group-text bg-warning">
          <i className="bi bi-search search-icon"></i>
        </span>
      </div>

      {/* User List */}
      <div className="row g-3 pe-2">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((u, index) => (
            <div key={index} className="col-12">
              <div className="card p-3" style={{ backgroundColor: "#444" }}>
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <h5 className="mb-1 text-white">{u.name}</h5>
                    <p className="mb-0 text-white">Email: {u.email}</p>
                  </div>
                  <div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(u.userId)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No users available.</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
