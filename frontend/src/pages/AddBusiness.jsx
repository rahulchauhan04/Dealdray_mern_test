import React, { useState } from "react";
import API from "../services/api";

const AddBusiness = () => {
  const [formData, setFormData] = useState({
    name: "",
    ownerName: "",
    mobile: "",
    email: "",
    category: "",
    documents: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, documents: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithFiles = new FormData();
    for (let key in formData) {
      if (key === "documents") {
        for (let file of formData.documents) {
          formDataWithFiles.append("documents", file);
        }
      } else {
        formDataWithFiles.append(key, formData[key]);
      }
    }

    try {
      await API.post("/businesses", formDataWithFiles, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Business created successfully");
    } catch (error) {
      console.error("Error creating business:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Business Name"
        required
      />
      <input
        type="text"
        name="ownerName"
        value={formData.ownerName}
        onChange={handleChange}
        placeholder="Owner Name"
        required
      />
      <input
        type="text"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        placeholder="Mobile"
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
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Add Business</button>
    </form>
  );
};

export default AddBusiness;
