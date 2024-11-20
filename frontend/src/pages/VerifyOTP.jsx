// frontend/src/pages/VerifyOTP.jsx

import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import API from "../services/api";

const VerifyOTP = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    otp: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/buyers/verify-otp", formData);
      alert(response.data.message);
      // Redirect or perform further actions as needed
    } catch (error) {
      console.error("OTP Verification Error:", error.response?.data || error.message);
      alert(error.response?.data.message || "Error verifying OTP");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "300px",
        margin: "0 auto",
        marginTop: "50px",
      }}
    >
      <Typography variant="h5" align="center">Verify OTP</Typography>
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />
      <TextField
        label="OTP"
        name="otp"
        value={formData.otp}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Verify OTP
      </Button>
    </Box>
  );
};

export default VerifyOTP;