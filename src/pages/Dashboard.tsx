import React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import MainLayout from "../components/MainLayout";
import KpiCard from "../components/KpiCard";
import { useAuth } from "../context/AuthContext";
import QuickActionCard from "../components/QuickActionCard";
import AnalyticsCard from "../components/AnalyticsCard";
import { DASHBOARD_CONFIG_BY_ROLE } from "../config/DashboardConfig";
import type { Role } from "../types/roles";
import type { AnalyticsVariant } from "../config/DashboardConfig";


export default function Dashboard() {
    const { auth } = useAuth();
    const role: Role = auth?.user.role ?? "INSTITUTE";
    const config = DASHBOARD_CONFIG_BY_ROLE[role];

    return (
        <MainLayout>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "100%",
                    p: 3,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                    Welcome, {auth?.user?.username ?? "User"}
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    {config.subtitle}
                </Typography>

                <Divider />

                <Box sx={{ mt: 3, mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Key Metrics
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {config.metrics.map((m: any) => (
                        <Grid
                            key={m.title}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 3,
                                lg: 3
                            }}
                            item
                        >
                            <KpiCard
                                title={m.title}
                                value={m.value}
                                delta={m.delta}
                                subtitle={m.subtitle}
                                deltaPositive={m.deltaPositive ?? true}
                                icon={m.icon}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                        Quick Actions
                    </Typography>

                    <Grid container spacing={2}>
                        {config.quickActions.map((a) => (
                            <Grid
                            key={a.title}
                            size={{
                                    xs: 12,
                                    sm: 6,
                                    md: 3,
                                    lg: 3
                                }}
                                item
                            >
                                <QuickActionCard
                                    title={a.title}
                                    subtitle={a.subtitle}
                                    bgcolor={a.bgcolor}
                                    icon={a.icon}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>


                {config.analyticsVariant && (
                    <Box sx={{ mt: 5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            Analytics
                        </Typography>
                        <AnalyticsCard variant={config.analyticsVariant} />
                    </Box>
                )}
            </Box>
        </MainLayout>
    );
}

