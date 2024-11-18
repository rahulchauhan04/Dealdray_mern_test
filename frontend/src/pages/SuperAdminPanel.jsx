import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TableSection from "../components/TableSection";

const SuperAdminPanel = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <Box sx={{ padding: "20px" }}>
          <TableSection />
        </Box>
      </Box>
    </Box>
  );
};

export default SuperAdminPanel;
