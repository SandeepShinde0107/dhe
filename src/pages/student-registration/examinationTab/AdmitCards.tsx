import React, { useRef } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  Chip
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";

export default function AdmitCards() {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    alert("Admit Card downloaded successfully!");
  };

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const win = window.open("", "", "width=900,height=650");
      if (win) {
        win.document.write(`
          <html>
            <head>
              <title>Admit Card</title>
              <style>
                body { font-family: Arial; padding: 20px; }
                .card { border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
              </style>
            </head>
            <body>${printContent}</body>
          </html>
        `);
        win.document.close();
        win.print();
      }
    }
  };

  const subjects = [
    { code: "CS101", name: "Data Structures", date: "2024-05-15 at 10:00 AM" },
    { code: "CS102", name: "Database Management Systems", date: "2024-05-17 at 10:00 AM" },
    { code: "CS103", name: "Operating Systems", date: "2024-05-19 at 10:00 AM" },
    { code: "CS104", name: "Computer Networks", date: "2024-05-21 at 10:00 AM" },
    { code: "CS105", name: "Software Engineering", date: "2024-05-23 at 10:00 AM" }
  ];

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight={700}>Admit Cards</Typography>
      <Typography color="text.secondary" mb={3}>
        Download your admit cards for upcoming examinations
      </Typography>

      <Card sx={{ p: 3, borderRadius: 3 }}>
        <Box ref={printRef}>
          <Grid container spacing={3}>
            <Grid size={{xs:12, md:3}} textAlign="center">
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: 2,
                  bgcolor: "#f2f3f4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 1,
                }}
              >
                <Typography fontSize="4rem" color="gray">👤</Typography>
              </Box>
              <Typography color="text.secondary">Student Photo</Typography>
            </Grid>
            <Grid size={{xs:12, md:9}}>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography fontSize="1.2rem" fontWeight={700}>
                    Rahul Sharma
                  </Typography>
                  <Typography color="text.secondary">2024-PU1001-CS-0001</Typography>
                  <Typography color="text.secondary" mb={2}>
                    B.Tech Computer Science
                  </Typography>

                  <Typography fontWeight={600}>
                    Exam Type: <span style={{ fontWeight: 400 }}>Semester</span>
                  </Typography>
                  <Typography fontWeight={600} mb={2}>
                    Semester: <span style={{ fontWeight: 400 }}>4</span>
                  </Typography>
                </Box>

                <Box textAlign="right">
                  <Chip
                    label="ADM2024001"
                    sx={{
                      bgcolor: "#075e61",
                      color: "white",
                      fontWeight: 700,
                      px: 2,
                      py: 2,
                      fontSize: "1rem",
                    }}
                  />
                </Box>
              </Box>

              <Grid container spacing={2} mt={1}>
                 <Grid size={{xs:6}}>
                  <Typography fontWeight={600}>Center:</Typography>
                  <Typography color="text.secondary">
                    Main Examination Center
                  </Typography>
                </Grid>
                 <Grid size={{xs:6}}>
                  <Typography fontWeight={600}>Seat:</Typography>
                  <Typography color="text.secondary">
                    Room R-101, Seat S-15
                  </Typography>
                </Grid>
              </Grid>
              <Box mt={3}>
                <Typography fontWeight={700} mb={1}>
                  Subjects ({subjects.length})
                </Typography>

                <Grid container spacing={2}>
                  {subjects.map((s) => (
                    <Grid size={{xs:12, md:6}} key={s.code}>
                      <Card
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: "1px solid #e5e7eb",
                        }}
                      >
                        <Typography fontWeight={600}>
                          {s.code} - {s.name}
                        </Typography>
                        <Typography color="text.secondary" fontSize="0.9rem">
                          {s.date}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" gap={2} mt={4} ml={40}>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            sx={{
              bgcolor: "#075e61",
              "&:hover": { bgcolor: "#064b4d" },
              px: 4,
              borderRadius: 2,
              fontWeight: 600,
            }}
            onClick={handleDownload}
          >
            Download
          </Button>

          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            sx={{
              px: 4,
              borderRadius: 2,
              fontWeight: 600,
            }}
            onClick={handlePrint}
          >
            Print
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
