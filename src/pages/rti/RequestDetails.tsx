import { useState, forwardRef, useImperativeHandle } from "react";
import { Paper, Typography, Grid, TextField, MenuItem, Box } from "@mui/material";
import PillRadio from "../../components/PillRadio";

const RequestDetailsCard = forwardRef(({ onError }: any, ref) => {
    const [mode, setMode] = useState("online");
    const [lang, setLang] = useState("english");

    const [category, setCategory] = useState("General Information");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [infoSought, setInfoSought] = useState("");
    const [period, setPeriod] = useState("");
    const validate = () => {
        if (!category) return onError("Please select a category");
        if (!subject.trim()) return onError("Please enter a subject");
        if (!description.trim()) return onError("Please enter a description");
        if (!infoSought.trim()) return onError("Please specify the information sought");
        if (!mode) return onError("Please select the mode of action");
        if (!lang) return onError("Please select a preferred language");

        return true;
    };

    useImperativeHandle(ref, () => ({
        validate,
    }));

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
                Request Details
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 3 }}>
                Provide details about the information you are seeking
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ mb: 1 }}>Category *</Typography>
                    <TextField
                        fullWidth
                        select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                                height: "40px",
                            }
                        }}
                    >
                        <MenuItem value="Admission Related">Admission Related</MenuItem>
                        <MenuItem value="Examination Related">Examination Related</MenuItem>
                        <MenuItem value="Staff Related">Staff Related</MenuItem>
                        <MenuItem value="Infrastructure">Infrastructure</MenuItem>
                        <MenuItem value="Financial Information">Financial Information</MenuItem>
                        <MenuItem value="General Information">General Information</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ mb: 1 }}>Subject *</Typography>
                    <TextField
                        fullWidth
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter subject"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                                height: "40px",
                            }
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ mb: 1 }}>Description *</Typography>
                    <TextField
                        fullWidth
                        multiline
                        minRows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Provide a detailed description"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                            }
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ mb: 1 }}>Information Sought *</Typography>
                    <TextField
                        fullWidth
                        multiline
                        minRows={4}
                        value={infoSought}
                        onChange={(e) => setInfoSought(e.target.value)}
                        placeholder="Clearly specify what information you are seeking"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                            }
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ mb: 1 }}>Period of Information</Typography>
                    <TextField
                        fullWidth
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        placeholder="e.g., Academic Year 2023-24"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                            }
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ fontWeight: 600, mb: 1 }}>
                        Mode of Action *
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <PillRadio
                                checked={mode === "online"}
                                onChange={() => setMode("online")}
                            />
                            <Typography>Online (via email)</Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <PillRadio
                                checked={mode === "physical"}
                                onChange={() => setMode("physical")}
                            />
                            <Typography>Physical (Collect in person)</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ fontWeight: 600, mb: 1 }}>
                        Preferred Language *
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <PillRadio
                                checked={lang === "english"}
                                onChange={() => setLang("english")}
                            />
                            <Typography>English</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <PillRadio
                                checked={lang === "marathi"}
                                onChange={() => setLang("marathi")}
                            />
                            <Typography>Marathi (मराठी)</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
});

export default RequestDetailsCard;
