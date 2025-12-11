import {
  Box,
  Card,
  Typography,
  Grid,
  Chip,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

export default function ResultsTab() {
  const student = {
    name: "Rahul Sharma",
    roll: "2024-PU1001-CS-0001",
    course: "B.Tech Computer Science - Semester 4",
    percentage: 80.6,
    sgpa: 8.5,
    cgpa: 8.5,
    totalMarks: "403/500",
    rank: 5,
  };

  const subjects = [
    { code: "CS101", name: "Data Structures", credits: 4, marks: "78/100", grade: "A", gp: 8.5, status: "pass" },
    { code: "CS102", name: "Database Management Systems", credits: 4, marks: "85/100", grade: "A+", gp: 9, status: "pass" },
    { code: "CS103", name: "Operating Systems", credits: 4, marks: "72/100", grade: "B+", gp: 7.5, status: "pass" },
    { code: "CS104", name: "Computer Networks", credits: 4, marks: "80/100", grade: "A", gp: 8, status: "pass" },
    { code: "CS105", name: "Software Engineering", credits: 4, marks: "88/100", grade: "A+", gp: 9.5, status: "pass" },
  ];

  const handleDownload = () => {
    alert("Mark Sheet downloaded successfully.");
  };

  return (
     <Card sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={1}>
        Examination Results
      </Typography>
      <Typography color="text.secondary" mb={3}>
        View your examination results and download mark sheets
      </Typography>

      <Card sx={{ p: 3, borderRadius: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography fontSize="1.4rem" fontWeight={700}>
              {student.name}
            </Typography>
            <Typography color="text.secondary">{student.roll}</Typography>
            <Typography color="text.secondary">{student.course}</Typography>
          </Box>

          <Chip
            label="PASS"
            sx={{
              bgcolor: "#065f46",
              color: "white",
              px: 3,
              py: 2,
              fontSize: "1rem",
              fontWeight: 700,
            }}
          />
        </Box>

        <Grid container spacing={2} mt={3}>
           <Grid size={{xs:4}}>
            <Card sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
              <Typography fontSize="1.6rem" fontWeight={700}>
                {student.percentage}%
              </Typography>
              <Typography color="text.secondary">Percentage</Typography>
            </Card>
          </Grid>

           <Grid size={{xs:4}}>
            <Card sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
              <Typography fontSize="1.6rem" fontWeight={700}>
                {student.sgpa}
              </Typography>
              <Typography color="text.secondary">SGPA</Typography>
            </Card>
          </Grid>

           <Grid size={{xs:4}}>
            <Card sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
              <Typography fontSize="1.6rem" fontWeight={700}>
                {student.totalMarks}
              </Typography>
              <Typography color="text.secondary">Total Marks</Typography>
            </Card>
          </Grid>
        </Grid>

        <Typography fontWeight={700} mt={4} mb={1}>
          Subject-wise Performance
        </Typography>

        <Card sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Subject Code</b></TableCell>
                <TableCell><b>Subject Name</b></TableCell>
                <TableCell><b>Credits</b></TableCell>
                <TableCell><b>Marks</b></TableCell>
                <TableCell><b>Grade</b></TableCell>
                <TableCell><b>Grade Point</b></TableCell>
                <TableCell><b>Status</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {subjects.map((s) => (
                <TableRow key={s.code} hover>
                  <TableCell><b>{s.code}</b></TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.credits}</TableCell>
                  <TableCell>{s.marks}</TableCell>
                  <TableCell>{s.grade}</TableCell>
                  <TableCell>{s.gp}</TableCell>
                  <TableCell>
                    <Chip
                      label="pass"
                      sx={{
                        bgcolor: "#065f46",
                        color: "white",
                        fontWeight: 600,
                        height: 24,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card sx={{ mt: 3, p: 2, borderRadius: 2 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid >
              <Typography fontWeight={700}>Mark Sheet Available</Typography>
              <Typography color="text.secondary">Mark Sheet No: MS2024001</Typography>
              <Typography color="text.secondary">Issued on: 6/20/2024</Typography>
            </Grid>

            <Grid>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                sx={{
                  bgcolor: "#075e61",
                  "&:hover": { bgcolor: "#064b4d" },
                  borderRadius: 2,
                  px: 3,
                }}
                onClick={handleDownload}
              >
                Download Mark Sheet
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Card>
    </Card>
  );
}
