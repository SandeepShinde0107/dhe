import React from "react";
import { Card, Box, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

type KpiCardProps = {
  title: string;
  value: number | string;
  delta?: string;
  deltaPositive?: boolean;
  subtitle?: string;
  icon?: React.ReactNode;
};

const defaultIcons = {
  doc: <DescriptionOutlinedIcon fontSize="small" />,
  clock: <AccessTimeOutlinedIcon fontSize="small" />,
  tick: <CheckCircleOutlineIcon fontSize="small" />,
  info: <InfoOutlinedIcon fontSize="small" />,
};

export default function KpiCard({
  title,
  value,
  delta,
  deltaPositive = true,
  subtitle,
  icon,
}: KpiCardProps) {
  const shapes = [28, 36, 46, 26];

  return (
    <Card
      elevation={1}
      sx={{
        width:"85%",
        p: 2,
        borderRadius: 2,
        minHeight: 150,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 2px 6px rgba(18, 52, 71, 0.04)",

        "&:hover": {
          boxShadow: "0 6px 18px rgba(18, 52, 71, 0.12)",
          cursor: "pointer",
          backgroundColor: "#ffffff",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="caption" color="text.secondary">
          {title}
        </Typography>

        <Box sx={{ color: "text.secondary", opacity: 0.9 }}>
          {icon ?? defaultIcons.doc}
        </Box>
      </Box>

      <Box sx={{ mt: 1 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, lineHeight: "1.1", mb: 0.5 }}
        >
          {value}
        </Typography>

        {delta && (
          <Typography
            variant="body2"
            sx={{
              color: deltaPositive ? "success.main" : "text.secondary",
              fontWeight: 600,
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 0.6,
              mb: 1,
            }}
          >
            <span style={{ fontSize: 12 }}>
              {deltaPositive ? "▲" : "—"}
            </span>
            {delta}
          </Typography>
        )}

        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Box sx={{ width: 36, height: 6, bgcolor: "#eef4f5", borderRadius: 1 }} />

        <Box sx={{ display: "flex", gap: 1 }}>
          {shapes.map((w, idx) => (
            <Box
              key={idx}
              sx={{
                width: `${w}px`,
                height: 12,
                bgcolor: "#e6efef",
                borderRadius: 3,
                opacity: 0.85,
                boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.6)",
                transform: idx === shapes.length - 1 ? "translateY(2px)" : "none",
              }}
            />
          ))}
        </Box>
      </Box>
    </Card>
  );
}
