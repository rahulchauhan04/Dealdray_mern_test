import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  Avatar,
} from "@mui/material";
import API from "../services/api"; // Ensure you have an API service set up

const initialFormData = {
  department: "",
  email: "",
  mobile: "",
  reportingHead: "",
  pinCode: "",
  state: "",
  townArea: "",
  displayName: "",
  otherReportingHead: "",
  deactivationTime: "",
  assignmentRule: "",
  teamMemberName: "",
  password: "",
  designation: "",
  userHierarchy: "",
  city: "",
  location: "",
  address: "",
  referralType: "",
  image: null,
  name: "",
};

const CreateNewModal = ({ open, handleClose, subUser, refreshSubUsers, onNewEntry, onUpdateEntry }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (subUser) {
      // Editing mode: populate formData with subUser data
      setFormData({
        ...initialFormData,
        ...subUser,
        deactivationTime: subUser.deactivationTime.string, // Set deactivationTime to the string value
         // Reset image to null to avoid conflicts
      });
      setImagePreview(subUser.image || null);
    } else {
      // Creating mode: reset formData
      setFormData(initialFormData);
      setImagePreview(null);
    }
  }, [subUser]);

  useEffect(() => {
    if (!open) {
      // Modal is closed, reset form data
      setFormData(initialFormData);
      setImagePreview(null);
    }
  }, [open]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // For file inputs
    if (event.target.type === 'file') {
      const file = event.target.files[0];
      if (file && file.type.match('image.*')) {
        setFormData({
          ...formData,
          [name]: file,
        });
        setImagePreview(URL.createObjectURL(file));
      } else {
        alert('Please select a valid image file (jpg, jpeg, png).');
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const generateReferralCode = () => {
    return `REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();

      // Ensure deactivationTime is correctly formatted
      if (typeof formData.deactivationTime === 'string') {
        formDataToSend.append("deactivationTime", formData.deactivationTime);
      } else if (typeof formData.deactivationTime === 'object') {
        formDataToSend.append("deactivationTime", formData.deactivationTime.string);
      }

      // Append other form data
      for (const key in formData) {
        if (key !== "deactivationTime") {
          formDataToSend.append(key, formData[key]);
        }
      }

      const response = await API.put(`/super-admin/sub-users/${subUser._id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Updated SubUser:", response.data.subUser); // Debug log
      alert("Subuser updated successfully");
      onUpdateEntry(response.data.subUser); // Trigger parent update
      handleClose(); // Close modal
    } catch (error) {
      console.error("Error updating subuser:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error updating subuser");
    }
  };

  const handleSubmit = async () => {
    console.log('Form Data:', formData); // Add this line
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      // Generate referral code
      formDataToSend.append("referralCode", generateReferralCode());

      // Ensure deactivationTime is sent as "7 days"
      formDataToSend.append("deactivationTime", "7 days");

      if (subUser) {
        // Editing existing subuser
        const response = await API.put(`/super-admin/sub-users/${subUser._id}`, formDataToSend, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
        });
        onUpdateEntry(response.data.subUser);
        alert("User updated successfully");
      } else {
        // Creating new subuser
        const response = await API.post("/super-admin/sub-users", formDataToSend, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
        });
        onNewEntry(response.data.subUser);
        alert("User created successfully");
      }

      // Refresh the subuser list
      if (refreshSubUsers) {
        refreshSubUsers();
      } else {
        console.error("refreshSubUsers is not defined");
      }

      // Reset form data and image preview
      setFormData(initialFormData);
      setImagePreview(null);

      // Close the modal
      handleModalClose();

      alert("Subuser created successfully");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error creating subuser");
    }
  };

  const handleModalClose = () => {
    // Reset form data and image preview
    setFormData(initialFormData);
    setImagePreview(null);

    // Close the modal
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleModalClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 1200,
          backgroundColor: "white",
          borderRadius: 2,
          p: 4,
          boxShadow: 24,
          overflowY: "auto",
          maxHeight: "90vh",
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#5994d7",
            }}
          >
            {subUser ? "EDIT TEAM MEMBER" : "CREATE TEAM MEMBER"}
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="error"
              sx={{ mr: 2 }}
              onClick={handleModalClose}
            >
              Back to List
            </Button>
            <Button variant="contained" color="primary" onClick={subUser ? handleSave : handleSubmit}>
              {subUser ? "Save" : "Submit"}
            </Button>
          </Box>
        </Box>

        {/* Form Section */}
        <Box
          component="form"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 3,
            rowGap: 4,
          }}
        >
          {/* Left Column */}
          <FormControl fullWidth>
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <MenuItem value="">Select Option</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            name="email"
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            name="mobile"
            label="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth>
            <InputLabel>Reporting Head</InputLabel>
            <Select
              name="reportingHead"
              value={formData.reportingHead}
              onChange={handleChange}
              required
            >
              <MenuItem value="">Select Option</MenuItem>
              <MenuItem value="Supervisor">Supervisor</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            name="pinCode"
            label="Pin Code"
            value={formData.pinCode}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            name="state"
            label="State"
            value={formData.state}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel>Town Area</InputLabel>
            <Select
              name="townArea"
              value={formData.townArea}
              onChange={handleChange}
            >
              <MenuItem value="">Select Option</MenuItem>
              <MenuItem value="Urban">Urban</MenuItem>
              <MenuItem value="Rural">Rural</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            name="displayName"
            label="Display Name"
            value={formData.displayName}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel>Other Reporting Head</InputLabel>
            <Select
              name="otherReportingHead"
              value={formData.otherReportingHead}
              onChange={handleChange}
            >
              <MenuItem value="">Non Selected</MenuItem>
              <MenuItem value="Supervisor">Supervisor</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            name="deactivationTime"
            label="Deactivation Time"
            value={formData.deactivationTime}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel>Assignment Rule</InputLabel>
            <Select
              name="assignmentRule"
              value={formData.assignmentRule}
              onChange={handleChange}
            >
              <MenuItem value="">Select Option</MenuItem>
              <MenuItem value="Round Robin">Round Robin</MenuItem>
              <MenuItem value="All Record Assign">All Record Assign</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            name="teamMemberName"
            label="Team Member Name"
            value={formData.teamMemberName}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth>
            <InputLabel>Designation</InputLabel>
            <Select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
            >
              <MenuItem value="">Select Designation</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Executive">Executive</MenuItem>
              {/* Add other options as needed */}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>User Hierarchy</InputLabel>
            <Select
              name="userHierarchy"
              value={formData.userHierarchy}
              onChange={handleChange}
              required
            >
              <MenuItem value="">Select Option</MenuItem>
              <MenuItem value="BOT Checker">BOT Checker</MenuItem>
              <MenuItem value="BOT Approval Agent">BOT Approval Agent</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            name="city"
            label="City"
            value={formData.city}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name="location"
            label="Location"
            value={formData.location}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name="address"
            label="Address"
            multiline
            rows={3}
            value={formData.address}
            onChange={handleChange}
          />
          <FormControl>
            <Typography>Referral Type</Typography>
            <RadioGroup
              row
              name="referralType"
              value={formData.referralType}
              onChange={handleChange}
            >
              <FormControlLabel value="B2R" control={<Radio />} label="B2R" />
              <FormControlLabel value="B2B" control={<Radio />} label="B2B" />
              <FormControlLabel value="B2A" control={<Radio />} label="B2A" />
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            component="label"
            sx={{ alignSelf: "start" }}
          >
            Choose File
            <input
              type="file"
              name="image"
              hidden
              onChange={handleChange}
              accept="image/*"
            />
          </Button>
          {imagePreview && (
            <Avatar
              src={imagePreview}
              alt="Image Preview"
              sx={{ width: 100, height: 100, mt: 2 }}
            />
          )}
          <TextField
            fullWidth
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Box>
      </Box>
    </Modal>
  );
};

CreateNewModal.propTypes = {
  refreshSubUsers: PropTypes.func,
};

export default CreateNewModal;
