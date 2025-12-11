import { Card, Grid, Box, Typography } from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";

export default function CaseStatsCards() {
  const stats = [
    { icon: <FolderCopyOutlinedIcon />, label: "Total Cases", value: 18 },
    { icon: <AssignmentOutlinedIcon />, label: "Active Cases", value: 13 },
    { icon: <AccessTimeIcon />, label: "Upcoming Hearings", value: 13 },
    { icon: <DoneAllIcon />, label: "Disposed Cases", value: 4 },
  ];

  return (
    <Grid container spacing={2} mb={3}>
      {stats.map((s, i) => (
        <Grid size={{xs:12, md:3}} key={i}>
          <Card sx={{ p: 2, borderRadius: 3 }}>
            <Box display="flex" alignItems="center" gap={1}>
              {s.icon}
              <Typography fontWeight={600}>{s.label}</Typography>
            </Box>
            <Typography fontSize="1.8rem" fontWeight={700} mt={1}>
              {s.value}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
