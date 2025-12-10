import { Box, Typography } from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

export default function StatisticsBox() {
    
    const stats = [
        { label: "Total Grievances", value: 20, key: "total", icon: <AssignmentIcon />, color: "#1e293b" },
        { label: "Pending", value: 7, key: "pending", icon: <HourglassEmptyIcon />, color: "#e67e22" },
        { label: "Under Investigation", value: 6, key: "investigation", icon: <AccessTimeIcon />, color: "#d4a017" },
        { label: "Resolved", value: 6, key: "resolved", icon: <CheckCircleOutlinedIcon />, color: "#2ecc71" },
    ];

    const total = stats[0].value;

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: { xs: "wrap", md: "nowrap" },
                gap: 0.5,
                mt: 3,
            }}
        >
            {stats.map((item) => (
                <Box
                    key={item.key}
                    sx={{
                        flex: "1 1 auto",    
                        p: 1,            
                        borderRadius: 2,
                        border: "1px solid #e8eeee",
                        background: "#ffffff",
                        minWidth: { xs: "100%", sm: "48%", md: "23%" },
                        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    }}
                >
               
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 1.2,
                        }}
                    >
                        <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                            {item.label}
                        </Typography>

                        <Box sx={{ color: item.color }}>
                            {item.icon}
                        </Box>
                    </Box>

                   
                    <Typography sx={{ fontSize: 30, fontWeight: 700, color: item.color }}>
                        {item.value}
                    </Typography>

                    
                    {item.key !== "total" && (
                        <Typography sx={{ fontSize: 13, mt: 0.5, color: "text.secondary" }}>
                            {((item.value / total) * 100).toFixed(1)}% of total
                        </Typography>
                    )}

                    {item.key === "total" && (
                        <Typography sx={{ fontSize: 13, mt: 0.5, color: "text.secondary" }}>
                            All time
                        </Typography>
                    )}
                </Box>
            ))}
        </Box>
    );
}
