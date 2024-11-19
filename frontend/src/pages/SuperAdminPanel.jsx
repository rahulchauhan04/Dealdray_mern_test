import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TableSection from "../components/TableSection";

const SuperAdminPanel = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        overflow: "hidden",
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <Box
          sx={{
            flex: 1, // Ensures content below the header fills the remaining space
            overflowY: "auto", // Allows scrolling for long table content
            padding: "20px",
            boxSizing: "border-box", // Consistent sizing
          }}
        >
          <TableSection />
        </Box>
      </Box>
    </Box>
  );
};

export default SuperAdminPanel;