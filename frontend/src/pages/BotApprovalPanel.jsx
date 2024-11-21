import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import API from "../services/api";

const BotApprovalPanel = () => {
  const [rows, setRows] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const fetchApprovals = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }
        const response = await API.get("/buyer-approvals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            approvalStatus: "Pending Approval",
          },
        });
        setRows(response.data.registrations || []);
      } catch (error) {
        console.error("Error fetching approvals:", error.response?.data || error.message);
      }
    };

    fetchApprovals();
  }, []);

  const handleApprove = async (buyerId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }
      await API.post(
        "/buyer-approvals/approve",
        { buyerId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRows((prevRows) =>
        prevRows.filter((row) => row._id !== buyerId)
      );
      alert("Buyer approved successfully");
      // Trigger a refresh in the Bot Checker Panel
      window.dispatchEvent(new Event("refreshBotCheckerPanel"));
    } catch (error) {
      console.error("Error approving buyer:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error approving buyer");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <Sidebar role={localStorage.getItem("role")} />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Header role={localStorage.getItem("role")} />

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
          Buyer Onboarding Team - Approval / Dashboard
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
              Pending Approvals
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
                  <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map((row, index) => (
                    <TableRow key={row._id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">
                        <Box>
                          <Typography
                            sx={{ fontWeight: "bold", color: "#007bff" }}
                          >
                            {row.businessName || "N/A"}
                          </Typography>
                          <Typography sx={{ color: "#888" }}>
                            Owner Name: {row.ownerName || "N/A"}
                          </Typography>
                          <Typography sx={{ color: "#888" }}>
                            Mobile: {row.mobile || "N/A"}
                          </Typography>
                          <Typography sx={{ color: "#888" }}>
                            Email: {row.email || "N/A"}
                          </Typography>
                          <Typography sx={{ color: "#888" }}>
                            Location: {row.location || "N/A"}
                          </Typography>
                        </Box>
                      </TableCell>
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
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleApprove(row._id)}
                        >
                          Approve
                        </Button>
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

export default BotApprovalPanel;
