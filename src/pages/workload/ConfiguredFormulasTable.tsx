import {
  Box,
  Card,
  Button,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import React from "react";

const CONFIGURED_FORMULAS = [
  {
    university: "University of Mumbai",
    studentsPerDivision: 60,
    effectiveFrom: "6/1/2024",
    status: "Active",
  },
  {
    university: "Savitribai Phule Pune University",
    studentsPerDivision: 50,
    effectiveFrom: "6/1/2024",
    status: "Active",
  },
];

const StatusBadge = ({ status }: any) => (
  <Box
    sx={{
      px: 1.5,
      py: 0.5,
      borderRadius: 20,
      fontSize: 13,
      fontWeight: 600,
      bgcolor: "#065f46",
      color: "white",
      display: "inline-block",
    }}
  >
    {status}
  </Box>
);

export default function ConfiguredFormulasTable({ formulas, onEdit }: any) {
  return (
    <Card sx={{ borderRadius: 2, p: 2, mt: 4 }}>
      <Typography variant="h6" fontWeight={700} mb={0.5}>
        Configured Formulas
      </Typography>

      <Box sx={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb", textAlign: "left" }}>
              <th style={{ padding: "12px" }}>University</th>
              <th style={{ padding: "12px" }}>Students/Division</th>
              <th style={{ padding: "12px" }}>Effective From</th>
              <th style={{ padding: "12px" }}>Status</th>
              <th style={{ padding: "12px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {formulas.map((row: any, i: number) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee", height: "56px" }}>
                <td style={{ padding: "12px" }}>{row.university}</td>
                <td style={{ padding: "12px" }}>{row.studentsPerDivision}</td>
                <td style={{ padding: "12px" }}>{row.effectiveFrom}</td>
                <td style={{ padding: "12px" }}>
                  Active
                </td>
                <td style={{ padding: "12px" }}>
                  <Button
                    size="small"
                    onClick={() => onEdit(row)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Card>
  );
}
