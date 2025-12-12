import React, { useMemo, useState } from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    TextField,
    MenuItem,
    Tabs,
    Tab,
} from "@mui/material";

import ResearchGuidesTable from "./ResearchGuides";
import ResearchCharts from "./ResearchCharts";
import { RESEARCH_GUIDES } from "../../data/data"; 

export default function ResearchModule() {
    const [subTab, setSubTab] = useState("guides");

    const [filters, setFilters] = useState({
        dept: "",
        program: "",
        status: "",
        search: "",
    });

    const handleFilter = (field: string, value: any) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const filteredRows = useMemo(() => {
        let data = [...RESEARCH_GUIDES];

        if (filters.dept) data = data.filter(x => x.department === filters.dept);
        if (filters.program) data = data.filter(x => x.program === filters.program);
        if (filters.status) data = data.filter(x => x.status === filters.status);

        if (filters.search.trim()) {
            const q = filters.search.toLowerCase();
            data = data.filter(x =>
                `${x.name} ${x.department} ${x.subject}`.toLowerCase().includes(q)
            );
        }

        return data;
    }, [filters]);

    const totalGuides = filteredRows.length;

    const totalRegistered = filteredRows.reduce((s, r) => s + r.registered, 0);
    const totalCompleted = filteredRows.reduce((s, r) => s + r.completed, 0);

    const completionRate =
        totalRegistered + totalCompleted === 0
            ? 0
            : (totalCompleted / (totalRegistered + totalCompleted)) * 100;

    const totalMaleReg = filteredRows.reduce((s, r) => s + r.gender.male, 0);
    const totalFemaleReg = filteredRows.reduce((s, r) => s + r.gender.female, 0);

    const totalPH = filteredRows.reduce((s, r) => s + r.ph.total, 0);
    const totalPHCompleted = filteredRows.reduce((s, r) => s + r.ph.completed, 0);

    const totalForeign = filteredRows.reduce((s, r) => s + r.foreign.total, 0);
    const totalForeignCompleted = filteredRows.reduce((s, r) => s + r.foreign.completed, 0);

    return (
        <>
            <Box
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            mb:2
        }}
    >
        <Box>
            <Typography variant="h4" fontWeight={700} mb={0.5}>
                Research Management
            </Typography>
            <Typography color="text.secondary">
                Track PhD and M.Phil guides with student progress
            </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" sx={{ borderRadius: 2 }}>
                Export
            </Button>
            <Button
                variant="contained"
                sx={{ textTransform: "none", borderRadius: 2 ,bgcolor: "#065f46",
                            "&:hover": { bgcolor: "#064e3b" },}}
            >
                + Add Guide
            </Button>
        </Box>
    </Box>

          <Grid container spacing={2} mb={3}>
              <Grid size={{xs:12,md:3}}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle2" color="text.secondary">
                                Total Guides
                            </Typography>
                            <Typography variant="h5" fontWeight={700}>
                                {totalGuides}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

              <Grid size={{xs:12,md:3}}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle2" color="text.secondary">
                                Registered Students
                            </Typography>
                            <Typography variant="h5" fontWeight={700}>
                                {totalRegistered}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

              <Grid size={{xs:12,md:3}}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle2" color="text.secondary">
                                Completed Students
                            </Typography>
                            <Typography variant="h5" fontWeight={700}>
                                {totalCompleted}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

              <Grid size={{xs:12,md:3}}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle2" color="text.secondary">
                                Completion Rate
                            </Typography>
                            <Typography variant="h5" fontWeight={700}>
                                {completionRate.toFixed(1)}%
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

           
            <Grid container spacing={2} mb={3}>
                <Grid size={{xs:12,md:6}}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Gender Distribution
                            </Typography>

                            <Typography sx={{ mt: 1 }}>
                                Male — {totalMaleReg} registered
                            </Typography>
                            <Typography>
                                Female — {totalFemaleReg} registered
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{xs:12,md:6}}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Special Categories
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                Physically Handicapped — {totalPH} registered / {totalPHCompleted} completed
                            </Typography>
                            <Typography>
                                Foreign Students — {totalForeign} registered / {totalForeignCompleted} completed
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" fontWeight={700} mb={1}>
                        Filters
                    </Typography>

                    <Grid container spacing={2} mb={2}>
                      <Grid size={{xs:12,md:3}}>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                label="Department"
                                value={filters.dept}
                                onChange={e => handleFilter("dept", e.target.value)}
                            >
                                <MenuItem value="">All Departments</MenuItem>
                                {[...new Set(RESEARCH_GUIDES.map(g => g.department))].map(d => (
                                    <MenuItem key={d} value={d}>{d}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                      <Grid size={{xs:12,md:3}}>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                label="Program Type"
                                value={filters.program}
                                onChange={e => handleFilter("program", e.target.value)}
                            >
                                <MenuItem value="">All Programs</MenuItem>
                                <MenuItem value="PHD">PhD</MenuItem>
                                <MenuItem value="MPHIL">M.Phil</MenuItem>
                            </TextField>
                        </Grid>

                      <Grid size={{xs:12,md:3}}>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                label="Status"
                                value={filters.status}
                                onChange={e => handleFilter("status", e.target.value)}
                            >
                                <MenuItem value="">All Status</MenuItem>
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                            </TextField>
                        </Grid>

                      <Grid size={{xs:12,md:3}}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Search guides..."
                                value={filters.search}
                                onChange={e => handleFilter("search", e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Tabs value={subTab} onChange={(_, v) => setSubTab(v)} sx={{ mb: 3 }}>
                <Tab value="guides" label="Research Guides" />
                <Tab value="stats" label="Statistics & Charts" />
            </Tabs>

            {subTab === "guides" && <ResearchGuidesTable rows={filteredRows} />}
            {subTab === "stats" && <ResearchCharts rows={filteredRows} />}
        </>
    );
}
