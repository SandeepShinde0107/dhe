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
const SAMPLE_NOC: NocItem[] = [
    {
        applicationNo: "NOC/2024/001",
        instituteName: "Pune College of Engineering",
        type: "New Recruitment",
        vacancies: 10,
        submittedDate: "2024-01-20",
        status: "Under Review (JD)",
        summary: "Request for 10 new faculty posts.",
    },
    {
        applicationNo: "NOC/2024/002",
        instituteName: "Mumbai Commerce College",
        type: "Replacement",
        vacancies: 3,
        submittedDate: "2024-01-22",
        status: "Correction Required",
    },
    {
        applicationNo: "NOC/2024/003",
        instituteName: "Nagpur Science College",
        type: "Additional Post",
        vacancies: 6,
        submittedDate: "2024-01-25",
        status: "Submitted",
    },

    {
        applicationNo: "NOC/2024/004",
        instituteName: "Nashik Medical College",
        type: "Additional Post",
        vacancies: 12,
        submittedDate: "2024-02-05",
        status: "Under Review (Director)",
    },
    {
        applicationNo: "NOC/2024/005",
        instituteName: "Aurangabad Arts College",
        type: "New Recruitment",
        vacancies: 4,
        submittedDate: "2024-02-10",
        status: "Forwarded to Director",
    },
    {
        applicationNo: "NOC/2024/006",
        instituteName: "Kolhapur Polytechnic",
        type: "Replacement",
        vacancies: 5,
        submittedDate: "2024-02-12",
        status: "Approved",
    },
    {
        applicationNo: "NOC/2024/007",
        instituteName: "Solapur Law College",
        type: "New Recruitment",
        vacancies: 8,
        submittedDate: "2024-02-15",
        status: "Under Review (Secretary)",
    },
    {
        applicationNo: "NOC/2024/008",
        instituteName: "Thane Fine Arts College",
        type: "Additional Post",
        vacancies: 3,
        submittedDate: "2024-02-18",
        status: "Forwarded to Secretary",
    },
    {
        applicationNo: "NOC/2024/009",
        instituteName: "Ahmednagar College of Pharmacy",
        type: "Replacement",
        vacancies: 7,
        submittedDate: "2024-02-20",
        status: "Approved",
    },
];
const STATUS_OPTIONS = [
    "All",
    "Submitted",
    "Under Review (JD)",
    "Correction Required",
    "Under Review (Director)",
    "Forwarded to Director",
    "Under Review (Secretary)",
    "Forwarded to Secretary",
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
        if (role === "JD Office") return data;
        if (role === "Director")
            return data.filter((d) =>
                ["Under Review (Director)", "Forwarded to Director"].includes(d.status)
            );

        if (role === "Secretary")
            return data.filter((d) =>
                ["Under Review (Secretary)", "Forwarded to Secretary"].includes(d.status)
            );

        return data;
    }, [role, data]);
    const finalFilteredData = useMemo(() => {
        return roleFilteredData.filter((item) => {
            const matchesSearch =
                item.applicationNo.toLowerCase().includes(search.toLowerCase()) ||
                item.instituteName.toLowerCase().includes(search.toLowerCase());

            const matchesType =
                filterType === "All" || item.type === filterType;

            const matchesStatus =
                filterStatus === "All" || item.status === filterStatus;

            return matchesSearch && matchesType && matchesStatus;
        });
    }, [search, filterStatus, filterType, roleFilteredData]);

    const totalApplications = finalFilteredData.length;
    const pending = finalFilteredData.filter((d) =>
        d.status.includes("Under Review")
    ).length;
    const approved = finalFilteredData.filter((d) => d.status === "Approved").length;
    const totalVacancies = finalFilteredData.reduce(
        (acc, cur) => acc + cur.vacancies,
        0
    );

    const openView = (row: NocItem) => {
        setSelectedNoc(row);
        setMode("view");
    };

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
                                <Typography variant="h4" fontWeight={700}>
                                    NOC Review & Approval
                                </Typography>
                                <Typography color="text.secondary">
                                    Review and process NOC applications
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
                            <Grid container spacing={2}>
                                <Grid size={{xs:12, md:6}}>
                                    <TextField
                                        fullWidth
                                        placeholder="Search application no. or institute..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid size={{xs:12, md:3}}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Status"
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
                                <Grid size={{xs:12, md:3}}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Type"
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
                            <Grid container spacing={2} mt={2}>
                                <Grid size={{xs:12, md:3}}>
                                    <Card sx={{ p: 2 }}>
                                        <Typography>Total Applications</Typography>
                                        <Typography fontSize="1.6rem" fontWeight={700}>
                                            {totalApplications}
                                        </Typography>
                                    </Card>
                                </Grid>
                                <Grid size={{xs:12, md:3}}>
                                    <Card sx={{ p: 2 }}>
                                        <Typography>Pending Review</Typography>
                                        <Typography color="primary" fontSize="1.6rem" fontWeight={700}>
                                            {pending}
                                        </Typography>
                                    </Card>
                                </Grid>
                                <Grid size={{xs:12, md:3}}>
                                    <Card sx={{ p: 2 }}>
                                        <Typography>Approved</Typography>
                                        <Typography color="success.main" fontSize="1.6rem" fontWeight={700}>
                                            {approved}
                                        </Typography>
                                    </Card>
                                </Grid>
                                <Grid size={{xs:12, md:3}}>
                                    <Card sx={{ p: 2 }}>
                                        <Typography>Total Vacancies</Typography>
                                        <Typography color="warning.main" fontSize="1.6rem" fontWeight={700}>
                                            {totalVacancies}
                                        </Typography>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Card sx={{ p: 2, mt: 3 }}>
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
                                        {finalFilteredData.map((row) => (
                                            <TableRow key={row.applicationNo}>
                                                <TableCell>{row.applicationNo}</TableCell>
                                                <TableCell>{row.instituteName}</TableCell>
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
