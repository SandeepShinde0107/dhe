import { Paper, Box, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const bullets = [
  "All fields marked with * are mandatory",
  "Provide accurate and complete information for faster resolution",
  "Upload supporting documents if available (optional but recommended)",
  "You will receive a unique Grievance ID upon submission",
  "Keep your Grievance ID safe for tracking and follow-up",
  "You will receive email and SMS notifications on status updates",
  "For urgent matters, you may contact the administration directly",
];

export default function ImportantInfo() {
  return (
    <Paper
      elevation={0}
      sx={{
        mt: 4,
        borderRadius: 4,
        p: { xs: 2, sm: 3 },
        border: "1px solid rgba(16,24,32,0.06)",
        bgcolor: "#ffffff",
        width: "100%",
        boxSizing: "border-box",
      }}
      aria-labelledby="important-info-heading"
      role="region"
    >
      <Box>
        <Typography id="important-info-heading" sx={{ fontWeight: 700, mb: 1.25, fontSize: 18 }}>
          Important Information
        </Typography>

        <List sx={{ p: 0, m: 0 }}>
          {bullets.map((text, idx) => (
            <ListItem key={idx} disableGutters sx={{ alignItems: "flex-start", py: 0.3 }}>
              <ListItemIcon sx={{ minWidth: 20 }}>
                <FiberManualRecordIcon sx={{ fontSize: 8, color: "text.secondary",mt:1 }} />
              </ListItemIcon>

              <ListItemText
                primary={
                  <Typography sx={{ fontSize: 14, color: "grey", lineHeight: 1}}>
                    {text}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
}
