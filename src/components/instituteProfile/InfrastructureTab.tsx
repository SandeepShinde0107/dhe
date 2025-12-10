// src/components/instituteProfile/InfrastructureTab.tsx
import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";

export const InfrastructureTab: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <ApartmentOutlinedIcon sx={{ mr: 1, color: "#0f6b73" }} />
        <Typography variant="h6" fontWeight={700}>
          Infrastructure Details
        </Typography>
      </Box>

      <Grid container spacing={4} mb={4}>
          <Grid size={{xs:12, md:6}}>
          <LabelValue label="Total Area" value="50 acres" />
        </Grid>
          <Grid size={{xs:12, md:6}}>
          <LabelValue label="Built-up Area" value="2,50,000 sq ft" />
        </Grid>
          <Grid size={{xs:12, md:6}}>
          <LabelValue label="Classrooms" value="45" />
        </Grid>
          <Grid size={{xs:12, md:6}}>
          <LabelValue label="Laboratories" value="25" />
        </Grid>
      </Grid>

      {/* Library */}
      <SectionTitle>Library</SectionTitle>
      <Grid container spacing={2.5} mb={4}>
          <Grid size={{xs:12, md:3}}>
          <SoftBox label="Books" value="50,000+" />
        </Grid>
          <Grid size={{xs:12, md:3}}>
          <SoftBox label="Journals" value="200+" />
        </Grid>
          <Grid size={{xs:12, md:3}}>
          <SoftBox label="Digital Resources" value="Yes" />
        </Grid>
  <Grid size={{xs:12, md:3}}>
          <SoftBox label="Reading Capacity" value="500" />
        </Grid>
      </Grid>

      {/* Hostel Facilities */}
      <SectionTitle>Hostel Facilities</SectionTitle>
      <Grid container spacing={2.5} mb={4}>
          <Grid size={{xs:12, md:6}}>
          <SoftBox label="Boys Hostel" value="Capacity: 500" fullWidth />
        </Grid>
         <Grid size={{xs:12, md:6}}>
          <SoftBox label="Girls Hostel" value="Capacity: 300" fullWidth />
        </Grid>
      </Grid>

      {/* Sports & Auditorium */}
      <Grid container spacing={4}>
          <Grid size={{xs:12, md:4}}>
          <SectionTitle>Sports Facilities</SectionTitle>
          <Typography variant="body1" fontWeight={500}>
            Cricket Ground, Basketball Court, Indoor Games
          </Typography>
        </Grid>
          <Grid size={{xs:12, md:4}}>
          <SectionTitle>Auditorium</SectionTitle>
          <Typography variant="body1" fontWeight={500}>
            Capacity: 1000
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography
    variant="subtitle1"
    fontWeight={700}
    sx={{ mb: 1.5 }}
  >
    {children}
  </Typography>
);

type LVProps = { label: string; value: string };

const LabelValue: React.FC<LVProps> = ({ label, value }) => (
  <Box sx={{ mb: 1 }}>
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ mb: 0.3, fontWeight: 500 }}
    >
      {label}
    </Typography>
    <Typography variant="body1" fontWeight={700}>
      {value}
    </Typography>
  </Box>
);

type SoftBoxProps = {
  label: string;
  value: string;
  fullWidth?: boolean;
};

const SoftBox: React.FC<SoftBoxProps> = ({ label, value, fullWidth }) => (
  <Card
    sx={{
      borderRadius: 2,
      boxShadow: "none",
      bgcolor: "#f6f7fb",
      border: "1px solid #edf0f5",
      width: fullWidth ? "100%" : "100%",
    }}
  >
    <CardContent sx={{ py: 2, px: 3 }}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 0.3, fontWeight: 500 }}
      >
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={700}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);
