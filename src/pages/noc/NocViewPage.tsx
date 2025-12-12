import React, { useState, useMemo } from "react";
import {
    Box,
    Button,
    Card,
    Grid,
    IconButton,
    Link as MuiLink,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Snackbar,
    Alert,
    Stack,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import HistoryIcon from "@mui/icons-material/History";
import CloseIcon from "@mui/icons-material/Close";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import RequestPageIcon from "@mui/icons-material/RequestPage";

type RosterRow = {
    id: number;
    postName: string;
    subject: string;
    category: string;
    gender: string;
    approved: number;
    filled: number;
    vacant: number;
    remarks?: string;
};

type DocumentItem = {
    id: string;
    name: string;
    sizeMB: number;
    uploadedAt: string;
};

type TimelineItem = {
    id: string;
    title: string;
    datetime: string;
    by: string;
    remarks?: string;
};

type NocViewPageProps = {
    data: any;
    role: "JD Office" | "Director" | "Secretary";
    onBack: () => void;
};

export default function NocViewPage({ data, role, onBack }: NocViewPageProps) {

    const [status, setStatus] = useState<string>(data.status);
    const [modalAction, setModalAction] =
        useState<"correction" | "forward" | "reject" | "approve" | null>(null);
    const [remarks, setRemarks] = useState("");

    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "info" | "error",
    });

    const roster: RosterRow[] = [
        { id: 1, postName: "Assistant Professor", subject: "Math", category: "General", gender: "Male", approved: 3, filled: 1, vacant: 2 },
        { id: 2, postName: "Associate Professor", subject: "Physics", category: "OBC", gender: "Female", approved: 4, filled: 2, vacant: 2 },
        { id: 3, postName: "Lecturer", subject: "Chemistry", category: "SC", gender: "Male", approved: 5, filled: 3, vacant: 2 },
    ];

    const documents: DocumentItem[] = [
        { id: "d1", name: "roster_document_1.pdf", sizeMB: 2, uploadedAt: "2025-12-11" },
        { id: "d2", name: "roster_document_2.pdf", sizeMB: 3, uploadedAt: "2025-12-10" },
    ];

    const timeline: TimelineItem[] = useMemo(() => {
        const t: TimelineItem[] = [
            {
                id: "1",
                title: "Application Submitted",
                datetime: "1/15/2024, 3:30 PM",
                by: "Dr. Rajesh Kumar (Principal)",
            },
            {
                id: "2",
                title: "JD Office Review",
                datetime: "1/18/2024, 8:00 PM",
                by: "Mr. Suresh Patil (JD)",
                remarks: "Roster verified. Recommended.",
            },
        ];

        if (role !== "JD Office") {
            t.push({
                id: "3",
                title: "Director Review",
                datetime: "1/20/2024, 4:30 PM",
                by: "Dr. Meena Joshi (Director)",
                remarks: "Forwarded to Secretary",
            });
        }

        if ((role === "Secretary" || status === "Approved") && status !== "Rejected") {
            t.push({
                id: "4",
                title: "Secretary Review",
                datetime: "1/22/2024, 9:30 PM",
                by: "Mr. Anil Deshmukh (Secretary)",
                remarks: status === "Approved" ? "NOC Granted" : "Pending approval"
            });
        }

        return t;
    }, [role, status]);

    const renderActions = () => {
        if (status === "Approved" && role === "Secretary") {
            return (
                <Card sx={{ p: 2, bgcolor: "#e8f8ef" }}>
                    <Typography fontWeight={700}>NOC Certificate</Typography>
                    <Typography variant="caption">Approved on 1/22/2024</Typography>

                    <Button variant="contained" sx={{ mt: 1, bgcolor: "#0b6b66" }} startIcon={<DownloadIcon />}>
                        Download
                    </Button>
                </Card>
            );
        }

        if (role === "JD Office") {
            return (
                <Box display="flex" gap={2}>
                    <Button variant="outlined" startIcon={<ReportProblemIcon />}
                        onClick={() => setModalAction("correction")}>
                        Request Correction
                    </Button>

                    <Button variant="contained" sx={{ bgcolor: "#0b6b66" }}
                        startIcon={<ForwardToInboxIcon />}
                        onClick={() => setModalAction("forward")}>
                        Forward to Director
                    </Button>

                    <Button variant="contained" color="error" startIcon={<RequestPageIcon />}
                        onClick={() => setModalAction("reject")}>
                        Reject
                    </Button>
                </Box>
            );
        }

        if (role === "Director") {
            return (
                <Box display="flex" gap={2}>
                    <Button variant="contained" sx={{ bgcolor: "#0b6b66" }}
                        onClick={() => setModalAction("forward")}>
                        Forward to Secretary
                    </Button>

                    <Button variant="contained" color="error"
                        onClick={() => setModalAction("reject")}>
                        Reject
                    </Button>
                </Box>
            );
        }

        if (role === "Secretary") {
            return (
                <Box display="flex" gap={2}>
                    <Button variant="contained" sx={{ bgcolor: "#0b6b66" }}
                        onClick={() => setModalAction("approve")}>
                        Approve NOC
                    </Button>

                    <Button variant="contained" color="error"
                        onClick={() => setModalAction("reject")}>
                        Reject
                    </Button>
                </Box>
            );
        }
    };
    const handleActionSubmit = () => {
        if (
            (modalAction === "correction" || modalAction === "reject")
            && !remarks.trim()
        ) {
            return alert("Remarks are required.");
        }

        if (modalAction === "correction") setStatus("Correction Requested");

        if (modalAction === "forward") {
            setStatus(role === "JD Office" ? "Forwarded to Director" : "Forwarded to Secretary");
        }

        if (modalAction === "approve") {
            setStatus("Approved");
        }

        if (modalAction === "reject") {
            setStatus("Rejected");
        }

        setSnack({
            open: true,
            message: `Action completed: ${modalAction}`,
            severity: "success",
        });

        setModalAction(null);
        setRemarks("");
    };

    return (
        <Box>
            <Box mb={2}>
                <MuiLink component="button" onClick={onBack}
                    sx={{ display: "inline-flex", gap: 1 }}>
                    <ArrowBackIcon fontSize="small" />
                    Back to Applications
                </MuiLink>
            </Box>

            <Typography variant="h4" fontWeight={700} mb={1}>
                NOC Review & Approval
            </Typography>
            <Typography color="text.secondary" mb={3}>
                Review and process NOC applications
            </Typography>

            <Card sx={{ p: 3, mb: 3 }}>
                <Grid container spacing={2}>
                    <Grid size={{xs:12, md:8}}>
                        <Typography variant="h6" fontWeight={700}>
                            NOC Application Details
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                            Application No: {data.applicationNo}
                        </Typography>

                        <Box mt={2}>
                            <Typography color="text.secondary">Institute</Typography>
                            <Typography fontWeight={700}>{data.instituteName}</Typography>
                        </Box>

                        <Box mt={2}>
                            <Typography color="text.secondary">Total Vacancies</Typography>
                            <Typography fontWeight={700} color="primary">{data.vacancies}</Typography>
                        </Box>

                        <Box mt={2}>
                            <Typography color="text.secondary">Justification</Typography>
                            <Typography>{data.summary || "No justification provided"}</Typography>
                        </Box>
                    </Grid>

                    <Grid size={{xs:12, md:4}}>
                        <Box display="flex" justifyContent="space-between">
                            <Box>
                                <Typography color="text.secondary">Type</Typography>
                                <Typography fontWeight={700}>{data.type}</Typography>

                                <Typography color="text.secondary" mt={2}>Submitted</Typography>
                                <Typography fontWeight={700}>{data.submittedDate}</Typography>
                            </Box>

                            <Chip label={status} sx={{ bgcolor: "#eef5f3" }} />
                        </Box>
                    </Grid>
                </Grid>
            </Card>

            <Card sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={2}>
                    Roster Details
                </Typography>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S.No</TableCell>
                            <TableCell>Post</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Approved</TableCell>
                            <TableCell>Filled</TableCell>
                            <TableCell>Vacant</TableCell>
                            <TableCell>Remarks</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {roster.map((r, idx) => (
                            <TableRow key={r.id}>
                                <TableCell>{idx + 1}</TableCell>
                                <TableCell>{r.postName}</TableCell>
                                <TableCell>{r.subject}</TableCell>
                                <TableCell>{r.category}</TableCell>
                                <TableCell>{r.gender}</TableCell>
                                <TableCell>{r.approved}</TableCell>
                                <TableCell>{r.filled}</TableCell>
                                <TableCell>
                                    <Typography fontWeight={700} color={r.vacant > 0 ? "error" : "text.primary"}>
                                        {r.vacant}
                                    </Typography>
                                </TableCell>
                                <TableCell>{r.remarks || "-"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            <Card sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={2}>
                    Roster Documents
                </Typography>

                <Stack spacing={1}>
                    {documents.map((doc) => (
                        <Box key={doc.id} display="flex" justifyContent="space-between"
                            sx={{ p: 2, border: "1px solid #eee", borderRadius: 2 }}>
                            <Box>
                                <Typography fontWeight={700}>{doc.name}</Typography>
                                <Typography variant="caption">
                                    {doc.sizeMB} MB • Uploaded {doc.uploadedAt}
                                </Typography>
                            </Box>

                            <IconButton onClick={() => setSnack({
                                open: true,
                                message: `Downloading ${doc.name}`,
                                severity: "info"
                            })}>
                                <DownloadIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Stack>
            </Card>

            <Card sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" fontWeight={700}>
                    Review Timeline
                </Typography>

                <Stack spacing={2} mt={2}>
                    {timeline.map((t) => (
                        <Box key={t.id} display="flex" gap={2}>
                            <HistoryIcon color="action" />
                            <Box>
                                <Typography fontWeight={700}>{t.title}</Typography>
                                <Typography variant="body2">{t.datetime}</Typography>
                                <Typography variant="body2">By: {t.by}</Typography>

                                {t.remarks && (
                                    <Typography
                                        sx={{ mt: 1, p: 1, bgcolor: "#f4f6f7", borderRadius: 1 }}
                                        variant="body2"
                                    >
                                        <strong>Remarks:</strong> {t.remarks}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    ))}
                </Stack>
            </Card>

            <Card sx={{ p: 3, mb: 6 }}>
                <Typography variant="h6" fontWeight={700} mb={2}>
                    Review Actions
                </Typography>

                {renderActions()}
            </Card>

            <Dialog open={modalAction !== null} onClose={() => setModalAction(null)} fullWidth maxWidth="sm">
                <DialogTitle>
                    {modalAction === "correction" && "Request Correction"}
                    {modalAction === "forward" && "Forward Application"}
                    {modalAction === "reject" && "Reject Application"}
                    {modalAction === "approve" && "Approve NOC"}

                    <IconButton
                        onClick={() => setModalAction(null)}
                        sx={{ float: "right" }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    {(modalAction === "correction" ||
                        modalAction === "reject") && (
                        <TextField
                            label="Remarks *"
                            fullWidth
                            multiline
                            minRows={3}
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                        />
                    )}

                    {modalAction === "forward" && (
                        <TextField
                            label="Remarks (optional)"
                            fullWidth
                            multiline
                            minRows={3}
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                        />
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setModalAction(null)}>Cancel</Button>
                    <Button variant="contained" onClick={handleActionSubmit}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snack.open} autoHideDuration={2500}
                onClose={() => setSnack({ ...snack, open: false })}
            >
                <Alert severity={snack.severity}>{snack.message}</Alert>
            </Snackbar>
        </Box>
    );
}
