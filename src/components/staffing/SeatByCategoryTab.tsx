import React, { useMemo } from "react";
import { Grid, Box, Typography } from "@mui/material";
import type { ApprovedSeatRow } from "../../types/staffingtypes";
import { StatCard } from "./StatCard";

type Props = {
  rows: ApprovedSeatRow[];
};

export const SeatsByCategoryTab: React.FC<Props> = ({ rows }) => {
  const categoryStats = useMemo(() => {
    const map = new Map<
      string,
      { approved: number; filled: number; vacant: number }
    >();

    rows.forEach((r) => {
      const key = r.category || "Unspecified";
      const current = map.get(key) || { approved: 0, filled: 0, vacant: 0 };
      current.approved += r.approved;
      current.filled += r.filled;
      current.vacant += r.vacant;
      map.set(key, current);
    });

    const order = ["GENERAL", "OBC", "SC", "ST", "EBC", "VJNT", "NT", "SBC"];

    return Array.from(map.entries())
      .map(([category, stats]) => ({ category, ...stats }))
      .sort((a, b) => {
        const ai = order.indexOf(a.category);
        const bi = order.indexOf(b.category);
        if (ai === -1 && bi === -1) return a.category.localeCompare(b.category);
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
      });
  }, [rows]);

  if (!categoryStats.length) {
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
        {categoryStats.map((item) => (
          <Grid key={item.category} size={{xs:12, md:6, lg:3}}>
            <StatCard
              title={item.category}
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
