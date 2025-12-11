import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    Grid,
    Chip,
    Switch,
} from "@mui/material";
import PaymentHistoryTab from "./feeTab/PaymentHistoryTab";
import ReceiptsTab from "./feeTab/ReceiptsTab";

export default function FeeManagement() {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { key: 0, label: "Fee Structure" },
        { key: 1, label: "Payment History" },
        { key: 2, label: "Receipts" },
    ];

    const feeItems = [
        {
            category: "Tuition",
            description: "Tuition Fee",
            amount: 35000,
            status: "Paid",
            date: "15 Jul 2024",
        },
        {
            category: "Library",
            description: "Library Fee",
            amount: 5000,
            status: "Paid",
            date: "10 Aug 2024",
        },
        {
            category: "Laboratory",
            description: "Laboratory Fee",
            amount: 8000,
            status: "Paid",
            date: "10 Aug 2024",
        },
        {
            category: "Sports",
            description: "Sports and Cultural Fee",
            amount: 3000,
            status: "Paid",
            date: "10 Aug 2024",
        },
        {
            category: "Development",
            description: "Development Fee",
            amount: 7000,
            status: "Pending",
            date: "-",
        },
        {
            category: "Examination",
            description: "Examination Fee",
            amount: 4000,
            status: "Paid",
            date: "10 Aug 2024",
        },
        {
            category: "Admission",
            description: "Admission Processing Fee",
            amount: 2000,
            status: "Pending",
            date: "-",
        },
        {
            category: "Caution Deposit",
            description: "Caution Deposit (Refundable)",
            amount: 5000,
            status: "Pending",
            date: "-",
        },
    ];

    const currency = (n: number) =>
        "₹" + n.toLocaleString("en-IN");

    return (
        <Box p={4}>
            <Typography variant="h4" fontWeight={600}>
                Fee Management
            </Typography>
            <Typography color="text.secondary" mb={3}>
                Manage fee payments and view receipts
            </Typography>
            <Card sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                <Typography variant="h6" fontWeight={600} mb={2}>
                    Student Information
                </Typography>

                <Grid container spacing={3}>
                     <Grid size={{xs:12,md:4}}>
                        <Typography fontWeight={600}>Name</Typography>
                        <Typography>Student</Typography>
                    </Grid>

                     <Grid size={{xs:12,md:4}}>
                        <Typography fontWeight={600}>Registration ID</Typography>
                        <Typography>N/A</Typography>
                    </Grid>

                     <Grid size={{xs:12,md:4}}>
                        <Typography fontWeight={600}>Course</Typography>
                        <Typography>Bachelor of Arts</Typography>
                    </Grid>
                </Grid>
            </Card>
                <Grid container spacing={3} mt={2}>
                     <Grid size={{xs:12,md:4}}>
                        <Card sx={{ p: 3, borderRadius: 3 }}>
                            <Typography fontWeight={600}>Total Fee</Typography>
                            <Typography fontSize="1.7rem" fontWeight={600}>
                                {currency(69000)}
                            </Typography>
                        </Card>
                    </Grid>

                     <Grid size={{xs:12,md:4}}>
                        <Card sx={{ p: 3, borderRadius: 3 }}>
                            <Typography fontWeight={600}>Paid Amount</Typography>
                            <Typography fontSize="1.7rem" fontWeight={600} color="green">
                                {currency(55000)}
                            </Typography>
                        </Card>
                    </Grid>

                     <Grid size={{xs:12,md:4}}>
                        <Card sx={{ p: 3, borderRadius: 3 }}>
                            <Typography fontWeight={600}>Balance Due</Typography>
                            <Typography fontSize="1.7rem" fontWeight={600} color="#d97706">
                                {currency(14000)}
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    bgcolor: "#f7f9fa",
                    p: 1,
                    borderRadius: 2,
                    alignItems:"start",
                    mb: 3,
                    mt:2, 
                }}
            >
                {tabs.map((t) => {
                    const isActive = t.key === activeTab;
                    return (
                        <Box
                            key={t.key}
                            onClick={() => setActiveTab(t.key)}
                            sx={{
                                flex: 1,
                                py: 1.3,
                                borderRadius: 2,
                                cursor: "pointer",
                                textAlign: "center",
                                fontWeight: 600,
                                bgcolor: isActive ? "#fff" : "transparent",
                                boxShadow: isActive
                                    ? "0 2px 6px rgba(0,0,0,0.1)"
                                    : "none",
                                border: isActive
                                    ? "1px solid #e5e7eb"
                                    : "1px solid transparent",
                                transition: "0.2s",
                                "&:hover": {
                                    bgcolor: isActive ? "#fff" : "#eef1f2",
                                },
                            }}
                        >
                            {t.label}
                        </Box>
                    );
                })}
            </Box>
            {activeTab === 0 && (
                <Card sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h6" fontWeight={600} mb={1}>
                        Fee Structure - 2024-25
                    </Typography>
                    <Typography color="text.secondary" mb={3}>
                        Select fee items to pay. Semester 1
                    </Typography>
                    <Grid container sx={{ fontWeight: 600, mb: 2 }}>

                         <Grid size={{xs:1}}>Select</Grid>
                        <Grid size={{xs:2}}>Category</Grid>
                         <Grid size={{xs:3}}>Description</Grid>
                         <Grid size={{xs:2}}>Amount</Grid>
                         <Grid size={{xs:2}}>status</Grid>
                         <Grid size={{xs:2}}>Paid Date</Grid>
                    </Grid>

                    <Box>
                        {feeItems.map((item, index) => (
                            <Grid
                                container
                                key={index}
                                alignItems="center"
                                sx={{
                                    borderBottom: "1px solid #eee",
                                    py: 2,
                                }}
                            >
                                <Grid size={{xs:1}}>
                                    <Switch size="small" />
                                </Grid>

                                 <Grid size={{xs:2}}>
                                    <Chip
                                        label={item.category}
                                        variant="outlined"
                                        sx={{
                                            fontWeight: 600,
                                            borderRadius: "16px",
                                        }}
                                    />
                                </Grid>

                                 <Grid size={{xs:3}}>
                                    {item.description}
                                </Grid>

                                 <Grid size={{xs:2}}>
                                    {currency(item.amount)}
                                </Grid>

                                 <Grid size={{xs:2}}>
                                    <Chip
                                        label={item.status}
                                        size="small"
                                        sx={{
                                            bgcolor:
                                                item.status === "Paid"
                                                    ? "#045f5f"
                                                    : "#d4a017",
                                            color: "white",
                                            fontWeight: 600,
                                        }}
                                    />
                                </Grid>

                                 <Grid size={{xs:2}}>{item.date}</Grid>
                            </Grid>
                        ))}
                    </Box>
                </Card>
            )}

            {activeTab ===1 && (
                <PaymentHistoryTab />
            )}

            {activeTab === 2 &&(
                <ReceiptsTab/>
            )}
        </Box>
    );
}
