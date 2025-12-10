import { useState } from "react";
import {
    Box,
    Paper,
    Typography,
    Grid,
    TextField,
    MenuItem,
    Button
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export default function SearchGreivance() {
    const [filters, setFilters] = useState({
        search: "",
        status: "All",
        category: "All",
        nature: "All",
        fromDate: "",
        toDate: "",
    });

    const handleChange = (key: string, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleReset = () => {
        setFilters({
            search: "",
            status: "All",
            category: "All",
            nature: "All",
            fromDate: "",
            toDate: "",
        });
    };

    const handleSearch = () => {
        console.log("Searching with:", filters);
    };

    return (
        <>
            <Paper
                sx={{
                    p: 3,
                    borderRadius: 3,
                    boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    <FilterAltIcon sx={{ color: "#0b5c60" }} />
                    Search & Filter Grievances
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 3 }}>
                    Filter by grievance ID, nature, category, and date of complaint
                </Typography>
                <Grid container spacing={3}>

                    {/* Search */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography sx={{ mb: 1 }}>Search</Typography>
                        <TextField
                            fullWidth
                            placeholder="Grievance ID, name, or employee ID"
                            value={filters.search}
                            onChange={e => handleChange("search", e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "15px",
                                    height: "40px",
                                },
                            }}
                        />
                    </Grid>

                    {/* Status */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography sx={{ mb: 1 }}>Status</Typography>
                        <TextField
                            fullWidth
                            select
                            value={filters.status}
                            onChange={e => handleChange("status", e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "15px",
                                    height: "40px",
                                },
                            }}
                        >
                            <MenuItem value="All">All Statuses</MenuItem>
                            <MenuItem value="Submitted">Submitted</MenuItem>
                            <MenuItem value="Under Investigation">Under Investigation</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Resolved">Resolved</MenuItem>
                            <MenuItem value="Closed">Closed</MenuItem>
                        </TextField>
                    </Grid>

                    {/* Category */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography sx={{ mb: 1 }}>Category</Typography>
                        <TextField
                            fullWidth
                            select
                            value={filters.category}
                            onChange={e => handleChange("category", e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "15px",
                                    height: "40px",
                                },
                            }}
                        >
                            <MenuItem value="All">All Categories</MenuItem>
                            <MenuItem value="Major">Major</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="Minor">Minor</MenuItem>
                        </TextField>
                    </Grid>

                    {/* Nature */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography sx={{ mb: 1 }}>Nature</Typography>
                        <TextField
                            fullWidth
                            select
                            value={filters.nature}
                            onChange={e => handleChange("nature", e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "15px",
                                    height: "40px",
                                },
                            }}
                        >
                            <MenuItem value="All">All Natures</MenuItem>
                            <MenuItem value="Leave">Leave</MenuItem>
                            <MenuItem value="Salary">Salary</MenuItem>
                            <MenuItem value="Harassment">Harassment</MenuItem>
                            <MenuItem value="Promotion">Promotion</MenuItem>
                            <MenuItem value="Transfer">Transfer</MenuItem>
                            <MenuItem value="Working Condition">Working Condition</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>
                    </Grid>

                    {/* From Date */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography sx={{ mb: 1 }}>From Date</Typography>
                        <TextField
                            fullWidth
                            type="date"
                            value={filters.fromDate}
                            onChange={e => handleChange("fromDate", e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "15px",
                                    height: "40px",
                                },
                            }}
                        />
                    </Grid>

                    {/* To Date */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography sx={{ mb: 1 }}>To Date</Typography>
                        <TextField
                            fullWidth
                            type="date"
                            value={filters.toDate}
                            onChange={e => handleChange("toDate", e.target.value)}
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

                {/* Buttons */}
                <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: "#0b5c60",
                            "&:hover": { bgcolor: "#09494d" },
                            px: 4,
                            borderRadius: 2,
                        }}
                        onClick={handleSearch}
                    >
                        Search
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
        </>
    );
}
