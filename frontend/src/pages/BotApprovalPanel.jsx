import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const dummyData = [
  {
    recordNo: 1,
    businessName: "N and N Store",
    ownerName: "N and N Store",
    mobile: "9634859637",
    email: "ksmegha@yopmail.com",
    location: "Bangalore, KARNATAKA",
    registrationTimeline: "30/08/2024, 5:01:19 PM",
    businessCategory: "Proprietary",
    documentsStatus: "NO DOCUMENTS UPLOADED",
    registeredBy: "Direct Registration",
    geoLocation: "Brigade Metropolis, Bangalore",
    deviceInfo: "realme, android",
    deviceID: "UKQ1.230924.001",
  },
  // Add more dummy data as needed
];

const BotApprovalPanel = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const itemsPerPage = 10;
    const totalItems = dummyData.length;
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setRows(dummyData.slice(startIndex, endIndex));
  }, [page]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
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
          {/* Table Section */}
          <Paper
            elevation={3}
            sx={{
              overflow: "auto",
              borderRadius: 2,
              margin: 2,
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
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.recordNo}</TableCell>
                    <TableCell align="center">
                      <Box>
                        <Typography sx={{ fontWeight: "bold", color: "#007bff" }}>
                          {row.businessName}
                        </Typography>
                        <Typography sx={{ color: "#888" }}>
                          Owner Name: {row.ownerName}
                        </Typography>
                        <Typography sx={{ color: "#888" }}>
                          Mobile: {row.mobile}
                        </Typography>
                        <Typography sx={{ color: "#888" }}>
                          Email: {row.email}
                        </Typography>
                        <Typography sx={{ color: "#888" }}>
                          Location: {row.location}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold", color: "#007bff" }}>
                      {row.registrationTimeline}
                    </TableCell>
                    <TableCell align="center">{row.businessCategory}</TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          backgroundColor:
                            row.documentsStatus === "NO DOCUMENTS UPLOADED"
                              ? "#f44336"
                              : "#4caf50",
                          color: "#fff",
                          padding: "5px",
                          borderRadius: "5px",
                          display: "inline-block",
                        }}
                      >
                        {row.documentsStatus}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold", color: "blue" }}>
                      {row.registeredBy}
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="primary">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          {/* Pagination Controls */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
            }}
          >
            <Button
              onClick={handlePreviousPage}
              disabled={page <= 1}
              variant="outlined"
              startIcon={<ArrowBackIcon />}
            >
              Previous
            </Button>
            <Typography sx={{ margin: "0 10px", fontWeight: "bold" }}>
              Page {page} of {totalPages}
            </Typography>
            <Button
              onClick={handleNextPage}
              disabled={page >= totalPages}
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BotApprovalPanel;
