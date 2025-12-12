import React from "react";
import { Card, Box, Typography, Grid, Chip } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import type { AttendanceRecord, SubjectKey } from "../../../data/attendanceData";

type Props = {
  selected: "All" | SubjectKey;
  setSelected: (s: "All" | SubjectKey) => void;
  history: Record<string, AttendanceRecord[]>;
};

export default function AttendanceHistory({ selected, setSelected, history }: Props) {
  const subjectsTabs: Array<"All" | SubjectKey> = ["All", "CS301", "CS302", "CS303", "CS304", "CS305"];
  const rows = history[selected] || [];

  return (
    <Card sx={{ p: 3, borderRadius: 3, mt: 4 }}>
      <Typography variant="h6" fontWeight={600}>Attendance History</Typography>
      <Typography color="text.secondary" mb={2}>Detailed attendance records</Typography>
      <Box display="flex" gap={1} mb={3}>
        {subjectsTabs.map((s) => {
          const active = s === selected;
          return (
            <Box
              key={s}
              onClick={() => setSelected(s)}
              sx={{
                px: 2,
                py: 1,
                borderRadius: 2,
                cursor: "pointer",
                bgcolor: active ? "#fff" : "#f7f9fa",
                border: active ? "1px solid #e5e7eb" : "1px solid transparent",
                fontWeight: 600,
              }}
            >
              {s}
            </Box>
          );
        })}
      </Box>
      <Grid container sx={{ fontWeight: 600, mb: 1 }}>
        <Grid size={{xs:2}}>Date</Grid>
        <Grid size={{xs:4}}>Subject</Grid>
        <Grid size={{xs:2}}>Type</Grid>
        <Grid size={{xs:2}}>Faculty</Grid>
        <Grid size={{xs:2}}>Status</Grid>
      </Grid>

      {rows.map((r, i) => (
        <Grid key={i} container alignItems="center" sx={{ borderTop: "1px solid #eee", py: 2 }}>
          <Grid size={{xs:2}} display="flex" alignItems="center" gap={1}>
            <CalendarMonthOutlinedIcon fontSize="small" />
            <Typography>{new Date(r.date).toLocaleDateString()}</Typography>
          </Grid>

          <Grid size={{xs:4}}>
            <Typography fontWeight={600}>{r.subjectName}</Typography>
            <Typography color="text.secondary" fontSize="0.85rem">{r.subjectKey}</Typography>
          </Grid>

          <Grid size={{xs:2}}>
            <Chip label={r.type} variant="outlined" size="small" />
          </Grid>

          <Grid size={{xs:2}}>
            <Typography>{r.faculty}</Typography>
          </Grid>

          <Grid size={{xs:2}}>
            <Chip
              label={r.status}
              size="small"
              sx={{
                bgcolor: r.status === "Present" ? "#10b981" : r.status === "Absent" ? "#ef4444" : "#ef4444",
                color: "white",
                fontWeight: 600,
              }}
            />
          </Grid>
        </Grid>
      ))}

      {rows.length === 0 && (
        <Typography color="text.secondary" textAlign="center" py={6}>No records</Typography>
      )}
    </Card>
  );
}
