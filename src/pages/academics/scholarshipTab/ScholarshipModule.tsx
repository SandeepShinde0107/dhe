import React, { useMemo, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    TextField,
    MenuItem,
    Tabs,
    Tab,
    Grid,
} from "@mui/material";

import ScholarshipTable from "./ScholarshipTable";
import ScholarshipCharts from "./ScholarshipCharts";
import type { ScholarshipRow } from "../../../types/scholarship"; 

const DUMMY_SCHOLARSHIPS: ScholarshipRow[] = [
    {
        name: "Post Matric Scholarship for SC Students",
        type: "Government",
        agency: "Ministry of Social Justice and Empowerment",
        year: "2023-24",
        beneficiaries: 245,
        gender: { male: 120, female: 125 },
        category: "SC",
        totalAmount: 7350000,
        perStudent: 30000,
    },
    {
        name: "Post Matric Scholarship for ST Students",
        type: "Government",
        agency: "Ministry of Tribal Affairs",
        year: "2023-24",
        beneficiaries: 89,
        gender: { male: 45, female: 44 },
        category: "ST",
        totalAmount: 2670000,
        perStudent: 30000,
    },
    {
        name: "Post Matric Scholarship for OBC Students",
        type: "Government",
        agency: "Ministry of Social Justice and Empowerment",
        year: "2023-24",
        beneficiaries: 312,
        gender: { male: 155, female: 157 },
        category: "OBC",
        totalAmount: 9360000,
        perStudent: 30000,
    },
    {
        name: "National Means-cum-Merit Scholarship",
        type: "Government",
        agency: "Ministry of Education",
        year: "2023-24",
        beneficiaries: 156,
        gender: { male: 80, female: 76 },
        category: "General",
        totalAmount: 1872000,
        perStudent: 12000,
    },
    {
        name: "EBC Scholarship Scheme",
        type: "Government",
        agency: "Government of Maharashtra",
        year: "2023-24",
        beneficiaries: 134,
        gender: { male: 65, female: 69 },
        category: "EBC",
        totalAmount: 4020000,
        perStudent: 30000,
    },
    {
        name: "VJNT Scholarship Scheme",
        type: "Government",
        agency: "Government of Maharashtra",
        year: "2023-24",
        beneficiaries: 78,
        gender: { male: 38, female: 40 },
        category: "VJNT",
        totalAmount: 2340000,
        perStudent: 30000,
    },
    {
        name: "Prime Minister Scholarship Scheme",
        type: "Government",
        agency: "Ministry of Defence",
        year: "2023-24",
        beneficiaries: 23,
        gender: { male: 12, female: 11 },
        category: "General",
        totalAmount: 552000,
        perStudent: 24000,
    },
    {
        name: "Merit-cum-Means Scholarship",
        type: "Institutional",
        agency: "Institute Trust Fund",
        year: "2023-24",
        beneficiaries: 189,
        gender: { male: 95, female: 94 },
        category: "General",
        totalAmount: 3780000,
        perStudent: 20000,
    },
    {
        name: "Sports Excellence Scholarship",
        type: "Institutional",
        agency: "Institute Sports Committee",
        year: "2023-24",
        beneficiaries: 45,
        gender: { male: 28, female: 17 },
        category: "General",
        totalAmount: 1350000,
        perStudent: 30000,
    },
    {
        name: "Academic Excellence Award",
        type: "Institutional",
        agency: "Institute Academic Council",
        year: "2023-24",
        beneficiaries: 67,
        gender: { male: 34, female: 33 },
        category: "General",
        totalAmount: 2010000,
        perStudent: 30000,
    },
];

export default function ScholarshipModule() {
    const [tab, setTab] = useState("data");

    const [filters, setFilters] = useState({
        year: "",
        type: "",
        agency: "",
        search: "",
    });

    const handleFilter = (k: string, v: any) =>
        setFilters(prev => ({ ...prev, [k]: v }));

    const filteredRows = useMemo(() => {
        let data = [...DUMMY_SCHOLARSHIPS];

        if (filters.year) data = data.filter(r => r.year === filters.year);
        if (filters.type) data = data.filter(r => r.type === filters.type);
        if (filters.agency) data = data.filter(r => r.agency === filters.agency);

        if (filters.search.trim()) {
            const q = filters.search.toLowerCase();
            data = data.filter(r =>
                `${r.name} ${r.type} ${r.agency}`.toLowerCase().includes(q)
            );
        }
        return data;
    }, [filters]);

    const totalScholarships = filteredRows.length;
    const totalBeneficiaries = filteredRows.reduce((s, r) => s + r.beneficiaries, 0);
    const totalAmount = filteredRows.reduce((s, r) => s + r.totalAmount, 0);
    const average = totalBeneficiaries
        ? Math.round(totalAmount / totalBeneficiaries)
        : 0;

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h5" fontWeight={700}>
                    Scholarship Tracking
                </Typography>

                <Box sx={{ display: "flex", gap: 1, }}>
                    <Button variant="outlined">Export</Button>
                    <Button variant="contained" sx={{
                        bgcolor: "#065f46",
                        "&:hover": { bgcolor: "#064e3b" },
                    }}>+ Add Scholarship</Button>
                </Box>
            </Box>

            <Grid container spacing={2} mb={3}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Card><CardContent>
                        <Typography fontWeight={600}>Total Scholarships</Typography>
                        <Typography variant="h5">{totalScholarships}</Typography>
                    </CardContent></Card>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Card><CardContent>
                        <Typography fontWeight={600}>Total Beneficiaries</Typography>
                        <Typography variant="h5">{totalBeneficiaries}</Typography>
                    </CardContent></Card>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Card><CardContent>
                        <Typography fontWeight={600}>Total Amount</Typography>
                        <Typography variant="h5">
                            ₹{totalAmount.toLocaleString("en-IN")}
                        </Typography>
                    </CardContent></Card>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Card><CardContent>
                        <Typography fontWeight={600}>Avg Per Student</Typography>
                        <Typography variant="h5">
                            ₹{average.toLocaleString("en-IN")}
                        </Typography>
                    </CardContent></Card>
                </Grid>
            </Grid>

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography fontWeight={700} mb={2}>
                        Filters
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField select fullWidth size="small" label="Academic Year"
                                value={filters.year}
                                onChange={e => handleFilter("year", e.target.value)}>
                                <MenuItem value="">All Years</MenuItem>
                                <MenuItem value="2023-24">2023-24</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField select fullWidth size="small" label="Scholarship Type"
                                value={filters.type}
                                onChange={e => handleFilter("type", e.target.value)}>
                                <MenuItem value="">All Types</MenuItem>
                                <MenuItem value="Government">Government</MenuItem>
                                <MenuItem value="Institutional">Institutional</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField select fullWidth size="small" label="Funding Agency"
                                value={filters.agency}
                                onChange={e => handleFilter("agency", e.target.value)}>
                                <MenuItem value="">All Agencies</MenuItem>
                                {[...new Set(DUMMY_SCHOLARSHIPS.map(r => r.agency))].map(a => (
                                    <MenuItem key={a} value={a}>{a}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField fullWidth size="small" placeholder="Search scholarships…"
                                value={filters.search}
                                onChange={e => handleFilter("search", e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
                <Tab value="data" label="Scholarship Data" />
                <Tab value="charts" label="Statistics & Charts" />
            </Tabs>

            {tab === "data" && <ScholarshipTable rows={filteredRows} />}
            {tab === "charts" && <ScholarshipCharts rows={filteredRows} />}
        </>
    );
}
