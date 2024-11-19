import React, { useState } from "react";
import API from "../services/api";

const AddSubUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "BOT Checker",
    password: "dealsdray",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.post("/super-admin/sub-users", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("SubUser created successfully");
    } catch (error) {
      console.error("Error creating subuser:", error);
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
        <option value="BOT Checker">BOT Checker</option>
        <option value="BOT Approval Agent">BOT Approval Agent</option>
      </select>
      <button type="submit">Add SubUser</button>
    </form>
  );
};

export default AddSubUser;