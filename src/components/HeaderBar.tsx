import { useState } from "react";
import { Box, Typography, IconButton, Avatar, Divider, Button } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonIcon from "@mui/icons-material/Person";
import Popover from "@mui/material/Popover";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HeaderBar() {
    const [language, setLanguage] = useState<"en" | "mr">("en");
    const [notifEl, setNotifEl] = useState<HTMLElement | null>(null);
    const [userEl, setUserEl] = useState<HTMLElement | null>(null);
    const navigate = useNavigate();
    const { auth, logout } = useAuth();
    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };
    const t = {
        en: {
            system: "DHE MIS",
            subtitle: "Department of Higher Education - Management Information System",
            notifications: "Notifications",
            noNotifications: "No new notifications",
            profile: "Profile",
            settings: "Settings",
            logout: "Logout",
            citizen: "Citizen",
            toggle: "मराठी",
        },
        mr: {
            system: "DHE एमआयएस",
            subtitle: "उच्च शिक्षण विभाग - व्यवस्थापन माहिती प्रणाली",
            notifications: "सूचना",
            noNotifications: "नवीन सूचना नाहीत",
            profile: "प्रोफाइल",
            settings: "सेटिंग्ज",
            logout: "लॉगआउट",
            citizen: "नागरिक",
            toggle: "English",
        }
    };

    return (
        <Box
            sx={{
                height: 68,
                px: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: "#ffffff",
                borderBottom: "1px solid rgba(16,24,32,0.06)",
            }}
        >
            <Box display="flex" alignItems="center" gap={2} sx={{ cursor: "pointer" }}>
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 6,
                        bgcolor: "#0f5f63",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: 14,
                    }}
                >
                    DHE
                </Box>

                <Box>
                    <Typography sx={{ fontWeight: 700, lineHeight: 1 }}>
                        {t[language].system}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {t[language].subtitle}
                    </Typography>
                </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={1.5}>
                <Button
                    variant="outlined"
                    onClick={() => setLanguage(language === "en" ? "mr" : "en")}
                    sx={{
                        borderRadius: "8px",
                        px: 2,
                        py: 0.7,
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "14px",
                        borderColor: "#d3d9df",
                        color: "#1f2937",
                        "&:hover": {
                            backgroundColor: "#e7a61aff",
                            borderColor: "#d3d9df",
                        }
                    }}
                >
                    {t[language].toggle}
                </Button>

                <IconButton
                    onClick={(e) => setNotifEl(e.currentTarget)}
                    sx={{
                        borderRadius: 2,
                        border: "1px solid rgba(0,0,0,0.16)",
                        width: 48,
                        height: 38,
                        position: "relative",
                    }}
                >
                    <NotificationsNoneOutlinedIcon fontSize="small" />
                    <Box
                        sx={{
                            width: 8,
                            height: 8,
                            bgcolor: "red",
                            borderRadius: "50%",
                            position: "absolute",
                            top: 8,
                            right: 10,
                        }}
                    />
                </IconButton>

                <IconButton
                    onClick={(e) => setUserEl(e.currentTarget)}
                    sx={{
                        borderRadius: 2,
                        border: "1px solid #d3d9df",
                        width: 48,
                        height: 38,
                    }}
                >
                    <Avatar
                        sx={{
                            width: 28,
                            height: 28,
                            bgcolor: "transparent",
                            color: "#0057b8",
                        }}
                    >
                        <PersonIcon />
                    </Avatar>
                </IconButton>
            </Box>

            <Popover
                open={Boolean(notifEl)}
                anchorEl={notifEl}
                onClose={() => setNotifEl(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                    sx: {
                        mt: 1,
                        width: 300,
                        borderRadius: 3,
                        boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
                        border: "1px solid grey",
                    },
                }}
            >
                <Typography sx={{ fontWeight: 700, p: 2, fontSize: "15px" }}>
                    {t[language].notifications}
                </Typography>

                <Divider />

                <Box sx={{ p: 3, textAlign: "center", color: "text.secondary" }}>
                    {t[language].noNotifications}
                </Box>
            </Popover>
            <Popover
                open={Boolean(userEl)}
                anchorEl={userEl}
                onClose={() => setUserEl(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                    sx: {
                        mt: 1,
                        width: 260,
                        borderRadius: 3,
                        boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
                        border: "1px solid grey",
                    },
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "15px" }}>
                        {auth?.user?.username ?? "User"}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
                        {t[language].citizen}
                    </Typography>
                </Box>

                <Divider />

                <Box
                    sx={{ p: 1, m: 0.5, borderRadius: 2, cursor: "pointer", "&:hover": { bgcolor: "#e7a61aff" } }}
                    onClick={() => {
                        setUserEl(null);
                        navigate("/settings/profile");
                    }}
                >
                    {t[language].profile}
                </Box>

                <Box
                    sx={{ p: 1, m: 0.5, borderRadius: 2, cursor: "pointer", "&:hover": { bgcolor: "#e7a61aff" } }}
                    onClick={() => {
                        setUserEl(null);
                        navigate("/settings/profile");
                    }}
                >
                    {t[language].settings}
                </Box>

                <Divider />

                <Box
                    sx={{
                        p: 1,
                        m: 0.5,
                        borderRadius: 2,
                        cursor: "pointer",
                        color: "red",
                        fontWeight: 600,
                        "&:hover": { bgcolor: "#e7a61aff" },
                    }}
                    onClick={handleLogout}
                >
                    {t[language].logout}
                </Box>
            </Popover>
        </Box>
    );
}
