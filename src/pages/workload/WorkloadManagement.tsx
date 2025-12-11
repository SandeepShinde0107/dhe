import React, { useState } from "react";
import {
    Box,
    Card,
    Tabs,
    Tab,
    Typography,
} from "@mui/material";

import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import FunctionsOutlinedIcon from "@mui/icons-material/FunctionsOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import MainLayout from "../../components/MainLayout";
import WorkloadCalculator from "./WorkloadCalculator";
import FormulaConfig from "./FormulaConfig";
import WorkloadReport from "./WorkloadReport";

const WorkloadManagementPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <MainLayout>
            <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fb", py: 4 }}>
                <Box sx={{ maxWidth: "95%", mx: "auto" }}>
                    {/* Page heading */}
                    <Typography variant="h4" fontWeight={700} mb={0.5}>
                        Workload Management
                    </Typography>
                    <Typography color="text.secondary" mb={3}>
                        Calculate workload, configure formulas, and generate reports
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 2,
                            bgcolor: "#f7f9fa",
                            p: 1,
                            borderRadius: 2,
                            mb: 3,
                        }}
                    >
                        {[
                            { key: 0, label: "Calculator", icon: <CalculateOutlinedIcon fontSize="small" /> },
                            { key: 1, label: "Formula Config", icon: <FunctionsOutlinedIcon fontSize="small" /> },
                            { key: 2, label: "Reports", icon: <DescriptionOutlinedIcon fontSize="small" /> },
                        ].map((t) => {
                            const isActive = activeTab === t.key;

                            return (
                                <Box
                                    key={t.key}
                                    onClick={() => setActiveTab(t.key)}
                                    sx={{
                                        flex: 1,
                                        py: 1.4,
                                        borderRadius: 2,
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 1,
                                        fontWeight: 600,
                                        bgcolor: isActive ? "#ffffff" : "transparent",
                                        boxShadow: isActive ? "0px 2px 6px rgba(0,0,0,0.1)" : "none",
                                        border: isActive ? "1px solid #e5e7eb" : "1px solid transparent",
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            bgcolor: isActive ? "#ffffff" : "#eef1f2",
                                        },
                                    }}
                                >
                                    {t.icon}
                                    <Typography>{t.label}</Typography>
                                </Box>
                            );
                        })}
                    </Box>


                    {/* Tab content */}
                    {activeTab === 0 && <WorkloadCalculator />}
                    {activeTab === 1 && <FormulaConfig />}
                    {activeTab === 2 && <WorkloadReport />}
                </Box>
            </Box>
        </MainLayout>
    );
};

export default WorkloadManagementPage;
