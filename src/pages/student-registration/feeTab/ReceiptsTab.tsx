import React from "react";
import { Box, Card, Typography, Grid } from "@mui/material";

export default function ReceiptsTab() {
    const receipts: any[] = []; 

    return (
        <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600}>
                Fee Receipts
            </Typography>

            <Typography color="text.secondary" mb={3}>
                Download and view your fee receipts
            </Typography>
            <Grid container sx={{ fontWeight: 600, mb: 1 }}>
                <Grid size={{ xs:2}}>Receipt No.</Grid>
                 <Grid size={{xs:2}}>Date</Grid>
                 <Grid size={{xs:2}}>Amount</Grid>
                 <Grid size={{xs:2}}>Payment Mode</Grid>
                 <Grid size={{xs:4}}>Actions</Grid>
            </Grid>
            <Box
                sx={{
                    borderBottom: "1px solid #eee",
                    mb: 2,
                }}
            ></Box>
            {receipts.length === 0 && (
                <Typography
                    color="text.secondary"
                    textAlign="center"
                    py={4}
                >
                    No receipts available
                </Typography>
            )}
        </Card>
    );
}
