import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import type { ScholarshipRow } from "../../../types/scholarship";

const COLORS = ["#2563eb", "#9333ea", "#facc15", "#16a34a", "#dc2626", "#34d399"];

type Props = { rows: ScholarshipRow[] };

export default function ScholarshipCharts({ rows }: Props) {

    const yearMap: Record<string, { beneficiaries: number; amount: number }> = {};

    rows.forEach((r) => {
        if (!yearMap[r.year]) {
            yearMap[r.year] = { beneficiaries: 0, amount: 0 };
        }
        yearMap[r.year].beneficiaries += r.beneficiaries;
        yearMap[r.year].amount += r.totalAmount;
    });

    const yearTrendData = Object.entries(yearMap).map(([year, x]) => ({
        year,
        beneficiaries: x.beneficiaries,
        amount: +(x.amount / 100000).toFixed(1),
    }));

    const typeMap: Record<string, number> = {};

    rows.forEach((r) => {
        typeMap[r.type] = (typeMap[r.type] || 0) + r.beneficiaries;
    });

    const typeData = Object.entries(typeMap).map(([name, value]) => ({
        name,
        value,
    }));

  
    const categoryMap: Record<string, number> = {};

    rows.forEach((r) => {
        categoryMap[r.category] = (categoryMap[r.category] || 0) + r.beneficiaries;
    });

    const categoryData = Object.entries(categoryMap).map(([category, total]) => ({
        category,
        total,
    }));

    const totalMale = rows.reduce((s, r) => s + r.gender.male, 0);
    const totalFemale = rows.reduce((s, r) => s + r.gender.female, 0);

    const genderData = [
        { name: "Male", value: totalMale },
        { name: "Female", value: totalFemale },
    ];

    const amountByTypeMap: Record<string, number> = {};

    rows.forEach((r) => {
        amountByTypeMap[r.type] = (amountByTypeMap[r.type] || 0) + r.totalAmount;
    });

    const amountSummary = Object.entries(amountByTypeMap).map(([type, total]) => ({
        type,
        total,
        scholarships: rows.filter((r) => r.type === type).length,
    }));


    return (
        <Grid container spacing={3}>
            <Grid size={{xs:12}}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" fontWeight={700} mb={1}>
                            Year-wise Scholarship Trend
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            Beneficiaries and amounts across academic years
                        </Typography>

                        <Box sx={{ height: 360 }}>
                            <ResponsiveContainer>
                                <BarChart data={yearTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="beneficiaries" fill="#2563eb" name="Beneficiaries" />
                                    <Bar dataKey="amount" fill="#16a34a" name="Amount (Lakhs)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

             <Grid size={{xs:12,md:6}}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" fontWeight={700} mb={1}>
                            Type-wise Distribution
                        </Typography>

                        <Box sx={{ height: 300 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={typeData} dataKey="value" outerRadius={120} label>
                                        {typeData.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

             <Grid size={{xs:12,md:6}}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" fontWeight={700} mb={1}>
                            Category-wise Beneficiaries
                        </Typography>

                        <Box sx={{ height: 300 }}>
                            <ResponsiveContainer>
                                <BarChart layout="vertical" data={categoryData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis dataKey="category" type="category" width={120} />
                                    <Tooltip />
                                    <Bar dataKey="total" fill="#9333ea" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

             <Grid size={{xs:12,md:6}}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" fontWeight={700} mb={1}>
                            Gender-wise Distribution
                        </Typography>

                        <Box sx={{ height: 300 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={genderData} dataKey="value" outerRadius={120} label>
                                        <Cell fill="#2563eb" />
                                        <Cell fill="#dc2626" />
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

             <Grid size={{xs:12,md:6}}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" fontWeight={700} mb={2}>
                            Amount by Type
                        </Typography>

                        {amountSummary.map((x, i) => (
                            <Box
                                key={i}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    py: 1,
                                    borderBottom: "1px solid #eef",
                                }}
                            >
                                <Typography>{x.type}</Typography>
                                <Typography fontWeight={600} sx={{ color: "#16a34a" }}>
                                    ₹{x.total.toLocaleString("en-IN")}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {x.scholarships} scholarships
                                </Typography>
                            </Box>
                        ))}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
