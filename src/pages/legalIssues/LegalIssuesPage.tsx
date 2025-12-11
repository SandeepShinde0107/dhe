import { useState } from "react";
import { Box, Typography, Card } from "@mui/material";
import CaseManagementTab from "./tabs/CaseManagementTab";
import MainLayout from "../../components/MainLayout";
import SchedulingClosureTab from "./tabs/SchedulingClosureTab";
import StatisticsTab from "./tabs/StatisticsTab";

const legalTabs = [
    { key: 0, label: "Case Management" },
    { key: 1, label: "Scheduling & Closure" },
    { key: 2, label: "Statistics" },
];

export default function LegalIssuesPage() {
    const [tab, setTab] = useState(0);

    return (
        <MainLayout>
            <Box p={3}>
                <Typography variant="h4" fontWeight={700}>
                    Legal Case Management System
                </Typography>
                <Typography color="text.secondary" mb={3}>
                    Complete case management including scheduling, courtroom allocation, and statistics
                </Typography>

                {/* TOP TABS */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        bgcolor: "#f7f9fa",
                        p: 1,
                        borderRadius: 2,
                        mb: 3,
                    }}
                >
                    {legalTabs.map((t) => {
                        const active = t.key === tab;
                        return (
                            <Box
                                key={t.key}
                                onClick={() => setTab(t.key)}
                                sx={{
                                    flex: 1,
                                    py: 1.3,
                                    textAlign: "center",
                                    borderRadius: 2,
                                    cursor: "pointer",
                                    fontWeight: 600,
                                    bgcolor: active ? "#fff" : "transparent",
                                    border: active ? "1px solid #e5e7eb" : "1px solid transparent",
                                    boxShadow: active ? "0px 2px 6px rgba(0,0,0,0.1)" : "none",
                                    transition: "0.2s",
                                }}
                            >
                                {t.label}
                            </Box>
                        );
                    })}
                </Box>
                {tab === 0 && <CaseManagementTab />}
                {tab === 1 &&<SchedulingClosureTab showSidebar={true} defaultTab={0} />}
                {tab === 2 && <SchedulingClosureTab showSidebar={false} defaultTab={3}/>}
            </Box>
        </MainLayout>
    );
}
