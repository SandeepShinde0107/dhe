import React, { useMemo, useState } from "react";
import {
    Box,
    Button,
    Card,
    Chip,
    Grid,
    IconButton,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MainLayout from "../../components/MainLayout";
import NocViewPage from "./NocViewPage";

// --- Types ---
type NocItem = {
    applicationNo: string;
    instituteName: string;
    type: string;
    vacancies: number;
    submittedDate: string;
    status: string;
    summary?: string;
    contact?: string;
    attachments?: string[];
    remarks?: string;
};
type role ={
 role: string;
}
// SAMPLE DATA
const SAMPLE_NOC: NocItem[] = [
    // ---------------------------
    // 🔹 JD OFFICE CASES
    // ---------------------------
    {
        applicationNo: "NOC/2024/001",
        instituteName: "Pune College of Engineering",
        type: "New Recruitment",
        vacancies: 10,
        submittedDate: "2024-01-20",
        status: "Under Review (JD)",
        summary: "Request for 10 new faculty posts for CS department.",
        contact: "principal@puneeng.edu",
        attachments: ["cs_roster_2024.pdf"],
        remarks: "JD review initiated.",
    },
    {
        applicationNo: "NOC/2024/002",
        instituteName: "Mumbai Commerce College",
        type: "Replacement",
        vacancies: 3,
        submittedDate: "2024-01-22",
        status: "Correction Required",
        summary: "Replacement request for retiring faculty.",
        contact: "admin@mcc.edu",
        attachments: ["replacement_docs.pdf"],
        remarks: "Signature missing on approval letter.",
    },
    {
        applicationNo: "NOC/2024/003",
        instituteName: "Nagpur Science College",
        type: "Additional Post",
        vacancies: 6,
        submittedDate: "2024-01-25",
        status: "Submitted",
        summary: "Additional posts needed for new laboratory section.",
        contact: "office@nagpurscience.edu",
        attachments: [],
        remarks: "",
    },

    // ---------------------------
    // 🔹 DIRECTOR REVIEW CASES
    // ---------------------------
    {
        applicationNo: "NOC/2024/004",
        instituteName: "Nashik Medical College",
        type: "Additional Post",
        vacancies: 12,
        submittedDate: "2024-02-05",
        status: "Under Review (Director)",
        summary: "Medical staff positions required urgently.",
        contact: "registrar@nashikmed.edu",
        attachments: ["medical_staff_list.pdf"],
        remarks: "Forwarded by JD.",
    },
    {
        applicationNo: "NOC/2024/005",
        instituteName: "Aurangabad Arts & Commerce College",
        type: "New Recruitment",
        vacancies: 4,
        submittedDate: "2024-02-10",
        status: "Forwarded to Director",
        summary: "Hiring needed due to expansion of departments.",
        contact: "office@auracollege.edu",
        attachments: ["expansion_noc.pdf"],
        remarks: "Awaiting director’s review.",
    },
    {
        applicationNo: "NOC/2024/006",
        instituteName: "Kolhapur Polytechnic Institute",
        type: "Replacement",
        vacancies: 5,
        submittedDate: "2024-02-12",
        status: "Approved",
        summary: "Replacement for retired faculty in engineering section.",
        contact: "principal@kpi.edu",
        attachments: ["approval_letter.pdf"],
        remarks: "Approved by director.",
    },

    // ---------------------------
    // 🔹 SECRETARY REVIEW CASES
    // ---------------------------
    {
        applicationNo: "NOC/2024/007",
        instituteName: "Solapur Law College",
        type: "New Recruitment",
        vacancies: 8,
        submittedDate: "2024-02-15",
        status: "Under Review (Secretary)",
        summary: "Law faculty required for accreditation compliance.",
        contact: "principal@solapurlaw.edu",
        attachments: ["accreditation_report.pdf"],
        remarks: "Secretary reviewing.",
    },
    {
        applicationNo: "NOC/2024/008",
        instituteName: "Thane Fine Arts College",
        type: "Additional Post",
        vacancies: 3,
        submittedDate: "2024-02-18",
        status: "Forwarded to Secretary",
        summary: "Additional staff for cultural studies.",
        contact: "info@thanefinearts.edu",
        attachments: [],
        remarks: "Forwarded after director review.",
    },
    {
        applicationNo: "NOC/2024/009",
        instituteName: "Ahmednagar College of Pharmacy",
        type: "Replacement",
        vacancies: 7,
        submittedDate: "2024-02-20",
        status: "Approved",
        summary: "Pharmacy lab faculty replacement request.",
        contact: "office@pharmacyng.edu",
        attachments: ["pharmacy_docs.pdf"],
        remarks: "Secretary approved.",
    },

    // ---------------------------
    // 🔹 MIXED SAMPLE FOR LIST VIEW
    // ---------------------------
    {
        applicationNo: "NOC/2024/010",
        instituteName: "Satara Agricultural University",
        type: "New Recruitment",
        vacancies: 14,
        submittedDate: "2024-02-21",
        status: "Under Review (JD)",
        summary: "Hiring needed for new agriculture research project.",
        contact: "admin@sau.edu",
        attachments: [],
        remarks: "",
    },
    {
        applicationNo: "NOC/2024/011",
        instituteName: "Wardha Teacher Training Institute",
        type: "Replacement",
        vacancies: 2,
        submittedDate: "2024-02-22",
        status: "Correction Required",
        summary: "Urgent replacement of two retiring teachers.",
        contact: "tt.office@wardha.edu",
        attachments: ["teacher_retirements.pdf"],
        remarks: "Document mismatch found.",
    }
];

// Filters
const STATUS_OPTIONS = [
    "All",
    "Under Review (JD)",
    "Correction Required",
    "Submitted",
    "Forwarded to Director",
    "Approved",
];
const TYPE_OPTIONS = ["All", "New Recruitment", "Replacement", "Additional Post"];
const ROLE_TABS = ["JD Office", "Director", "Secretary"];

export default function NocReviewPage() {
    const [role, setRole] = useState("JD Office");
    const [data] = useState<NocItem[]>(SAMPLE_NOC);

    const [filterStatus, setFilterStatus] = useState("All");
    const [filterType, setFilterType] = useState("All");
    const [search, setSearch] = useState("");

    const [mode, setMode] = useState<"list" | "view">("list");
    const [selectedNoc, setSelectedNoc] = useState<NocItem | null>(null);

    const roleFilteredData = useMemo(() => {
        if (role === "JD Office") {
            return data;
        }

        if (role === "Director") {
            return data.filter(
                (d) =>
                    d.status === "Under Review (Director)" ||
                    d.status === "Forwarded to Director"
            );
        }

        if (role === "Secretary") {
            return data.filter((d) => d.status === "Under Review (Secretary)");
        }

        return data;
    }, [role, data]);

    // Summary values
    const totalApplications = roleFilteredData.length;

    const pending = roleFilteredData.filter((d) =>
        role === "JD Office"
            ? d.status === "Under Review (JD)"
            : role === "Director"
                ? d.status === "Under Review (Director)"
                : d.status === "Under Review (Secretary)"
    ).length;

    const approved = roleFilteredData.filter((d) => d.status === "Approved").length;

    const totalVacancies = roleFilteredData.reduce(
        (acc, cur) => acc + cur.vacancies,
        0
    );

    // Switch to VIEW MODE
    const openView = (row: NocItem) => {
        setSelectedNoc(row);
        setMode("view");
    };

    // Back button
    const goBack = () => {
        setSelectedNoc(null);
        setMode("list");
    };

    return (
        <MainLayout>
            <Box p={2}>
                {mode === "list" && (
                    <>
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
                            <Box>
                                <Typography variant="h4" fontWeight={700} mb={1}>
                                    NOC Review & Approval
                                </Typography>
                                <Typography color="text.secondary">
                                    Review and process NOC applications for staff recruitment
                                </Typography>
                            </Box>

                            <Box display="flex" gap={1}>
                                {ROLE_TABS.map((r) => (
                                    <Button
                                        key={r}
                                        variant={role === r ? "contained" : "outlined"}
                                        onClick={() => setRole(r)}
                                        sx={{
                                            textTransform: "none",
                                            bgcolor: role === r ? "#0b6b66" : "white",
                                            color: role === r ? "white" : "black",
                                        }}
                                    >
                                        {r}
                                    </Button>
                                ))}
                            </Box>
                        </Box>

                        <Card sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight={700} mb={1}>
                                NOC Applications
                            </Typography>
                            <Grid container spacing={2} mb={2}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        placeholder="Search..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                                            ),
                                        }}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 3 }}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="All Statuses"
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                    >
                                        {STATUS_OPTIONS.map((s) => (
                                            <MenuItem key={s} value={s}>
                                                {s}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid size={{ xs: 12, md: 3 }}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="All Types"
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                    >
                                        {TYPE_OPTIONS.map((t) => (
                                            <MenuItem key={t} value={t}>
                                                {t}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>

                            {/* Summary Cards */}
                            <Grid container spacing={2} mb={3}>
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <Card sx={{ p: 2 }}>
                                        <Typography>Total Applications</Typography>
                                        <Typography fontWeight={700} fontSize="1.6rem">
                                            {totalApplications}
                                        </Typography>
                                    </Card>
                                </Grid>

                                <Grid size={{ xs: 12, md: 3 }}>
                                    <Card sx={{ p: 2 }}>
                                        <Typography>Pending Review</Typography>
                                        <Typography fontWeight={700} fontSize="1.6rem" color="primary">
                                            {pending}
                                        </Typography>
                                    </Card>
                                </Grid>

                                <Grid size={{ xs: 12, md: 3 }}>
                                    <Card sx={{ p: 2 }}>
                                        <Typography>Approved</Typography>
                                        <Typography fontWeight={700} fontSize="1.6rem" color="success.main">
                                            {approved}
                                        </Typography>
                                    </Card>
                                </Grid>

                                <Grid size={{ xs: 12, md: 3 }}>
                                    <Card sx={{ p: 2 }}>
                                        <Typography>Total Vacancies</Typography>
                                        <Typography fontWeight={700} fontSize="1.6rem" color="warning.main">
                                            {totalVacancies}
                                        </Typography>
                                    </Card>
                                </Grid>
                            </Grid>

                            {/* TABLE */}
                            <Card sx={{ p: 2 }}>
                                <Typography variant="h6" mb={2}>
                                    Applications
                                </Typography>

                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Application No.</TableCell>
                                            <TableCell>Institute</TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell>Vacancies</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell align="right">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {roleFilteredData.map((row) => (
                                            <TableRow key={row.applicationNo}>
                                                <TableCell>{row.applicationNo}</TableCell>
                                                <TableCell>
                                                    <Typography fontWeight={700}>{row.instituteName}</Typography>
                                                </TableCell>
                                                <TableCell>{row.type}</TableCell>
                                                <TableCell>{row.vacancies}</TableCell>
                                                <TableCell>{row.submittedDate}</TableCell>
                                                <TableCell>
                                                    <Chip label={row.status} size="small" />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton onClick={() => openView(row)}>
                                                        <VisibilityOutlinedIcon />
                                                    </IconButton>
                                                    <Button onClick={() => openView(row)} sx={{ ml: 1 }}>
                                                        View
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Card>
                        </Card>
                    </>
                )}
                {mode === "view" && selectedNoc && (
                    <NocViewPage data={selectedNoc} role={role} onBack={goBack} />
                )}
            </Box>
        </MainLayout>
    );
}
