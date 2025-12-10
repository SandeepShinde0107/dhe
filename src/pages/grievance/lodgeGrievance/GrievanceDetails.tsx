import  { forwardRef, useImperativeHandle, useState } from "react";
import { Paper, Typography, Grid, TextField, MenuItem } from "@mui/material";

const GrievanceDetails = forwardRef(({ onError }: any, ref) => {
    const [state, setState] = useState({
        category: "Medium",
        nature: "Other",
        date: "",
        location: "",
        subject: "",
        description: "",
        witness: "",
        actions: "",
    });

    useImperativeHandle(ref, () => ({
        validate() {
            if (!state.category)
                return onError("Please select a grievance category"), false;

            if (!state.nature)
                return onError("Please select the nature of the grievance"), false;

            if (!state.date)
                return onError("Incident date is required"), false;

            if (!state.subject.trim())
                return onError("Subject is required"), false;

            if (!state.description.trim())
                return onError("Detailed description is required"), false;

            return true;
        },
        getValues(){
            return state;
        }
    }));

    const handleChange = (key: string, value: any) => {
        setState((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
                mt: 4,
                boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Grievance Details
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 3 }}>
                Provide details about your complaint
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ mb: 1 }}>Category *</Typography>
                    <TextField
                        select
                        fullWidth
                        value={state.category}
                        onChange={(e) => handleChange("category", e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                                height: "40px",
                            },
                        }}
                    >
                        <MenuItem value="Major">Major</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Minor">Minor</MenuItem>
                    </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ mb: 1 }}>Nature *</Typography>
                    <TextField
                        select
                        fullWidth
                        value={state.nature}
                        onChange={(e) => handleChange("nature", e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                                height: "40px",
                            },
                        }}
                    >
                        <MenuItem value="Advance">Advance</MenuItem>
                        <MenuItem value="Benefits">Benefits</MenuItem>
                        <MenuItem value="Leave">Leave</MenuItem>
                        <MenuItem value="Salary">Salary</MenuItem>
                        <MenuItem value="Promotion">Promotion</MenuItem>
                        <MenuItem value="Transfer">Transfer</MenuItem>
                        <MenuItem value="Working Condition">Working Condition</MenuItem>
                        <MenuItem value="Harassment">Harassment</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ mb: 1 }}>Incident Date *</Typography>
                    <TextField
                        type="date"
                        fullWidth
                        value={state.date}
                        onChange={(e) => handleChange("date", e.target.value)}
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
                    <Typography sx={{ mb: 1 }}>Location</Typography>
                    <TextField
                        fullWidth
                        placeholder="Where did the incident occur?"
                        value={state.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                                height: "40px",
                            },
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ mb: 1 }}>Subject *</Typography>
                    <TextField
                        fullWidth
                        placeholder="Brief subject of your grievance"
                        value={state.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                                height: "40px",
                            },
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ mb: 1 }}>Detailed Description *</Typography>
                    <TextField
                        fullWidth
                        multiline
                        minRows={4}
                        placeholder="Provide a detailed description of your grievance"
                        value={state.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                            },
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ mb: 1 }}>Witness Details (if any)</Typography>
                    <TextField
                        fullWidth
                        multiline
                        minRows={2}
                        placeholder="Name and contact details of witnesses"
                        value={state.witness}
                        onChange={(e) => handleChange("witness", e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                            },
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ mb: 1 }}>Previous Actions Taken (if any)</Typography>
                    <TextField
                        fullWidth
                        multiline
                        minRows={2}
                        placeholder="Describe any previous attempts to resolve the issue"
                        value={state.actions}
                        onChange={(e) => handleChange("actions", e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                            },
                        }}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
});

export default GrievanceDetails;
