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

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [role, setRole] = React.useState("Admin"); // Default role

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    handleMenuClose();
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
        Super Admin Panel
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Avatar sx={{ cursor: "pointer" }} />
        <Typography>Hi - Super Admin</Typography>
        <IconButton onClick={handleMenuOpen}>
          <KeyboardArrowDownIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleRoleChange("Admin")}>Admin</MenuItem>
          <MenuItem onClick={() => handleRoleChange("User")}>User</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
