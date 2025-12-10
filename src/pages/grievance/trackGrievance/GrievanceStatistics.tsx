import { Paper, Box, Typography } from "@mui/material";

export default function GrievanceStatistics() {
    const stats = [
        { label: "Total", value: 20 },
        { label: "Submitted", value: 0 },
        { label: "Under Investigation", value: 6 },
        { label: "Pending", value: 7 },
        { label: "Resolved", value: 6 },
        { label: "Closed", value: 1 },
    ];

    return (
        <Paper
            sx={{
                p: 3,
                mt: 4,
                borderRadius: 3,
                boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Grievance Statistics
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent:"space-between",
                    flexWrap: "wrap",
                }}
            >
                {stats.map((item) => (
                    <Box
                        key={item.label}
                        sx={{
                            flex: "0 0 auto",
                            width: 180,
                            p: 2,
                            borderRadius: 2,
                            border: "1px solid #e8eeee",
                            textAlign: "left",
                            background: "#ffffff",
                        }}
                    >
                        <Typography sx={{ fontWeight: 700, fontSize: 22 }}>
                            {item.value}
                        </Typography>
                        <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
                            {item.label}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Paper>
    );
}
