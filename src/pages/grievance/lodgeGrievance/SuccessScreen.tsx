import { Paper, Box, Typography, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function SuccessScreen({ data, onReset }: any) {
    const grievanceID = `GRV/2025/${Math.floor(100 + Math.random() * 900)}`;

    const handlePrint = () => {
        window.print();
    };

    return (
        <Paper sx={{ p: 4, borderRadius: 3, mt: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <CheckCircleOutlineIcon sx={{ color: "#1b8f40", fontSize: 35 }} />
                <Typography variant="h5" sx={{ color: "#1b8f40", fontWeight: 700 }}>
                    Grievance Submitted Successfully
                </Typography>
            </Box>

            <Typography sx={{ color: "text.secondary", mb: 3 }}>
                Your grievance has been registered and will be processed
            </Typography>

            {/* Grievance ID Card */}
            <Paper
                sx={{
                    p: 2.5,
                    bgcolor: "#f5faf6",
                    borderRadius: 2,
                    mb: 4,
                }}
            >
                <Typography sx={{ fontWeight: 600 }}>
                    Your Grievance ID: <span style={{ color: "#0a5c62" }}>{grievanceID}</span>
                </Typography>
                <Typography sx={{ mt: 1, color: "text.secondary" }}>
                    Please save this ID for future reference. You will also receive this ID via email and SMS.
                </Typography>
            </Paper>

            {/* Submitted Details */}
            <Typography variant="h6" sx={{ mb: 1 }}>
                Submitted Details:
            </Typography>

            <Paper sx={{ p: 2.5, bgcolor: "#f7f9fb", borderRadius: 2 }}>
                <Typography><b>Name:</b> {data.complainant.fullName}</Typography>
                <Typography><b>Email:</b> {data.complainant.email}</Typography>
                <Typography><b>Mobile:</b> {data.complainant.mobile}</Typography>
                <Typography><b>Category:</b> {data.grievance.category}</Typography>
                <Typography><b>Nature:</b> {data.grievance.nature}</Typography>
                <Typography><b>Subject:</b> {data.grievance.subject}</Typography>
            </Paper>

            {/* Next Steps */}
            <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
                Next Steps:
            </Typography>

            <ul style={{ color: "#444", lineHeight: "1.8" }}>
                <li>Your grievance will be assigned to an investigation officer</li>
                <li>You will receive updates via email and SMS</li>
                <li>You can track your grievance status using the Grievance ID</li>
                <li>Investigation typically takes 15–30 days depending on complexity</li>
            </ul>

            {/* Buttons */}
            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: "#0b5c60",
                        "&:hover": { bgcolor: "#09494d" },
                        px: 3,
                    }}
                    onClick={onReset}
                >
                    Submit Another Grievance
                </Button>

                <Button variant="outlined" onClick={handlePrint} sx={{ px: 3 }}>
                    Print Receipt
                </Button>
            </Box>
        </Paper>
    );
}
