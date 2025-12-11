import { Card, Grid, Typography } from "@mui/material";

export default function Systemfeatures() {

    return (
        <Card
            sx={{
                mt: 4,
                p: 3,
                borderRadius: 3,
                bgcolor: "#f7f9fa",
            }}
        >
            <Typography variant="h6" fontWeight={700} mb={2}>
                System Features:
            </Typography>

            <Grid container spacing={4}>
              
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography fontWeight={700} mb={1}>
                        Asset Management
                    </Typography>
                    <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: "1.8" }}>
                        <li>Create and edit assets with complete details</li>
                        <li>Track purchase information and warranties</li>
                        <li>Automatic depreciation calculation</li>
                        <li>Filter and search capabilities</li>
                        <li>Asset status and condition tracking</li>
                    </ul>
                </Grid>

               
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography fontWeight={700} mb={1}>
                        Allocation & Reporting
                    </Typography>
                    <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: "1.8" }}>
                        <li>Allocate assets to staff members</li>
                        <li>Track usage patterns and history</li>
                        <li>Real-time utilization statistics</li>
                        <li>Interactive charts and visualizations</li>
                        <li>Depreciation summaries and reports</li>
                    </ul>
                </Grid>
            </Grid>
        </Card>

    )
}