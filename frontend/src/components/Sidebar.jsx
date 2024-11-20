import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Typography,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import GroupIcon from "@mui/icons-material/Group";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MapIcon from "@mui/icons-material/Map";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import dealsdrayLogo from "../assets/dealsdray_horizontal_logo.png";
import { useNavigate } from "react-router-dom";

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: "230px",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  height: "100vh", // Sidebar spans full height
  display: "flex",
  flexDirection: "column",
}));

const Header = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "20px",
});

const Logo = styled("img")({
  width: "150px",
});

const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "button",
})(({ theme }) => ({
  "&:hover": {
    backgroundColor: "#8dccf7",
    transition: "background-color 0ms",
  },
  "&.Mui-selected": {
    backgroundColor: "#8dccf7",
    transition: "background-color 0ms",
  },
  transition: "background-color 0ms",
}));

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();

  const handleListItemClick = (index, path) => {
    setActiveItem(index);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  ];
  const pageItems = [
    { text: "Designations", icon: <BusinessCenterIcon /> },
    { text: "Departments", icon: <GroupIcon /> },
    { text: "Team Members", icon: <GroupIcon /> },
    { text: "States", icon: <LocationCityIcon /> },
    { text: "District", icon: <MapIcon /> },
    { text: "Pincode", icon: <LocalOfferIcon /> },
    { text: "Orders", icon: <ShoppingCartIcon /> },
  ];

  return (
    <SidebarContainer>
      <Header>
        <Logo src={dealsdrayLogo} alt="DealsDray Logo" />
        <IconButton>
          <MenuIcon />
        </IconButton>
      </Header>
      {/* Menu Section */}
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: "bold", marginBottom: 1, color: "#666" }}
      >
        Menu
      </Typography>
      {/* Menu Items */}
      <List>
        {menuItems.map((item, index) => (
          <StyledListItem
            button
            key={index}
            selected={activeItem === index}
            onClick={() => handleListItemClick(index, item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>
      {/* Pages Section */}
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: "bold", marginTop: 2, marginBottom: 1, color: "#666" }}
      >
        Pages
      </Typography>
      {/* Page Items */}
      <List>
        {pageItems.map((item, index) => (
          <StyledListItem
            button
            key={index + menuItems.length}
            selected={activeItem === index + menuItems.length}
            onClick={() => handleListItemClick(index + menuItems.length)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;