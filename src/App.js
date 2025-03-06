import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          formData
      );
      console.log("Saved:", response.data);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
      <div className="p-4 max-w-md mx-auto">
        {/* Form Card */}
        <div className="border border-gray-300 rounded-lg p-4 shadow-md mb-4">
          <h2 className="text-xl font-bold mb-2">Submission Form</h2>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Submit
            </button>
          </form>
        </div>

        {/* Users List */}
        <div className="border border-gray-300 rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-bold mb-2">Fetched Users</h2>
          <ul className="list-disc pl-4">
            {users.map((user) => (
                <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        </div>
      </div>
  );
};

export default App;