import React from "react";
import { Box, Card, Typography, Grid, Chip } from "@mui/material";

export default function PaymentHistoryTab() {
    const payments = [
        {
            id: "TXN2024001",
            date: "15 Jul 2024",
            amount: 35000,
            mode: "ONLINE",
            status: "Completed",
        },
        {
            id: "TXN2024002",
            date: "10 Aug 2024",
            amount: 20000,
            mode: "ONLINE",
            status: "Completed",
        },
    ];

    const currency = (n: number) =>
        "₹" + n.toLocaleString("en-IN");

    return (
        <Card sx={{ p: 3, borderRadius: 3 }}>
           <Typography variant="h6" fontWeight={600}>
                Payment History
            </Typography>
            <Typography color="text.secondary" mb={3}>
                View all your payment transactions
            </Typography>

            <Grid container sx={{ fontWeight: 600, mb: 1 }}>
                <Grid size={{xs:3}}>Transaction ID</Grid>
                 <Grid size={{xs:2}}>Date</Grid>
                 <Grid size={{xs:2}}>Amount</Grid>
                 <Grid size={{xs:2}}>Payment Mode</Grid>
                <Grid size={{xs:3}}>Status</Grid>
            </Grid>

            {payments.map((p, i) => (
                <Grid
                    key={i}
                    container
                    alignItems="center"
                    sx={{
                        borderTop: "1px solid #eee",
                        py: 2,
                    }}
                >
                    <Grid size={{xs:3}}>{p.id}</Grid>
                     <Grid size={{xs:2}}>{p.date}</Grid>
                     <Grid size={{xs:2}}>{currency(p.amount)}</Grid>

                     <Grid size={{xs:2}}>
                        <Chip
                            label={p.mode}
                            variant="outlined"
                            sx={{
                                borderRadius: "16px",
                                fontWeight: 600,
                                fontSize: "0.75rem",
                                px: 1,
                            }}
                            size="small"
                        />
                    </Grid>

                    <Grid size={{xs:3}}>
                        <Chip
                            label={`🟢 Completed`}
                            sx={{
                                bgcolor: "#045f5f",
                                color: "white",
                                fontWeight: 600,
                                fontSize: "0.8rem",
                                borderRadius: "16px",
                                px: 1.5,
                            }}
                            size="small"
                        />
                    </Grid>
                </Grid>
            ))}
        </Card>
    );
}
