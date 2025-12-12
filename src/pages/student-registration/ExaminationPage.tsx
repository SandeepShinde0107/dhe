import  { useState } from "react";
import { Box, Typography } from "@mui/material";
import ExamApplications from "./examinationTab/ExamApplications";
import ApplyForExam from "./examinationTab/ApplyForExam";
import AdmitCards from "./examinationTab/AdmitCards";
import ResultsTab from "./examinationTab/ResultsTab";

export default function ExaminationPage() {
  const [tab, setTab] = useState(0);

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={600}>Examination Module</Typography>
      <Typography color="text.secondary" mb={3}>
        Manage exam applications, admit cards, and view results
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          bgcolor: "#f7f9fa",
          p: 1,
          borderRadius: 2,
          mb: 3,
        }}
      >
        {[
          { key: 0, label: "Applications" },
          { key: 1, label: "Apply for Exam" },
          { key: 2, label: "Admit Cards" },
          { key: 3, label: "Results" },
        ].map((t) => {
          const isActive = tab === t.key;
          return (
            <Box
              key={t.key}
              onClick={() => setTab(t.key)}
              sx={{
                flex: 1,
                py: 1.3,
                borderRadius: 2,
                cursor: "pointer",
                textAlign: "center",
                fontWeight: 600,
                fontSize: "0.95rem",
                bgcolor: isActive ? "#fff" : "transparent",
                boxShadow: isActive ? "0 2px 6px rgba(0,0,0,0.1)" : "none",
                border: isActive ? "1px solid #e5e7eb" : "1px solid transparent",
                transition: "0.2s",
                "&:hover": { bgcolor: isActive ? "#fff" : "#eef1f2" },
              }}
            >
              {t.label}
            </Box>
          );
        })}
      </Box>
      {tab === 0 && <ExamApplications />}
      {tab === 1 && <ApplyForExam />}
      {tab === 2 && <AdmitCards />}
      {tab === 3 && <ResultsTab />}
    </Box>
  );
}
