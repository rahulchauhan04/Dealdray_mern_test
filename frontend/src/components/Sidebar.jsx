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

const Sidebar = ({ role }) => {
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();

  const handleListItemClick = (index, path) => {
    setActiveItem(index);
    if (role === "BOT Checker" && path === "/dashboard") {
      navigate("/bot-checker-panel");
    } else if (role === "BOT Approval Agent" && path === "/dashboard") {
      navigate("/bot-approval-panel");
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
  ];

  const pageItems =
    role === "SuperAdmin"
      ? [
          { text: "Designations", icon: <BusinessCenterIcon />, path: "/designations" },
          { text: "Departments", icon: <GroupIcon />, path: "/departments" },
          { text: "Team Members", icon: <GroupIcon />, path: "/team-members" },
          { text: "States", icon: <LocationCityIcon />, path: "/states" },
          { text: "District", icon: <MapIcon />, path: "/district" },
          { text: "Pincode", icon: <LocalOfferIcon />, path: "/pincode" },
          { text: "Orders", icon: <ShoppingCartIcon />, path: "/orders" },
        ]
      : role === "BOT Checker"
      ? [
          { text: "New Registrations", icon: <GroupIcon />, path: "/bot-checker-panel" },
          { text: "Checking Pending", icon: <BusinessCenterIcon />, path: "/checking-pending" },
          { text: "Processed With Pendency", icon: <MapIcon />, path: "/processed-with-pendency" },
          { text: "Incomplete Registrations", icon: <GroupIcon />, path: "/incomplete-registrations" },
        ]
      : role === "BOT Approval Agent"
      ? [
          { text: "Pending Approval", icon: <GroupIcon />, path: "/pending-approval" },
          { text: "Deleted Registrations", icon: <BusinessCenterIcon />, path: "/deleted-registrations" },
        ]
      : [];

  return (
    <SidebarContainer>
      <Header>
        <Logo src={dealsdrayLogo} alt="DealsDray Logo" />
        <IconButton>
          <MenuIcon />
        </IconButton>
      </Header>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: "bold", marginBottom: 1, color: "#666" }}
      >
        Menu
      </Typography>
      <List>
        {menuItems.map((item, index) => (
          <StyledListItem
            button
            key={index}
            selected={activeItem === index}
            onClick={() => handleListItemClick(index, item.path)}
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#8dccf7",
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: "bold", marginTop: 2, marginBottom: 1, color: "#666" }}
      >
        Pages
      </Typography>
      <List>
        {pageItems.map((item, index) => (
          <StyledListItem
            button
            key={index + menuItems.length}
            selected={activeItem === index + menuItems.length}
            onClick={() => handleListItemClick(index + menuItems.length, item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </SidebarContainer>
  );
};

export default Sidebar;