import React, { useState } from "react";
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
} from "@mui/material";

const CreateNewModal = ({ open, handleClose }) => {
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
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = () => {
    console.log(formData); // Handle form submission logic here
    handleClose();
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
            CREATE TEAM MEMBER MASTER
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
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
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
              <MenuItem value="">Select Option</MenuItem>
              <MenuItem value="Checker">Checker</MenuItem>
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
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateNewModal;
