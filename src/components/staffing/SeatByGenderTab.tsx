import React, { useMemo } from "react";
import { Grid, Box, Typography } from "@mui/material";
import type{ ApprovedSeatRow } from "../../types/staffingtypes";
import { StatCard } from "./StatCard";

type Props = {
  rows: ApprovedSeatRow[];
};

export const SeatsByGenderTab: React.FC<Props> = ({ rows }) => {
  const genderStats = useMemo(() => {
    const map = new Map<
      string,
      { approved: number; filled: number; vacant: number }
    >();

    rows.forEach((r) => {
      const key = r.gender || "Other";
      const current = map.get(key) || { approved: 0, filled: 0, vacant: 0 };
      current.approved += r.approved;
      current.filled += r.filled;
      current.vacant += r.vacant;
      map.set(key, current);
    });

    const preferredOrder = ["Male", "Female", "Other"];

    return Array.from(map.entries())
      .map(([gender, stats]) => ({ gender, ...stats }))
      .sort((a, b) => {
        const ai = preferredOrder.indexOf(a.gender);
        const bi = preferredOrder.indexOf(b.gender);
        if (ai === -1 && bi === -1) return a.gender.localeCompare(b.gender);
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
      });
  }, [rows]);

  if (!genderStats.length) {
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
        {genderStats.map((item) => (
          <Grid key={item.gender} size={{xs:12, md:6, lg:4}}>
            <StatCard
              title={item.gender}
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
