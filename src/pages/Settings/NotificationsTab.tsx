import React, { useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Divider,
    Button,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import CircleToggle from "../../components/CircleToggle";

export default function NotificationsTab() {
    const [mainEmail, setMainEmail] = useState(true);
    const [updates, setUpdates] = useState(true);
    const [alerts, setAlerts] = useState(true);
    const [reminders, setReminders] = useState(true);
    const [newsletters, setNewsletters] = useState(false);
    const [smsEnabled, setSmsEnabled] = useState(true);
    const [smsAppUpdates, setSmsAppUpdates] = useState(true);
    const [smsSystemAlerts, setSmsSystemAlerts] = useState(true);
    const [smsReminders, setSmsReminders] = useState(false);
    const [smsOtp] = useState(true);

    const [pushEnabled, setPushEnabled] = useState(false);

    const Row = ({ title, sub, value, onChange }: any) => (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 2,
                }}
            >
                <Box>
                    <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
                    <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                        {sub}
                    </Typography>
                </Box>

                <CircleToggle checked={value} onChange={onChange} />
            </Box>
            <Divider />
        </>
    );

    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0px 4px 20px rgba(0,0,0,0.04)",
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Notification Settings
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 3 }}>
                Manage your email, SMS, and push notification preferences
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <EmailOutlinedIcon sx={{ color: "#0f5f63", mr: 1 }} />
                <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                    Email Notifications
                </Typography>
            </Box>

            <Box sx={{ pl: 4 }}>
                <Row
                    title="Enable Email Notifications"
                    sub="Receive notifications via email"
                    value={mainEmail}
                    onChange={() => setMainEmail(!mainEmail)}
                />

                <Row
                    title="Application Updates"
                    sub="Status changes and approvals"
                    value={updates}
                    onChange={() => setUpdates(!updates)}
                />

                <Row
                    title="System Alerts"
                    sub="Important system notifications"
                    value={alerts}
                    onChange={() => setAlerts(!alerts)}
                />

                <Row
                    title="Reminders"
                    sub="Deadline and task reminders"
                    value={reminders}
                    onChange={() => setReminders(!reminders)}
                />

                <Row
                    title="Newsletters"
                    sub="Updates and announcements"
                    value={newsletters}
                    onChange={() => setNewsletters(!newsletters)}
                />
            </Box>
            <Box sx={{ mt: 5 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <SmsOutlinedIcon sx={{ color: "#0f5f63", mr: 1 }} />
                    <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                        SMS Notifications
                    </Typography>
                </Box>

                <Box sx={{ pl: 4 }}>
                    <Row
                        title="Enable SMS Notifications"
                        sub="Receive notifications via SMS"
                        value={smsEnabled}
                        onChange={() => setSmsEnabled(!smsEnabled)}
                    />

                    <Row
                        title="Application Updates"
                        sub="Status changes and approvals"
                        value={smsAppUpdates}
                        onChange={() => setSmsAppUpdates(!smsAppUpdates)}
                    />

                    <Row
                        title="System Alerts"
                        sub="Important system notifications"
                        value={smsSystemAlerts}
                        onChange={() => setSmsSystemAlerts(!smsSystemAlerts)}
                    />

                    <Row
                        title="Reminders"
                        sub="Deadline and task reminders"
                        value={smsReminders}
                        onChange={() => setSmsReminders(!smsReminders)}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            py: 2,
                        }}
                    >
                        <Box>
                            <Typography sx={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 1 }}>
                                OTP Verification <CheckCircleIcon sx={{ color: "#0b5c60", fontSize: 16 }} />
                            </Typography>
                        </Box>
                        <CircleToggle checked={true} onChange={() => { }} />
                    </Box>

                    <Typography sx={{ color: "text.secondary", fontSize: 13, mb: 2 }}>
                        OTP verification SMS cannot be disabled for security reasons
                    </Typography>

                    <Divider />
                </Box>
            </Box>

            <Box sx={{ mt: 5 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <NotificationsNoneOutlinedIcon sx={{ color: "#0f5f63", mr: 1 }} />
                    <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                        Push Notifications
                    </Typography>
                </Box>

                <Box sx={{ pl: 4 }}>
                    <Row
                        title="Enable Push Notifications"
                        sub="Receive browser push notifications"
                        value={pushEnabled}
                        onChange={() => setPushEnabled(!pushEnabled)}
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    mt: 5,
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                }}
            >
                <Button variant="outlined" sx={{ px: 4, borderRadius: 2 }}>
                    Reset
                </Button>

                <Button
                    variant="contained"
                    sx={{
                        px: 4,
                        borderRadius: 2,
                        bgcolor: "#0b5c60",
                        "&:hover": { bgcolor: "#09494d" },
                    }}
                >
                    Save Settings
                </Button>
            </Box>
        </Paper>
    );
}
