// components/AnalyticsCard.tsx
import React from "react";
import { Card, Box, Typography, Grid } from "@mui/material";
import type { AnalyticsVariant } from "../config/DashboardConfig";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const USERS_BY_ROLE_DATA = [
  { role: "Institute Admin", count: 320 },
  { role: "JD Office", count: 40 },
  { role: "Director", count: 15 },
  { role: "Secretary", count: 8 },
  { role: "Investigation Officer", count: 25 },
  { role: "Citizen", count: 1100 },
];

const SYSTEM_PERF_DATA = [
  { day: "Mon", uptime: 100 },
  { day: "Tue", uptime: 100 },
  { day: "Wed", uptime: 100 },
  { day: "Thu", uptime: 100 },
  { day: "Fri", uptime: 100 },
  { day: "Sat", uptime: 100 },
  { day: "Sun", uptime: 100 },
];

type AnalyticsCardProps = {
  variant: AnalyticsVariant;
};

export default function AnalyticsCard(_props: AnalyticsCardProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={{xs:12, md:6}}>
        <Card sx={{ p: 2.5, borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
            Users by Role
          </Typography>

          <Box sx={{ width: "95%", height: 260}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={USERS_BY_ROLE_DATA}> 
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="role" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      </Grid>

      {/* System Performance */}
      <Grid size={{xs:12, md:6}}>
        <Card sx={{ p: 2.5, borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
            System Performance
          </Typography>

          <Box sx={{ width: "95%", height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SYSTEM_PERF_DATA}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="uptime" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
