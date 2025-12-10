import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import type { ResearchGuide } from "../../data/data.ts";

const COLORS = ["#2563eb", "#f59e0b", "#16a34a"]; // Blue = Guides, Orange = Reg, Green = Completed

type Props = {
    rows: ResearchGuide[];
};

export default function ResearchCharts({ rows }: Props) {
    /* =============================
       DEPARTMENT WISE BAR DATA
    ============================= */
    const departmentSummary = rows.reduce((map, r) => {
        if (!map[r.department]) {
            map[r.department] = { guides: 0, registered: 0, completed: 0 };
        }
        map[r.department].guides += 1;
        map[r.department].registered += r.registered;
        map[r.department].completed += r.completed;
        return map;
    }, {} as Record<string, { guides: number; registered: number; completed: number }>);

    const barData = Object.keys(departmentSummary).map((dep) => ({
        name: dep,
        guides: departmentSummary[dep].guides,
        registered: departmentSummary[dep].registered,
        completed: departmentSummary[dep].completed,
    }));

    /* =============================
       PROGRAM PIE DATA
    ============================= */
    const programData = [
        { name: "PhD", value: rows.filter((r) => r.program === "PHD").length },
        { name: "M.Phil", value: rows.filter((r) => r.program === "MPHIL").length },
    ];

    /* =============================
       GENDER-WISE BAR DATA
    ============================= */
    const totalMale = rows.reduce((s, r) => s + r.gender.male, 0);
    const totalFemale = rows.reduce((s, r) => s + r.gender.female, 0);

    const genderBarData = [
        {
            name: "Male",
            registered: totalMale,
            completed: rows.reduce((s, r) => s + r.gender.completedMale, 0) || 0,
        },
        {
            name: "Female",
            registered: totalFemale,
            completed: rows.reduce((s, r) => s + r.gender.completedFemale, 0) || 0,
        },
    ];

    /* =============================
        DEPARTMENT LIST TABLE DATA
    ============================= */
    const departmentList = Object.keys(departmentSummary).map((d) => {
        const reg = departmentSummary[d].registered;
        const com = departmentSummary[d].completed;
        const pct = reg === 0 ? 0 : ((com / reg) * 100).toFixed(1);

        return {
            dep: d,
            reg,
            com,
            pct,
            guides: departmentSummary[d].guides,
        };
    });

    return (
        <Grid container spacing={3}>
            {/* ================= DEPARTMENT BAR ================= */}
            <Grid size={{ xs: 12 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" fontWeight={700} mb={1}>
                            Department-wise Research Activity
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            Guides and students by department
                        </Typography>

                        <Box sx={{ height: 360 }}>
                            <ResponsiveContainer>
                                <BarChart data={barData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />

                                    <Bar dataKey="guides" fill={COLORS[0]} name="Guides" />
                                    <Bar dataKey="registered" fill={COLORS[1]} name="Registered" />
                                    <Bar dataKey="completed" fill={COLORS[2]} name="Completed" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* ================= PIE + BAR ================= */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" fontWeight={700} mb={1}>
                            Program Type Distribution
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            PhD vs M.Phil guides
                        </Typography>

                        <Box sx={{ height: 300 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={programData} dataKey="value" outerRadius={120} label>
                                        <Cell fill="#2563eb" />
                                        <Cell fill="#9333ea" />
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" fontWeight={700} mb={1}>
                            Gender-wise Student Distribution
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            Registered vs Completed by gender
                        </Typography>

                        <Box sx={{ height: 300 }}>
                            <ResponsiveContainer>
                                <BarChart data={genderBarData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="registered" fill={COLORS[1]} name="Registered" />
                                    <Bar dataKey="completed" fill={COLORS[2]} name="Completed" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* ================= DEPARTMENT LIST ================= */}
            <Grid size={{ xs: 12 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" fontWeight={700} mb={1}>
                            Department-wise Statistics
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            Detailed breakdown by department
                        </Typography>

                        {departmentList.map((d) => (
                            <Box
                                key={d.dep}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    p: 1.5,
                                    borderBottom: "1px solid #e5e7eb",
                                }}
                            >
                                <Typography fontWeight={600}>{d.dep}</Typography>

                                <Box sx={{ display: "flex", gap: 4 }}>
                                    <Typography>Registered: {d.reg}</Typography>
                                    <Typography sx={{ color: "#16a34a" }}>
                                        Completed: {d.com}
                                    </Typography>
                                    <Typography>Rate: {d.pct}%</Typography>
                                    <Typography>{d.guides} guides</Typography>
                                </Box>
                            </Box>
                        ))}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
