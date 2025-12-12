import { Card, CardContent, Typography, Box } from "@mui/material";
import React from "react";

type StatCardProps = {
  title: string;
  approved: number;
  filled: number;
  vacant: number;
  showFillRate?: boolean;
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  approved,
  filled,
  vacant,
  showFillRate = true,
}) => {
  const fillRate =
    approved > 0 ? ((filled / approved) * 100).toFixed(1).replace(".0", "") : "0";

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "none",
        border: "1px solid #e5e7eb",
        bgcolor: "#ffffff",
        height: "100%",
      }}
    >
      <CardContent sx={{ px: 3, py: 2.5 }}>
        <Typography variant="subtitle1" fontWeight={700} mb={2}>
          {title}
        </Typography>

        <Box sx={{ display: "grid", rowGap: 0.75 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Approved:
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {approved}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              Filled:
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ color: "#16a34a" }}
            >
              {filled}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              Vacant:
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ color: "#dc2626" }} 
            >
              {vacant}
            </Typography>
          </Box>

          {showFillRate && (
            <Box mt={1}>
              <Typography variant="body2" color="text.secondary">
                Fill Rate:
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {fillRate}%
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
