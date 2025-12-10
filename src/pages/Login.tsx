import React, { useState } from "react";
import {
    Box,
    Card,
    TextField,
    Typography,
    Button,
    IconButton,
    Avatar,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            setError("Please enter username and password");
            setOtpSent(false);
            return;
        }
        setError("");
        setLoading(true);
        await login(username, password);
        setOtpSent(true);
        setTimeout(() => {
            navigate("/verify-otp");
        }, 1000);

        setLoading(false);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#e9f0ff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 4,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 20,
                    right: {
                        xs: 30,
                        sm: 100,
                        md: 200,
                        lg: 300,
                        xl: 390,
                    },
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    background: "#ffffff",
                    px: 2,
                    py: 0.8,
                    borderRadius: 2,
                    boxShadow: "0px 1px 4px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                }}
            >
                <LanguageIcon fontSize="small" />
                <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                    मराठी
                </Typography>
            </Box>

            <Avatar
                sx={{
                    bgcolor: "#0f5f63",
                    width: 70,
                    height: 70,
                    fontSize: "26px",
                    fontWeight: "bold",
                    mt: 4,
                }}
            >
                DHE
            </Avatar>

            <Typography
                variant="h4"
                sx={{ mt: 2, fontWeight: 700, color: "#1a1a1a" }}
            >
                DHE MIS
            </Typography>

            <Typography
                sx={{
                    mt: 1,
                    color: "text.secondary",
                    fontSize: "15px",
                    textAlign: "center",
                    maxWidth: 400,
                }}
            >
                Department of Higher Education Management Information System
            </Typography>

            <Card
                elevation={2}
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    borderRadius: 3,
                    p: 4,
                    mt: 4,
                    backgroundColor: "#ffffff",
                }}
            >
                <Typography variant="h5" fontWeight="bold" mb={1}>
                    Login to DHE MIS
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={3}>
                    Enter your credentials to access the system
                </Typography>


                <Typography fontWeight={500} mb={0.5}>
                    Username <span style={{ color: "red" }}>*</span>
                </Typography>

                <TextField
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    variant="outlined"
                    size="small"
                    required
                    sx={{
                        mb: 3,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                        },
                    }}
                />

                <Typography fontWeight={500} mb={0.5}>
                    Password <span style={{ color: "red" }}>*</span>
                </Typography>

                <TextField
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                    size="small"
                />
                {error && (
                    <Typography sx={{ color: "red", fontSize: "13px", mb: 1 }}>
                        {error}
                    </Typography>
                )}
                {otpSent && (
                    <Box
                        sx={{
                            border: "1px solid #8ad892",
                            background: "#e8f9e9",
                            color: "#0b7a0b",
                            p: 1.5,
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 2,
                            fontSize: "14px",
                        }}
                    >
                        <span>✔</span> OTP sent to registered mobile number
                    </Box>
                )}
                <Button
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    onClick={handleLogin}
                    sx={{
                        backgroundColor: "#0f5f63",
                        color: "#ffffff",
                        py: 1.2,
                        borderRadius: 2,
                        fontSize: "15px",
                        textTransform: "none",
                        "&:hover": { backgroundColor: "#0d5255" },
                        opacity: loading ? 0.7 : 1,
                    }}
                >
                    {loading ? "Sending OTP..." : "Send OTP"}
                </Button>

                <Box textAlign="center" mt={3}>
                    <Typography variant="body2" color="text.secondary">
                        Demo credentials:
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ whiteSpace: "pre-line", lineHeight: 1.4 }}
                    >
                        admin/admin, institute/institute, jd/jd,
                        {"\n"}
                        director/director, secretary/secretary
                    </Typography>
                </Box>
            </Card>

            <Box textAlign="center" mt={5}>
                <Typography variant="body2" color="text.secondary">
                    © 2024 Department of Higher Education, Maharashtra
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    All rights reserved
                </Typography>
            </Box>
        </Box>
    );
}
