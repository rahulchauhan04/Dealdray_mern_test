import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Businesses from "./pages/Businesses";
import AddUser from "./pages/AddUser";
import AddBusiness from "./pages/AddBusiness";
import AddSubUser from "./pages/AddSubUser";
import SuperAdminPanel from "./pages/SuperAdminPanel";
import VerifyOTP from "./pages/VerifyOTP";
import BotCheckerPanel from "./pages/BotCheckerPanel";
import BotApprovalPanel from "./pages/BotApprovalPanel";
import Dashboard from "./pages/Dashboard"; // Import the Dashboard component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/super-admin-panel" element={<SuperAdminPanel />} />
        <Route path="/bot-checker-panel" element={<BotCheckerPanel />} />
        <Route path="/bot-approval-panel" element={<BotApprovalPanel />} />
        <Route path="/users" element={<Users />} />
        <Route path="/businesses" element={<Businesses />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/add-business" element={<AddBusiness />} />
        <Route path="/add-sub-user" element={<AddSubUser />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
      </Routes>
    </Router>
  );
};

export default App;
