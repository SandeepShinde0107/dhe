import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  TextField,
  Avatar
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import { useAuth } from "../context/AuthContext";

const RESEND_DURATION = 30; 
export default function VerifyOtp() {
  const navigate = useNavigate();
  const { logout} = useAuth();
  const username =
    JSON.parse(sessionStorage.getItem("dhe_pending") || "{}")?.username || "";

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [resendTimer, setResendTimer] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendTimer <= 0) return;

    const intervalId = window.setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [resendTimer]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    const isOtpComplete = updated.every((digit) => digit !== "");
    if (index === 5 && value && isOtpComplete) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        return;
      }
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleResendOtp = () => {
    if (resendTimer > 0) return; 
    setOtp(Array(6).fill(""));
    inputRefs.current[0]?.focus();
    setResendTimer(RESEND_DURATION);
  };

  const handleLogout =()=>{
    logout();
    navigate("/login", { replace: true });
  }
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
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 3,
          p: 4,
          mt: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, mb: 1, textAlign: "start" }}
        >
          Verify OTP
        </Typography>

        <Typography
          sx={{ color: "text.secondary", fontSize: "15px", mb: 2 }}
        >
          Enter the 6-digit OTP sent to your registered mobile number
        </Typography>

        <Typography sx={{ fontSize: "15px", mb: 3, color: "text.secondary" }}>
          Logged in as:{" "}
          <span style={{ fontWeight: 600 }}>{username}</span>
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 3 }}>
          {otp.map((digit, index) => (
            <TextField
              key={index}
              value={digit}
              inputRef={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: "center",
                  fontSize: "22px",
                  padding: "10px 0",
                },
              }}
              sx={{
                width: "48px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  height: "55px",
                },
              }}
            />
          ))}
        </Box>
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: 600,
            color: resendTimer > 0 ? "text.secondary" : "#0f5f63",
            cursor: resendTimer > 0 ? "default" : "pointer",
            mb: 3,
          }}
          onClick={handleResendOtp}
        >
          {resendTimer > 0
            ? `Resend OTP  (${resendTimer}s)`
            : "Resend OTP"}
        </Typography>

        <Typography sx={{ fontSize: "14px", color: "text.secondary", mb: 3 }}>
          For demo purposes, enter any 6-digit code
        </Typography>

        <Button
          fullWidth
          onClick={handleLogout}
          sx={{
            border: "1px solid #d2d2d2",
            background: "#ffffff",
            color: "#000",
            py: 1.2,
            borderRadius: 2,
            fontSize: "15px",
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            "&:hover": {
              backgroundColor: "#e7a61aff",
            },
          }}
        >
          ← Back to Login
        </Button>
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
