import React from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
} from "@mui/material";

import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import BrightnessLowOutlinedIcon from "@mui/icons-material/BrightnessLowOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

export default function PreferencesTab() {
  const fieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      height: 48,
    },
  };

  const labelStyle = {
    fontWeight: 700,
    mb: 0.5,
    mt: 3,
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.04)",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Preferences
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>
        Configure your language, theme, and display preferences
      </Typography>
      <Typography sx={labelStyle}>Language</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <LanguageOutlinedIcon sx={{ color: "grey.600" }} />
        <TextField fullWidth value="English" sx={fieldStyle} />
      </Box>

      <Typography variant="caption" color="text.secondary">
        Choose your preferred language for the interface
      </Typography>

      <Typography sx={labelStyle}>Theme</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <BrightnessLowOutlinedIcon sx={{ color: "grey.600" }} />
        <TextField fullWidth value="Light" sx={fieldStyle} />
      </Box>

      <Typography variant="caption" color="text.secondary">
        Choose your preferred color theme
      </Typography>

      <Typography sx={labelStyle}>Date Format</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CalendarTodayOutlinedIcon sx={{ color: "grey.600" }} />
        <TextField
          fullWidth
          value="DD/MM/YYYY (31/12/2024)"
          sx={fieldStyle}
        />
      </Box>

      <Typography variant="caption" color="text.secondary">
        Choose how dates are displayed throughout the application
      </Typography>

      <Typography sx={labelStyle}>Time Format</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <AccessTimeOutlinedIcon sx={{ color: "grey.600" }} />
        <TextField fullWidth value="24-hour (14:20)" sx={fieldStyle} />
      </Box>

      <Typography variant="caption" color="text.secondary">
        Choose how time is displayed across the system
      </Typography>
    </Paper>
  );
}
