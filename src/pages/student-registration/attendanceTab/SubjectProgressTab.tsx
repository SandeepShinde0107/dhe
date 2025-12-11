// src/components/SubjectProgress.tsx
import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

type Props = {
  code: string;
  name: string;
  attended: number;
  total: number;
  barColor?: string; 
};

export default function SubjectProgress({ code, name, attended, total, barColor = "#045f5f" }: Props) {
  const percent = Math.round((attended / Math.max(total, 1)) * 100);

  return (
    <Box mb={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Box>
          <Typography fontWeight={700}>{name}</Typography>
          <Typography color="text.secondary" fontSize="0.85rem">{code}</Typography>
        </Box>

        <Box textAlign="right">
          <Typography fontWeight={700} color={percent < 90 ? "success.main" : "success.main"}>{percent}%</Typography>
          <Typography color="text.secondary" fontSize="0.85rem">{attended}/{total} classes</Typography>
        </Box>
      </Box>

      <LinearProgress
        variant="determinate"
        value={percent}
        sx={{
          height: 8,
          borderRadius: 2,
          backgroundColor: "#f1f5f6",
          "& .MuiLinearProgress-bar": {
            borderRadius: 2,
            backgroundColor: barColor,
          },
        }}
      />
    </Box>
  );
}
