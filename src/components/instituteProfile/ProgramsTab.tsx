import React from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

type Program = {
  name: string;
  durationYears: number;
  intake: number;
};

const programs: Program[] = [
  { name: "B.Tech Computer Science", durationYears: 4, intake: 120 },
  { name: "B.Tech Electronics", durationYears: 4, intake: 60 },
  { name: "B.Tech Mechanical", durationYears: 4, intake: 60 },
  { name: "B.Tech Civil", durationYears: 4, intake: 60 },
  { name: "M.Tech Computer Science", durationYears: 2, intake: 30 },
  { name: "M.Tech VLSI", durationYears: 2, intake: 20 },
  { name: "MBA", durationYears: 2, intake: 120 },
  { name: "MCA", durationYears: 2, intake: 60 },
];

const verifiedDocs = [
  { title: "AICTE Approval Letter", date: "2024-01-10" },
  { title: "University Affiliation Certificate", date: "2024-01-12" },
  { title: "Land Documents", date: "2024-01-08" },
  { title: "Building Plan Approval", date: "2024-01-09" },
  { title: "Fire Safety Certificate", date: "2024-01-11" },
  { title: "NOC from Local Authority", date: "2024-01-07" },
];

export const ProgramsTab: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "none",
          border: "1px solid #e5e7eb",
          bgcolor: "#ffffff",
          mb: 3,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={700} mb={0.5}>
            Academic Programs
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            List of approved programs and their intake capacity
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {programs.map((program) => (
              <Box
                key={program.name}
                sx={{
                  borderRadius: 2,
                  border: "1px solid #e5e7eb",
                  px: 2.5,
                  py: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight={700}>
                    {program.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Duration: {program.durationYears} years
                  </Typography>
                </Box>
                <Grid
                  container
                  size={{
                    xs: "auto",
                  }}

                  sx={{ width: "auto" }}
                >
                  <Box sx={{
                    textAlign: "right", alignItems: "center",
                    justifyContent: "flex-end", columnGap: 2, rowGap: 1
                  }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: 500 }}
                    >
                      Intake
                    </Typography>
                    <Typography variant="body1" fontWeight={700}>
                      {program.intake}
                    </Typography>
                  </Box>

                  <Chip
                    label="Approved"
                    size="small"
                    sx={{
                      bgcolor: "#0f6b73",
                      color: "#ffffff",
                      fontWeight: 600,
                      borderRadius: 999,
                    }}
                  />
                </Grid>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "none",
          border: "1px solid #e5e7eb",
          bgcolor: "#ffffff",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={700} mb={0.5}>
            Verified Documents
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            All submitted documents and their verification status
          </Typography>

          <List disablePadding>
            {verifiedDocs.map((d) => (
              <ListItem
                key={d.title}
                sx={{
                  borderRadius: 1.5,
                  mb: 1,
                  px: 2,
                  py: 1.2,
                  border: "1px solid #eef2f4",
                  bgcolor: "transparent",
                }}
                secondaryAction={
                  <Chip
                    label="Verified"
                    size="small"
                    sx={{
                      bgcolor: "#0f6b73",
                      color: "#fff",
                      fontWeight: 600,
                    }}
                  />
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#f3f7f7", color: "#0f6b73" }}>
                    <DescriptionOutlinedIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight={700}>
                      {d.title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      Verified on: {d.date}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};
