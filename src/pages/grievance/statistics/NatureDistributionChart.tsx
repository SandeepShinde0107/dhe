import { useMemo } from "react";
import { Paper, Box, Typography } from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

type Grievance = {
    id: string;
    name: string;
    emp?: string | null;
    category: "Major" | "Medium" | "Minor";
    nature: string;
    subject: string;
    date: string;
    status: "Resolved" | "Under Investigation" | "Pending";
};

const sampleData: Grievance[] = [
    { id: "1", name: "Rajesh", category: "Major", nature: "Advance", subject: "", date: "", status: "Resolved" },
    { id: "2", name: "Priya", category: "Medium", nature: "Benefits", subject: "", date: "", status: "Under Investigation" },
    { id: "3", name: "Amit", category: "Minor", nature: "Leave", subject: "", date: "", status: "Pending" },
    { id: "4", name: "Amit", category: "Minor", nature: "Leave", subject: "", date: "", status: "Pending" },
    { id: "5", name: "Amit", category: "Minor", nature: "Leave", subject: "", date: "", status: "Pending" },
    { id: "6", name: "Sunita", category: "Major", nature: "Salary", subject: "", date: "", status: "Resolved" },
    { id: "7", name: "Vikram", category: "Medium", nature: "Promotion", subject: "", date: "", status: "Under Investigation" },
    { id: "8", name: "Vikram", category: "Medium", nature: "Promotion", subject: "", date: "", status: "Under Investigation" },
    { id: "9", name: "Vik", category: "Medium", nature: "Transfer", subject: "", date: "", status: "Under Investigation" },
    { id: "9", name: "Rahul", category: "Major", nature: "Harassment", subject: "", date: "", status: "Under Investigation" },
    { id: "9", name: "Rahul", category: "Major", nature: "Harassment", subject: "", date: "", status: "Under Investigation" },
    { id: "10", name: "Meera", category: "Medium", nature: "Benefits", subject: "", date: "", status: "Pending" },
    { id: "11", name: "Suresh", category: "Minor", nature: "Other", subject: "", date: "", status: "Pending" },
];

function aggregateByNature(items: Grievance[]) {
    const map: Record<string, number> = {};
    items.forEach((g) => {
        map[g.nature] = (map[g.nature] || 0) + 1;
    });

    const order = [
        "Advance",
        "Benefits",
        "Leave",
        "Salary",
        "Promotion",
        "Transfer",
        "Working Condition",
        "Harassment",
        "Other",
    ];

    return order
        .filter((n) => map[n])
        .map((n) => ({
            nature: n,
            count: map[n],
        }));
}

const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;
    const item = payload[0];

    return (
        <Box
            sx={{
                bgcolor: "white",
                borderRadius: 1,
                p: 1,
                border: "1px solid #ddd",
                boxShadow: 2,
            }}
        >
            <Typography sx={{ fontWeight: 600 }}>{item.payload.nature}</Typography>
            <Typography sx={{ color: "gray" }}>Count: {item.payload.count}</Typography>
        </Box>
    );
};

export default function NatureDistributionChart({ grievances = sampleData }: { grievances?: Grievance[] }) {
    const data = useMemo(() => aggregateByNature(grievances), [grievances]);

    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #e8eeee",
                mt: 3,
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Grievances by Nature
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Distribution of grievances by type
            </Typography>

            <Box sx={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

                        <XAxis
                            dataKey="nature"
                            angle={-40}
                            textAnchor="end"
                            height={80}
                            interval={0}
                        />

                        <YAxis allowDecimals={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="count" fill="#9b8ff5" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
            <Box sx={{ textAlign: "center", mt: 1 }}>
                <Typography sx={{ color: "#9b8ff5", fontWeight: 600 }}>Count</Typography>
            </Box>
        </Paper>
    );
}
