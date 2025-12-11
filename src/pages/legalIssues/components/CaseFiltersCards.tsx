import { Box, Card, Grid, TextField, Button, Typography } from "@mui/material";

export default function CaseFilters() {
  return (
    <Card sx={{ p: 2, borderRadius: 3, mb: 3 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Filters
      </Typography>

      <Grid container spacing={2}>
         <Grid size={{xs:12,md:3}}>
          <TextField fullWidth label="Case Type" select SelectProps={{ native: true }}>
            <option>All</option>
            <option>Administrative</option>
            <option>Civil</option>
            <option>Labor</option>
          </TextField>
        </Grid>

         <Grid size={{xs:12,md:3}}>
          <TextField fullWidth label="Status" select SelectProps={{ native: true }}>
            <option>All</option>
            <option>Under Hearing</option>
            <option>Disposed</option>
            <option>Closed</option>
          </TextField>
        </Grid>

         <Grid size={{xs:12,md:3}}>
          <TextField fullWidth label="Priority" select SelectProps={{ native: true }}>
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </TextField>
        </Grid>

         <Grid size={{xs:12,md:3}}>
          <TextField fullWidth label="Court Type" select SelectProps={{ native: true }}>
            <option>All</option>
            <option>High Court</option>
            <option>District Court</option>
          </TextField>
        </Grid>

        <Grid size={{xs:12}}>
          <TextField fullWidth placeholder="Search by case number, title, subject, or court…" />
        </Grid>

        <Grid size={{xs:12}}>
          <Button variant="outlined">Clear Filters</Button>
        </Grid>
      </Grid>
    </Card>
  );
}
