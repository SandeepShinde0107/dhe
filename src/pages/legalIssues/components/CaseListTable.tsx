import { Box, Card, Chip, Grid, Typography, IconButton } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

export default function CaseListTable({ data }: { data: any[] }) {
  return (
    <Card sx={{ p: 2, borderRadius: 3 }}>
      {data.map((row, i) => (
        <Box
          key={i}
          sx={{
            borderBottom: i < data.length - 1 ? "1px solid #eee" : "none",
            py: 2,
          }}
        >
          <Grid container spacing={2} alignItems="center">
             <Grid size={{xs:12,md:2}}>
              <Typography fontWeight={600}>{row.caseNumber}</Typography>
              <Typography fontSize="0.8rem" color="text.secondary">
                {row.date}
              </Typography>
            </Grid>

             <Grid size={{xs:12,md:3}}>
              <Typography fontWeight={600}>{row.title}</Typography>
              <Typography fontSize="0.8rem" color="text.secondary">
                {row.subTitle}
              </Typography>
            </Grid>

            <Grid size={{xs:12,md:1}}>
              <Chip label={row.type} />
            </Grid>

             <Grid size={{xs:12,md:2}}>
              <Typography fontWeight={600}>{row.court}</Typography>
              <Typography fontSize="0.8rem" color="text.secondary">
                {row.location}
              </Typography>
            </Grid>

            <Grid size={{xs:12,md:1}}>
              <Chip
                label={row.status}
                sx={{
                  bgcolor:
                    row.status === "Under Hearing"
                      ? "#045f5f"
                      : row.status === "Pending"
                      ? "#d9a406"
                      : "#ccc",
                  color: "white",
                }}
              />
            </Grid>

            <Grid size={{xs:12,md:1}}>
              <Chip label={row.priority} />
            </Grid>

            <Grid size={{xs:12,md:1}}>
              <Box display="flex" alignItems="center" gap={0.5}>
                <CalendarMonthOutlinedIcon fontSize="small" />
                <Typography>{row.nextHearing}</Typography>
              </Box>
            </Grid>

            <Grid size={{xs:12,md:1}}>
              <IconButton>
                <VisibilityOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Card>
  );
}
