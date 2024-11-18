import React, { useState } from "react";
import API from "../services/api";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Admin",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users", formData);
      alert("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="Admin">Admin</option>
        <option value="Checker">Checker</option>
        <option value="Approver">Approver</option>
      </select>
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
