import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import ProfileTab from "./ProfileTab";
import PreferencesTab from "./PreferencesTab";
import NotificationsTab from "./NotificationsTab";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

export default function Settings() {
    const navigate = useNavigate();
    const { tab } = useParams();

    const currentTab = tab ?? "profile";

    const tabItems = [
        { key: "profile", label: "Profile", icon: <PersonOutlineIcon fontSize="small" /> },
        { key: "preferences", label: "Preferences", icon: <SettingsOutlinedIcon fontSize="small" /> },
        { key: "notifications", label: "Notifications", icon: <NotificationsNoneOutlinedIcon fontSize="small" /> },
    ];

    return (
        <MainLayout>
            <Box
                sx={{
                    minHeight: "calc(100vh - 64px)", 
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    pt:3
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 950,
                        p: 2,
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, }}>
                        Settings
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                        Manage your account settings and preferences
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
                        {tabItems.map((t) => {
                            const isActive = currentTab === t.key;

                            return (
                                <Box
                                    key={t.key}
                                    onClick={() => navigate(`/settings/${t.key}`)}
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
                    <Box sx={{ mt: 0 }}>
                        {currentTab === "profile" && <ProfileTab />}
                        {currentTab === "preferences" && <PreferencesTab />}
                        {currentTab === "notifications" && <NotificationsTab />}
                    </Box>
                </Box>
            </Box>
        </MainLayout>
    );
}
