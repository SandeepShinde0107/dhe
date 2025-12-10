import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

/* ===================== STATIC DATA ===================== */

const RECOMMENDATIONS = [
  {
    priority: "HIGH",
    subject: "Information Technology",
    course: "B.Sc. IT",
    current: 2,
    required: 4,
    action: "Recruit",
    notes: "Recruit 2 additional staff member(s)",
  },
  {
    priority: "MEDIUM",
    subject: "Computer Science",
    course: "B.Sc. Computer Science",
    current: 2,
    required: 3,
    action: "Recruit",
    notes: "Recruit 1 additional staff member(s)",
  },
  {
    priority: "MEDIUM",
    subject: "Physics",
    course: "B.Sc. Physics",
    current: 1,
    required: 2,
    action: "Recruit",
    notes: "Recruit 1 additional staff member(s)",
  },
  {
    priority: "MEDIUM",
    subject: "History",
    course: "B.A. History",
    current: 1,
    required: 2,
    action: "Recruit",
    notes: "Recruit 1 additional staff member(s)",
  },
  {
    priority: "MEDIUM",
    subject: "Commerce",
    course: "B.Com",
    current: 3,
    required: 4,
    action: "Recruit",
    notes: "Recruit 1 additional staff member(s)",
  },
  {
    priority: "MEDIUM",
    subject: "Biotechnology",
    course: "B.Sc. Biotechnology",
    current: 1,
    required: 2,
    action: "Recruit",
    notes: "Recruit 1 additional staff member(s)",
  },
  {
    priority: "LOW",
    subject: "English",
    course: "B.A. English",
    current: 3,
    required: 2,
    action: "Redistribute",
    notes: "Consider redistributing 1 staff to understaffed subjects",
  },
];

/* ===================== BADGES ===================== */

const PriorityBadge = ({ level }: any) => {
  const map: any = {
    HIGH: { bg: "#fde2e1", color: "#dc2626" },
    MEDIUM: { bg: "#065f46",color: "white" },
    LOW: { bg: "#fff5d9", color: "#9a6700" },
  };

  return (
    <Box
      sx={{
        px: 1.5,
        py: 0.4,
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 700,
        display: "inline-flex",
        alignItems: "center",
        bgcolor: map[level].bg,
        color: map[level].color,
      }}
    >
      {level}
    </Box>
  );
};

const ActionBadge = ({ action }: any) => {
  const isRecruit = action === "Recruit";

  return (
    <Box
      sx={{
        px: 1.5,
        py: 0.4,
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 700,
        display: "inline-flex",
        alignItems: "center",
        bgcolor: isRecruit ? "#065f46" : "#fff5d9",
        color: isRecruit ? "white" : "#9a6700",
      }}
    >
      {action}
    </Box>
  );
};

/* ===================== MAIN COMPONENT ===================== */

export default function RecommendationsTab() {
  return (
    <Card sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography fontWeight={700} fontSize={20} mb={1}>
          Staff Recommendations
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Recommended actions to address staffing gaps
        </Typography>

        <Box sx={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={tableHeaderStyle}>
                <th style={th}>Priority</th>
                <th style={th}>Subject</th>
                <th style={th}>Course</th>
                <th style={th}>Current Staff</th>
                <th style={th}>Required Staff</th>
                <th style={th}>Action</th>
                <th style={th}>Notes</th>
              </tr>
            </thead>

            <tbody>
              {RECOMMENDATIONS.map((row, i) => (
                <tr
                  key={i}
                  style={trStyle}
                >
                  <td style={td}>
                    <PriorityBadge level={row.priority} />
                  </td>
                  <td style={td}>{row.subject}</td>
                  <td style={td}>{row.course}</td>
                  <td style={td}>{row.current}</td>
                  <td style={td}>{row.required}</td>
                  <td style={td}>
                    <ActionBadge action={row.action} />
                  </td>
                  <td style={td}>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </CardContent>
    </Card>
  );
}

/* ===================== STYLES ===================== */

const tableHeaderStyle: any = {
  background: "#f8fafc",
  height: "50px",
};

const th: any = {
  padding: "12px",
  textAlign: "left",
  fontWeight: 600,
  fontSize: 14,
  color: "#444",
  whiteSpace: "nowrap",
};

const td: any = {
  padding: "12px",
  borderBottom: "1px solid #eee",
  fontSize: 14,
  verticalAlign: "middle",
};

const trStyle: any = {
  height: "56px",
  cursor: "pointer",
  transition: "0.2s",
  borderBottom: "1px solid #eee",
  background: "#fff",
};
