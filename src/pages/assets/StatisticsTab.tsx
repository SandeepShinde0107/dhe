// StatisticsTab.tsx
import React from "react";
import {
  Box,
  Card,
  Grid,
  Typography,
  Divider,
  Stack,
  Paper,
} from "@mui/material";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

type StatsProps = {
  total?: number;
  allocated?: number;
  available?: number;
  totalCurrentValue?: number;
  accumulatedDepreciation?: number;
  originalPurchaseValue?: number;
  byType?: { type: string; allocated: number; available: number }[];
  byDept?: { dept: string; allocated: number; available: number }[];
};

const COLORS = {
  allocated: "#10b981", 
  available: "#6b7280", 
};

const DEFAULT: Required<StatsProps> = {
  total: 60,
  allocated: 16,
  available: 44,
  totalCurrentValue: 4471348,
  accumulatedDepreciation: 4708652,
  originalPurchaseValue: 9180000,
  byType: [
    { type: "computer", allocated: 12, available: 3 },
    { type: "laboratory", allocated: 0, available: 12 },
    { type: "furniture", allocated: 4, available: 11 },
    { type: "vehicle", allocated: 0, available: 3 },
    { type: "library", allocated: 0, available: 5 },
    { type: "sports", allocated: 0, available: 5 },
    { type: "other", allocated: 0, available: 5 },
  ],
  byDept: [
    { dept: "Computer Science", allocated: 12, available: 3 },
    { dept: "Physics", allocated: 0, available: 4 },
    { dept: "Chemistry", allocated: 0, available: 4 },
    { dept: "Biology", allocated: 0, available: 4 },
    { dept: "Administration", allocated: 0, available: 6 },
    { dept: "Academic", allocated: 4, available: 7 },
    { dept: "Transport", allocated: 0, available: 3 },
    { dept: "Library", allocated: 0, available: 5 },
    { dept: "Physical Education", allocated: 0, available: 5 },
    { dept: "Facilities", allocated: 0, available: 3 },
  ],
};

function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export default function StatisticsTab(props: StatsProps = {}) {
  const data = { ...DEFAULT, ...props };

  const pieData = [
    { name: "Allocated", value: data.allocated },
    { name: "Available", value: data.available },
  ];
  const typeChart = (data.byType || DEFAULT.byType).map((d) => ({
    name: d.type,
    Allocated: d.allocated,
    Available: d.available,
  }));

  const deptChart = (data.byDept || DEFAULT.byDept).map((d) => ({
    name: d.dept,
    Allocated: d.allocated,
    Available: d.available,
  }));

  return (
    <Box>

      <Grid container spacing={2} mb={3}>
       <Grid size={{xs:12,md:7}}>
          <Card sx={{ p: 3, minHeight: 370 }}>
            <Typography variant="h6" mb={1}>
              Asset Utilization
            </Typography>
            <Typography color="text.secondary" mb={2}>
              Overall allocation status
            </Typography>

            <Box display="flex" alignItems="center" justifyContent="center" height={210}>
              <ResponsiveContainer width="60%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={2}
                    labelLine={false}
                  >
                    <Cell key="c1" fill={COLORS.allocated} />
                    <Cell key="c2" fill={COLORS.available} />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <Box ml={3}>
                <Typography color="success.main" fontWeight={700}>
                  Allocated: {data.allocated} ({data.total ? Math.round((data.allocated / data.total) * 100) : 0}%)
                </Typography>
                <Typography color="text.secondary" mt={2}>
                  Available: {data.available} ({data.total ? Math.round((data.available / data.total) * 100) : 0}%)
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

       <Grid size={{xs:12 ,md:5}}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" mb={1}>
              Depreciation Summary
            </Typography>
            <Typography color="text.secondary" mb={2}>
              Asset value depreciation
            </Typography>

            <Stack spacing={2}>
              <Paper variant="outlined" sx={{ p: 2, bgcolor: "#f3f6f6" }}>
                <Typography variant="caption" color="text.secondary">
                  Total Current Value
                </Typography>
                <Typography fontSize="1.3rem" fontWeight={700} color="success.main">
                  {formatINR(Number(data.totalCurrentValue))}
                </Typography>
              </Paper>

              <Paper variant="outlined" sx={{ p: 2, bgcolor: "#fff7f7" }}>
                <Typography variant="caption" color="text.secondary">
                  Accumulated Depreciation
                </Typography>
                <Typography fontSize="1.3rem" fontWeight={700} color="error.main">
                  {formatINR(Number(data.accumulatedDepreciation))}
                </Typography>
              </Paper>

              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Original Purchase Value
                </Typography>
                <Typography fontSize="1.1rem" fontWeight={700}>
                  {formatINR(Number(data.originalPurchaseValue))}
                </Typography>
              </Paper>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
       <Grid size={{xs:12 }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" mb={1}>
              Asset Distribution by Type
            </Typography>
            <Typography color="text.secondary" mb={2}>
              Allocation status across asset types
            </Typography>

            <Box height={320}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={typeChart} margin={{ left: 20 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Allocated" fill={COLORS.allocated} />
                  <Bar dataKey="Available" fill={COLORS.available} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

       <Grid size={{xs:12 }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" mb={1}>
              Asset Distribution by Department
            </Typography>
            <Typography color="text.secondary" mb={2}>
              Top departments by asset count
            </Typography>

            <Box height={320}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptChart} margin={{ left: 20 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Allocated" fill={COLORS.allocated} />
                  <Bar dataKey="Available" fill={COLORS.available} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
