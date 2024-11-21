import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const Dashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleCardClick = (path) => {
    if (role === "BOT Checker") {
      navigate("/bot-checker-panel");
    } else if (role === "BOT Approval Agent") {
      navigate("/bot-approval-panel");
    } else {
      navigate(path);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: 4,
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 4, textAlign: "center" }}>
        Admin Dashboard
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            width: 300,
            cursor: "pointer",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
          onClick={() => handleCardClick("/super-admin-panel")}
          elevation={3}
        >
          <CardActionArea>
            <CardContent sx={{ textAlign: "center" }}>
              <GroupIcon
                sx={{ fontSize: 80, color: "#1976d2", marginBottom: 2 }}
              />
              <Typography variant="h5">Team Members</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          sx={{
            width: 300,
            cursor: "pointer",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
          onClick={() => handleCardClick("/bot-checker-panel")}
          elevation={3}
        >
          <CardActionArea>
            <CardContent sx={{ textAlign: "center" }}>
              <CheckCircleIcon
                sx={{ fontSize: 80, color: "#1976d2", marginBottom: 2 }}
              />
              <Typography variant="h5">BOT Checker</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          sx={{
            width: 300,
            cursor: "pointer",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
          onClick={() => handleCardClick("/bot-approval-panel")}
          elevation={3}
        >
          <CardActionArea>
            <CardContent sx={{ textAlign: "center" }}>
              <ThumbUpIcon
                sx={{ fontSize: 80, color: "#1976d2", marginBottom: 2 }}
              />
              <Typography variant="h5">BOT Approval</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
