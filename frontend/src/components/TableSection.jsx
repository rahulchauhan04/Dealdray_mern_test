import React from "react";
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
} from "@mui/material";

const TableSection = () => {
  const rows = [
    {
      id: 1,
      name: "CMT",
      email: "2803202308@gmail.com",
      mobile: "7348838564",
      designation: "Checker",
      department: "Category Management Team",
    },
    {
      id: 2,
      name: "BOT Checker",
      email: "2803202305@yopmail.com",
      mobile: "7348838569",
      designation: "Checker",
      department: "Buyer Onboarding Team",
    },
    // Add more static rows as needed
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
        <Typography variant="h6">Team Member Master</Typography>
        <Box>
          <Button variant="contained" color="primary" sx={{ marginRight: 1 }}>
            Update Status
          </Button>
          <Button variant="contained" color="secondary">
            Bulk Create New
          </Button>
        </Box>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>Record No</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Designation</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>
                <Avatar />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.mobile}</TableCell>
              <TableCell>{row.designation}</TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>
                <Button variant="text" color="primary">
                  Edit
                </Button>
                <Button variant="text" color="secondary">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default TableSection;
