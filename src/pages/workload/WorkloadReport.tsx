import {
  Box,
  Button,
  Card,
  Typography,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import React, { useState } from "react";
import DetailedViewTable from "./DetailedViewTable";
import ChartsTab from "./Charts";
import RecommendationsTab from "./RecommendatiosTab";

export default function WorkloadReport() {
  const [reportTab, setReportTab] = useState(0);

  return (
    <Card sx={{ borderRadius: 2, p: 3 }}>
      {/* ================= HEADER ================= */}
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Workload Report
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Comprehensive workload analysis and staff recommendations
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" startIcon={<PrintIcon />} sx={{ textTransform: "none" }}>
            Print
          </Button>

          <Button variant="outlined" startIcon={<FileDownloadOutlinedIcon />} sx={{ textTransform: "none" }}>
            Export Excel
          </Button>

          <Button
            variant="contained"
            startIcon={<PictureAsPdfOutlinedIcon />}
            sx={{ textTransform: "none", bgcolor: "#0D766E" }}
          >
            Export PDF
          </Button>
        </Box>
      </Box>

      {/* ================= KPI CARDS ================= */}
      <Grid container spacing={2} mb={3}>
         <Grid size={{xs:12,md:3}}>
          <Card sx={{ borderRadius: 2, p: 2 }}>
            <Typography fontSize={14} color="text.secondary">
              Total Subjects
            </Typography>
            <Typography fontSize={32} fontWeight={700}>10</Typography>
            <Typography fontSize={12} color="text.secondary">Across all courses</Typography>
          </Card>
        </Grid>

         <Grid size={{xs:12,md:3}}>
          <Card sx={{ borderRadius: 2, p: 2 }}>
            <Typography fontSize={14} color="text.secondary">
              Total Workload
            </Typography>
            <Typography fontSize={32} fontWeight={700}>618</Typography>
            <Typography fontSize={12} color="text.secondary">Hours per week</Typography>
          </Card>
        </Grid>

         <Grid size={{xs:12,md:3}}>
          <Card sx={{ borderRadius: 2, p: 2 }}>
            <Typography fontSize={14} color="text.secondary">
              Staff Status
            </Typography>
            <Typography fontSize={32} fontWeight={700}>
              19/25
            </Typography>
            <Typography fontSize={12} color="text.secondary">
              Available / Required
            </Typography>
          </Card>
        </Grid>

         <Grid size={{xs:12,md:3}}>
          <Card sx={{ borderRadius: 2, p: 2 }}>
            <Typography fontSize={14} color="text.secondary">
              Total Vacancies
            </Typography>
            <Typography fontSize={32} fontWeight={700} color="red">
              7
            </Typography>
            <Typography fontSize={12} color="text.secondary">
              Positions to fill
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* ================= REPORT SUBTABS ================= */}
      <Card
        sx={{
          borderRadius: 900,
          boxShadow: "none",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
          mb: 3,
        }}
      >
        <Tabs
          value={reportTab}
          onChange={(_, v) => setReportTab(v)}
          variant="fullWidth"
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            bgcolor: "#f3f4f6",
            borderRadius: 900,
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              minHeight: "48px",
              borderRadius: 900,
              mx: 0.3,
              color: "#4b5563",
            },
            "& .Mui-selected": {
              bgcolor: "#ffffff",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
              fontWeight: 700,
              color: "#000000 !important",
            },
          }}
        >
          <Tab label="Overview" />
          <Tab label="Detailed View" />
          <Tab label="Charts" />
          <Tab label="Recommendations" />
        </Tabs>
      </Card>

      {/* ================= TAB: OVERVIEW ================= */}
      {reportTab === 0 && (
        <Card sx={{ borderRadius: 2, p: 3 }}>
          <Typography variant="h6" fontWeight={700} mb={0.5}>
            Workload Summary
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Overall workload distribution and utilization
          </Typography>

          <Grid container spacing={2}>
             <Grid size={{xs:12,md:4}}>
              <Card sx={{ borderRadius: 2, p: 2 }}>
                <Typography color="text.secondary" fontSize={14}>
                  Total Students
                </Typography>
                <Typography fontSize={28} fontWeight={700}>1245</Typography>
              </Card>
            </Grid>

             <Grid size={{xs:12,md:4}}>
              <Card sx={{ borderRadius: 2, p: 2 }}>
                <Typography color="text.secondary" fontSize={14}>
                  Average Utilization
                </Typography>
                <Typography fontSize={28} fontWeight={700}>203%</Typography>
              </Card>
            </Grid>

             <Grid size={{xs:12,md:4}}>
              <Card sx={{ borderRadius: 2, p: 2 }}>
                <Typography color="text.secondary" fontSize={14}>
                  Subjects with Vacancy
                </Typography>
                <Typography fontSize={28} fontWeight={700} color="red">
                  6
                </Typography>
              </Card>
            </Grid>
          </Grid>

          {/* ALERT BAR */}
          <Box
            sx={{
              mt: 3,
              borderRadius: 2,
              border: "1px solid #ffcccc",
              bgcolor: "#fff5f5",
              p: 2,
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <InfoOutlinedIcon sx={{ color: "#e13b33" }} />
            <Typography fontSize={14}>
              <b>7 staff positions</b> need to be filled across 6 subjects.
              Review the recommendations tab for detailed action items.
            </Typography>
          </Box>
        </Card>
      )}
      {reportTab === 1 && <DetailedViewTable/>}
      {reportTab === 2 && <ChartsTab />}
      {reportTab === 3 && <RecommendationsTab />}
    </Card>
  );
}
