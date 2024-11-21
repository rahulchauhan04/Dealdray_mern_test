import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GridOnIcon from "@mui/icons-material/GridOn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import API from "../services/api";

const BotCheckerPanel = () => {
  const [rows, setRows] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [role, setRole] = useState(""); // For dynamically updating the header and sidebar

  // Fetch data from API and user role
  const fetchApprovedRegistrations = async () => {
    try {
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("role"); // Fetch user role from localStorage
      setRole(userRole); // Set role to dynamically update header/sidebar

      const response = await API.get("/api/buyer-checker", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          approvalStatus: "Approved",
        },
      });
      setRows(response.data.registrations || []);
    } catch (error) {
      console.error(
        "Error fetching approved registrations:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchApprovedRegistrations();

    // Add event listener for manual refresh
    window.addEventListener("refreshBotCheckerPanel", fetchApprovedRegistrations);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("refreshBotCheckerPanel", fetchApprovedRegistrations);
    };
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const allRowIds = rows.map((row) => row._id);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedRows((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedRows((prevSelected) =>
        prevSelected.filter((rowId) => rowId !== id)
      );
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar role={role} /> {/* Pass the role dynamically */}

      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Header role={role} /> {/* Pass the role dynamically */}

        {/* Breadcrumb Section */}
        <Typography
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            color: "grey",
            margin: 2,
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Buyer Onboarding Team - Checker / Dashboard
        </Typography>

        {/* Content Section */}
        <Box
          sx={{
            backgroundColor: "#fff",
            margin: 2,
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#5994d7",
                fontWeight: "bold",
              }}
            >
              Approved Registrations
            </Typography>

            {/* Search and Icons */}
            <Box sx={{ display: "flex", gap: 1 }}>
              {searchOpen && (
                <TextField
                  placeholder="Search..."
                  size="small"
                  sx={{ backgroundColor: "#fff" }}
                  InputProps={{
                    startAdornment: (
                      <SearchIcon
                        sx={{ marginRight: 1, color: "rgba(0, 0, 0, 0.54)" }}
                      />
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
                    padding="checkbox"
                    align="center"
                    sx={{ color: "#fff", fontWeight: "bold" }}
                  >
                    <Checkbox
                      indeterminate={
                        selectedRows.length > 0 &&
                        selectedRows.length < rows.length
                      }
                      checked={
                        rows.length > 0 && selectedRows.length === rows.length
                      }
                      onChange={handleSelectAllClick}
                    />
                    Select All
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                    Record No
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                    Business Details
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                    Registration Timeline
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                    Business Category
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                    Documents Status
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                    Registered By
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                    View Details
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map((row, index) => (
                    <TableRow key={row._id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedRows.includes(row._id)}
                          onChange={(event) =>
                            handleRowCheckboxChange(event, row._id)
                          }
                        />
                      </TableCell>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{row.businessDetails || "N/A"}</TableCell>
                      <TableCell align="center">{row.registrationTimeline || "N/A"}</TableCell>
                      <TableCell align="center">{row.businessCategory || "N/A"}</TableCell>
                      <TableCell align="center">{row.documentsStatus || "N/A"}</TableCell>
                      <TableCell align="center">{row.registeredBy || "N/A"}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          sx={{
                            color: "#007bff",
                            "&:hover": {
                              backgroundColor: "rgba(0, 123, 255, 0.1)",
                            },
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BotCheckerPanel;
