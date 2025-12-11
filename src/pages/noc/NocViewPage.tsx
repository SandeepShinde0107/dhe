import React, { useMemo, useState } from "react";
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
    Divider,
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
    uploadedAt: string; // yyyy-mm-dd
};

type TimelineItem = {
    id: string;
    title: string;
    datetime: string;
    by: string;
    details?: string;
};
type NocViewPageProps = {
    data: any;           // the selected NOC row
    role: "JD Office" | "Director" | "Secretary";
    onBack: () => void;  // function to switch back to list
};

export default function NocViewPage({ data,role, onBack }: NocViewPageProps) {

    const applicationNumber = data.applicationNo;
    const instituteName = data.instituteName;
    const nocType = data.type;
    const totalVacancies = data.vacancies;
    const submittedDate = data.submittedDate;
    const justification = data.summary || "No justification provided.";

    const [status, setStatus] = useState<string>("Under Review (JD)");

    const roster: RosterRow[] = [
        {
            id: 1,
            postName: "Assistant Professor",
            subject: "Mathematics",
            category: "General",
            gender: "Male",
            approved: 3,
            filled: 1,
            vacant: 2,
            remarks: "Urgent requirement",
        },
        { id: 2, postName: "Associate Professor", subject: "Physics", category: "OBC", gender: "Female", approved: 4, filled: 2, vacant: 3 },
        { id: 3, postName: "Lecturer", subject: "Chemistry", category: "SC", gender: "Male", approved: 5, filled: 3, vacant: 2 },
        { id: 4, postName: "Lecturer", subject: "Biology", category: "General", gender: "Female", approved: 2, filled: 0, vacant: 2 },
    ];

    const documents: DocumentItem[] = [
        { id: "d1", name: "roster_document_1.pdf", sizeMB: 2, uploadedAt: "2025-12-11" },
        { id: "d2", name: "roster_document_2.pdf", sizeMB: 3, uploadedAt: "2025-12-10" },
    ];

    const timeline: TimelineItem[] = [
        { id: "t1", title: "Application Submitted", datetime: "2/1/2024, 3:30:00 PM", by: "Dr. Sunita Mehta (Principal)" },
        // add more events here
    ];

    // Snack notifications
    const [snack, setSnack] = useState<{ open: boolean; message: string; severity?: "success" | "info" | "error" }>({
        open: false,
        message: "",
        severity: "success",
    });

    // Modal state
    const [actionModalOpen, setActionModalOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState<"request_correction" | "forward" | "reject" | null>(null);
    const [remarks, setRemarks] = useState("");
    const [remarksError, setRemarksError] = useState<string | null>(null);

    const openActionModal = (action: typeof currentAction) => {
        setCurrentAction(action);
        setRemarks("");
        setRemarksError(null);
        setActionModalOpen(true);
    };

    const closeActionModal = () => {
        setActionModalOpen(false);
        setCurrentAction(null);
        setRemarks("");
        setRemarksError(null);
    };

    const handleConfirmAction = () => {
        // validation: request_correction and reject require remarks (as example)
        if ((currentAction === "request_correction" || currentAction === "reject") && !remarks.trim()) {
            setRemarksError("Remarks are required for this action");
            return;
        }

        // perform fake action (replace with API call)
        if (currentAction === "request_correction") {
            setStatus("Correction Requested");
            setSnack({ open: true, message: "Correction requested — institute will be notified.", severity: "success" });
        } else if (currentAction === "forward") {
            setStatus("Forwarded to Director");
            setSnack({ open: true, message: "Application forwarded to Director.", severity: "success" });
        } else if (currentAction === "reject") {
            setStatus("Rejected");
            setSnack({ open: true, message: "Application rejected.", severity: "info" });
        }

        closeActionModal();
    };

    // computed stats
    const totalApproved = roster.reduce((s, r) => s + r.approved, 0);
    const totalFilled = roster.reduce((s, r) => s + r.filled, 0);
    const totalVac = roster.reduce((s, r) => s + r.vacant, 0);

    // --- small helpers ---
    const renderStatusChip = (text: string) => (
        <Chip label={text} size="small" sx={{ bgcolor: "#f3f7f6", borderRadius: 2 }} />
    );

    return (
        <Box>
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
                <Box>
                    <Typography variant="h4" fontWeight={700} mb={1}>
                        NOC Review & Approval
                    </Typography>
                    <Typography color="text.secondary">Review and process NOC applications for staff recruitment</Typography>
                </Box>
            </Box>

            {/* Back link */}
            <Box mb={2}>
                <MuiLink
                    component="button"
                    onClick={onBack}
                    sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}
                >
                    <ArrowBackIcon fontSize="small" />
                    Back to Applications
                </MuiLink>
            </Box>

            {/* Application details */}
            <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Typography variant="h6" fontWeight={700} mb={1}>
                            NOC Application Details
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                            Application No: {applicationNumber}
                        </Typography>

                        <Box mb={1}>
                            <Typography variant="body2" color="text.secondary">
                                Institute Name
                            </Typography>
                            <Typography fontWeight={700}>{instituteName}</Typography>
                        </Box>

                        <Box mb={1}>
                            <Typography variant="body2" color="text.secondary">
                                Total Vacancies
                            </Typography>
                            <Typography fontWeight={700} color="primary">
                                {totalVacancies}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="body2" color="text.secondary" mb={1}>
                                Justification
                            </Typography>
                            <Typography color="text.secondary">{justification}</Typography>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    NOC Type
                                </Typography>
                                <Typography fontWeight={700}>{nocType}</Typography>

                                <Box mt={2}>
                                    <Typography variant="body2" color="text.secondary">
                                        Submitted Date
                                    </Typography>
                                    <Typography fontWeight={700}>{submittedDate}</Typography>
                                </Box>
                            </Box>

                            <Box>{renderStatusChip(status)}</Box>
                        </Box>
                    </Grid>
                </Grid>
            </Card>

            {/* Roster Details */}
            <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight={700} mb={2}>
                    Roster Details
                </Typography>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S.No</TableCell>
                            <TableCell>Post Name</TableCell>
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
                                <TableCell>
                                    <Typography fontWeight={700}>{r.postName}</Typography>
                                </TableCell>
                                <TableCell>{r.subject}</TableCell>
                                <TableCell>{r.category}</TableCell>
                                <TableCell>{r.gender}</TableCell>
                                <TableCell>{r.approved}</TableCell>
                                <TableCell>{r.filled}</TableCell>
                                <TableCell>
                                    <Typography color={r.vacant > 0 ? "error" : "text.primary"} fontWeight={700}>
                                        {r.vacant}
                                    </Typography>
                                </TableCell>
                                <TableCell>{r.remarks ?? "-"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            {/* Documents */}
            <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight={700} mb={2}>
                    Roster Documents
                </Typography>

                <Stack spacing={1}>
                    {documents.map((doc) => (
                        <Box
                            key={doc.id}
                            sx={{
                                border: "1px solid #eef1f2",
                                borderRadius: 2,
                                p: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box>
                                <Typography fontWeight={700}>{doc.name}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {doc.sizeMB} MB • Uploaded on {doc.uploadedAt}
                                </Typography>
                            </Box>

                            <IconButton
                                onClick={() => {
                                    // replace with actual download logic
                                    setSnack({ open: true, message: `Downloading ${doc.name}...`, severity: "info" });
                                }}
                            >
                                <DownloadIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Stack>
            </Card>

            {/* Timeline */}
            <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight={700} mb={2}>
                    Review Timeline
                </Typography>

                <Stack spacing={2}>
                    {timeline.map((t) => (
                        <Box key={t.id} display="flex" gap={2} alignItems="flex-start">
                            <Box sx={{ mt: 0.5 }}>
                                <HistoryIcon color="action" />
                            </Box>
                            <Box>
                                <Typography fontWeight={700}>{t.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {t.datetime}
                                </Typography>
                                <Typography variant="body2">By: {t.by}</Typography>
                                {t.details && <Typography variant="caption">{t.details}</Typography>}
                            </Box>
                        </Box>
                    ))}
                </Stack>
            </Card>

            {/* Review Actions */}
            <Card sx={{ p: 3, mb: 6, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight={700} mb={2}>
                    Review Actions
                </Typography>

                <Box display="flex" gap={2}>
                    <Button
                        variant="outlined"
                        startIcon={<ReportProblemIcon />}
                        onClick={() => openActionModal("request_correction")}
                    >
                        Request Correction
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<ForwardToInboxIcon />}
                        sx={{ bgcolor: "#0b6b66" }}
                        onClick={() => openActionModal("forward")}
                    >
                        Forward to Director
                    </Button>

                    <Button variant="contained" color="error" startIcon={<RequestPageIcon />} onClick={() => openActionModal("reject")}>
                        Reject
                    </Button>
                </Box>
            </Card>

            {/* ACTION MODAL */}
            <Dialog open={actionModalOpen} onClose={closeActionModal} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {currentAction === "request_correction" && "Request Correction"}
                    {currentAction === "forward" && "Forward to Director"}
                    {currentAction === "reject" && "Reject Application"}
                    <IconButton size="small" onClick={closeActionModal}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    {currentAction === "request_correction" && (
                        <>
                            <Typography color="text.secondary" mb={2}>
                                The institute will be notified to make corrections.
                            </Typography>

                            <TextField
                                label="Remarks *"
                                fullWidth
                                multiline
                                minRows={4}
                                value={remarks}
                                onChange={(e) => {
                                    setRemarks(e.target.value);
                                    if (remarksError) setRemarksError(null);
                                }}
                                error={Boolean(remarksError)}
                                helperText={remarksError ?? " "}
                            />
                        </>
                    )}

                    {currentAction === "forward" && (
                        <>
                            <Typography color="text.secondary" mb={2}>
                                This will forward the application to the Director for further action. (Optional remarks)
                            </Typography>

                            <TextField
                                label="Remarks"
                                fullWidth
                                multiline
                                minRows={3}
                                placeholder="Enter any notes for the Director (optional)"
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                            />
                        </>
                    )}

                    {currentAction === "reject" && (
                        <>
                            <Typography color="text.secondary" mb={2}>
                                Rejecting will close the application. Provide reason for rejection.
                            </Typography>

                            <TextField
                                label="Remarks *"
                                fullWidth
                                multiline
                                minRows={4}
                                value={remarks}
                                onChange={(e) => {
                                    setRemarks(e.target.value);
                                    if (remarksError) setRemarksError(null);
                                }}
                                error={Boolean(remarksError)}
                                helperText={remarksError ?? " "}
                            />
                        </>
                    )}
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2 }}>
                    <Button onClick={closeActionModal}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleConfirmAction}
                        sx={{
                            bgcolor: currentAction === "reject" ? "error.main" : "#0b6b66",
                            "&:hover": { bgcolor: currentAction === "reject" ? "error.dark" : "#095a54" },
                        }}
                    >
                        {currentAction === "request_correction" ? "Confirm" : currentAction === "forward" ? "Forward" : "Reject"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snack */}
            <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack((s) => ({ ...s, open: false }))}>
                <Alert severity={snack.severity ?? "success"} sx={{ width: "100%" }}>
                    {snack.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
