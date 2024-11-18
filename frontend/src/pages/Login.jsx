import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

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
          >
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
            />
            <Button
              variant="contained"
              fullWidth
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