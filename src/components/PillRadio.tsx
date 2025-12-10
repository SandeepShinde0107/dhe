import React from "react";
import { Box } from "@mui/material";

export default function PillRadio({ checked, onChange }: any) {
    return (
        <Box
            onClick={onChange}
            sx={{
                width: 15,
                height: 35,
                borderRadius: "20px",
                border: `2px solid ${checked ? "#0f5f63" : "#cbd5e1"}`,
                backgroundColor: checked ? "#0f5f63" : "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: checked ? "center" : "flex-start",
                justifyContent: "center",
                p: "4px",
                transition: "all 0.25s ease",
            }}
        >
            <Box
                sx={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    backgroundColor: checked ? "#ffffff" : "#0f5f63",
                    transition: "all 0.25s ease",
                    transform: checked ? "translateY(0)" : "translateY(4px)",
                }}
            />
        </Box>
    );
}
