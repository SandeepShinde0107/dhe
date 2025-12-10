import React from "react";
import { Card, Box, Typography } from "@mui/material";

interface QuickActionProps {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    bgcolor: string;
}

export default function QuickActionCard({ title, subtitle, icon, bgcolor }: QuickActionProps) {
    return (
        <Card
            sx={{
                p: 2.5,
                borderRadius: 3,
                minHeight: 100,
                width: "85%",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                border: "1px solid rgba(0,0,0,0.08)",
                transition: "all 0.25s ease",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",

                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                },

                "&:hover .iconBox": {
                    transform: "translateY(-3px)",
                },
            }}
        >
            <Box
                className="iconBox"
                sx={{
                    width: 40,
                    height: 40,
                    bgcolor,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "0.25s ease",
                    transform: "scale(0.95)",
                }}
            >
                {icon}
            </Box>

            <Typography
                sx={{ fontWeight: 700, fontSize: "16px", mt: 2 }}
            >
                {title}
            </Typography>

            <Typography
                variant="body2"
                sx={{ fontSize: "13px", color: "text.secondary", mt: 0.5 }}
            >
                {subtitle}
            </Typography>
        </Card>
    );
}
