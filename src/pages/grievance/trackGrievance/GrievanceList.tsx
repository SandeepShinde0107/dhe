import  { useState } from "react";
import {
    Box,
    Paper,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    IconButton,
    Tooltip,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

type Grievance = {
    id: string;
    name: string;
    emp?: string | null;
    category: "Major" | "Medium" | "Minor";
    nature: string;
    subject: string;
    date: string;
    status: "Resolved" | "Under Investigation" | "Pending" | "Open";
};
const sampleData: Grievance[] = [
    { id: "GRV/2024/001", name: "Rajesh Kumar", emp: "EMP01000", category: "Major", nature: "Advance", subject: "Delay in salary payment for last three months", date: "1/15/2024", status: "Resolved" },
    { id: "GRV/2024/002", name: "Priya Sharma", emp: "EMP01001", category: "Medium", nature: "Benefits", subject: "Leave application rejected without proper justification", date: "1/20/2024", status: "Under Investigation" },
    { id: "GRV/2024/003", name: "Amit Patel", emp: "EMP01002", category: "Minor", nature: "Leave", subject: "Advance payment request pending for six months", date: "1/25/2024", status: "Pending" },
    { id: "GRV/2024/004", name: "Sunita Deshmukh", emp: "EMP01003", category: "Major", nature: "Salary", subject: "Benefits not provided as per service rules", date: "1/10/2024", status: "Resolved" },

    { id: "GRV/2024/005", name: "Vikram Naik", emp: "EMP01004", category: "Medium", nature: "Promotion", subject: "Promotion denied despite meeting criteria", date: "2/1/2024", status: "Under Investigation" },
    { id: "GRV/2024/006", name: "Kavita Joshi", emp: "EMP01005", category: "Minor", nature: "Working Condition", subject: "Air-conditioning not working in office", date: "2/5/2024", status: "Open" },
    { id: "GRV/2024/007", name: "Rahul Sharma", emp: "EMP01006", category: "Major", nature: "Harassment", subject: "Alleged harassment by supervisor", date: "2/8/2024", status: "Under Investigation" },
    { id: "GRV/2024/008", name: "Meera Patil", emp: "EMP01007", category: "Medium", nature: "Salary", subject: "Increment not reflected", date: "2/10/2024", status: "Pending" },
    { id: "GRV/2024/009", name: "Suresh Patil", emp: "EMP01008", category: "Minor", nature: "Other", subject: "Increment not granted as per rules", date: "2/10/2024", status: "Pending" },
    { id: "GRV/2024/010", name: "Meena Joshi", emp: "EMP01009", category: "Major", nature: "Advance", subject: "Medical reimbursement claim rejected", date: "1/12/2024", status: "Resolved" },

    ...Array.from({ length: 10 }).map((_, i) => ({
        id: `GRV/2024/${11 + i}`,
        name: `User ${i + 11}`,
        emp: `EMP010${10 + i}`,
        category: ["Major", "Medium", "Minor"][i % 3] as any,
        nature: "Other",
        subject: "Sample extended subject text for scrolling demonstration",
        date: "1/5/2024",
        status: ["Resolved", "Pending", "Under Investigation"][i % 3] as any,
    })),
];

function categoryChip(cat: Grievance["category"]) {
    return {
        Major: { bg: "#eef5f4", color: "#0b5c60" },
        Medium: { bg: "#f1f6f6", color: "#0b6c69" },
        Minor: { bg: "#f7fafb", color: "#6b7c7b" },
    }[cat];
}

function statusChip(status: Grievance["status"]) {
    return {
        Resolved: { bg: "#e6f7ed", color: "#0b7a0b" },
        Pending: { bg: "#fff3e6", color: "#c45b00" },
        "Under Investigation": { bg: "#fff6e0", color: "#b88600" },
        Open: { bg: "#eef3f4", color: "#5f7a78" },
    }[status];
}

export default function GrievanceList() {
    const rowsPerPage = 10;
    const [page, setPage] = useState(1);

    const startIndex = (page - 1) * rowsPerPage;
    const paginated = sampleData.slice(startIndex, startIndex + rowsPerPage);
    const totalPages = Math.ceil(sampleData.length / rowsPerPage);

    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
                mt: 4,
                overflow: "hidden",
            }}
        >
            <Typography variant="h6" fontWeight={700}>
                Grievance List
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Found {sampleData.length} grievance(s)
            </Typography>

            <Box
                sx={{
                    width: "100%",
                    overflowX: "auto",
                    borderRadius: 2,
                }}
            >
            <Table
                    sx={{
                        tableLayout: "fixed",
                        minWidth: 1100,
                    }}
                > 
                    <TableHead>
                        <TableRow sx={{ bgcolor: "#f8fafc" }}>
                            <TableCell sx={{ fontWeight: 700, width: 140 }}>Grievance ID</TableCell>
                            <TableCell sx={{ fontWeight: 700, width: 180 }}>Complainant</TableCell>
                            <TableCell sx={{ fontWeight: 700, width: 110 }}>Category</TableCell>
                            <TableCell sx={{ fontWeight: 700, width: 110 }}>Nature</TableCell>
                            <TableCell sx={{ fontWeight: 700, width: 300 }}>Subject</TableCell>
                            <TableCell sx={{ fontWeight: 700, width: 140 }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: 700, width: 150 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 700, width: 90 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                     <TableBody>
                        {paginated.map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell>{row.id}</TableCell>

                                <TableCell
                                    sx={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    <Typography fontWeight={600}>{row.name}</Typography>
                                    <Typography variant="caption">{row.emp}</Typography>
                                </TableCell>

                                <TableCell>
                                    <Chip
                                        label={row.category}
                                        size="small"
                                        sx={{
                                            bgcolor: categoryChip(row.category).bg,
                                            color: categoryChip(row.category).color,
                                            borderRadius: 2,
                                        }}
                                    />
                                </TableCell>

                                <TableCell>{row.nature}</TableCell>

                                <TableCell
                                    sx={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    <Tooltip title={row.subject}>
                                        <span>{row.subject}</span>
                                    </Tooltip>
                                </TableCell>

                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <CalendarTodayOutlinedIcon
                                            fontSize="small"
                                            sx={{ color: "grey.600" }}
                                        />
                                        {row.date}
                                    </Box>
                                </TableCell>

                                <TableCell>
                                    <Chip
                                        label={row.status}
                                        size="small"
                                        sx={{
                                            bgcolor: statusChip(row.status).bg,
                                            color: statusChip(row.status).color,
                                            borderRadius: 2,
                                            fontWeight: 600,
                                        }}
                                    />
                                </TableCell>

                                <TableCell>
                                    <IconButton size="small">
                                        <VisibilityOutlinedIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>

            <Box
                sx={{
                    mt: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography>
                    Showing {startIndex + 1} to {startIndex + paginated.length} of {sampleData.length} results
                </Typography>

                <Box display="flex" alignItems="center" gap={2}>
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        style={{
                            padding: "6px 16px",
                            borderRadius: 8,
                            border: "1px solid #ddd",
                            background: page === 1 ? "#eee" : "#fff",
                            cursor: page === 1 ? "not-allowed" : "pointer",
                        }}
                    >
                        Previous
                    </button>

                    <Typography>Page {page} of {totalPages}</Typography>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        style={{
                            padding: "6px 16px",
                            borderRadius: 8,
                            border: "1px solid #ddd",
                            background: page === totalPages ? "#eee" : "#fff",
                            cursor: page === totalPages ? "not-allowed" : "pointer",
                        }}
                    >
                        Next
                    </button>
                </Box>
            </Box>
        </Paper>
    );
}
