import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  MenuItem,
  Chip,
  IconButton,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { examApplications } from "../../../data/examApplication";

export default function ExamApplications() {
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = examApplications.filter((x) => {
    return (
      (type === "All" || x.type === type) &&
      (status === "All" || x.status === status) &&
      (search === "" || x.id.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const getChipColor = (s: string) => {
    switch (s) {
      case "Approved":
        return { bgcolor: "#025f5a", color: "white" };
      case "Payment Completed":
        return { bgcolor: "#0e7e7b", color: "white" };
      case "Payment Pending":
        return { bgcolor: "#d9a406", color: "white" };
      default:
        return {};
    }
  };

  return (
    <Card sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" fontWeight={600}>
        My Exam Applications
      </Typography>
      <Typography color="text.secondary" mb={3}>
        View and track your examination applications
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          select
          label="Exam Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          sx={{ flex: 1 }}
        >
          <MenuItem value="All">All types</MenuItem>
          <MenuItem value="Semester">Semester</MenuItem>
        </TextField>

        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ flex: 1 }}
        >
          <MenuItem value="All">All statuses</MenuItem>
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="Payment Completed">Payment Completed</MenuItem>
          <MenuItem value="Payment Pending">Payment Pending</MenuItem>
        </TextField>

        <TextField
          label="Search"
          placeholder="Application number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1 }}
        />
      </Box>

      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#f7f9fa" }}>
            <TableCell><b>Application No.</b></TableCell>
            <TableCell><b>Exam Type</b></TableCell>
            <TableCell><b>Semester</b></TableCell>
            <TableCell><b>Subjects</b></TableCell>
            <TableCell><b>Fee</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filtered.map((app) => (
            <TableRow key={app.id}>
              <TableCell>{app.id}</TableCell>
              <TableCell>{app.type}</TableCell>
              <TableCell>{app.semester}</TableCell>
              <TableCell>{app.subjects}</TableCell>
              <TableCell>₹{app.fee}</TableCell>
              <TableCell>
                <Chip label={app.status} sx={getChipColor(app.status)} />
              </TableCell>

              <TableCell>
                <IconButton>
                  <VisibilityOutlinedIcon />
                </IconButton>

                {app.status === "Payment Pending" && (
                  <Button
                    variant="contained"
                    startIcon={<CreditCardIcon />}
                    sx={{ bgcolor: "#025f5a", ml: 1 }}
                  >
                    Pay
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
