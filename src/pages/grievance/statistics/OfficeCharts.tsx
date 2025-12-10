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
    office: string;
    name: string;
    category: string;
    nature: string;
    date: string;
    status: string;
};

const sampleGrievances: Grievance[] = [
    { id: "1", office: "Accounts Department", name: "", category: "", nature: "", date: "", status: "" },
    { id: "2", office: "HR Department", name: "", category: "", nature: "", date: "", status: "" },
    { id: "3", office: "Administration", name: "", category: "", nature: "", date: "", status: "" },
    { id: "4", office: "Administration", name: "", category: "", nature: "", date: "", status: "" },
    { id: "5", office: "Administration", name: "", category: "", nature: "", date: "", status: "" },
    { id: "6", office: "Establishment Section", name: "", category: "", nature: "", date: "", status: "" },
    { id: "7", office: "Welfare Department", name: "", category: "", nature: "", date: "", status: "" },
    { id: "8", office: "Maintenance Department", name: "", category: "", nature: "", date: "", status: "" },
    { id: "9", office: "Complaints Committee", name: "", category: "", nature: "", date: "", status: "" },
    { id: "10", office: "Training & Development", name: "", category: "", nature: "", date: "", status: "" },
    { id: "11", office: "General Administration", name: "", category: "", nature: "", date: "", status: "" },
    { id: "12", office: "Accounts Department", name: "", category: "", nature: "", date: "", status: "" },
    { id: "13", office: "Accounts Department", name: "", category: "", nature: "", date: "", status: "" },
    { id: "14", office: "Accounts Department", name: "", category: "", nature: "", date: "", status: "" },
    { id: "15", office: "Accounts Department", name: "", category: "", nature: "", date: "", status: "" },
    { id: "16", office: "HR Department", name: "", category: "", nature: "", date: "", status: "" },
    { id: "16", office: "HR Department", name: "", category: "", nature: "", date: "", status: "" },
    { id: "18", office: "Establishment Section", name: "", category: "", nature: "", date: "", status: "" },
    { id: "17", office: "Establishment Section", name: "", category: "", nature: "", date: "", status: "" },
    { id: "18", office: "Welfare Department", name: "", category: "", nature: "", date: "", status: "" },
];

function aggregateByOffice(items: Grievance[]) {
    const map: Record<string, number> = {};

    items.forEach((g) => {
        map[g.office] = (map[g.office] || 0) + 1;
    });

    return Object.entries(map)
        .map(([office, count]) => ({ office, count }))
        .sort((a, b) => b.count - a.count);
}

const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;
    const item = payload[0];
    return (
        <Box
            sx={{
                bgcolor: "white",
                borderRadius: 1,
                p: 1.2,
                border: "1px solid #ddd",
                boxShadow: 2,
            }}
        >
            <Typography sx={{ fontWeight: 600 }}>
                {item.payload.office}
            </Typography>

            <Typography sx={{ color: "#0b5c60", fontWeight: 600 }}>
                Grievances : {item.payload.count}
            </Typography>
        </Box>
    );
};

export default function OfficeGrievanceChart({ grievances = sampleGrievances }: { grievances?: Grievance[] }) {
    const data = useMemo(() => aggregateByOffice(grievances), [grievances]);

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
                Top Offices by Grievance Count
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Offices with most grievances
            </Typography>

            <Box sx={{ width: "100%", height: 400 }}>
                <ResponsiveContainer>
                    <BarChart
                        layout="vertical"
                        data={data}
                        margin={{ left: 30, right: 30 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis type="number" allowDecimals={false} domain={[0, "dataMax + 1"]} />
                        <YAxis
                            dataKey="office"
                            type="category"
                            width={160}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                            dataKey="count"
                            fill="#82d9b4"
                            maxBarSize={30}
                            radius={[6, 6, 6, 6]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
            <Box sx={{ textAlign: "center", mt: 1 }}>
                <Typography sx={{ color: "#82d9b4", fontWeight: 600 }}>
                    Grievances
                </Typography>
            </Box>
        </Paper>
    );
}
