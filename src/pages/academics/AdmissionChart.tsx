import React, { useMemo } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
} from "@mui/material";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from "recharts";

type Row = {
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

type Props = {
    rows: Row[];
};

// Colors for category distribution
const COLORS = ["#2563eb", "#a855f7", "#16a34a", "#f97316", "#e11d48", "#06b6d4", "#8b5cf6"];

export default function AdmissionCharts({ rows }: Props) {
    /** ---------------- YEAR-WISE TREND ---------------- **/
    const yearlyTotals = useMemo(() => {
        const map: Record<string, number> = {};
        rows.forEach(r => {
            map[r.year] = (map[r.year] || 0) + r.total;
        });

        return Object.keys(map).map(y => ({
            year: y,
            total: map[y],
        }));
    }, [rows]);

    /** ---------------- COURSE-WISE BAR ---------------- **/
    const barData = useMemo(
        () =>
            rows.map((r) => ({
                name: r.course,
                total: r.total,
            })),
        [rows]
    );

    /** ---------------- CATEGORY BREAKDOWN ---------------- **/
    // Convert each student into category share
    // (Assuming category logic: General = remaining)
    const categoryTotals = useMemo(() => {
        const totals = {
            General: 0,
            OBC: 0,
            SC: 0,
            ST: 0,
            EBC: 0,
            VJNT: 0,
            NT: 0,
        };

        rows.forEach(r => {
            totals.OBC += r.minority; // minority we treat as OBC
            totals.ST += r.foreign; // dummy grouping
            totals.SC += r.ph;
            totals.EBC += r.nri;
            totals.VJNT += r.foreign;
            totals.NT += r.ph;

            // General = remaining
            totals.General += r.total -
                (r.minority + r.ph + r.nri + r.foreign);
        });

        return totals;
    }, [rows]);

    const categoryPie = Object.keys(categoryTotals).map(k => ({
        name: k,
        value: categoryTotals[k as keyof typeof categoryTotals],
    }));

    const totalStudents = categoryPie.reduce((s, r) => s + r.value, 0);

    /** ---------------- GENDER DISTRIBUTION ---------------- **/
    const genderTotals = useMemo(() => {
        let m = 0, f = 0, o = 0;
        rows.forEach(r => {
            m += r.gender.male;
            f += r.gender.female;
            o += r.gender.other;
        });
        return [
            { name: "Male", value: m },
            { name: "Female", value: f },
            { name: "Other", value: o },
        ];
    }, [rows]);

    return (
        <Grid container spacing={3}>
            {/* =================== YEAR-WISE TREND =================== */}
            <Grid size={{xs:12}}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" fontWeight={700}>
                            Year-wise Admission Trend
                        </Typography>
                        <Typography variant="body2" mb={2}>
                            Admission trends across academic years
                        </Typography>

                        <Box sx={{ width: "100%", height: 350 }}>
                            <ResponsiveContainer>
                                <LineChart data={yearlyTotals}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="total"
                                        stroke="#2563eb"
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* =================== COURSE-WISE BAR =================== */}
            <Grid size={{xs:12,md:6}}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" fontWeight={700}>
                            Course-wise Distribution
                        </Typography>
                        <Typography variant="body2" mb={2}>
                            Admissions by course
                        </Typography>

                        <Box sx={{ width: "100%", height: 330 }}>
                            <ResponsiveContainer>
                                <BarChart data={barData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="total" fill="#8b5cf6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* =================== CATEGORY PIE =================== */}
            <Grid size={{xs:12,md:6}}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" fontWeight={700}>
                            Category-wise Distribution
                        </Typography>
                        <Typography variant="body2" mb={1}>
                            Admissions by category
                        </Typography>

                        <Box sx={{ width: "100%", height: 330 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={categoryPie}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={120}
                                        label
                                    >
                                        {categoryPie.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* =================== GENDER PIE =================== */}
            <Grid size={{xs:12,md:6}}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" fontWeight={700}>
                            Gender-wise Distribution
                        </Typography>
                        <Typography variant="body2" mb={1}>
                            Admissions by gender
                        </Typography>

                        <Box sx={{ width: "100%", height: 330 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={genderTotals}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={120}
                                        label
                                    >
                                        <Cell fill="#2563eb" />
                                        <Cell fill="#dc2626" />
                                        <Cell fill="#facc15" />
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* =================== CATEGORY BREAKDOWN =================== */}
            <Grid size={{xs:12,md:6}}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" fontWeight={700}>
                            Category Breakdown
                        </Typography>
                        <Typography variant="body2" mb={1}>
                            Detailed category-wise statistics
                        </Typography>

                        {categoryPie.map((c, i) => {
                            const pct = ((c.value / totalStudents) * 100).toFixed(1);
                            return (
                                <Box
                                    key={i}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        py: 0.6,
                                    }}
                                >
                                    <Typography>{c.name}</Typography>
                                    <Typography fontWeight={600}>
                                        {c.value} ({pct}%)
                                    </Typography>
                                </Box>
                            );
                        })}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
