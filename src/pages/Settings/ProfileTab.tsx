import React from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Chip,
  Divider,
  Button,
} from "@mui/material";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";

export default function ProfileTab() {
  const fieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      height: 48,
    },
  };

  const labelStyle = {
    fontWeight: 600,
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
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          User Profile
        </Typography>

        <Chip
          label="CITIZEN"
          sx={{
            bgcolor: "#e7c77633",
            color: "#947100",
            fontWeight: 700,
          }}
        />
      </Box>

      <Typography color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>
        Update your personal information and contact details
      </Typography>
      <Typography sx={labelStyle}>Username</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <AccountCircleOutlinedIcon sx={{ color: "grey.600" }} />
        <TextField fullWidth value="23" disabled sx={fieldStyle} />
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
        Username cannot be changed
      </Typography>
      <Typography sx={labelStyle}>Full Name</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <AccountCircleOutlinedIcon sx={{ color: "grey.600" }} />
        <TextField fullWidth value="Dr. Rajesh Kumar" sx={fieldStyle} />
      </Box>
      <Typography sx={labelStyle}>Email Address *</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <EmailOutlinedIcon sx={{ color: "grey.600" }} />
        <TextField fullWidth value="admin@dhe.gov.in" sx={fieldStyle} />
      </Box>
      <Typography sx={labelStyle}>Mobile Number *</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <PhoneIphoneOutlinedIcon sx={{ color: "grey.600" }} />
        <TextField fullWidth value="+91 9876543210" sx={fieldStyle} />
      </Box>
      <Typography sx={labelStyle}>Alternate Phone</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <PhoneIphoneOutlinedIcon sx={{ color: "grey.600" }} />
        <TextField fullWidth value="+91 9876543211" sx={fieldStyle} />
      </Box>
      <Typography sx={labelStyle}>Designation</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <BusinessCenterOutlinedIcon sx={{ color: "grey.600" }} />
        <TextField fullWidth value="Principal" sx={fieldStyle} />
      </Box>
      <Typography sx={labelStyle}>Department</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <BusinessCenterOutlinedIcon sx={{ color: "grey.600" }} />
        <TextField fullWidth value="Administration" sx={fieldStyle} />
      </Box>
      <Divider sx={{ my: 4 }} />

      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" sx={{ borderRadius: 2 }} disabled>
          Reset
        </Button>

        <Button
          variant="contained"
          disabled                                              
          sx={{
            bgcolor: "#0f5f63",
            borderRadius: 2,
            px: 3,
            "&:hover": { bgcolor: "#11686dff" },
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Paper>
  );
}
