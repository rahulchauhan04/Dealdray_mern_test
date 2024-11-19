import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import API from "../services/api";
import logo from "../assets/dealsdray logo.png"; // Adjust this to the correct path

// Fullscreen container
const StyledContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  width: "100vw",
  backgroundColor: "#f9f9f9", // Background color
  margin: 0,
  padding: 0,
});

// Login box styling
const LoginBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "600px",
  padding: "40px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  gap: "60px",
});

// Logo styling
const Logo = styled("img")({
  width: "140px",
});

// Form styling
const FormBox = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", formData);
      alert(response.data.message);
      // Save the token to localStorage or state management
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed");
    }
  };

  return (
    <StyledContainer>
      <LoginBox>
        {/* Left Logo Section */}
        <Logo src={logo} alt="DealsDray Logo" />

        {/* Right Form Section */}
        <FormBox>
          <Typography
            variant=""
            TextField
            align="center"
            gutterBottom
            sx={{ fontWeight: "semi-bold", fontSize: "29px" }}
          >
            Login
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
            onSubmit={handleSubmit}
          >
            <TextField
              label="Email Address"
              type="email"
              name="email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              variant="outlined"
              fullWidth
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                backgroundColor: "#ec2127",
                padding: "10px",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#c61b20" },
              }}
            >
              LOG IN
            </Button>
            <Typography
              variant="body2"
              align="center"
              sx={{ color: "blue", cursor: "pointer" }}
            >
              Forgot Password?
            </Typography>
          </Box>
        </FormBox>
      </LoginBox>
    </StyledContainer>
  );
};

export default Login;