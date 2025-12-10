import { Card, Box, Typography } from "@mui/material";

const DETAILED_DATA = [
  {
    subject: "Computer Science",
    course: "B.Sc. Computer Science",
    students: 180,
    total: "84 hrs",
    required: 3,
    available: 2,
    status: { label: "1", type: "vacancy" },
  },
  {
    subject: "Mathematics",
    course: "B.Sc. Mathematics",
    students: 120,
    total: "50 hrs",
    required: 2,
    available: 2,
    status: { label: "Adequate", type: "ok" },
  },
  {
    subject: "Physics",
    course: "B.Sc. Physics",
    students: 90,
    total: "51 hrs",
    required: 2,
    available: 1,
    status: { label: "1", type: "vacancy" },
  },
  {
    subject: "Chemistry",
    course: "B.Sc. Chemistry",
    students: 75,
    total: "51 hrs",
    required: 2,
    available: 2,
    status: { label: "Adequate", type: "ok" },
  },
  {
    subject: "English",
    course: "B.A. English",
    students: 150,
    total: "60 hrs",
    required: 2,
    available: 3,
    status: { label: "1 Surplus", type: "surplus" },
  },
  {
    subject: "History",
    course: "B.A. History",
    students: 100,
    total: "40 hrs",
    required: 2,
    available: 1,
    status: { label: "1", type: "vacancy" },
  },
  {
    subject: "Economics",
    course: "B.A. Economics",
    students: 110,
    total: "40 hrs",
    required: 2,
    available: 2,
    status: { label: "Adequate", type: "ok" },
  },
  {
    subject: "Commerce",
    course: "B.Com",
    students: 200,
    total: "96 hrs",
    required: 4,
    available: 3,
    status: { label: "1", type: "vacancy" },
  },
  {
    subject: "Information Technology",
    course: "B.Sc. IT",
    students: 160,
    total: "102 hrs",
    required: 4,
    available: 2,
    status: { label: "2", type: "vacancy" },
  },
  {
    subject: "Biotechnology",
    course: "B.Sc. Biotechnology",
    students: 60,
    total: "44 hrs",
    required: 2,
    available: 1,
    status: { label: "1", type: "vacancy" },
  },
];

const StatusBadge = ({ status }: any) => {
  const styles: any = {
    ok: {
      bgcolor: "#d4f3e5",
      color: "#006b52",
    },
    vacancy: {
      bgcolor: "#fde2e1",
      color: "#cc1f1a",
    },
    surplus: {
      bgcolor: "#fff1c7",
      color: "#9a6700",
    },
  };

  return (
    <Box
      sx={{
        px: 1.2,
        py: 0.3,
        borderRadius: 20,
        fontSize: 13,
        fontWeight: 600,
        display: "inline-flex",
        gap: 0.5,
        alignItems: "center",
        ...(styles[status.type]),
      }}
    >
      {status.type === "vacancy" && <>⚠</>}
      {status.type === "surplus" && <>↗</>}
      {status.label === "Adequate" ? status.label : ` ${status.label}`}
    </Box>
  );
};

export default function DetailedViewTable() {
  return (
    <Card sx={{ borderRadius: 2, p: 3 }}>
      <Typography variant="h6" fontWeight={700} mb={0.5}>
        Subject-wise Workload Distribution
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Detailed breakdown of workload for each subject
      </Typography>

      <Box sx={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb", textAlign: "left" }}>
              <th style={{ padding: "12px" }}>Subject</th>
              <th style={{ padding: "12px" }}>Course</th>
              <th style={{ padding: "12px" }}>Students</th>
              <th style={{ padding: "12px" }}>Total Workload</th>
              <th style={{ padding: "12px" }}>Required</th>
              <th style={{ padding: "12px" }}>Available</th>
              <th style={{ padding: "12px" }}>Vacancy</th>
            </tr>
          </thead>

          <tbody>
            {DETAILED_DATA.map((row, i) => (
              <tr
                key={i}
                style={{
                  borderBottom: "1px solid #eee",
                  height: "56px",
                }}
              >
                <td style={{ padding: "12px", fontWeight: 600 }}>{row.subject}</td>
                <td style={{ padding: "12px" }}>{row.course}</td>
                <td style={{ padding: "12px" }}>{row.students}</td>
                <td style={{ padding: "12px" }}>{row.total}</td>
                <td style={{ padding: "12px" }}>{row.required}</td>
                <td style={{ padding: "12px" }}>{row.available}</td>
                <td style={{ padding: "12px" }}>
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Card>
  );
}
