import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import GroupIcon from '@mui/icons-material/Group';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MapIcon from '@mui/icons-material/Map';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import dealsdrayLogo from '../assets/dealsdray_horizontal_logo.png';

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: '250px',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[1],
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
}));

const Header = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '20px',
});

const Logo = styled('img')({
  width: '150px',
});

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  '&:hover': {
    backgroundColor: '#8dccf7',
    transition: 'background-color 0ms', // Instant hover effect
  },
  backgroundColor: active ? '#8dccf7' : 'inherit',
  transition: 'background-color 0ms', // Instant active effect
}));

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleListItemClick = (index) => {
    setActiveItem(index);
  };

  const menuItems = [{ text: 'Dashboard', icon: <DashboardIcon /> }];
  const pageItems = [
    { text: 'Designations', icon: <BusinessCenterIcon /> },
    { text: 'Departments', icon: <GroupIcon /> },
    { text: 'Team Members', icon: <GroupIcon /> },
    { text: 'States', icon: <LocationCityIcon /> },
    { text: 'District', icon: <MapIcon /> },
    { text: 'Pincode', icon: <LocalOfferIcon /> },
    { text: 'Orders', icon: <ShoppingCartIcon /> },
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
        sx={{ fontWeight: 'bold', marginBottom: 1, color: '#666' }}
      >
        Menu
      </Typography>
      <List>
        {menuItems.map((item, index) => (
          <StyledListItem
            button
            key={index}
            active={activeItem === index}
            onClick={() => handleListItemClick(index)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>

      {/* Pages Section */}
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 'bold', marginTop: 2, marginBottom: 1, color: '#666' }}
      >
        Pages
      </Typography>
      <List>
        {pageItems.map((item, index) => (
          <StyledListItem
            button
            key={index + menuItems.length}
            active={activeItem === index + menuItems.length}
            onClick={() => handleListItemClick(index + menuItems.length)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;
