import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";

const Header = ({ role }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const getPanelTitle = (role) => {
    switch (role) {
      case "SuperAdmin":
        return "Super Admin Panel";
      case "BOT Checker":
        return "BOT Checker Panel";
      case "BOT Approval Agent":
        return "BOT Approval Panel";
      default:
        return "Admin Panel";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#ffffff",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h6" color="grey">
        {getPanelTitle(role)}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Avatar sx={{ cursor: "pointer" }} />
        <Typography>Hi - {role}</Typography>
        <IconButton onClick={handleMenuOpen}>
          <KeyboardArrowDownIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;