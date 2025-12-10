// src/components/verification/FilterDrawer.tsx
import React from "react";
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  TextField,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export type FilterValues = {
  applicationStatus: string;
  verificationStatus: string;
  region: string;
  instituteType: string;
  fromDate: string;
  toDate: string;
};

type FilterDrawerProps = {
  open: boolean;
  onClose: () => void;
  values: FilterValues;
  onChange: (field: keyof FilterValues, value: string) => void;
  onClear: () => void;
  onApply: () => void;
};

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  open,
  onClose,
  values,
  onChange,
  onClear,
  onApply,
}) => {
  const handleChange =
    (field: keyof FilterValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(field, e.target.value);
    };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: "100vw", sm: 360 },
          px: 3,
          py: 3,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Filters
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Apply filters to refine your search results
        </Typography>

        {/* Fields */}
        <Stack spacing={2.5} flex={1}>
          <TextField
            select
            fullWidth
            label="Application Status"
            value={values.applicationStatus}
            onChange={handleChange("applicationStatus")}
            size="small"
          >
            <MenuItem value="">Select...</MenuItem>
            <MenuItem value="Submitted">Submitted</MenuItem>
            <MenuItem value="Under Review">Under Review</MenuItem>
            <MenuItem value="Correction Required">Correction Required</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Verification Status"
            value={values.verificationStatus}
            onChange={handleChange("verificationStatus")}
            size="small"
          >
            <MenuItem value="">Select...</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Verified">Verified</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Region"
            value={values.region}
            onChange={handleChange("region")}
            size="small"
          >
            <MenuItem value="">Select...</MenuItem>
            <MenuItem value="Konkan">Konkan</MenuItem>
            <MenuItem value="Mumbai">Mumbai</MenuItem>
            <MenuItem value="Pune">Pune</MenuItem>
            <MenuItem value="Nagpur">Nagpur</MenuItem>
            <MenuItem value="Nashik">Nashik</MenuItem>
            <MenuItem value="Amravati">Amravati</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Institute Type"
            value={values.instituteType}
            onChange={handleChange("instituteType")}
            size="small"
          >
            <MenuItem value="">Select...</MenuItem>
            <MenuItem value="Government College">Government College</MenuItem>
            <MenuItem value="Aided College">Aided College</MenuItem>
            <MenuItem value="Unaided College">Unaided College</MenuItem>
            <MenuItem value="Autonomous College">Autonomous College</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="From Date"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={values.fromDate}
            onChange={handleChange("fromDate")}
          />

          <TextField
            fullWidth
            label="To Date"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={values.toDate}
            onChange={handleChange("toDate")}
          />
        </Stack>

        {/* Buttons */}
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={onClear}
            sx={{
              flex: 1,
              textTransform: "none",
              bgcolor: "#ffffff",
            }}
          >
            Clear All
          </Button>
          <Button
            variant="contained"
            onClick={onApply}
            sx={{
              flex: 1,
              textTransform: "none",
              borderRadius: 2,
              bgcolor: "#0f6b73",
              "&:hover": { bgcolor: "#0b5258" },
            }}
          >
            Apply Filters
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
