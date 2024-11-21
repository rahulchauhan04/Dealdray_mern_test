import React, { useState, useEffect } from "react";
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
import API from "../services/api";
import CreateNewModal from "./CreateNewModal";
import SearchIcon from "@mui/icons-material/Search";
import GridOnIcon from "@mui/icons-material/GridOn";
import EditIcon from "@mui/icons-material/Edit";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const TableSection = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubUser, setSelectedSubUser] = useState(null);

  // Function to fetch subusers from the backend
  const fetchSubUsers = async () => {
    console.log("Refreshing subuser list...");
    try {
      const token = localStorage.getItem("token");
      const response = await API.get("/super-admin/sub-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRows(response.data.subUsers);
    } catch (error) {
      console.error("Error fetching subusers:", error.response?.data || error.message);
    }
  };

  // Fetch subusers when the component mounts
  useEffect(() => {
    fetchSubUsers();
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
      setSelectedRows((prevSelected) => prevSelected.filter((rowId) => rowId !== id));
    }
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleNewEntry = (newSubUser) => {
    setRows((prevRows) => [...prevRows, newSubUser]);
  };

  const handleEdit = async (subUserId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get(`/super-admin/sub-users/${subUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedSubUser(response.data); // Ensure all fields are included
      setIsEditModalOpen(true); // Open modal
    } catch (error) {
      console.error("Error fetching subuser details:", error.response?.data || error.message);
      alert("Unable to fetch subuser details.");
    }
  };

  const handleUpdateEntry = (updatedSubUser) => {
    console.log("Updating subuser:", updatedSubUser); // Debug log
    setRows((prevRows) =>
      prevRows.map((row) => (row._id === updatedSubUser._id ? updatedSubUser : row))
    );
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/super-admin/sub-users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRows((prevRows) => prevRows.filter((row) => row._id !== id));
      alert("Subuser deleted successfully");
    } catch (error) {
      console.error('Error deleting subuser:', error.response?.data || error.message);
      alert(error.response?.data?.message || "Error deleting subuser");
    }
  };

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
              onClick={toggleModal}
            >
              Create New
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
              Update Status
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
                <TableCell padding="checkbox" align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                  <Checkbox
                    indeterminate={
                      selectedRows.length > 0 && selectedRows.length < rows.length
                    }
                    checked={rows.length > 0 && selectedRows.length === rows.length}
                    onChange={handleSelectAllClick}
                  />
                  Select All
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
                  Role
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
              {rows.map((row, index) => (
                <TableRow key={row._id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.includes(row._id)}
                      onChange={(event) => handleRowCheckboxChange(event, row._id)}
                    />
                  </TableCell>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">
                    <Avatar
                      src={row.image ? row.image : 'path/to/placeholder/image.jpg'} // Update this line
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "5px",
                        margin: "0 auto",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{row.name || 'N/A'}</TableCell>
                  <TableCell align="center">{row.email || 'N/A'}</TableCell>
                  <TableCell align="center">{row.mobile || 'N/A'}</TableCell>
                  <TableCell align="center">{row.designation || 'N/A'}</TableCell>
                  <TableCell align="center">{row.department || 'N/A'}</TableCell>
                  <TableCell align="center">{row.reportingHead || 'N/A'}</TableCell>
                  <TableCell align="center">{row.role || 'N/A'}</TableCell>
                  <TableCell align="center">{row.referralCode || 'N/A'}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleEdit(row._id)} 
                      sx={{
                        color: "green",
                        "&:hover": {
                          backgroundColor: "rgba(0, 128, 0, 0.3)", // Light green background on hover
                        },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row._id)}
                      sx={{
                        color: "red",
                        "&:hover": {
                          backgroundColor: "rgba(255, 0, 0, 0.1)", // Light red background on hover
                        },
                      }}
                    >
                      <RadioButtonCheckedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>

      <CreateNewModal
        open={isModalOpen}
        handleClose={toggleModal}
        onNewEntry={handleNewEntry} // Pass the onNewEntry prop
        refreshSubUsers={fetchSubUsers} // Pass the refreshSubUsers function
      />

      {isEditModalOpen && selectedSubUser && (
        <CreateNewModal
          open={isEditModalOpen}
          handleClose={() => setIsEditModalOpen(false)}
          onUpdateEntry={handleUpdateEntry}
          subUser={selectedSubUser}
          refreshSubUsers={fetchSubUsers} // Pass the function as a prop
        />
      )}
    </Box>
  );
};

export default TableSection;