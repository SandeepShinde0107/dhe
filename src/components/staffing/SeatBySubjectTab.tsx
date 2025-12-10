// components/staffing/SeatsBySubjectTab.tsx
import React, { useMemo } from "react";
import { Grid, Typography, Box } from "@mui/material";
import type { ApprovedSeatRow } from "../../types/staffingtypes";
import { StatCard } from "./StatCard";

type Props = {
  rows: ApprovedSeatRow[];
};

export const SeatsBySubjectTab: React.FC<Props> = ({ rows }) => {
  // group by subject
  const subjectStats = useMemo(() => {
    const map = new Map<
      string,
      { approved: number; filled: number; vacant: number }
    >();

    rows.forEach((r) => {
      const key = r.subject || "Unknown";
      const current = map.get(key) || { approved: 0, filled: 0, vacant: 0 };
      current.approved += r.approved;
      current.filled += r.filled;
      current.vacant += r.vacant;
      map.set(key, current);
    });

    return Array.from(map.entries()).map(([subject, stats]) => ({
      subject,
      ...stats,
    }));
  }, [rows]);

  if (!subjectStats.length) {
    return (
      <Box mt={3}>
        <Typography variant="body2" color="text.secondary">
          No records found for the selected filters.
        </Typography>
      </Box>
    );
  }

  return (
    <Box mt={2}>
      <Grid container spacing={2.5}>
        {subjectStats.map((item) => (
          <Grid key={item.subject} size={{xs:12, md:6, lg:4}}>
            <StatCard
              title={item.subject}
              approved={item.approved}
              filled={item.filled}
              vacant={item.vacant}
              showFillRate
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
