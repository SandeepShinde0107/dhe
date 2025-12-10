import React from "react";
import { Box, Card } from "@mui/material";

const SAVED_WORKLOADS = [
  {
    subject: "Computer Science",
    course: "B.Sc. Computer Science",
    year: 1,
    semester: 1,
    total: "84 hrs",
    requiredStaff: 3,
    status: { label: "1 Vacancy", type: "vacancy" },
  },
  {
    subject: "Mathematics",
    course: "B.Sc. Mathematics",
    year: 1,
    semester: 1,
    total: "50 hrs",
    requiredStaff: 2,
    status: { label: "Adequate", type: "ok" },
  },
  {
    subject: "Physics",
    course: "B.Sc. Physics",
    year: 1,
    semester: 1,
    total: "51 hrs",
    requiredStaff: 2,
    status: { label: "1 Vacancy", type: "vacancy" },
  },
  {
    subject: "Chemistry",
    course: "B.Sc. Chemistry",
    year: 1,
    semester: 1,
    total: "51 hrs",
    requiredStaff: 2,
    status: { label: "Adequate", type: "ok" },
  },
  {
    subject: "English",
    course: "B.A. English",
    year: 1,
    semester: 1,
    total: "60 hrs",
    requiredStaff: 2,
    status: { label: "1 Surplus", type: "surplus" },
  },
  {
    subject: "History",
    course: "B.A. History",
    year: 1,
    semester: 1,
    total: "40 hrs",
    requiredStaff: 2,
    status: { label: "1 Vacancy", type: "vacancy" },
  },
  {
    subject: "Economics",
    course: "B.A. Economics",
    year: 1,
    semester: 1,
    total: "40 hrs",
    requiredStaff: 2,
    status: { label: "Adequate", type: "ok" },
  },
  {
    subject: "Commerce",
    course: "B.Com",
    year: 1,
    semester: 1,
    total: "96 hrs",
    requiredStaff: 4,
    status: { label: "1 Vacancy", type: "vacancy" },
  },
  {
    subject: "Information Technology",
    course: "B.Sc. IT",
    year: 2,
    semester: 3,
    total: "102 hrs",
    requiredStaff: 4,
    status: { label: "2 Vacancy", type: "vacancy" },
  },
  {
    subject: "Biotechnology",
    course: "B.Sc. Biotechnology",
    year: 2,
    semester: 3,
    total: "44 hrs",
    requiredStaff: 2,
    status: { label: "1 Vacancy", type: "vacancy" },
  },
];

const StatusBadge = ({ status }: any) => {
  const styles: any = {
    ok: {
      bgcolor: "#d4f3e5",
      color: "#006b52",
    },
    vacancy: {
      bgcolor: "#fde2e1",
      color: "#cc1f1a",
    },
    surplus: {
      bgcolor: "#fff1c7",
      color: "#9a6700",
    },
  };

  return (
    <Box
      sx={{
        px: 1.5,
        py: 0.5,
        borderRadius: 20,
        fontSize: 13,
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        ...(styles[status.type]),
      }}
    >
      {status.type === "vacancy" && "⚠"}
      {status.type === "surplus" && "↗"}
      {status.label}
    </Box>
  );
};

export default function SavedWorkloadsTable() {
  return (
    <Card sx={{ borderRadius: 2, p: 2 }}>
      <Box sx={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb", textAlign: "left" }}>
              <th style={{ padding: "12px" }}>Subject</th>
              <th style={{ padding: "12px" }}>Course</th>
              <th style={{ padding: "12px" }}>Year</th>
              <th style={{ padding: "12px" }}>Semester</th>
              <th style={{ padding: "12px" }}>Total Workload</th>
              <th style={{ padding: "12px" }}>Required Staff</th>
              <th style={{ padding: "12px" }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {SAVED_WORKLOADS.map((row, i) => (
              <tr
                key={i}
                style={{
                  borderBottom: "1px solid #eee",
                  height: "56px",
                }}
              >
                <td style={{ padding: "12px" }}>{row.subject}</td>
                <td style={{ padding: "12px" }}>{row.course}</td>
                <td style={{ padding: "12px" }}>{row.year}</td>
                <td style={{ padding: "12px" }}>{row.semester}</td>
                <td style={{ padding: "12px" }}>{row.total}</td>
                <td style={{ padding: "12px" }}>{row.requiredStaff}</td>
                <td style={{ padding: "12px" }}>
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Card>
  );
}
