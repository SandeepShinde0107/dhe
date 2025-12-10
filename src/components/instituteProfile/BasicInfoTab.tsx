// src/components/instituteProfile/BasicInfoTab.tsx
import React from "react";
import { Box, Grid, Typography, Chip } from "@mui/material";

export const BasicInfoTab: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={700} mb={0.5}>
        Basic Information
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Institute registration and approval details
      </Typography>

      <Grid container spacing={4}>
        {/* Left column */}
         <Grid size={{xs:12, md:6}}>
          <InfoRow
            label="Institute Name"
            value="Maharashtra Institute of Technology"
          />
          <InfoRow label="Type" value="Engineering College" />
          <InfoRow label="Established Year" value="2010" />
          <InfoRow
            label="AICTE Approval Number"
            value="AICTE/2010/MIT/001"
          />
          <InfoRow label="Accreditation" value="NAAC A+ Grade" />
        </Grid>

        {/* Right column */}
          <Grid size={{xs:12, md:6}}>
          <InfoRow label="Institute Code" value="MIT-2024-001" />
          <InfoRow
            label="Status"
            value={
              <Chip
                label="Approved"
                size="small"
                sx={{ bgcolor: "#e5f3f4", color: "#0f6b73", fontWeight: 600 }}
              />
            }
          />
          <InfoRow label="Affiliated To" value="University of Mumbai" />
          <InfoRow label="Registration Date" value="2024-01-15" />
          <InfoRow label="NIRF Ranking" value="NIRF Rank: 150" />
        </Grid>
      </Grid>
    </Box>
  );
};

type InfoRowProps = {
  label: string;
  value: React.ReactNode;
};

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <Box sx={{ mb: 2.5 }}>
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ mb: 0.5, fontWeight: 500 }}
    >
      {label}
    </Typography>
    <Typography variant="body1" fontWeight={600}>
      {value}
    </Typography>
  </Box>
);
