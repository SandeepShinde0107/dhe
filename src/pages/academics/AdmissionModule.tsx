import React, { useMemo, useState, useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Tabs,
    Tab,
    Grid,
    TextField,
    MenuItem,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AddIcon from "@mui/icons-material/Add";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

import AdmissionTable from "./AdmissionTable";
import AdmissionCharts from "./AdmissionChart";

type AdmissionRow = {
    year: string;
    course: string;
    type: string;
    total: number;
    gender: { male: number; female: number; other: number };
    minority: number;
    ph: number;
    nri: number;
    foreign: number;
};

const DUMMY_ADMISSIONS: AdmissionRow[] = [
{
    year: "2023-24",
    course: "B.Com. (Bachelor of Commerce)",
    type: "Undergraduate",
    total: 180,
    gender: { male: 95, female: 83, other: 2 },
    minority: 28,
    ph: 6,
    nri: 4,
    foreign: 2,
},
{
    year: "2023-24",
    course: "M.A. (Master of Arts)",
    type: "Postgraduate",
    total: 60,
    gender: { male: 28, female: 31, other: 1 },
    minority: 9,
    ph: 2,
    nri: 1,
    foreign: 1,
},
{
    year: "2023-24",
    course: "M.Sc. (Master of Science)",
    type: "Postgraduate",
    total: 80,
    gender: { male: 45, female: 34, other: 1 },
    minority: 12,
    ph: 3,
    nri: 2,
    foreign: 2,
},
{
    year: "2023-24",
    course: "M.Com. (Master of Commerce)",
    type: "Postgraduate",
    total: 70,
    gender: { male: 38, female: 31, other: 1 },
    minority: 11,
    ph: 2,
    nri: 1,
    foreign: 1,
},
{
    year: "2022-23",
    course: "B.A. (Bachelor of Arts)",
    type: "Undergraduate",
    total: 115,
    gender: { male: 52, female: 61, other: 2 },
    minority: 17,
    ph: 3,
    nri: 1,
    foreign: 1,
},
{
    year: "2022-23",
    course: "B.Sc. (Bachelor of Science)",
    type: "Undergraduate",
    total: 145,
    gender: { male: 82, female: 61, other: 2 },
    minority: 21,
    ph: 4,
    nri: 2,
    foreign: 1,
},
{
    year: "2022-23",
    course: "B.Com. (Bachelor of Commerce)",
    type: "Undergraduate",
    total: 175,
    gender: { male: 92, female: 81, other: 2 },
    minority: 26,
    ph: 5,
    nri: 3,
    foreign: 2,
},
{
    year: "2022-23",
    course: "M.A. (Master of Arts)",
    type: "Postgraduate",
    total: 55,
    gender: { male: 26, female: 28, other: 1 },
    minority: 8,
    ph: 2,
    nri: 1,
    foreign: 0,
},
{
    year: "2022-23",
    course: "M.Sc. (Master of Science)",
    type: "Postgraduate",
    total: 75,
    gender: { male: 42, female: 31, other: 2 },
    minority: 10,
    ph: 3,
    nri: 1,
    foreign: 1,
},
{
    year: "2022-23",
    course: "M.Com. (Master of Commerce)",
    type: "Postgraduate",
    total: 68,
    gender: { male: 36, female: 31, other: 1 },
    minority: 9,
    ph: 2,
    nri: 1,
    foreign: 1,
},

    
];

// ====== STAT CALCULATIONS ======
const calculateStats = (rows: AdmissionRow[]) => {
    const totalAdmissions = rows.reduce((s, r) => s + r.total, 0);
    const totalMinority = rows.reduce((s, r) => s + r.minority, 0);
    const totalPH = rows.reduce((s, r) => s + r.ph, 0);
    const totalInternational = rows.reduce((s, r) => s + (r.nri + r.foreign), 0);

    const minorityPct =
        totalAdmissions === 0 ? 0 : (totalMinority / totalAdmissions) * 100;
    const phPct =
        totalAdmissions === 0 ? 0 : (totalPH / totalAdmissions) * 100;

    const distinctCourses = new Set(rows.map(r => r.course)).size;

    return {
        totalAdmissions,
        minorityPct,
        phPct,
        totalInternational,
        distinctCourses,
    };
};

export default function AdmissionModule() {
    const [subTab, setSubTab] = useState("data");

    const [filters, setFilters] = useState({
        year: "",
        course: "",
        type: "",
        search: "",
    });

    const handleFilter = (field: string, value: any) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const filteredRows = useMemo(() => {
        let data = [...DUMMY_ADMISSIONS];

        if (filters.year) data = data.filter(x => x.year === filters.year);
        if (filters.course) data = data.filter(x => x.course === filters.course);
        if (filters.type) data = data.filter(x => x.type === filters.type);

        if (filters.search.trim()) {
            const q = filters.search.toLowerCase();
            data = data.filter(x =>
                `${x.year} ${x.course} ${x.type}`.toLowerCase().includes(q)
            );
        }

        return data;
    }, [filters]);

    const stats = useMemo(() => calculateStats(filteredRows), [filteredRows]);

    return (
        <Box sx={{ maxWidth: "95%", mx: "auto" }}>
            {/* ===================== HEADER ===================== */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <Box>
                    <Typography variant="h5" fontWeight={700}>
                        Admission Records
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage and view admission statistics across academic years
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                        variant="outlined"
                        startIcon={<DownloadOutlinedIcon />}
                        sx={{ textTransform: "none", borderRadius: 2 }}
                    >
                        Export
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            bgcolor: "#065f46",
                            "&:hover": { bgcolor: "#064e3b" },
                        }}
                    >
                        Add Record
                    </Button>
                </Box>
            </Box>

            {/* ===================== STAT CARDS ===================== */}
            <Grid container spacing={2.5} mb={3}>
                 <Grid size={{xs:12,md:3}}>
                    <Card sx={{ borderRadius: 3, boxShadow: "none", border: "1px solid #e5e7eb" }}>
                        <CardContent>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Total Admissions
                                </Typography>
                                <GroupsOutlinedIcon color="disabled" />
                            </Box>
                            <Typography variant="h5" fontWeight={700}>
                                {stats.totalAdmissions}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Across {stats.distinctCourses} courses
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                 <Grid size={{xs:12,md:3}}>
                    <Card sx={{ borderRadius: 3, boxShadow: "none", border: "1px solid #e5e7eb" }}>
                        <CardContent>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Minority Students
                                </Typography>
                                <SchoolOutlinedIcon color="disabled" />
                            </Box>
                            <Typography variant="h5" fontWeight={700}>
                                {stats.minorityPct.toFixed(1)}%
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Of total admissions
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                 <Grid size={{xs:12,md:3}}>
                    <Card sx={{ borderRadius: 3, boxShadow: "none", border: "1px solid #e5e7eb" }}>
                        <CardContent>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    PH Students
                                </Typography>
                                <TrendingUpOutlinedIcon color="disabled" />
                            </Box>
                            <Typography variant="h5" fontWeight={700}>
                                {stats.phPct.toFixed(1)}%
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Physically handicapped
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                 <Grid size={{xs:12,md:3}}>
                    <Card sx={{ borderRadius: 3, boxShadow: "none", border: "1px solid #e5e7eb" }}>
                        <CardContent>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    International
                                </Typography>
                                <PublicOutlinedIcon color="disabled" />
                            </Box>
                            <Typography variant="h5" fontWeight={700}>
                                {stats.totalInternational}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                NRI + Foreign students
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* ===================== FILTERS ===================== */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" fontWeight={700} mb={2}>
                        Filters
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                label="Academic Year"
                                value={filters.year}
                                onChange={e => handleFilter("year", e.target.value)}
                            >
                                <MenuItem value="">All Years</MenuItem>
                                <MenuItem value="2023-24">2023-24</MenuItem>
                                <MenuItem value="2022-23">2022-23</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                label="Course"
                                value={filters.course}
                                onChange={e => handleFilter("course", e.target.value)}
                            >
                                <MenuItem value="">All Courses</MenuItem>
                                <MenuItem value="B.A. (Bachelor of Arts)">B.A.</MenuItem>
                                <MenuItem value="B.Sc. (Bachelor of Science)">B.Sc.</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                label="Course Type"
                                value={filters.type}
                                onChange={e => handleFilter("type", e.target.value)}
                            >
                                <MenuItem value="">All Types</MenuItem>
                                <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                                <MenuItem value="Postgraduate">Postgraduate</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Search courses..."
                                value={filters.search}
                                onChange={e => handleFilter("search", e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <SearchIcon fontSize="small" sx={{ mr: 1 }} />
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* ===================== SUB TABS ===================== */}
            <Tabs value={subTab} onChange={(_, v) => setSubTab(v)} sx={{ mb: 3 }}>
                <Tab value="data" label="Admission Data" />
                <Tab value="charts" label="Statistics & Charts" />
            </Tabs>

            {subTab === "data" && <AdmissionTable rows={filteredRows} />}
            {subTab === "charts" && <AdmissionCharts rows={filteredRows} />}
        </Box>
    );
}
