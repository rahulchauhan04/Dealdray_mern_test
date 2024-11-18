import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Businesses from "./pages/Businesses";
import AddUser from "./pages/AddUser";
import AddBusiness from "./pages/AddBusiness";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/businesses" element={<Businesses />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/add-business" element={<AddBusiness />} />
      </Routes>
    </Router>
  );
};

export default App;
