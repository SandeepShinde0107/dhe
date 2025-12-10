import  { useState } from "react";
import {
    Box,
    Paper,
    Typography,
    Grid,
    TextField,
    Button,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export default function StatisticsFilter() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [filters, setFilters] = useState({
        fromDate: "",
        toDate: "",
    });

    const handleChange = (key: string, value: any) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleReset = () => {
        setFilters({
            fromDate: "",
            toDate: "",
        });
    };
    const navigate = useNavigate();

    const handleExport = () => {
        setOpenSnackbar(true);
    };

    const handleBack = () => {
        navigate("/grievance/lodgeGrievance");
    };

    const handleApply = () => {
        if (!filters.fromDate || !filters.toDate) {
            alert("Please select both dates");
            return;
        }
        console.log("Filters applied:", filters);
    };

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                    sx={{
                        color: "#0b5c60",
                        fontWeight: 600,
                        "&:hover": {
                            backgroundColor: "#e7a61aff",
                        },
                    }}
                >
                    Back to List
                </Button>


                <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    sx={{
                        bgcolor: "#0b5c60",
                        "&:hover": { bgcolor: "#08494d" },
                        borderRadius: 2,
                        px: 3,
                    }}
                    onClick={handleExport}
                >
                    Export Report
                </Button>
            </Box>

            <Paper
                sx={{
                    p: 3,
                    borderRadius: 3,
                    mb: 4,
                    boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
                }}
            >
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <FilterAltIcon sx={{ color: "#0b5c60" }} />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Filter Statistics
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography sx={{ mb: 1 }}>From Date</Typography>
                        <TextField
                            fullWidth
                            type="date"
                            value={filters.fromDate}
                            onChange={(e) => handleChange("fromDate", e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "15px",
                                    height: "40px",
                                },
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography sx={{ mb: 1 }}>To Date</Typography>
                        <TextField
                            fullWidth
                            type="date"
                            value={filters.toDate}
                            onChange={(e) => handleChange("toDate", e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "15px",
                                    height: "40px",
                                },
                            }}
                        />
                    </Grid>
                </Grid>

                <Box display="flex" gap={2} mt={3}>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: "#0b5c60",
                            "&:hover": { bgcolor: "#09494d" },
                            px: 4,
                            borderRadius: 2,
                        }}
                        onClick={handleApply}
                    >
                        Apply Filters
                    </Button>

                    <Button
                        variant="outlined"
                        sx={{ px: 4, borderRadius: 2 }}
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </Box>
            </Paper>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MuiAlert
                    onClose={() => setOpenSnackbar(false)}
                    severity="success"
                    sx={{
                        width: "100%",
                        bgcolor: "#12600bff",
                        color: "white",
                        fontWeight: 600,
                    }}
                >
                    Report exported successfully!
                </MuiAlert>
            </Snackbar>
        </Box>

    );
}
