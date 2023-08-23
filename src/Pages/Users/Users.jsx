import "./users.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/user");
        setUsers(res.data.users);
        setCount(res.data.count);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const PF = "http://localhost:5000/images/";

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/user/delete/${userId}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="userDetails">
      <div>
        <span className="userDetailsHeader">ALL USERS</span>
      </div>
      <div>
        <span className="userDetailsCount">All Users: {count}</span>
      </div>
      <div className="userSearchbar">
        <i className="searchIcon fa-solid fa-magnifying-glass"></i>
        <input
          className="seachbar"
          type="text"
          placeholder="Search by username or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className="userDetailTable">
        <thead>
          <tr>
            <th>Profile Pic</th>
            <th>Username</th>
            <th>Email</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter(
              (user) =>
                user.username
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(
              (user) =>
                user.role !== "admin" && (
                  <tr key={user._id}>
                    <td>
                      <img
                        className="userDetailsProfilepic"
                        src={PF + user.profilePic}
                        alt=""
                      />
                    </td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.desc}</td>
                    <td>
                      <button
                        className="deleteUsers"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
            )}
        </tbody>
      </table>
    </div>
  );
}
