import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Button,
  Card
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

export default function CaseClosureTab() {
  const [form, setForm] = useState({
    closureType: "Disposed",
    closureDate: "",
    enforcementStatus: "Pending",
    archivalLocation: "",
    judgmentSummary: "",
    finalOrder: "",
    remarks: ""
  });

  const update = (key: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCloseCase = () => {
    if (!form.closureDate) {
      alert("Closure date is required.");
      return;
    }
    alert("Case Closed Successfully!");
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={{xs:12,md:4 }}>
          <TextField
            label="Closure Type"
            fullWidth
            select
            value={form.closureType}
            onChange={(e) => update("closureType", e.target.value)}
          >
            <MenuItem value="Disposed">Disposed</MenuItem>
            <MenuItem value="Withdrawn">Withdrawn</MenuItem>
            <MenuItem value="Dismissed">Dismissed</MenuItem>
            <MenuItem value="Transferred">Transferred</MenuItem>
          </TextField>
        </Grid>
        <Grid size={{xs:12,md:4 }}>
          <TextField
            label="Closure Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={form.closureDate}
            onChange={(e) => update("closureDate", e.target.value)}
          />
        </Grid>
        <Grid size={{xs:12,md:4 }}>
          <TextField
            label="Enforcement Status"
            fullWidth
            select
            value={form.enforcementStatus}
            onChange={(e) => update("enforcementStatus", e.target.value)}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Not Required">Not Required</MenuItem>
          </TextField>
        </Grid>
        <Grid size={{xs:12,md:4 }}>
          <TextField
            label="Archival Location"
            fullWidth
            placeholder="e.g., Archive Room A, Shelf 12"
            value={form.archivalLocation}
            onChange={(e) => update("archivalLocation", e.target.value)}
          />
        </Grid>
         <Grid size={{xs:12}}>
          <TextField
            label="Judgment Summary"
            fullWidth
            multiline
            rows={4}
            placeholder="Enter judgment summary..."
            value={form.judgmentSummary}
            onChange={(e) => update("judgmentSummary", e.target.value)}
          />
        </Grid>
         <Grid size={{xs:12}}>
          <TextField
            label="Final Order"
            fullWidth
            multiline
            rows={4}
            placeholder="Enter final order details..."
            value={form.finalOrder}
            onChange={(e) => update("finalOrder", e.target.value)}
          />
        </Grid>
         <Grid size={{xs:12}}>
          <TextField
            label="Remarks"
            fullWidth
            multiline
            rows={3}
            placeholder="Enter any additional remarks..."
            value={form.remarks}
            onChange={(e) => update("remarks", e.target.value)}
          />
        </Grid>
         <Grid size={{xs:12}}>
          <Button
            variant="contained"
            onClick={handleCloseCase}
            sx={{
              bgcolor: "#dc2626",
              "&:hover": { bgcolor: "#b91c1c" },
              textTransform: "none",
              px: 3,
              py: 1.2,
              borderRadius: 2,
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <DescriptionOutlinedIcon />
            Close Case
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
