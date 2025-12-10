import { Box, Paper, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function AverageResolutionTime() {
    const averageDays = 13;
    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
                mt: 3,
                boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
                border: "1px solid #e8eeee",
            }}
        >
            <Box display="flex" alignItems="center" gap={1} mb={1}>
                <TrendingUpIcon sx={{ color: "#0b5c60" }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Average Resolution Time
                </Typography>
            </Box>

            <Typography
                sx={{
                    fontSize: 34,
                    fontWeight: 700,
                    color: "#0b5c60",
                    mb: 1,
                }}
            >
                {averageDays} days
            </Typography>

            <Typography sx={{ color: "text.secondary", fontSize: 15 }}>
                Average time taken to resolve grievances
            </Typography>
        </Paper>
    );
}
