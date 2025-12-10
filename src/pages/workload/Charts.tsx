const SUBJECT_DATA = [
  {
    subject: "Computer Science",
    theory: 48,
    practical: 36,
    required: 3,
    available: 2,
    status: "vacancy",
  },
  {
    subject: "Mathematics",
    theory: 50,
    practical: 0,
    required: 2,
    available: 2,
    status: "ok",
  },
  {
    subject: "Physics",
    theory: 25,
    practical: 26,
    required: 2,
    available: 1,
    status: "vacancy",
  },
  {
    subject: "Chemistry",
    theory: 25,
    practical: 26,
    required: 2,
    available: 2,
    status: "ok",
  },
  {
    subject: "English",
    theory: 60,
    practical: 0,
    required: 2,
    available: 3,
    status: "surplus",
  },
  {
    subject: "History",
    theory: 40,
    practical: 0,
    required: 2,
    available: 1,
    status: "vacancy",
  },
  {
    subject: "Economics",
    theory: 40,
    practical: 0,
    required: 2,
    available: 2,
    status: "ok",
  },
  {
    subject: "Commerce",
    theory: 80,
    practical: 16,
    required: 4,
    available: 3,
    status: "vacancy",
  },
  {
    subject: "Information Tech",
    theory: 48,
    practical: 65,
    required: 4,
    available: 2,
    status: "vacancy",
  },
  {
    subject: "Biotechnology",
    theory: 12,
    practical: 32,
    required: 2,
    available: 1,
    status: "vacancy",
  },
];


const STAFF_STATUS_COUNTS = {
  vacancy: SUBJECT_DATA.filter(s => s.status === "vacancy").length,
  surplus: SUBJECT_DATA.filter(s => s.status === "surplus").length,
  ok: SUBJECT_DATA.filter(s => s.status === "ok").length,
};

import {
    Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Cell,
  CartesianGrid
} from "recharts";

export default function ChartsTab() {
  return (
    <Grid container spacing={3}>
      <Grid size={{xs:12}}>
        <Card sx={{ borderRadius: 2 }}>
          <CardContent>
            <Typography fontWeight={700} mb={1}>
              Workload Distribution by Subject
            </Typography>

            <Box sx={{ height: 350 }}>
              <ResponsiveContainer>
                <BarChart data={SUBJECT_DATA}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" angle={-30} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="theory" name="Theory Workload" fill="#2563eb" />
                  <Bar dataKey="practical" name="Practical Workload" fill="#16a34a" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{xs:12,md:6}}>
        <Card sx={{ borderRadius: 2 }}>
          <CardContent>
            <Typography fontWeight={700} mb={1}>
              Staff Requirement vs Availability
            </Typography>

            <Box sx={{ height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={SUBJECT_DATA}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" angle={-30} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="required" name="Required Staff" fill="#f59e0b" />
                  <Bar dataKey="available" name="Available Staff" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{xs:12,md:6}}>
        <Card sx={{ borderRadius: 2 }}>
          <CardContent>
            <Typography fontWeight={700} mb={1}>
              Staffing Status Distribution
            </Typography>

            <Box sx={{ height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={[
                      { name: `With Vacancy: ${STAFF_STATUS_COUNTS.vacancy}`, value: STAFF_STATUS_COUNTS.vacancy },
                      { name: `Adequate: ${STAFF_STATUS_COUNTS.ok}`, value: STAFF_STATUS_COUNTS.ok },
                      { name: `Surplus: ${STAFF_STATUS_COUNTS.surplus}`, value: STAFF_STATUS_COUNTS.surplus },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                  >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#16a34a" />
                    <Cell fill="#f59e0b" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
