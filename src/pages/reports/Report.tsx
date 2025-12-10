import React, { useState } from "react";
import {
    Box,
    Card,
    Grid,
    Typography,
    Tabs,
    Tab,
    Button,
    Divider,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from "@mui/material";

import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";


import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import MainLayout from "../../components/MainLayout";

type MainTab = "dashboard" | "generator";
type SubTab = "Overview" | "Institutes" | "Staffing" | "Students" | "Operations";

const subTabs: SubTab[] = [
    "Overview",
    "Institutes",
    "Staffing",
    "Students",
    "Operations",
];

export default function Report() {
    const [activeTab, setActiveTab] = useState<MainTab>("dashboard");
    const [subTab, setSubTab] = useState<SubTab>("Overview");

    // --- Chart Data (same as friend’s code) ---

    const monthlyRegistrations = [
        { month: "Jan", value: 16 },
        { month: "Feb", value: 18 },
        { month: "Mar", value: 22 },
        { month: "Apr", value: 25 },
        { month: "May", value: 20 },
        { month: "Jun", value: 28 },
        { month: "Jul", value: 30 },
        { month: "Aug", value: 28 },
    ];

    const applicationStatus = [
        { name: "Approved", value: 63, color: "#f6a11a" },
        { name: "Pending", value: 19, color: "#4f8dfd" },
        { name: "Under Review", value: 9, color: "#08c07c" },
        { name: "Rejected", value: 3, color: "#e04444" },
        { name: "Correction Required", value: 5, color: "#b44fff" },
    ];

    const regionInstitutes = [
        { name: "Mumbai", value: 290 },
        { name: "Pune", value: 240 },
        { name: "Nagpur", value: 170 },
        { name: "Nashik", value: 150 },
        { name: "Aurangabad", value: 140 },
        { name: "Others", value: 260 },
    ];

    const monthlyActivity = [
        { m: "Jan", applications: 40, approved: 35, rejected: 5 },
        { m: "Feb", applications: 50, approved: 45, rejected: 5 },
        { m: "Mar", applications: 45, approved: 42, rejected: 3 },
        { m: "Apr", applications: 55, approved: 50, rejected: 5 },
        { m: "May", applications: 58, approved: 53, rejected: 5 },
        { m: "Jun", applications: 62, approved: 57, rejected: 5 },
    ];

    // Institutes
    const pieData = [
        { name: "College", value: 980, color: "#4285F4" },
        { name: "University", value: 145, color: "#34A853" },
        { name: "Deemed University", value: 67, color: "#FBBC05" },
        { name: "Autonomous", value: 55, color: "#EA4335" },
    ];

    const barData = [
        { name: "Mumbai Univ.", value: 320 },
        { name: "Pune Univ.", value: 260 },
        { name: "Nagpur Univ.", value: 190 },
        { name: "Shivaji Univ.", value: 165 },
        { name: "Others", value: 390 },
    ];

    // Staffing
    const categoryData = [
        { name: "General", count: 24000 },
        { name: "OBC", count: 16000 },
        { name: "SC", count: 7000 },
        { name: "ST", count: 4000 },
        { name: "EWS", count: 1500 },
    ];

    const positionsData = [
        { dept: "Computer Science", approved: 3500, filled: 3100 },
        { dept: "Mathematics", approved: 2800, filled: 2600 },
        { dept: "Physics", approved: 2500, filled: 2300 },
        { dept: "Chemistry", approved: 2300, filled: 2100 },
        { dept: "English", approved: 2000, filled: 1800 },
        { dept: "Commerce", approved: 3300, filled: 3000 },
    ];

    const salaryData = [
        { range: "< 30k", count: 8000 },
        { range: "30k-50k", count: 15000 },
        { range: "50k-70k", count: 19000 },
        { range: "70k-100k", count: 8000 },
        { range: "> 100k", count: 3000 },
    ];

    const nocTrend = [
        { month: "Jan", applications: 24, approved: 20 },
        { month: "Feb", applications: 28, approved: 24 },
        { month: "Mar", applications: 22, approved: 18 },
        { month: "Apr", applications: 30, approved: 25 },
        { month: "May", applications: 27, approved: 22 },
        { month: "Jun", applications: 32, approved: 28 },
    ];

    // Students
    const enrollmentTrend = [
        { year: "2019", students: 2400000 },
        { year: "2020", students: 2600000 },
        { year: "2021", students: 2800000 },
        { year: "2022", students: 3000000 },
        { year: "2023", students: 3150000 },
    ];

    const courseEnrollment = [
        { course: "BA", students: 850000 },
        { course: "BSc", students: 730000 },
        { course: "BCom", students: 690000 },
        { course: "BTech", students: 410000 },
        { course: "MA", students: 180000 },
        { course: "MSc", students: 150000 },
        { course: "MCom", students: 120000 },
        { course: "MTech", students: 55000 },
        { course: "PhD", students: 25000 },
    ];

    const STUDENT_COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#A855F7"];

    const studentCategoryData = [
        { name: "General", count: 1400000 },
        { name: "OBC", count: 900000 },
        { name: "SC", count: 500000 },
        { name: "ST", count: 250000 },
        { name: "EWS", count: 100000 },
    ];

    const scholarshipData = [
        { type: "Central Govt", count: 450000 },
        { type: "State Govt", count: 680000 },
        { type: "Institutional", count: 260000 },
        { type: "Private", count: 130000 },
    ];

    // Operations
    const grievanceData = [
        { name: "Pending", value: 23, color: "#3B82F6" },
        { name: "Under Investigation", value: 15, color: "#10B981" },
        { name: "Resolved", value: 145, color: "#F59E0B" },
        { name: "Closed", value: 87, color: "#EF4444" },
    ];

    const rtiTrend = [
        { month: "Jan", applications: 80 },
        { month: "Feb", applications: 90 },
        { month: "Mar", applications: 100 },
        { month: "Apr", applications: 93 },
        { month: "May", applications: 105 },
        { month: "Jun", applications: 113 },
    ];

    const assetData = [
        { category: "Computers", total: 20000, allocated: 15000 },
        { category: "Furniture", total: 40000, allocated: 38000 },
        { category: "Lab Equipment", total: 12000, allocated: 9000 },
        { category: "Vehicles", total: 15000, allocated: 9000 },
        { category: "Books", total: 2500000, allocated: 2100000 },
    ];

    const legalCases = [
        { name: "Active", value: 34, color: "#3B82F6" },
        { name: "Pending Hearing", value: 18, color: "#10B981" },
        { name: "Under Review", value: 12, color: "#F59E0B" },
        { name: "Closed", value: 156, color: "#EF4444" },
    ];

    const handleMainTabChange = (
        _event: React.SyntheticEvent,
        newValue: MainTab
    ) => {
        setActiveTab(newValue);
    };

    const reports = [
        "Monthly Registrations",
        "Staff Summary",
        "Student Enrollment",
    ];
    return (
        <MainLayout>
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                    Reporting & Analytics
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                    Generate custom reports and view comprehensive analytics across all
                    modules
                </Typography>

                {/* Left: pill tabs */}
                <Box
                    sx={{
                        display: "inline-flex",
                        bgcolor: "#f3f4f6",
                        borderRadius: 999,
                        p: 0.5,
                        mb:3
                    }}
                >
                    <Tabs
                        value={activeTab}
                        onChange={handleMainTabChange}
                        TabIndicatorProps={{ sx: { display: "none" } }} // hide underline
                        sx={{
                            minHeight: "auto",
                            "& .MuiTabs-flexContainer": {
                                gap: 0.5,
                            },
                            "& .MuiTab-root": {
                                minHeight: "auto",
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: 14,
                                px: 3,
                                py: 1,
                                borderRadius: 999,
                                alignItems: "center",
                                justifyContent: "center",
                                color: "text.secondary",
                            },
                            "& .MuiTab-root.Mui-selected": {
                                bgcolor: "#ffffff",
                                color: "#111827",
                                boxShadow: "0 2px 6px rgba(15,23,42,0.12)",
                            },
                        }}
                    >
                        <Tab label="Analytics Dashboard" value="dashboard" />
                        <Tab label="Report Generator" value="generator" />
                    </Tabs>
                </Box>


                {/* <Divider sx={{ mb: 3 }} /> */}

                {/* DASHBOARD CONTENT */}
                {activeTab === "dashboard" && (
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Analytics Dashboard
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1}}
                        >
                            Comprehensive analytics and insights across all modules
                        </Typography>

                        {/* Time filter */}
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                            <FormControl size="small" sx={{ minWidth: 160 }}>
                                <InputLabel>Time Range</InputLabel>
                                <Select label="Time Range" defaultValue="6m">
                                    <MenuItem value="1m">Last Month</MenuItem>
                                    <MenuItem value="3m">Last 3 Months</MenuItem>
                                    <MenuItem value="6m">Last 6 Months</MenuItem>
                                    <MenuItem value="1Y">Last Year</MenuItem>

                                </Select>
                            </FormControl>
                        </Box>

                        {/* SUMMARY CARDS */}
                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Card
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Total Institutes
                                        </Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                            1247
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: 2,
                                            bgcolor: "#e3f2fd",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <BusinessOutlinedIcon />
                                    </Box>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Card
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Total Staff
                                        </Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                            52,400
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: 2,
                                            bgcolor: "#e8f5e9",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <GroupsOutlinedIcon />

                                    </Box>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Card
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Total Students
                                        </Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                            3,200,000
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: 2,
                                            bgcolor: "#f3e5f5",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <SchoolOutlinedIcon />

                                    </Box>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Card
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Active Grievances
                                        </Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                            23
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: 2,
                                            bgcolor: "#fff3e0",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <WarningAmberOutlinedIcon />

                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>

                        {/* SUB-TABS */}
                        <Box
                            sx={{
                                mb: 3,
                                mt: 1,
                                display: "inline-flex",
                                bgcolor: "#f3f4f6",
                                borderRadius: 999,
                                p: 0.5,
                            }}
                        >
                            {subTabs.map((tab) => {
                                const selected = subTab === tab;
                                return (
                                    <Button
                                        key={tab}
                                        onClick={() => setSubTab(tab)}
                                        sx={{
                                            textTransform: "none",
                                            fontWeight: 600,
                                            fontSize: 14,
                                            borderRadius: 999,
                                            px: 2.5,
                                            py: 1,
                                            minHeight: "auto",
                                            boxShadow: selected ? "0 1px 4px rgba(15,23,42,0.12)" : "none",
                                            bgcolor: selected ? "#ffffff" : "transparent",
                                            color: selected ? "text.primary" : "text.secondary",
                                            "&:hover": {
                                                bgcolor: selected ? "#ffffff" : "#e5e7eb",
                                            },
                                        }}
                                    >
                                        {tab}
                                    </Button>
                                );
                            })}
                        </Box>

                        {/* ---- OVERVIEW TAB ---- */}
                        {subTab === "Overview" && (
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Card sx={{ p: 2.5, borderRadius: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            Monthly Registrations Trend
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 2 }}
                                        >
                                            Institute registrations over time
                                        </Typography>

                                        <Box sx={{ width: "100%", height: 260 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={monthlyRegistrations}>
                                                    <XAxis dataKey="month" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="value"
                                                        stroke="#4f8dfd"
                                                        dot
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Card>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Card sx={{ p: 2.5, borderRadius: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            Application Status
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 2 }}
                                        >
                                            Current application distribution
                                        </Typography>

                                        <Box sx={{ width: "100%", height: 260 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={applicationStatus}
                                                        dataKey="value"
                                                        nameKey="name"
                                                        outerRadius={90}
                                                        label
                                                    >
                                                        {applicationStatus.map((entry, idx) => (
                                                            <Cell key={idx} fill={entry.color} />
                                                        ))}
                                                    </Pie>
                                                    <Legend />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Card>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Card sx={{ p: 2.5, borderRadius: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            Region-wise Institute Distribution
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 2 }}
                                        >
                                            Institutes across Maharashtra
                                        </Typography>

                                        <Box sx={{ width: "100%", height: 260 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={regionInstitutes}>
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar dataKey="value" fill="#4f8dfd" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Card>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Card sx={{ p: 2.5, borderRadius: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            Monthly Activity Overview
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 2 }}
                                        >
                                            Applications, approvals, and rejections
                                        </Typography>

                                        <Box sx={{ width: "100%", height: 260 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={monthlyActivity}>
                                                    <XAxis dataKey="m" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Area
                                                        dataKey="applications"
                                                        stroke="#4f8dfd"
                                                        fill="#4f8dfd40"
                                                    />
                                                    <Area
                                                        dataKey="approved"
                                                        stroke="#08c07c"
                                                        fill="#08c07c40"
                                                    />
                                                    <Area
                                                        dataKey="rejected"
                                                        stroke="#e04444"
                                                        fill="#e0444440"
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Card>
                                </Grid>
                            </Grid>
                        )}

                        {/* ---- INSTITUTES TAB ---- */}
                        {subTab === "Institutes" && (
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Card sx={{ p: 2.5, borderRadius: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            Institute Types
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 2 }}
                                        >
                                            Distribution by type
                                        </Typography>

                                        <Grid container spacing={2}>
                                            <Grid size={{ xs: 12, md: 7 }}>
                                                <Box sx={{ width: "100%", height: 260 }}>
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <PieChart>
                                                            <Pie
                                                                dataKey="value"
                                                                data={pieData}
                                                                cx="50%"
                                                                cy="50%"
                                                                innerRadius={55}
                                                                outerRadius={95}
                                                                paddingAngle={2}
                                                            >
                                                                {pieData.map((item, idx) => (
                                                                    <Cell key={idx} fill={item.color} />
                                                                ))}
                                                            </Pie>
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                </Box>
                                            </Grid>

                                            <Grid size={{ xs: 12, md: 5 }}>
                                                {pieData.map((item) => (
                                                    <Typography key={item.name} sx={{ mb: 0.5 }}>
                                                        <Box
                                                            component="span"
                                                            sx={{
                                                                display: "inline-block",
                                                                width: 10,
                                                                height: 10,
                                                                borderRadius: "50%",
                                                                bgcolor: item.color,
                                                                mr: 1,
                                                            }}
                                                        />
                                                        {item.name}: {item.value}
                                                    </Typography>
                                                ))}
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Card sx={{ p: 2.5, borderRadius: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            University-wise Distribution
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 2 }}
                                        >
                                            Institutes by university
                                        </Typography>

                                        <Box sx={{ width: "100%", height: 260 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={barData} layout="vertical">
                                                    <XAxis type="number" />
                                                    <YAxis dataKey="name" type="category" width={110} />
                                                    <Tooltip />
                                                    <Bar
                                                        dataKey="value"
                                                        fill="#A066FF"
                                                        radius={[6, 6, 6, 6]}
                                                    />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Card>
                                </Grid>
                            </Grid>
                        )}

                        {/* ---- STAFFING TAB ---- */}
                        {subTab === "Staffing" && (
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Card sx={{ p: 2.5, borderRadius: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            Staff by Category
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 2 }}
                                        >
                                            Category-wise distribution
                                        </Typography>

                                        <Box sx={{ width: "100%", height: 260 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={categoryData}>
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Bar
                                                        dataKey="count"
                                                        fill="#10B981"
                                                        radius={[6, 6, 0, 0]}
                                                    />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </Box>

                                        <Typography
                                            variant="caption"
                                            sx={{ display: "flex", alignItems: "center", mt: 1 }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: "50%",
                                                    bgcolor: "#10B981",
                                                    mr: 1,
                                                }}
                                            />
                                            count
                                        </Typography>
                                    </Card>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Card sx={{ p: 2.5, borderRadius: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            Approved vs Filled Positions
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 2 }}
                                        >
                                            Department-wise comparison
                                        </Typography>

                                        <Box sx={{ width: "100%", height: 260 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={positionsData}>
                                                    <XAxis dataKey="dept" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar
                                                        dataKey="approved"
                                                        fill="#3B82F6"
                                                        radius={[5, 5, 0, 0]}
                                                    />
                                                    <Bar
                                                        dataKey="filled"
                                                        fill="#10B981"
                                                        radius={[5, 5, 0, 0]}
                                                    />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Card>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Card sx={{ p: 2.5, borderRadius: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            Salary Distribution
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 2 }}
                                        >
                                            Salary ranges across staff
                                        </Typography>

                                        <Box sx={{ width: "100%", height: 260 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={salaryData}>
                                                    <XAxis dataKey="range" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Bar
                                                        dataKey="count"
                                                        fill="#10B981"
                                                        radius={[6, 6, 0, 0]}
                                                    />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Card>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Card sx={{ p: 2.5, borderRadius: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            NOC Applications Trend
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 2 }}
                                        >
                                            Monthly NOC requests
                                        </Typography>

                                        <Box sx={{ width: "100%", height: 260 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={nocTrend}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="month" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="applications"
                                                        stroke="#F59E0B"
                                                        strokeWidth={3}
                                                    />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="approved"
                                                        stroke="#10B981"
                                                        strokeWidth={3}
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Card>
                                </Grid>
                            </Grid>
                        )}

                        {/* ---- STUDENTS TAB ---- */}
                        {subTab === "Students" && (
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Card sx={{ p: 2.5, borderRadius: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            Student Enrollment Trend
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 2 }}
                                        >
                                            Year-over-year growth
                                        </Typography>

                                        <Box sx={{ width: "100%", height: 260 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={enrollmentTrend}>
                                                    <XAxis dataKey="year" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="students"
                                                        stroke="#A78BFA"
                                                        strokeWidth={3}
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Card>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Card sx={{ p: 2.5, borderRadius: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            Course-wise Enrollment
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 2 }}
                                        >
                                            Students by course
                                        </Typography>

                                        <Box sx={{ width: "100%", height: 260 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={courseEnrollment}>
                                                    <XAxis dataKey="course" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Bar
                                                        dataKey="students"
                                                        fill="#EC4899"
                                                        radius={[6, 6, 0, 0]}
                                                    />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Card>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Card sx={{ p: 2.5, borderRadius: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            Category-wise Students
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 2 }}
                                        >
                                            Student distribution by category
                                        </Typography>

                                        <Box sx={{ width: "100%", height: 260 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={studentCategoryData}
                                                        dataKey="count"
                                                        nameKey="name"
                                                        outerRadius={90}
                                                        label
                                                    >
                                                        {studentCategoryData.map((entry, index) => (
                                                            <Cell
                                                                key={index}
                                                                fill={STUDENT_COLORS[index % STUDENT_COLORS.length]}
                                                            />
                                                        ))}
                                                    </Pie>
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </Box>

                                        <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 2 }}>
                                            {studentCategoryData.map((item, i) => (
                                                <Typography
                                                    key={item.name}
                                                    variant="caption"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: 10,
                                                            height: 10,
                                                            borderRadius: "50%",
                                                            bgcolor: STUDENT_COLORS[i],
                                                            mr: 1,
                                                        }}
                                                    />
                                                    {item.name}
                                                </Typography>
                                            ))}
                                        </Box>
                                    </Card>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Card sx={{ p: 2.5, borderRadius: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            Scholarship Distribution
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 2 }}
                                        >
                                            Students availing scholarships
                                        </Typography>

                                        <Box sx={{ width: "100%", height: 260 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={scholarshipData}>
                                                    <XAxis dataKey="type" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Bar
                                                        dataKey="count"
                                                        fill="#F97316"
                                                        radius={[6, 6, 0, 0]}
                                                    />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Card>
                                </Grid>
                            </Grid>
                        )}

                        {/* ---- OPERATIONS TAB ---- */}
                        {subTab === "Operations" && (
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Card sx={{ p: 2.5, borderRadius: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            Grievance Status
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 2 }}
                                        >
                                            Current grievance distribution
                                        </Typography>

                                        <Box sx={{ width: "100%", height: 260 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={grievanceData}
                                                        dataKey="value"
                                                        nameKey="name"
                                                        outerRadius={90}
                                                        label={({ name, value }) => `${name}: ${value}`}
                                                    >
                                                        {grievanceData.map((item, idx) => (
                                                            <Cell key={idx} fill={item.color} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </Box>

                                        <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 2 }}>
                                            {grievanceData.map((item, i) => (
                                                <Typography
                                                    key={i}
                                                    variant="caption"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: 10,
                                                            height: 10,
                                                            borderRadius: "50%",
                                                            bgcolor: item.color,
                                                            mr: 1,
                                                        }}
                                                    />
                                                    {item.name}
                                                </Typography>
                                            ))}
                                        </Box>
                                    </Card>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Card sx={{ p: 2.5, borderRadius: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            RTI Applications
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 2 }}
                                        >
                                            Monthly RTI requests
                                        </Typography>

                                        <Box sx={{ width: "100%", height: 260 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={rtiTrend}>
                                                    <XAxis dataKey="month" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="applications"
                                                        stroke="#14B8A6"
                                                        strokeWidth={3}
                                                        dot
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Card>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Card sx={{ p: 2.5, borderRadius: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            Asset Utilization
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 2 }}
                                        >
                                            Assets by category
                                        </Typography>

                                        <Box sx={{ width: "100%", height: 260 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={assetData}>
                                                    <XAxis dataKey="category" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar
                                                        dataKey="total"
                                                        fill="#3B82F6"
                                                        radius={[6, 6, 0, 0]}
                                                    />
                                                    <Bar
                                                        dataKey="allocated"
                                                        fill="#10B981"
                                                        radius={[6, 6, 0, 0]}
                                                    />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Card>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Card sx={{ p: 2.5, borderRadius: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            Legal Cases Status
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 2 }}
                                        >
                                            Active and closed cases
                                        </Typography>

                                        <Box sx={{ width: "100%", height: 260 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={legalCases}
                                                        dataKey="value"
                                                        nameKey="name"
                                                        outerRadius={90}
                                                        label={({ name, value }) => `${name}: ${value}`}
                                                    >
                                                        {legalCases.map((item, idx) => (
                                                            <Cell key={idx} fill={item.color} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </Box>

                                        <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 2 }}>
                                            {legalCases.map((item, i) => (
                                                <Typography
                                                    key={i}
                                                    variant="caption"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: 10,
                                                            height: 10,
                                                            borderRadius: "50%",
                                                            bgcolor: item.color,
                                                            mr: 1,
                                                        }}
                                                    />
                                                    {item.name}
                                                </Typography>
                                            ))}
                                        </Box>
                                    </Card>
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                )}

                {/* REPORT GENERATOR TAB */}
                {activeTab === "generator" && (
                    <Box sx={{ mt: 2 }}>
                        <Card
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                mb: 4,
                                boxShadow: "0 2px 10px rgba(15,23,42,0.04)",
                                border: "1px solid #e5e7eb",
                            }}
                        >
                            {/* Header inside card */}
                            <Box
                                sx={{
                                    mb: 3,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 0.5,
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 700, display: "flex", alignItems: "center" }}>
                                    <Box
                                        sx={{
                                            display: "inline-flex",
                                            mr: 1,
                                            width: 26,
                                            height: 26,
                                            borderRadius: "50%",
                                            bgcolor: "#e0f2f1",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <DescriptionOutlinedIcon sx={{ fontSize: 18, color: "#0f5f63" }} />
                                    </Box>
                                    Generate Custom Report
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Select filters and criteria to generate comprehensive reports
                                </Typography>
                            </Box>

                            <Grid container spacing={3}>
                                {/* Report Type */}
                                <Grid size={{ xs: 12 }}>
                                    <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                                        Report Type <span style={{ color: "black" }}>*</span>
                                    </Typography>
                                    <TextField
                                        select
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        SelectProps={{ displayEmpty: true }}
                                        defaultValue=""
                                        placeholder="Select report type"
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2,
                                                bgcolor: "#ffffff",
                                            },
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>Select report type</em>
                                        </MenuItem>
                                        <MenuItem value="institute">Institute Registration</MenuItem>
                                        <MenuItem value="staff">Staff Summary</MenuItem>
                                        <MenuItem value="student">Student Enrollment</MenuItem>
                                        <MenuItem value="academic">Academic Performance</MenuItem>
                                        <MenuItem value="noc">NOC Applications</MenuItem>
                                        <MenuItem value="grievance">Grievances Report</MenuItem>
                                        <MenuItem value="rti">RTI Applications</MenuItem>
                                        <MenuItem value="asset">Asset Uitlzation</MenuItem>
                                        <MenuItem value="report">Comprehensive Report</MenuItem>
                                    </TextField>
                                </Grid>

                                {/* Date range */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography sx={{ mb: 0.5, fontWeight: 600 }}>
                                        Date From
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        placeholder="Pick a date"
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2,
                                                bgcolor: "#ffffff",
                                            },
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <CalendarTodayOutlinedIcon
                                                    sx={{ fontSize: 18, mr: 1, color: "text.secondary" }}
                                                />
                                            ),
                                        }}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography sx={{ mb: 0.5, fontWeight: 600 }}>
                                        Date To
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        placeholder="Pick a date"
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2,
                                                bgcolor: "#ffffff",
                                            },
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <CalendarTodayOutlinedIcon
                                                    sx={{ fontSize: 18, mr: 1, color: "text.secondary" }}
                                                />
                                            ),
                                        }}
                                    />
                                </Grid>

                                {/* Region + University */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography sx={{ fontWeight: 600, mb: 0.5 }}>Region</Typography>
                                    <TextField
                                        select
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        SelectProps={{ displayEmpty: true }}
                                        defaultValue=""
                                        placeholder="Select region"
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2,
                                                bgcolor: "#ffffff",
                                            },
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>Select region</em>
                                        </MenuItem>
                                    </TextField>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography sx={{ fontWeight: 600, mb: 0.5 }}>University</Typography>
                                    <TextField
                                        select
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        SelectProps={{ displayEmpty: true }}
                                        defaultValue=""
                                        placeholder="Select university"
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2,
                                                bgcolor: "#ffffff",
                                            },
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>Select university</em>
                                        </MenuItem>
                                    </TextField>
                                </Grid>

                                {/* Course + Category */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography sx={{ fontWeight: 600, mb: 0.5 }}>Course</Typography>
                                    <TextField
                                        select
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        SelectProps={{ displayEmpty: true }}
                                        defaultValue=""
                                        placeholder="Select course"
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2,
                                                bgcolor: "#ffffff",
                                            },
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>Select course</em>
                                        </MenuItem>
                                    </TextField>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography sx={{ fontWeight: 600, mb: 0.5 }}>Category</Typography>
                                    <TextField
                                        select
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        SelectProps={{ displayEmpty: true }}
                                        defaultValue=""
                                        placeholder="Select category"
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2,
                                                bgcolor: "#ffffff",
                                            },
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>Select category</em>
                                        </MenuItem>
                                    </TextField>
                                </Grid>

                                {/* Export format */}
                                <Grid size={{ xs: 12 }}>
                                    <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                                        Export Format <span style={{ color: "black" }}>*</span>
                                    </Typography>
                                    <TextField
                                        select
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        defaultValue="pdf"
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2,
                                                bgcolor: "#ffffff",
                                            },
                                        }}
                                    >
                                        <MenuItem value="pdf">PDF Document</MenuItem>
                                    </TextField>
                                </Grid>

                                {/* Buttons */}
                                <Grid size={{ xs: 12 }}>
                                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            startIcon={<CloudDownloadOutlinedIcon />}
                                            sx={{
                                                textTransform: "none",
                                                borderRadius: 2,
                                                bgcolor: "#0f5f63",
                                                py: 1.2,
                                                fontWeight: 600,
                                                "&:hover": {
                                                    bgcolor: "#0d4e52",
                                                },
                                            }}
                                        >
                                            Generate Report
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                textTransform: "none",
                                                borderRadius: 2,
                                                px: 3,
                                                fontWeight: 500,
                                            }}
                                        >
                                            Clear Filters
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Card>

                        {/* Quick report templates */}
                        <Box>
                            <Card
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    border: "1px solid #e5e7eb",
                                    boxShadow: "0 2px 10px rgba(15,23,42,0.04)",
                                }}
                            >
                                <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
                                    Quick Report Templates
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 2 }}
                                >
                                    Generate commonly used reports with pre-configured filters
                                </Typography>

                                <Stack
                                    direction={{ xs: "column", md: "row" }}
                                    spacing={2}
                                >
                                    {reports.map((label) => (
                                        <Box
                                            key={label}
                                            sx={{
                                                flex: 1,                // ⭐ makes all boxes wide & equal
                                                border: "1px solid #e5e7eb",
                                                borderRadius: 2,
                                                px: 2,
                                                py: 1.6,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1.5,
                                                cursor: "pointer",
                                                bgcolor: "#ffffff",
                                                transition: "all 0.2s ease",
                                                "&:hover": {
                                                    boxShadow: "0 6px 16px rgba(15,23,42,0.08)",
                                                    borderColor: "#d1d5db",
                                                    bgcolor: "#f9fafb",
                                                },
                                            }}
                                        >
                                            <DescriptionOutlinedIcon
                                                sx={{
                                                    fontSize: 20,
                                                    color: "text.secondary",
                                                }}
                                            />
                                            <Typography sx={{ fontWeight: 600 }}>
                                                {label}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </Card>
                        </Box>
                    </Box>
                )}
            </Box>
        </MainLayout>
    );
}
