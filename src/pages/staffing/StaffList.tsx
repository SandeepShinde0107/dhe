import React, { useMemo, useState, useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    MenuItem,
    Button,
    InputAdornment,
    Chip,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    DialogContent,
    DialogActions,
    Dialog,
    DialogTitle,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export type StaffRow = {
  id: string;
  name: string;
  subject: string;
  designation: string;
  appointmentType: string;
  category: string;
  gender: string;
  status: string;

  // OPTIONAL FIELDS
  email?: string;
  mobile?: string;
  department?: string;
  dob?: string;
  joining?: string;
  qualifications?: string;
  experience?: string;
};

type Props = {
    onEdit: (row: StaffRow) => void;
};

const DUMMY_STAFF: StaffRow[] = [
    { id: "EMP001", name: "Dr. Rajesh Kumar", subject: "English", designation: "Professor", appointmentType: "Permanent", category: "GENERAL", gender: "Male", status: "Active" },
    { id: "EMP002", name: "Dr. Priya Sharma", subject: "Mathematics", designation: "Associate Professor", appointmentType: "Temporary", category: "OBC", gender: "Female", status: "Active" },
    { id: "EMP003", name: "Ms. Anjali Desai", subject: "Physics", designation: "Assistant Professor", appointmentType: "Contract", category: "SC", gender: "Female", status: "Active" },
    { id: "EMP004", name: "Dr. Suresh Patil", subject: "Chemistry", designation: "Professor", appointmentType: "Permanent", category: "ST", gender: "Male", status: "Active" },
    { id: "EMP005", name: "Dr. Meena Joshi", subject: "History", designation: "Associate Professor", appointmentType: "Temporary", category: "GENERAL", gender: "Female", status: "Active" },
    { id: "EMP006", name: "Dr. Kavita Rane", subject: "Computer Science", designation: "Assistant Professor", appointmentType: "Contract", category: "OBC", gender: "Female", status: "Active" },
    { id: "EMP007", name: "Mr. Amit Kulkarni", subject: "Commerce", designation: "Professor", appointmentType: "Permanent", category: "SC", gender: "Male", status: "Active" },
    { id: "EMP008", name: "Dr. Vikram Singh", subject: "English", designation: "Associate Professor", appointmentType: "Temporary", category: "ST", gender: "Male", status: "Active" },
    { id: "EMP009", name: "Dr. Sunita Mehta", subject: "Mathematics", designation: "Assistant Professor", appointmentType: "Contract", category: "GENERAL", gender: "Female", status: "Active" },
    { id: "EMP010", name: "Ms. Pooja Nair", subject: "Physics", designation: "Professor", appointmentType: "Permanent", category: "OBC", gender: "Female", status: "Active" },

    { id: "EMP011", name: "Dr. Tarun Aggarwal", subject: "Biology", designation: "Professor", appointmentType: "Permanent", category: "GENERAL", gender: "Male", status: "Active" },
    { id: "EMP012", name: "Dr. Naina Shah", subject: "Biology", designation: "Assistant Professor", appointmentType: "Contract", category: "SC", gender: "Female", status: "Active" },
    { id: "EMP013", name: "Mr. Rohan Shetty", subject: "Economics", designation: "Assistant Professor", appointmentType: "Temporary", category: "GENERAL", gender: "Male", status: "Active" },
    { id: "EMP014", name: "Dr. Anuradha Pillai", subject: "Economics", designation: "Associate Professor", appointmentType: "Permanent", category: "OBC", gender: "Female", status: "Active" },
    { id: "EMP015", name: "Ms. Shraddha Patkar", subject: "Chemistry", designation: "Assistant Professor", appointmentType: "Contract", category: "GENERAL", gender: "Female", status: "Active" },
    { id: "EMP016", name: "Dr. Sachin Galande", subject: "Physics", designation: "Professor", appointmentType: "Permanent", category: "ST", gender: "Male", status: "Active" },
    { id: "EMP017", name: "Dr. Parul Deshmukh", subject: "Computer Science", designation: "Associate Professor", appointmentType: "Temporary", category: "GENERAL", gender: "Female", status: "Active" },
    { id: "EMP018", name: "Mr. Rohit Shinde", subject: "Commerce", designation: "Assistant Professor", appointmentType: "Contract", category: "SC", gender: "Male", status: "Inactive" },
    { id: "EMP019", name: "Dr. Alka Sinha", subject: "English", designation: "Professor", appointmentType: "Permanent", category: "GENERAL", gender: "Female", status: "Active" },
    { id: "EMP020", name: "Dr. Sameer Sawant", subject: "History", designation: "Assistant Professor", appointmentType: "Temporary", category: "OBC", gender: "Male", status: "Active" },
]

export default function StaffList({ onEdit }: Props) {
    const [staffRows, setStaffRows] = useState(DUMMY_STAFF);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [detailsEmployee, setDetailsEmployee] = useState<StaffRow | null>(null);
    const [filters, setFilters] = useState({
        subject: "",
        designation: "",
        appointmentType: "",
        category: "",
        gender: "",
        status: "",
        search: "",
    });

    const rowsPerPage = 10;
    const [page, setPage] = useState(0);

    const filteredRows = useMemo(() => {
        let rows = [...staffRows];

        if (filters.subject)
            rows = rows.filter((x) => x.subject === filters.subject);
        if (filters.designation)
            rows = rows.filter((x) => x.designation === filters.designation);
        if (filters.appointmentType)
            rows = rows.filter((x) => x.appointmentType === filters.appointmentType);
        if (filters.category)
            rows = rows.filter((x) => x.category === filters.category);
        if (filters.gender)
            rows = rows.filter((x) => x.gender === filters.gender);
        if (filters.status)
            rows = rows.filter((x) => x.status === filters.status);

        if (filters.search.trim()) {
            const q = filters.search.toLowerCase();
            rows = rows.filter((x) =>
                `${x.id} ${x.name} ${x.subject}`.toLowerCase().includes(q)
            );
        }

        return rows;
    }, [filters, staffRows]);

    const pageCount = Math.max(
        1,
        Math.ceil(filteredRows.length / rowsPerPage)
    );
    const startIndex = page * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, filteredRows.length);
    const pageRows = filteredRows.slice(startIndex, endIndex);

    useEffect(() => {
        if (page >= pageCount) setPage(pageCount - 1);
    }, [page, pageCount]);

    const handleFilterChange = (field: string, value: any) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
        setPage(0);
    };

    const clearFilters = () => {
        setFilters({
            subject: "",
            designation: "",
            appointmentType: "",
            category: "",
            gender: "",
            status: "",
            search: "",
        });
        setPage(0);
    };

    return (
        <Box sx={{ maxWidth: "95%", mx: "auto", mt: 4 }}>
            <Typography variant="h4" fontWeight={700} mb={1}>
                Staff Management
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
                Manage staff members and their details
            </Typography>

            {/* FILTER CARD */}
            <Card sx={{ borderRadius: 3, mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" fontWeight={700} mb={0.5}>
                        Filters
                    </Typography>
                    <Typography variant="body2" mb={3}>
                        Filter staff by various criteria
                    </Typography>

                    {/* FILTER ROW */}
                    <Grid container spacing={2} mb={2}>
                        <Grid size={{ xs: 6, md: 2 }}>
                            <TextField
                                select
                                size="small"
                                fullWidth
                                label="Subject"
                                value={filters.subject}
                                onChange={(e) => handleFilterChange("subject", e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="English">English</MenuItem>
                                <MenuItem value="Mathematics">Mathematics</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 6, md: 2 }}>
                            <TextField
                                select
                                size="small"
                                fullWidth
                                label="Designation"
                                value={filters.designation}
                                onChange={(e) =>
                                    handleFilterChange("designation", e.target.value)
                                }
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Professor">Professor</MenuItem>
                                <MenuItem value="Associate Professor">
                                    Associate Professor
                                </MenuItem>
                                <MenuItem value="Assistant Professor">
                                    Assistant Professor
                                </MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 6, md: 2 }}>
                            <TextField
                                select
                                size="small"
                                fullWidth
                                label="Appointment Type"
                                value={filters.appointmentType}
                                onChange={(e) =>
                                    handleFilterChange("appointmentType", e.target.value)
                                }
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Permanent">Permanent</MenuItem>
                                <MenuItem value="Temporary">Temporary</MenuItem>
                                <MenuItem value="Contract">Contract</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 6, md: 2 }}>
                            <TextField
                                select
                                size="small"
                                fullWidth
                                label="Category"
                                value={filters.category}
                                onChange={(e) =>
                                    handleFilterChange("category", e.target.value)
                                }
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="GENERAL">GENERAL</MenuItem>
                                <MenuItem value="OBC">OBC</MenuItem>
                                <MenuItem value="SC">SC</MenuItem>
                                <MenuItem value="ST">ST</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 6, md: 2 }}>
                            <TextField
                                select
                                size="small"
                                fullWidth
                                label="Gender"
                                value={filters.gender}
                                onChange={(e) =>
                                    handleFilterChange("gender", e.target.value)
                                }
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 6, md: 2 }}>
                            <TextField
                                select
                                size="small"
                                fullWidth
                                label="Status"
                                value={filters.status}
                                onChange={(e) => handleFilterChange("status", e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>

                    {/* SEARCH BOX */}
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Search by name, ID, email, or subject..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange("search", e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        variant="outlined"
                        onClick={clearFilters}
                        sx={{ mt: 2, textTransform: "none" }}
                    >
                        Clear Filters
                    </Button>
                </CardContent>
            </Card>

            {/* TABLE CARD */}
            <Card sx={{ borderRadius: 3, mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" fontWeight={700} mb={1}>
                        Staff Members ({filteredRows.length})
                    </Typography>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Employee ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell>Designation</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {pageRows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.subject}</TableCell>
                                    <TableCell>{row.designation}</TableCell>
                                    <TableCell>
                                        <Chip label={row.appointmentType} size="small" />
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={row.category} size="small" sx={{ bgcolor: "#eab308", color: "black" }} />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={row.status}
                                            size="small"
                                            sx={{ bgcolor: "#0f766e", color: "white" }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={() => {
                                                setDetailsEmployee(row);
                                                setDetailsOpen(true);
                                            }}
                                        >
                                            <VisibilityOutlinedIcon fontSize="small" />
                                        </IconButton>

                                        <IconButton onClick={() => onEdit(row)}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* bottom pagination */}
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

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Button
                                size="small"
                                variant="outlined"
                                disabled={page === 0}
                                onClick={() => setPage((p) => Math.max(0, p - 1))}
                                sx={{ textTransform: "none", borderRadius: 2, px: 2 }}
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
                                onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                                sx={{ textTransform: "none", borderRadius: 2, px: 2 }}
                            >
                                Next
                            </Button>
                        </Box>
                    </Box>

                </CardContent>
            </Card>
            <Dialog
                open={detailsOpen}
                onClose={() => setDetailsOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle sx={{ pb: 0 }}>
                    Staff Details
                </DialogTitle>

                <DialogContent dividers sx={{ pt: 1 }}>
                    {detailsEmployee && (
                        <>
                            <Typography variant="h6" fontWeight={700} mb={0.5}>
                                {detailsEmployee.name} - {detailsEmployee.id}
                            </Typography>

                            {/* BASIC GRID INFO */}
                            <Grid container spacing={2} mt={1}>
                                <Grid size={{ xs: 6, md: 6 }}>
                                    <Typography variant="body2" color="text.secondary">Email</Typography>
                                    <Typography>{detailsEmployee.email ?? "drkavitarane@college.edu"}</Typography>
                                </Grid>

                                <Grid size={{ xs: 6, md: 6 }}>
                                    <Typography variant="body2" color="text.secondary">Mobile</Typography>
                                    <Typography>{detailsEmployee.mobile ?? "+91-9876543215"}</Typography>
                                </Grid>

                                <Grid size={{ xs: 6, md: 6 }}>
                                    <Typography variant="body2" color="text.secondary">Department</Typography>
                                    <Typography>{detailsEmployee.department ?? "Arts"}</Typography>
                                </Grid>

                                <Grid size={{ xs: 6, md: 6 }}>
                                    <Typography variant="body2" color="text.secondary">Subject</Typography>
                                    <Typography>{detailsEmployee.subject}</Typography>
                                </Grid>

                                <Grid size={{ xs: 6, md: 6 }}>
                                    <Typography variant="body2" color="text.secondary">Designation</Typography>
                                    <Typography>{detailsEmployee.designation}</Typography>
                                </Grid>

                                <Grid size={{ xs: 6, md: 6 }}>
                                    <Typography variant="body2" color="text.secondary">Appointment Type</Typography>
                                    <Typography>{detailsEmployee.appointmentType}</Typography>
                                </Grid>

                                <Grid size={{ xs: 6, md: 6 }}>
                                    <Typography variant="body2" color="text.secondary">Category</Typography>
                                    <Typography>{detailsEmployee.category}</Typography>
                                </Grid>

                                <Grid size={{ xs: 6, md: 6 }}>
                                    <Typography variant="body2" color="text.secondary">Gender</Typography>
                                    <Typography>{detailsEmployee.gender}</Typography>
                                </Grid>

                                <Grid size={{ xs: 6, md: 6 }}>
                                    <Typography variant="body2" color="text.secondary">Date of Birth</Typography>
                                    <Typography>{detailsEmployee.dob ?? "1975-06-15"}</Typography>
                                </Grid>

                                <Grid size={{ xs: 6, md: 6 }}>
                                    <Typography variant="body2" color="text.secondary">Joining Date</Typography>
                                    <Typography>{detailsEmployee.joining ?? "2010-07-01"}</Typography>
                                </Grid>
                            </Grid>

                            {/* QUALIFICATIONS */}
                            <Box mt={3}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    Qualifications
                                </Typography>

                                <Box
                                    sx={{
                                        mt: 1,
                                        borderRadius: 2,
                                        bgcolor: "#f8fafc",
                                        p: 1.5,
                                    }}
                                >
                                    <Typography>
                                        {detailsEmployee.qualifications ?? "Ph.D in Subject from University (2015)"}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* EXPERIENCE */}
                            <Box mt={3}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    Experience
                                </Typography>

                                <Box
                                    sx={{
                                        mt: 1,
                                        borderRadius: 2,
                                        bgcolor: "#f8fafc",
                                        p: 1.5,
                                    }}
                                >
                                    <Typography>
                                        {detailsEmployee.experience ??
                                            "Lecturer at College (2015-01-01 - Present)"}
                                    </Typography>
                                </Box>
                            </Box>
                        </>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setDetailsOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}
