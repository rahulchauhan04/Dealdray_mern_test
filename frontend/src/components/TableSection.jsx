import React, { useState } from "react";
import CreateNewModal from "./CreateNewModal";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Avatar,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GridOnIcon from "@mui/icons-material/GridOn";
import EditIcon from "@mui/icons-material/Edit";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const TableSection = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };


  const rows = [
    {
      id: 1,
      name: "CMT",
      email: "2803202308@gmail.com",
      mobile: "7348838564",
      designation: "Checker",
      department: "Category Management Team",
      reportingHead: "Super Admin",
      userType: "Checker",
      referralCode: "C123",
    },
    {
      id: 2,
      name: "BOT Checker",
      email: "2803202305@yopmail.com",
      mobile: "7348838569",
      designation: "Checker",
      department: "Buyer Onboarding Team",
      reportingHead: "Super Admin",
      userType: "Checker",
      referralCode: "B456",
    },
    {
      id: 3,
      name: "BOT Approval",
      email: "2803202306@gmail.com",
      mobile: "7348838566",
      designation: "Approval",
      department: "Buyer Onboarding Team",
      reportingHead: "Super Admin",
      userType: "Approval",
      referralCode: "A789",
    },
    {
      id: 4,
      name: "Srikanth RM",
      email: "rm@gmail.com",
      mobile: "9875774576",
      designation: "Checker",
      department: "RM",
      reportingHead: "Super Admin",
      userType: "Checker",
      referralCode: "R111",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* Breadcrumb Section */}
      <Typography
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          color: "grey",
          marginBottom: 2,
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        SuperAdmin-Panel / Team Member Master
      </Typography>

      {/* Header Section */}
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#5994d7",
              fontWeight: "bold",
            }}
          >
            Team Member Master
          </Typography>
          <Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ec2127",
                color: "#fff",
                marginRight: 1,
                "&:hover": { backgroundColor: "#c61b20" },
              }}
            >
              Update Status
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ec2127",
                color: "#fff",
                marginRight: 1,
                "&:hover": { backgroundColor: "#c61b20" },
              }}
            >
              Bulk Create New
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ec2127",
                color: "#fff",
                marginRight: 1,
                "&:hover": { backgroundColor: "#c61b20" },
              }}
            >
              Bulk Activate/Deactivate
            </Button>
            <Button
               variant="contained"
               sx={{
               backgroundColor: "#ec2127",
               color: "#fff",
               "&:hover": { backgroundColor: "#c61b20" },
               }}
               onClick={toggleModal} 
            >
               Create New
           </Button>
          </Box>
        </Box>

        {/* Search and Icons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 1,
            marginBottom: 2,
          }}
        >
          {searchOpen && (
            <TextField
              placeholder="Search..."
              size="small"
              sx={{
                backgroundColor: "#fff",
              }}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ marginRight: 1, color: "rgba(0, 0, 0, 0.54)" }} />
                ),
              }}
            />
          )}
          <IconButton onClick={() => setSearchOpen((prev) => !prev)}>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <GridOnIcon />
          </IconButton>
        </Box>

        {/* Table Section */}
        <Box
          sx={{
            overflow: "auto",
            backgroundColor: "#fff",
            borderRadius: 1,
          }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#37474f" }}>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Checkbox sx={{ color: "#fff" }} /> Select All
                </TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                  Record No
                </TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                  Image
                </TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                  Email
                </TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                  Mobile
                </TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                  Designation
                </TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                  Department
                </TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                  Reporting Head
                </TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                  User Type
                </TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                  Referral Code
                </TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell>
                    <Avatar
                      align="center"
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "5px",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.mobile}</TableCell>
                  <TableCell align="center">{row.designation}</TableCell>
                  <TableCell align="center">{row.department}</TableCell>
                  <TableCell align="center">{row.reportingHead}</TableCell>
                  <TableCell align="center">{row.userType}</TableCell>
                  <TableCell align="center">{row.referralCode}</TableCell>
                  <TableCell align="center">
                    <IconButton sx={{ color: "red" }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton sx={{ color: "green" }}>
                      <RadioButtonCheckedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
      <CreateNewModal open={isModalOpen} handleClose={toggleModal} />
    </Box>
  );
};

export default TableSection;