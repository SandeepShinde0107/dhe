// src/pages/AttendancePage.tsx
import React, { useMemo, useState } from "react";
import { Box, Card, Typography, Grid, Chip } from "@mui/material";
import SubjectProgress from "./SubjectProgressTab";
import AttendanceHistory from "./AttendanceHistory";
import { subjectSummary, attendanceHistory } from "../../../data/attendanceData";
import type { SubjectKey } from "../../../data/attendanceData";

export default function AttendancePage() {
  const [selected, setSelected] = useState<"All" | SubjectKey>("All");
  const summaryList = useMemo(() => {
    if (selected === "All") {
      return Object.entries(subjectSummary).map(([k, v]) => ({ key: k as SubjectKey, ...v }));
    }
    return [{ key: selected, ...(subjectSummary[selected]) }];
  }, [selected]);

  const overall = useMemo(() => {
    if (selected === "All") {
      const totals = Object.values(subjectSummary).reduce(
        (acc, s) => {
          acc.attended += s.attended;
          acc.total += s.total;
          return acc;
        },
        { attended: 0, total: 0 }
      );
      return {
        percent: Math.round((totals.attended / Math.max(totals.total, 1)) * 100),
        attended: totals.attended,
        total: totals.total
      };
    } else {
      const s = subjectSummary[selected];
      return {
        percent: Math.round((s.attended / Math.max(s.total, 1)) * 100),
        attended: s.attended,
        total: s.total
      };
    }
  }, [selected]);

  const barColorFor = (pct: number) =>
    pct >= 90 ? "#045f5f" : pct >= 85 ? "#d9a406" : "#ef4444";

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={600}>Attendance Tracking</Typography>
      <Typography color="text.secondary" mb={3}>
        B.Sc. Computer Science - Year 2, Semester 3
      </Typography>

      <Card sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={600}>Overall Attendance</Typography>
        <Typography color="text.secondary" mb={2}>
          Your attendance summary across all subjects
        </Typography>

        <Grid container alignItems="center">
          <Grid size={{ xs:8}} >
            <Typography fontSize="2rem" fontWeight={700}>
              {overall.percent}%
            </Typography>
            <Typography color="text.secondary">
              {overall.attended} out of {overall.total} classes
            </Typography>
          </Grid>

          <Grid size={{ xs:4}} textAlign="right">
            <Chip
              label="Good Standing"
              sx={{
                bgcolor: "#10b981",
                color: "white",
                fontWeight: 700
              }}
            />
          </Grid>
          <Grid size={{ xs:12}}  mt={2}>
            <Box sx={{ height: 10, bgcolor: "#f1f5f6", borderRadius: 5, width: "100%" }}>
              <Box
                sx={{
                  height: 10,
                  borderRadius: 5,
                  width: `${overall.percent}%`,
                  bgcolor: barColorFor(overall.percent)
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ p: 3, borderRadius: 3, mt: 3 }}>
        <Typography variant="h6" fontWeight={600}>Subject-wise Attendance</Typography>
        <Typography color="text.secondary" mb={2}>
          Attendance breakdown by subject
        </Typography>

        {summaryList.map((s) => {
          const pct = Math.round((s.attended / Math.max(s.total, 1)) * 100);
          return (
            <SubjectProgress
              key={s.key}
              code={s.key}
              name={s.name}
              attended={s.attended}
              total={s.total}
              barColor={barColorFor(pct)}
            />
          );
        })}
      </Card>
      <AttendanceHistory
        selected={selected}
        setSelected={setSelected}
        history={attendanceHistory}
      />
    </Box>
  );
}
