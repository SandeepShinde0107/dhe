import { Typography, Paper } from "@mui/material";

export default function AboutRTI() {
    return (
        <Paper
            sx={{
                p: 3,
                bgcolor: "#f7fbfb",
                borderRadius: 3,
                mt: 4,
                width: "95%",
                maxWidth: "100%",
                boxShadow: "0px 4px 20px rgba(176, 231, 229, 0.05)"
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                About RTI
            </Typography>
            <Typography sx={{ fontSize: "14px", mb: 2 }}>
                The Right to Information Act, 2005 empowers citizens to seek information from public authorities.
            </Typography>
            <Typography sx={{ fontSize: "14px", mb: 1 }}>
                <span style={{ fontWeight: 700 }}>Application Fee:</span> ₹10 (as per RTI Act 2005)
            </Typography>
            <Typography sx={{ fontSize: "14px", mb: 1 }}>
                <span style={{ fontWeight: 700 }}>Response Time:</span> Information should be provided within 30 days of application
            </Typography>
            <Typography sx={{ fontWeight: 700, fontSize: "14px", mt: 2 }}>
                Mode of Action:
            </Typography>
            <ul style={{ fontSize: "14px", marginTop: "4px" }}>
                <li>Online: Receive information via email</li>
                <li>Physical: Collect information in person from the institute</li>
            </ul>

            <Typography sx={{ fontSize: "14px", mt: 1, color: "text.secondary" }}>
                <span style={{ fontWeight: 700 }}>Note:</span> Certain information may be exempted under Section 8 of the RTI Act.
            </Typography>
        </Paper>

    );
}
