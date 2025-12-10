import React, { useMemo, useState, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Card,
    CardContent,
    Grid,
    TextField,
    MenuItem,
    Button,
    InputAdornment,
    Chip,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    DialogContent,
    DialogActions,
    Dialog,
    DialogTitle,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LogoutIcon from "@mui/icons-material/TrendingDown"; // arrow-ish
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { SeatsBySubjectTab } from "../../components/staffing/SeatBySubjectTab";
import { SeatsByCategoryTab } from "../../components/staffing/SeatByCategoryTab";
import { SeatsByGenderTab } from "../../components/staffing/SeatByGenderTab";
import type { ApprovedSeatRow } from "../../types/staffingtypes";
import StaffList from "./StaffList";
import SalaryDetails from "./SalaryDetails";

/* ---------- Local row type for the main table ---------- */

type SeatRow = {
    id: number;
    subject: string;
    designation: string;
    category: string;
    gender: string;
    disability: string;
    approved: number;
    filled: number;
};

type InnerTab = "all" | "subject" | "category" | "gender";

type FiltersState = {
    subject: string;
    designation: string;
    category: string;
    gender: string;
    disability: string;
    showVacantOnly: boolean;
    search: string;
};

/* ---------- Dummy data ---------- */

const SEATS_DATA: SeatRow[] = [
    {
        id: 1,
        subject: "English",
        designation: "Professor",
        category: "GENERAL",
        gender: "Male",
        disability: "-",
        approved: 2,
        filled: 2,
    },
    {
        id: 2,
        subject: "English",
        designation: "Associate Professor",
        category: "OBC",
        gender: "Female",
        disability: "-",
        approved: 3,
        filled: 2,
    },
    {
        id: 3,
        subject: "English",
        designation: "Assistant Professor",
        category: "SC",
        gender: "Male",
        disability: "-",
        approved: 2,
        filled: 1,
    },
    {
        id: 4,
        subject: "English",
        designation: "Assistant Professor",
        category: "GENERAL",
        gender: "Female",
        disability: "Visual",
        approved: 1,
        filled: 1,
    },
    {
        id: 5,
        subject: "Mathematics",
        designation: "Professor",
        category: "GENERAL",
        gender: "Male",
        disability: "-",
        approved: 3,
        filled: 3,
    },
    {
        id: 6,
        subject: "Mathematics",
        designation: "Associate Professor",
        category: "OBC",
        gender: "Female",
        disability: "-",
        approved: 2,
        filled: 1,
    },
    {
        id: 7,
        subject: "Mathematics",
        designation: "Assistant Professor",
        category: "ST",
        gender: "Male",
        disability: "-",
        approved: 1,
        filled: 0,
    },
    {
        id: 8,
        subject: "Mathematics",
        designation: "Assistant Professor",
        category: "GENERAL",
        gender: "Female",
        disability: "-",
        approved: 4,
        filled: 3,
    },
    {
        id: 9,
        subject: "Physics",
        designation: "Professor",
        category: "GENERAL",
        gender: "Male",
        disability: "-",
        approved: 2,
        filled: 2,
    },
];

/* ---------- Helpers ---------- */

const calcVacant = (row: { approved: number; filled: number }) =>
    row.approved - row.filled;

const calcFillPct = (approved: number, filled: number) =>
    approved === 0 ? 0 : Math.round((filled / approved) * 100);

/** Shared style for white cards */
const whiteCardSx = {
    borderRadius: 3,
    boxShadow: "none",
    border: "1px solid #e5e7eb",
    bgcolor: "#ffffff",
};

/* ---------- Aggregation helpers for inner tabs ---------- */

const makeSummaryBySubject = (rows: SeatRow[]): ApprovedSeatRow[] => {
    const map = new Map<string, { approved: number; filled: number }>();

    rows.forEach((r) => {
        const current = map.get(r.subject) ?? { approved: 0, filled: 0 };
        current.approved += r.approved;
        current.filled += r.filled;
        map.set(r.subject, current);
    });

    return Array.from(map.entries()).map(([subject, { approved, filled }]) => {
        const vacant = approved - filled;
        const fillRate = calcFillPct(approved, filled);

        return {
            id: subject,
            subject,
            approved,
            filled,
            vacant,
            fillRate,
        };
    });
};

const makeSummaryByCategory = (rows: SeatRow[]): ApprovedSeatRow[] => {
    const map = new Map<string, { approved: number; filled: number }>();

    rows.forEach((r) => {
        const key = r.category;
        const current = map.get(key) ?? { approved: 0, filled: 0 };
        current.approved += r.approved;
        current.filled += r.filled;
        map.set(key, current);
    });

    return Array.from(map.entries()).map(([category, { approved, filled }]) => {
        const vacant = approved - filled;
        const fillRate = calcFillPct(approved, filled);

        return {
            id: category,
            category,
            approved,
            filled,
            vacant,
            fillRate,
        };
    });
};

const makeSummaryByGender = (rows: SeatRow[]): ApprovedSeatRow[] => {
    const map = new Map<string, { approved: number; filled: number }>();

    rows.forEach((r) => {
        const key = r.gender;
        const current = map.get(key) ?? { approved: 0, filled: 0 };
        current.approved += r.approved;
        current.filled += r.filled;
        map.set(key, current);
    });

    return Array.from(map.entries()).map(([gender, { approved, filled }]) => {
        const vacant = approved - filled;
        const fillRate = calcFillPct(approved, filled);

        return {
            id: gender,
            gender,
            approved,
            filled,
            vacant,
            fillRate,
        };
    });
};

/* ---------- Component ---------- */

export const StaffingPage: React.FC = () => {
    const [seatRows, setSeatRows] = useState<SeatRow[]>(SEATS_DATA);
    const [staffingTab, setStaffingTab] = useState(0); // 0 Approved Seats, 1 Staff List, 2 Salary Details
    const [innerTab, setInnerTab] = useState<InnerTab>("all");
    const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);
    const [filters, setFilters] = useState<FiltersState>({
        subject: "",
        designation: "",
        category: "",
        gender: "",
        disability: "",
        showVacantOnly: false,
        search: "",
    });

    // Pagination state (must be top-level hooks)
    const rowsPerPage = 10;
    const [page, setPage] = useState(0);

    const [editOpen, setEditOpen] = useState(false);
    const [editRow, setEditRow] = useState<SeatRow | null>(null);
    const [editApproved, setEditApproved] = useState<number>(0);
    const [editFilled, setEditFilled] = useState<number>(0);


    /* ---- Header stats (overall, not filtered) ---- */
    const totalApproved = useMemo(
        () => seatRows.reduce((sum, r) => sum + r.approved, 0),
        [seatRows]
    );
    const totalFilled = useMemo(
        () => seatRows.reduce((sum, r) => sum + r.filled, 0),
        [seatRows]
    );
    const totalVacant = totalApproved - totalFilled;

    /* ---- Filtered rows for main table ---- */
    const filteredRows = useMemo(() => {
        let rows = [...seatRows];

        if (innerTab === "subject") rows.sort((a, b) => a.subject.localeCompare(b.subject));
        else if (innerTab === "category") rows.sort((a, b) => a.category.localeCompare(b.category));
        else if (innerTab === "gender") rows.sort((a, b) => a.gender.localeCompare(b.gender));

        return rows.filter((row) => {
            if (filters.subject && row.subject !== filters.subject) return false;
            if (filters.designation && row.designation !== filters.designation) return false;
            if (filters.category && row.category !== filters.category) return false;
            if (filters.gender && row.gender !== filters.gender) return false;
            if (filters.disability && row.disability !== filters.disability) return false;
            if (filters.showVacantOnly && calcVacant(row) === 0) return false;

            if (filters.search.trim()) {
                const q = filters.search.toLowerCase();
                const haystack = `${row.subject} ${row.designation} ${row.category}`.toLowerCase();
                if (!haystack.includes(q)) return false;
            }

            return true;
        });
    }, [filters, innerTab, seatRows]);

    /* ---- Aggregated data for inner cards ---- */
    const subjectSummary = useMemo(
        () => makeSummaryBySubject(filteredRows),
        [filteredRows]
    );
    const categorySummary = useMemo(
        () => makeSummaryByCategory(filteredRows),
        [filteredRows]
    );
    const genderSummary = useMemo(
        () => makeSummaryByGender(filteredRows),
        [filteredRows]
    );

    // Recalculate pagination when filtered rows change
    const pageCount = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));
    const startIndex = page * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, filteredRows.length);
    const pageRows = filteredRows.slice(startIndex, endIndex);

    useEffect(() => {
        // If current page is out of range after filtering, clamp it
        if (page >= pageCount) {
            setPage(pageCount - 1);
        }
    }, [page, pageCount]);

    const handleFilterChange = (field: keyof FiltersState, value: any) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
        setPage(0); // reset pagination whenever filters change
    };

    const handleClearFilters = () => {
        setFilters({
            subject: "",
            designation: "",
            category: "",
            gender: "",
            disability: "",
            showVacantOnly: false,
            search: "",
        });
        setPage(0);
    };

    const handleUpdateSeat = () => {
        if (!editRow) return;

        setSeatRows((prev) =>
            prev.map((r) =>
                r.id === editRow.id
                    ? { ...r, approved: editApproved, filled: editFilled }
                    : r
            )
        );

        setEditOpen(false);
    };

    return (
        <MainLayout>
            <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fb", py: 4 }}>
                <Box sx={{ maxWidth: "95%", mx: "auto", px: { xs: 2, md: 0 } }}>
                    {/* Page heading */}
                    <Typography variant="h4" fontWeight={700} mb={0.5}>
                        Staffing Management
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={3}>
                        Manage approved seats, staff records, and salary information
                    </Typography>

                    {/* Top-level tabs */}
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
                        {[
                            { key: 0, label: "Approved Seats", icon: <PersonOutlineIcon fontSize="small" /> },
                            { key: 1, label: "Staff List", icon: <PeopleAltOutlinedIcon fontSize="small" /> },
                            { key: 2, label: "Salary Details", icon: <LogoutIcon fontSize="small" /> },
                        ].map((t) => {
                            const isActive = staffingTab === t.key;

                            return (
                                <Box
                                    key={t.key}
                                    onClick={() => setStaffingTab(t.key)}
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

                    {/* Approved Seats tab */}
                    {staffingTab === 0 && (
                        <>
                            {/* Sub heading */}
                            <Typography variant="h5" fontWeight={700} mb={0.5}>
                                Approved Seats Management
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={3}>
                                Manage approved staff positions with subject-wise, category-wise,
                                and gender-wise allocation
                            </Typography>

                            {/* Stats cards */}
                            <Grid container spacing={2.5} mb={3}>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Card sx={whiteCardSx}>
                                        <CardContent>
                                            <Typography
                                                variant="subtitle2"
                                                color="text.secondary"
                                                mb={0.5}
                                            >
                                                Total Approved
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <Typography variant="h4" fontWeight={700}>
                                                    {totalApproved}
                                                </Typography>
                                                <PersonOutlineIcon color="action" />
                                            </Box>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                mt={1}
                                                display="block"
                                            >
                                                Sanctioned positions
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Card sx={whiteCardSx}>
                                        <CardContent>
                                            <Typography
                                                variant="subtitle2"
                                                color="text.secondary"
                                                mb={0.5}
                                            >
                                                Total Filled
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <Box>
                                                    <Typography variant="h4" fontWeight={700}>
                                                        {totalFilled}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                        mt={0.5}
                                                        display="block"
                                                    >
                                                        {((totalFilled / totalApproved) * 100).toFixed(1)}%
                                                        {" "}
                                                        fill rate
                                                    </Typography>
                                                </Box>
                                                <TrendingUpIcon sx={{ color: "#16a34a" }} />
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Card sx={whiteCardSx}>
                                        <CardContent>
                                            <Typography
                                                variant="subtitle2"
                                                color="text.secondary"
                                                mb={0.5}
                                            >
                                                Total Vacant
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <Typography
                                                    variant="h4"
                                                    fontWeight={700}
                                                    sx={{ color: "#dc2626" }}
                                                >
                                                    {totalVacant}
                                                </Typography>
                                                <TrendingUpIcon sx={{ color: "#dc2626" }} />
                                            </Box>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                mt={1}
                                                display="block"
                                            >
                                                Positions to be filled
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>

                            {/* Filters card */}
                            <Card sx={{ ...whiteCardSx, mb: 3 }}>
                                <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                                    <Typography variant="h6" fontWeight={700} mb={0.5}>
                                        Filters
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" mb={3}>
                                        Filter approved seats by various criteria
                                    </Typography>

                                    <Grid container spacing={2.5} mb={2}>
                                        <Grid size={{ xs: 12, md: 2 }}>
                                            <TextField
                                                select
                                                fullWidth
                                                size="small"
                                                label="Subject"
                                                value={filters.subject}
                                                onChange={(e) =>
                                                    handleFilterChange("subject", e.target.value)
                                                }
                                            >
                                                <MenuItem value="">All subjects</MenuItem>
                                                <MenuItem value="English">English</MenuItem>
                                                <MenuItem value="Mathematics">Mathematics</MenuItem>
                                                <MenuItem value="Physics">Physics</MenuItem>
                                            </TextField>
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 2 }}>
                                            <TextField
                                                select
                                                fullWidth
                                                size="small"
                                                label="Designation"
                                                value={filters.designation}
                                                onChange={(e) =>
                                                    handleFilterChange("designation", e.target.value)
                                                }
                                            >
                                                <MenuItem value="">All designations</MenuItem>
                                                <MenuItem value="Professor">Professor</MenuItem>
                                                <MenuItem value="Associate Professor">
                                                    Associate Professor
                                                </MenuItem>
                                                <MenuItem value="Assistant Professor">
                                                    Assistant Professor
                                                </MenuItem>
                                            </TextField>
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 2 }}>
                                            <TextField
                                                select
                                                fullWidth
                                                size="small"
                                                label="Category"
                                                value={filters.category}
                                                onChange={(e) =>
                                                    handleFilterChange("category", e.target.value)
                                                }
                                            >
                                                <MenuItem value="">All categories</MenuItem>
                                                <MenuItem value="GENERAL">GENERAL</MenuItem>
                                                <MenuItem value="OBC">OBC</MenuItem>
                                                <MenuItem value="SC">SC</MenuItem>
                                                <MenuItem value="ST">ST</MenuItem>
                                            </TextField>
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 2 }}>
                                            <TextField
                                                select
                                                fullWidth
                                                size="small"
                                                label="Gender"
                                                value={filters.gender}
                                                onChange={(e) =>
                                                    handleFilterChange("gender", e.target.value)
                                                }
                                            >
                                                <MenuItem value="">All genders</MenuItem>
                                                <MenuItem value="Male">Male</MenuItem>
                                                <MenuItem value="Female">Female</MenuItem>
                                            </TextField>
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 2 }}>
                                            <TextField
                                                select
                                                fullWidth
                                                size="small"
                                                label="Disability"
                                                value={filters.disability}
                                                onChange={(e) =>
                                                    handleFilterChange("disability", e.target.value)
                                                }
                                            >
                                                <MenuItem value="">All types</MenuItem>
                                                <MenuItem value="-">None</MenuItem>
                                                <MenuItem value="Visual">Visual</MenuItem>
                                            </TextField>
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 2 }}>
                                            <TextField
                                                select
                                                fullWidth
                                                size="small"
                                                label="Show Vacant Only"
                                                value={filters.showVacantOnly ? "vacant" : ""}
                                                onChange={(e) =>
                                                    handleFilterChange(
                                                        "showVacantOnly",
                                                        e.target.value === "vacant"
                                                    )
                                                }
                                            >
                                                <MenuItem value="">All positions</MenuItem>
                                                <MenuItem value="vacant">Vacant only</MenuItem>
                                            </TextField>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} alignItems="center">
                                        <Grid size={{ xs: 12, md: 8 }}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                placeholder="Search by subject, post type, or designation..."
                                                value={filters.search}
                                                onChange={(e) =>
                                                    handleFilterChange("search", e.target.value)
                                                }
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchIcon fontSize="small" />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: { xs: "flex-start", md: "flex-end" },
                                                    mt: { xs: 1, md: 0 },
                                                }}
                                            >
                                                <Button
                                                    variant="outlined"
                                                    onClick={handleClearFilters}
                                                    sx={{
                                                        textTransform: "none",
                                                        borderRadius: 2,
                                                    }}
                                                >
                                                    Clear Filters
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                            {/* Inner tabs (All / By Subject / By Category / By Gender) */}
                            <Box
                                sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 2.5,
                                    borderRadius: 900,
                                    bgcolor: "#f3f4f6",
                                    p: 0.5,
                                }}
                            >
                                <Tabs
                                    value={innerTab}
                                    onChange={(_, v) => {
                                        setInnerTab(v);
                                        setPage(0);
                                    }}
                                    sx={{ mb: 0 }}
                                >
                                    <Tab value="all" label="All Seats" />
                                    <Tab value="subject" label="By Subject" />
                                    <Tab value="category" label="By Category" />
                                    <Tab value="gender" label="By Gender" />
                                </Tabs>
                            </Box>

                            {/* Subject / Category / Gender summary views */}
                            {innerTab === "subject" && (
                                <SeatsBySubjectTab rows={subjectSummary} />
                            )}
                            {innerTab === "category" && (
                                <SeatsByCategoryTab rows={categorySummary} />
                            )}
                            {innerTab === "gender" && (
                                <SeatsByGenderTab rows={genderSummary} />
                            )}

                            {/* All Seats table */}
                            {innerTab === "all" && (
                                <Card sx={{ ...whiteCardSx, mb: 4 }}>
                                    <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                                        <Typography variant="h6" fontWeight={700} mb={0.25}>
                                            Approved Seats ({filteredRows.length})
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" mb={2.5}>
                                            Complete list of approved staff positions
                                        </Typography>

                                        <Box sx={{ overflowX: "auto" }}>
                                            <Table size="medium">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Subject</TableCell>
                                                        <TableCell>Designation</TableCell>
                                                        <TableCell>Category</TableCell>
                                                        <TableCell>Gender</TableCell>
                                                        <TableCell>Disability</TableCell>
                                                        <TableCell align="right">Approved</TableCell>
                                                        <TableCell align="right">Filled</TableCell>
                                                        <TableCell align="center">Vacant</TableCell>
                                                        <TableCell align="center">Fill Rate</TableCell>
                                                        <TableCell align="center">Actions</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {pageRows.map((row) => {
                                                        const vacant = calcVacant(row);
                                                        const rate = calcFillPct(row.approved, row.filled);
                                                        const rateColor =
                                                            rate === 100
                                                                ? "#16a34a"
                                                                : rate === 0
                                                                    ? "#dc2626"
                                                                    : "#eab308";
                                                        const arrowUp = rate > 0;

                                                        return (
                                                            <TableRow hover key={row.id}>
                                                                <TableCell>{row.subject}</TableCell>
                                                                <TableCell>{row.designation}</TableCell>
                                                                <TableCell>
                                                                    <Chip
                                                                        label={row.category}
                                                                        size="small"
                                                                        sx={{
                                                                            bgcolor: "#f3f4f6",
                                                                            borderRadius: 999,
                                                                            fontWeight: 500,
                                                                            fontSize: 12,
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                                <TableCell>{row.gender}</TableCell>
                                                                <TableCell>{row.disability}</TableCell>
                                                                <TableCell align="right">
                                                                    {row.approved}
                                                                </TableCell>
                                                                <TableCell
                                                                    align="right"
                                                                    sx={{
                                                                        color: "#16a34a",
                                                                        fontWeight: 500,
                                                                    }}
                                                                >
                                                                    {row.filled}
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <Chip
                                                                        label={vacant}
                                                                        size="small"
                                                                        sx={{
                                                                            bgcolor: "#facc15",
                                                                            color: "#111827",
                                                                            fontWeight: 600,
                                                                            minWidth: 28,
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <Box
                                                                        sx={{
                                                                            display: "inline-flex",
                                                                            alignItems: "center",
                                                                            gap: 0.5,
                                                                            color: rateColor,
                                                                            fontWeight: 500,
                                                                        }}
                                                                    >
                                                                        {arrowUp ? (
                                                                            <TrendingUpIcon sx={{ fontSize: 16 }} />
                                                                        ) : (
                                                                            <LogoutIcon sx={{ fontSize: 16 }} />
                                                                        )}
                                                                        <Typography
                                                                            component="span"
                                                                            variant="body2"
                                                                            sx={{ fontWeight: 500 }}
                                                                        >
                                                                            {rate}%
                                                                        </Typography>
                                                                    </Box>
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <IconButton
                                                                        // size="small"
                                                                        sx={{
                                                                            borderRadius: 1,
                                                                            alignItems: "center",
                                                                            // px: 0.5,
                                                                            "&:hover": { bgcolor: "#facc6b33" },
                                                                        }}
                                                                        onClick={() => {
                                                                            setEditRow(row);
                                                                            setEditApproved(row.approved);
                                                                            setEditFilled(row.filled);
                                                                            setEditOpen(true);
                                                                        }}
                                                                    >
                                                                        <EditOutlinedIcon fontSize="small" />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}

                                                    {pageRows.length === 0 && (
                                                        <TableRow>
                                                            <TableCell colSpan={10} align="center">
                                                                <Typography
                                                                    variant="body2"
                                                                    color="text.secondary"
                                                                >
                                                                    No seats match the selected filters.
                                                                </Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </Box>

                                        {/* bottom pagination bar */}
                                        <Box
                                            sx={{
                                                mt: 2.5,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                flexWrap: "wrap",
                                                gap: 1,
                                            }}
                                        >
                                            <Typography variant="body2" color="text.secondary">
                                                {filteredRows.length === 0
                                                    ? "Showing 0 results"
                                                    : `Showing ${startIndex + 1} to ${endIndex} of ${filteredRows.length
                                                    } results`}
                                            </Typography>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                }}
                                            >
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    disabled={page === 0}
                                                    onClick={() =>
                                                        setPage((p) => Math.max(0, p - 1))
                                                    }
                                                    sx={{
                                                        textTransform: "none",
                                                        borderRadius: 2,
                                                        px: 2,
                                                    }}
                                                >
                                                    Previous
                                                </Button>
                                                <Typography variant="body2" color="text.secondary">
                                                    Page {page + 1} of {pageCount}
                                                </Typography>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    disabled={page >= pageCount - 1}
                                                    onClick={() =>
                                                        setPage((p) => Math.min(pageCount - 1, p + 1))
                                                    }
                                                    sx={{
                                                        textTransform: "none",
                                                        borderRadius: 2,
                                                        px: 2,
                                                    }}
                                                >
                                                    Next
                                                </Button>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            )}
                        </>
                    )}

                    {staffingTab === 1 && (
                        <StaffList
                            onEdit={(employee) => {
                                setSelectedEmployee(employee);
                                setStaffingTab(2);
                            }}
                        />
                    )}
                    {staffingTab === 2 && selectedEmployee && (
                        <SalaryDetails
                            staff={selectedEmployee}
                            onBack={() => setStaffingTab(1)}
                        />
                    )}


                </Box>
            </Box>
            {/* ======================= EDIT MODAL ======================= */}
            <Dialog
                open={editOpen}
                onClose={() => setEditOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Edit Approved Seats</DialogTitle>

                <DialogContent dividers>
                    <TextField
                        fullWidth
                        size="small"
                        label="Approved Count"
                        type="number"
                        value={editApproved}
                        onChange={(e) => setEditApproved(Number(e.target.value))}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        size="small"
                        label="Filled Count"
                        type="number"
                        value={editFilled}
                        onChange={(e) => setEditFilled(Number(e.target.value))}
                        sx={{ mb: 2 }}
                    />

                    <Box
                        sx={{
                            p: 2,
                            bgcolor: "#f8fafc",
                            borderRadius: 2,
                            fontWeight: 500,
                        }}
                    >
                        Vacant Count: {Math.max(0, editApproved - editFilled)}
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setEditOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleUpdateSeat}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </MainLayout>
    );
};

export default StaffingPage;
