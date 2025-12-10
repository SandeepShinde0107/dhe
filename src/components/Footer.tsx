import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 4,
        display:"flex",
        justifyContent:"space-between",
        color: "text.secondary",
        bgcolor:"white",
        pb: 2,
      }}
    >
      <Typography sx={{ fontSize: "14px", mb: 2,pl:4 }}>
        © 2025 Department of Higher Education, Maharashtra. All rights reserved.
      </Typography>

      <Typography
        sx={{
          fontSize: "14px",
          display: "flex",
          justifyContent: "center",
          gap: 3,
          cursor: "pointer",
        }}
      >
        <span>About</span>
        <span>Help</span>
        <span>Privacy Policy</span>
        <span>Terms of Service</span>
      </Typography>
    </Box>
  );
}
