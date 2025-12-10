import React, { useMemo, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Grid,
    IconButton,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";


import { FACILITY_GROUPS } from "../../../data/facility"; // ⬅ PASTE DUMMY DATA IN A FILE

export default function FacilitiesModule() {
    const [groups, setGroups] = useState(FACILITY_GROUPS);

    /** ===== GLOBAL COUNTERS ===== **/
    const all = useMemo(() => groups.flatMap(g => g.items), [groups]);
    const total = all.length;
    const available = all.filter(f => f.available).length;
    const unavailable = total - available;
    const rate = Math.round((available / total) * 100);

    /** ===== TOGGLE STATUS ===== **/
    const toggleAvailability = (groupIndex: number, itemIndex: number) => {
        setGroups(prev => {
            const updated = [...prev];
            const item = updated[groupIndex].items[itemIndex];

            item.available = !item.available;
            item.status = item.available ? "Operational" : "Closed";

            return updated;
        });
    };

    return (
        <>
            {/* ===== PAGE HEADER ===== */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <Box>
                    <Typography variant="h5" fontWeight={700}>
                        Facilities Management
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage physical education and sports facilities
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                        variant="outlined"
                        sx={{ textTransform: "none", borderRadius: 2 }}
                    >
                        Export
                    </Button>

                    <Button
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            bgcolor: "#065f46",
                            "&:hover": { bgcolor: "#064e3b" },
                        }}
                    >
                        Add facility
                    </Button>
                </Box>
            </Box>
            {/* ===== GLOBAL STATS ===== */}
            <Grid container spacing={2} mb={3}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Typography fontWeight={600}>Total Facilities</Typography>
                            <Typography variant="h4" fontWeight={700}>{total}</Typography>
                            <Typography fontSize={13}>Sports and recreation facilities</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Typography fontWeight={600}>Available</Typography>
                            <Typography variant="h4" fontWeight={700}>{available}</Typography>
                            <Typography fontSize={13}>Currently operational</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Typography fontWeight={600}>Unavailable</Typography>
                            <Typography variant="h4" fontWeight={700} color="error">{unavailable}</Typography>
                            <Typography fontSize={13}>Under maintenance or closed</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Typography fontWeight={600}>Availability Rate</Typography>
                            <Typography variant="h4" fontWeight={700}>{rate}%</Typography>
                            <Typography fontSize={13}>Operational facilities</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* ================================================================ */}
            {/* ===================   FACILITY GROUP SECTIONS  ================= */}
            {/* ================================================================ */}
            {groups.map((g, gi) => {
                const active = g.items.filter(i => i.available).length;
                const total = g.items.length;

                return (
                    <Card key={gi} sx={{ mb: 4 }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography fontSize={26}>{g.icon}</Typography>
                                    <Typography variant="h6" fontWeight={700}>{g.title}</Typography>
                                </Box>
                                <Chip
                                    label={`${active}/${total} Available`}
                                    sx={{ borderRadius: 2 }}
                                    color={active === total ? "success" : "warning"}
                                />
                            </Box>

                            {/* ===== FACILITY LIST ===== */}
                            {g.items.map((f, fi) => (
                                <Box
                                    key={fi}
                                    sx={{
                                        borderRadius: 2,
                                        border: "1px solid #e5e7eb",
                                        p: 2,
                                        mb: 2,
                                        bgcolor: f.available ? "rgba(16,185,129,0.05)" : "rgba(253,224,71,0.1)",
                                    }}
                                >
                                    <Box display="flex" justifyContent="space-between" mb={1}>
                                        <Typography fontWeight={600}>{f.name}</Typography>

                                        <Box display="flex" gap={1}>
                                            {f.available ? (
                                                <Chip label="Available" color="success" size="small" />
                                            ) : (
                                                <Chip label="Unavailable" color="warning" size="small" />
                                            )}

                                            <Button
                                                size="small"
                                                color={f.available ? "inherit" : "success"}
                                                onClick={() => toggleAvailability(gi, fi)}
                                                startIcon={f.available ? <CloseOutlinedIcon /> : <CheckCircleOutlineIcon />}
                                                sx={{ borderRadius: 2 }}
                                            >
                                                {f.available ? "Mark Unavailable" : "Mark Available"}
                                            </Button>

                                            <IconButton>
                                                <EditOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </Box>

                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, md: 3 }}>
                                            <Typography fontSize={13}>Capacity: <b>{f.capacity} persons</b></Typography>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 3 }}>
                                            <Typography fontSize={13}>Area: <b>{f.area}</b></Typography>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 3 }}>
                                            <Typography fontSize={13}>Status:{" "}
                                                <b style={{ color: f.available ? "#16a34a" : "red" }}>
                                                    {f.status}
                                                </b>
                                            </Typography>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 12 }}>
                                            <Typography fontSize={13}>
                                                Remarks: <i>{f.remarks}</i>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                );
            })}

            {/* ================================================================ */}
            {/* =====================   CHECKLIST SECTION   ==================== */}
            {/* ================================================================ */}
            <Card>
                <CardContent>
                    <Typography variant="h6" fontWeight={700} mb={2}>
                        Facilities Checklist
                    </Typography>

                    <Grid container spacing={2}>
                        {groups.map((g, i) => {
                            const total = g.items.length;
                            const available = g.items.filter(x => x.available).length;

                            return (
                                <Grid size={{ xs: 12, md: 4 }} key={i}>
                                    <Card
                                        sx={{
                                            p: 1.5,
                                            borderRadius: 2,
                                            bgcolor:
                                                available === total
                                                    ? "rgba(16,185,129,0.08)"
                                                    : "rgba(253,224,71,0.15)",
                                        }}
                                    >
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Typography display="flex" alignItems="center" gap={1}>
                                                <span>{g.icon}</span> {g.title}
                                            </Typography>

                                            <Chip label={`${available}/${total}`} size="small" />
                                        </Box>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}
