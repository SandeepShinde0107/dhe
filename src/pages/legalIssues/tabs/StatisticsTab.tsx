import React from "react";
import { Box, Card, Typography, Grid, Chip } from "@mui/material";

export default function StatisticsTab() {
  return (
    <Box>
      <Grid container spacing={2} mb={3}>
         <Grid size={{xs:12,md:3}}>
          <Card sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
            <Typography fontSize="2rem" fontWeight={700}>18</Typography>
            <Typography color="text.secondary">Total Cases</Typography>
          </Card>
        </Grid>

         <Grid size={{xs:12,md:3}}>
          <Card sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
            <Typography fontSize="2rem" fontWeight={700} color="#0b6b66">
              12
            </Typography>
            <Typography color="text.secondary">Active Cases</Typography>
          </Card>
        </Grid>

         <Grid size={{xs:12,md:3}}>
          <Card sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
            <Typography fontSize="2rem" fontWeight={700} color="#059669">
              5
            </Typography>
            <Typography color="text.secondary">Disposed Cases</Typography>
          </Card>
        </Grid>

         <Grid size={{xs:12,md:3}}>
          <Card sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
            <Typography fontSize="2rem" fontWeight={700} color="#d97706">
              8
            </Typography>
            <Typography color="text.secondary">Pending Hearings</Typography>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} mb={3}>
         <Grid size={{xs:12,md:6}}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={700} mb={1}>
              Clearance Rate
            </Typography>
            <Typography fontSize="2rem" fontWeight={700}>33.33%</Typography>
            <Typography color="text.secondary">
              Percentage of cases disposed vs total cases
            </Typography>
          </Card>
        </Grid>

         <Grid size={{xs:12,md:6}}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={700} mb={1}>
              Average Disposal Time
            </Typography>
            <Typography fontSize="2rem" fontWeight={700}>365 days</Typography>
            <Typography color="text.secondary">
              Average time to dispose a case
            </Typography>
          </Card>
        </Grid>
      </Grid>
      <Card sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Typography fontWeight={700} mb={2}>
          Dispositions Breakdown
        </Typography>

        <Grid container spacing={2} textAlign="center">
          <Grid size={{xs:3}}>
            <Typography fontSize="1.5rem" fontWeight={700}>3</Typography>
            <Typography color="text.secondary">Disposed</Typography>
          </Grid>
          <Grid size={{xs:3}}>
            <Typography fontSize="1.5rem" fontWeight={700}>1</Typography>
            <Typography color="text.secondary">Withdrawn</Typography>
          </Grid>
          <Grid size={{xs:3}}>
            <Typography fontSize="1.5rem" fontWeight={700}>1</Typography>
            <Typography color="text.secondary">Settled</Typography>
          </Grid>
          <Grid size={{xs:3}}>
            <Typography fontSize="1.5rem" fontWeight={700}>1</Typography>
            <Typography color="text.secondary">Dismissed</Typography>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Typography fontWeight={700} mb={2}>
          Caseload by Judge
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          {[
            { name: "Hon. Justice A.B. Sharma", count: 45 },
            { name: "Hon. Judge M.K. Deshmukh", count: 38 },
            { name: "Hon. Justice R.S. Kulkarni", count: 42 },
          ].map((j) => (
            <Box key={j.name} display="flex" justifyContent="space-between">
              <Typography>{j.name}</Typography>
              <Chip
                label={`${j.count} cases`}
                sx={{ bgcolor: "#065f46", color: "white" }}
              />
            </Box>
          ))}
        </Box>
      </Card>
      <Card sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Typography fontWeight={700} mb={2}>
          Cases by Type
        </Typography>

        <Grid container spacing={2} textAlign="center">
          {[
            ["Administrative", 6],
            ["Labor", 4],
            ["Civil", 3],
            ["Service", 2],
            ["Rti", 1],
            ["Criminal", 1],
            ["Constitutional", 1],
            ["Other", 0],
          ].map(([label, count]) => (
            <Grid size={{xs:3}} key={label}>
              <Typography fontSize="1.5rem" fontWeight={700}>
                {count}
              </Typography>
              <Typography color="text.secondary">{label}</Typography>
            </Grid>
          ))}
        </Grid>
      </Card>
      <Card sx={{ p: 3, borderRadius: 3 }}>
        <Typography fontWeight={700} mb={2}>
          Pending Case Age Distribution
        </Typography>

        <Grid container spacing={2} textAlign="center">
          <Grid size={{xs:3}}>
            <Typography fontSize="1.5rem" fontWeight={700}>5</Typography>
            <Typography color="text.secondary">&lt; 6 months</Typography>
          </Grid>
          <Grid size={{xs:3}}>
            <Typography fontSize="1.5rem" fontWeight={700}>3</Typography>
            <Typography color="text.secondary">6–12 months</Typography>
          </Grid>
          <Grid size={{xs:3}}>
            <Typography fontSize="1.5rem" fontWeight={700}>2</Typography>
            <Typography color="text.secondary">1–2 years</Typography>
          </Grid>
          <Grid size={{xs:3}}>
            <Typography fontSize="1.5rem" fontWeight={700} color="error">
              2
            </Typography>
            <Typography color="text.secondary">&gt; 2 years</Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
