import React, { useState, useMemo } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";

const examTypes = ["Regular Exam", "Re-Exam", "Backlog Exam"];
const semesters = ["1", "2", "3", "4", "5", "6"];

const subjects = [
  { code: "CS101", name: "Data Structures", credits: 4, fee: 300 },
  { code: "CS102", name: "Database Management Systems", credits: 4, fee: 300 },
  { code: "CS103", name: "Operating Systems", credits: 4, fee: 300 },
  { code: "CS104", name: "Computer Networks", credits: 4, fee: 300 },
  { code: "CS105", name: "Software Engineering", credits: 4, fee: 300 },
];

export default function ApplyForExam() {
  const [examType, setExamType] = useState("");
  const [semester, setSemester] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSubject = (code: string) => {
    setSelected((prev) =>
      prev.includes(code) ? prev.filter((s) => s !== code) : [...prev, code]
    );
  };

  const examFee = useMemo(() => {
    return subjects
      .filter((s) => selected.includes(s.code))
      .reduce((sum, s) => sum + s.fee, 0);
  }, [selected]);

  const lateFee = 0; 
  const totalFee = examFee + lateFee;

  return (
    <Card sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight={700}>
        Apply for Examination
      </Typography>
      <Typography color="text.secondary" mb={3}>
        Fill in the details to apply for upcoming examinations
      </Typography>
      <Grid container spacing={3} mb={3}>
        <Grid size={{xs:12 , md:6}}>
          <Typography fontWeight={600} mb={1}>
            Exam Type
          </Typography>
          <Select
            fullWidth
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            displayEmpty
            sx={{ bgcolor: "#fff", borderRadius: 2 }}
          >
            <MenuItem disabled value="">
              Select exam type
            </MenuItem>
            {examTypes.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid size={{xs:12 , md:6}}>
          <Typography fontWeight={600} mb={1}>
            Semester
          </Typography>
          <Select
            fullWidth
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            displayEmpty
            sx={{ bgcolor: "#fff", borderRadius: 2 }}
          >
            <MenuItem disabled value="">
              Select semester
            </MenuItem>
            {semesters.map((s) => (
              <MenuItem key={s} value={s}>
                Semester {s}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      <Typography fontWeight={600} mb={1}>
        Select Subjects
      </Typography>

      <Card
        sx={{
          p: 2,
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          mb: 3,
        }}
      >
        {subjects.map((sub) => (
          <Box key={sub.code} mb={1.5}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selected.includes(sub.code)}
                  onChange={() => toggleSubject(sub.code)}
                />
              }
              label={`${sub.code} - ${sub.name} (${sub.credits} credits)`}
            />
          </Box>
        ))}
      </Card>

      <Card
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: "#f8fafb",
          border: "1px solid #e5e7eb",
        }}
      >
        <Grid container>
          <Grid size={{xs:12 }}>
            <Typography fontWeight={600}>Exam Fee:</Typography>
            <Typography fontWeight={600}>Late Fee:</Typography>
            <Typography variant="h6" fontWeight={700} mt={1}>
              Total Fee:
            </Typography>
          </Grid>

          <Grid size={{xs:4}}  textAlign="right">
            <Typography>₹{examFee}</Typography>
            <Typography>₹{lateFee}</Typography>
            <Typography variant="h6" fontWeight={700} mt={1}>
              ₹{totalFee}
            </Typography>
          </Grid>
        </Grid>
      </Card>

      <Box display="flex" gap={2} mt={3}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#075e61",
            py: 1.4,
            borderRadius: 2,
            fontWeight: 600,
            "&:hover": { bgcolor: "#064b4d" },
          }}
          startIcon={<PaymentIcon />}
        >
          Proceed to Payment
        </Button>

        <Button
          variant="outlined"
          sx={{
            px: 4,
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          Save as Draft
        </Button>
      </Box>
    </Card>
  );
}
