import {
  Box,
  Card,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";

export default function CourtroomsJudgesTab() {
  return (
    <Box>
      <Grid container spacing={3}>
        {/* Left Section – Courtroom Allocations */}
        <Grid size={{xs:12,md:7}}>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Courtroom Allocations
          </Typography>

          <Grid container spacing={2}>
            {/* Court No. 1 */}
            <Grid size={{xs:12 }}>
              <Card sx={{ p: 3, borderRadius: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" fontWeight={700}>
                    Court No. 1
                  </Typography>
                  <Chip label="Available" sx={{ bgcolor: "#e0f7f5", color: "#0a6f68", fontWeight: 700 }} />
                </Box>

                <Typography color="text.secondary" mt={1}>
                  Main Court Hall
                </Typography>

                <Box display="flex" gap={1} mt={1} color="text.secondary">
                  <PlaceOutlinedIcon fontSize="small" />
                  Ground Floor
                </Box>

                <Box display="flex" gap={1} mt={1} color="text.secondary">
                  <PeopleOutlinedIcon fontSize="small" />
                  Capacity: 100
                </Box>

                <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                  <Chip label="Video Conferencing" />
                  <Chip label="Recording Equipment" />
                  <Chip label="Public Address System" />
                </Box>
              </Card>
            </Grid>

            {/* Court No. 2 */}
            <Grid size={{xs:12 }}>
              <Card sx={{ p: 3, borderRadius: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" fontWeight={700}>
                    Court No. 2
                  </Typography>
                  <Chip label="Available" sx={{ bgcolor: "#e0f7f5", color: "#0a6f68", fontWeight: 700 }} />
                </Box>

                <Typography color="text.secondary" mt={1}>
                  Civil Court
                </Typography>

                <Box display="flex" gap={1} mt={1} color="text.secondary">
                  <PlaceOutlinedIcon fontSize="small" />
                  First Floor
                </Box>

                <Box display="flex" gap={1} mt={1} color="text.secondary">
                  <PeopleOutlinedIcon fontSize="small" />
                  Capacity: 80
                </Box>

                <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                  <Chip label="Video Conferencing" />
                  <Chip label="Recording Equipment" />
                </Box>
              </Card>
            </Grid>

            {/* Court No. 3 (Occupied) */}
            <Grid size={{xs:12 }}>
              <Card sx={{ p: 3, borderRadius: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" fontWeight={700}>Court No. 3</Typography>
                  <Chip label="Occupied" sx={{ bgcolor: "#f9e3b4", color: "#a37a00", fontWeight: 700 }} />
                </Box>

                <Typography color="text.secondary" mt={1}>
                  Criminal Court
                </Typography>

                <Box display="flex" gap={1} mt={1} color="text.secondary">
                  <PlaceOutlinedIcon fontSize="small" />
                  First Floor
                </Box>

                <Box display="flex" gap={1} mt={1} color="text.secondary">
                  <PeopleOutlinedIcon fontSize="small" />
                  Capacity: 80
                </Box>

                <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                  <Chip label="Recording Equipment" />
                  <Chip label="Public Address System" />
                </Box>

                <Box mt={2} pt={2} borderTop="1px solid #eee">
                  <Typography fontWeight={600} fontSize="0.9rem" mb={1}>
                    Allocated Cases:
                  </Typography>
                  <Typography color="text.secondary">
                    WP/2023/1234 - 2024-12-15 at 10:00
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Section – Judicial Assignments */}
         <Grid size={{xs:12,md:5 }}>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Judicial Assignments
          </Typography>

          {/* Judge 1 */}
          <Card sx={{ p: 3, mb: 2, borderRadius: 3 }}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" fontWeight={700}>
                Hon. Justice A.B. Sharma
              </Typography>

              <Chip
                label="45 cases"
                sx={{ bgcolor: "#0a6f68", color: "white", fontWeight: 700 }}
              />
            </Box>

            <Typography color="text.secondary" mt={0.5}>
              High Court Judge
            </Typography>

            <Box display="flex" gap={1} mt={1} flexWrap="wrap">
              <Chip label="administrative" size="small" />
              <Chip label="constitutional" size="small" />
            </Box>

            <Box mt={2}>
              <Typography fontWeight={600} fontSize="0.9rem">
                Assigned Cases:
              </Typography>
              <Typography color="text.secondary" mt={0.5}>
                WP/2023/1234 - ABC College vs. State of Maharashtra (Next: 2024-12-15)
              </Typography>
            </Box>
          </Card>

          {/* Judge 2 */}
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" fontWeight={700}>
                Hon. Judge M.K. Deshmukh
              </Typography>

              <Chip
                label="38 cases"
                sx={{ bgcolor: "#0a6f68", color: "white", fontWeight: 700 }}
              />
            </Box>

            <Typography color="text.secondary" mt={0.5}>
              District Judge
            </Typography>

            <Box display="flex" gap={1} mt={1} flexWrap="wrap">
              <Chip label="labor" size="small" />
              <Chip label="service" size="small" />
              <Chip label="civil" size="small" />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
