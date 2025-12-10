import React from "react";
import { Box, Divider } from "@mui/material";
import HeaderBar from "../components/HeaderBar";
import SideNav from "../components/SideNav";
import Footer from "./Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100%",
                bgcolor: "#f3f7f8",
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
            }}
        >
            <HeaderBar />
            <Box component="main" sx={{ display: "flex", flex: 1 }}>
                <Box
                    sx={{
                        width: 230,
                        bgcolor: "#ffffff",
                        borderRight: "1px solid rgba(16,24,32,0.06)",
                        minHeight: "calc(100vh - 68px)",
                        py: 2,
                    }}
                >
                    <SideNav />
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        bgcolor: "#f3f7f8",
                        px: { xs: 2, sm: 3, md: 4 },
                        py: { xs: 2, sm: 3, md: 4 },
                        overflowX: "hidden",
                    }}
                >
                    <Box sx={{ width: "100%", maxWidth: "100%" }}>
                        {children}
                    </Box>
                </Box>
            </Box>

            <Divider />

            <Box sx={{ bgcolor: "#ffffff", width: "100%" }}>
                <Footer />
            </Box>
        </Box>
    );
}
