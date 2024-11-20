import React, { useState, useEffect } from "react";
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
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import API from "../services/api"; // Ensure you have an API service set up

// Add 'onNewEntry' and 'onUpdateEntry' to the props
const CreateNewModal = ({ open, handleClose, onNewEntry, onUpdateEntry, subUser }) => {
  const [formData, setFormData] = useState({
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
    role: "",
    userType: "",
    referralCode: "",
  });

  useEffect(() => {
    if (subUser) {
      setFormData({
        department: subUser.department || "",
        email: subUser.email || "",
        mobile: subUser.mobile || "",
        reportingHead: subUser.reportingHead || "",
        pinCode: subUser.pinCode || "",
        state: subUser.state || "",
        townArea: subUser.townArea || "",
        displayName: subUser.displayName || "",
        otherReportingHead: subUser.otherReportingHead || "",
        deactivationTime: subUser.deactivationTime || "",
        assignmentRule: subUser.assignmentRule || "",
        teamMemberName: subUser.teamMemberName || "",
        password: subUser.password || "",
        designation: subUser.designation || "",
        userHierarchy: subUser.userHierarchy || "",
        city: subUser.city || "",
        location: subUser.location || "",
        address: subUser.address || "",
        referralType: subUser.referralType || "",
        image: subUser.image || null,
        name: subUser.name || "",
        role: subUser.role || "",
        userType: subUser.userType || "",
        referralCode: subUser.referralCode || "",
      });
    }
  }, [subUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // For file inputs
    if (event.target.type === 'file') {
      setFormData({
        ...formData,
        [name]: event.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async () => {
    console.log('Form Data:', formData); // Add this line
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      if (subUser) {
        // Editing existing subuser
        const response = await API.put(`/super-admin/sub-users/${subUser._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        onUpdateEntry(response.data.subUser);
        alert("User updated successfully");
      } else {
        // Creating new subuser
        const response = await API.post("/super-admin/sub-users", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        onNewEntry(response.data.subUser);
        alert("User created successfully");
      }

      // Close the modal
      handleClose();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error creating subuser");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
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
              onClick={handleClose}
            >
              Back to List
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
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
              <MenuItem value="Rule 1">Rule 1</MenuItem>
            </Select>
          </FormControl>

          {/* Right Column */}
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
            >
              <MenuItem value="">Select Option</MenuItem>
              <MenuItem value="Level 1">Level 1</MenuItem>
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
          <TextField
            fullWidth
            name="name"
            label="Team Member Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={formData.role}
              onChange={handleChange}
              required
              inputProps={{
                name: 'role',
              }}
            >
              <MenuItem value="">Select Role</MenuItem>
              <MenuItem value="BOT Checker">BOT Checker</MenuItem>
              <MenuItem value="BOT Approval Agent">BOT Approval Agent</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>User Type</InputLabel>
            <Select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
            >
              <MenuItem value="">Select User Type</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Regular">Regular</MenuItem>
              {/* Add other options as needed */}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            name="referralCode"
            label="Referral Code"
            value={formData.referralCode}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateNewModal;
