import React, { useState } from "react";
import MainLayout from "../../components/MainLayout";
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Button,
    Card,
    CardContent,
} from "@mui/material";

import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";

import AdmissionModule from "./AdmissionModule";
import ResearchGuidesTable from "./ResearchGuides";
import ResearchModule from "./ResearchModule";
import ScholarshipModule from "./scholarshipTab/ScholarshipModule";
import FacilitiesModule from "./facility/FacilityModule";

export default function AcademicPage() {
    const [activeTab, setActiveTab] = useState<number>(0);

    return (
        <MainLayout>
            <Box sx={{ maxWidth: "95%", mx: "auto", py: 4 }}>
                <Typography variant="h4" fontWeight={700} mb={1}>
                    Academic Management
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                    Manage admissions, research activities, scholarships, and facilities
                </Typography>

                {/* MAIN ACADEMIC TABS */}
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
                        { key: 0, label: "Admissions", icon: <SchoolOutlinedIcon fontSize="small" /> },
                        { key: 1, label: "Research", icon: <ScienceOutlinedIcon fontSize="small" /> },
                        { key: 2, label: "Scholarships", icon: <WorkspacePremiumOutlinedIcon fontSize="small" /> },
                        { key: 3, label: "Facilities", icon: <HomeWorkOutlinedIcon fontSize="small" /> },
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
                                    boxShadow: isActive ? "0px 2px 6px rgba(0,0,0,0.08)" : "none",
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


                {activeTab === 0 && <AdmissionModule />}
                {activeTab === 1 && <ResearchModule/>}
                {activeTab === 2 && <ScholarshipModule/>}
                {activeTab === 3 && <FacilitiesModule/>}
            </Box>
        </MainLayout>
    );
}
