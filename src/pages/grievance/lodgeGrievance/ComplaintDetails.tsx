import { useState, forwardRef, useImperativeHandle } from "react";
import { Paper, Typography, Grid, TextField, Box } from "@mui/material";
import PillRadio from "../../../components/PillRadio";

const ComplainantDetails = forwardRef(({ onError }: any, ref) => {
    const [isEmployee, setIsEmployee] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        mobile: "",
        address: "",
        employeeId: "",
        department: "",
        designation: "",
    });

    const update = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    useImperativeHandle(ref, () => ({
        validate: () => {
            if (!form.fullName.trim()) {
                onError("Please enter your full name");
                return false;
            }
            if (!form.email.trim()) {
                onError("Please enter your email address");
                return false;
            }
            if (!form.mobile.trim()) {
                onError("Please enter your mobile number");
                return false;
            }
            if (isEmployee) {
                if (!form.employeeId.trim()) {
                    onError("Please enter your Employee ID");
                    return false;
                }
                if (!form.department.trim()) {
                    onError("Please enter your Department");
                    return false;
                }
                if (!form.designation.trim()) {
                    onError("Please enter your Designation");
                    return false;
                }
            }

            return true;
        },
        getValues() {
            return form;
        }
    }));

    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
                mb: 4,
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Complainant Details
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 3 }}>
                Provide your personal information
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <PillRadio
                    checked={isEmployee}
                    onChange={() => setIsEmployee(!isEmployee)}
                />
                <Typography sx={{ ml: 1, fontWeight: 500 }}>
                    I am an employee
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ mb: 1 }}>Full Name *</Typography>
                    <TextField
                        fullWidth
                        placeholder="Enter your full name"
                        value={form.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                                height: "40px",
                            },
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ mb: 1 }}>Email Address *</Typography>
                    <TextField
                        fullWidth
                        placeholder="your.email@example.com"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                                height: "40px",
                            },
                        }}
                    />
                </Grid>

                {isEmployee && (
                    <>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography sx={{ mb: 1 }}>Employee ID *</Typography>
                            <TextField
                                fullWidth
                                placeholder="Enter your employee ID"
                                value={form.employeeId}
                                onChange={(e) => update("employeeId", e.target.value)}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "15px",
                                        height: "40px",
                                    },
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography sx={{ mb: 1 }}>Department *</Typography>
                            <TextField
                                fullWidth
                                placeholder="Enter your department"
                                value={form.department}
                                onChange={(e) => update("department", e.target.value)}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "15px",
                                        height: "40px",
                                    },
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography sx={{ mb: 1 }}>Designation *</Typography>
                            <TextField
                                fullWidth
                                placeholder="Enter your designation"
                                value={form.designation}
                                onChange={(e) => update("designation", e.target.value)}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "15px",
                                        height: "40px",
                                    },
                                }}
                            />
                        </Grid>
                    </>
                )}

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ mb: 1 }}>Mobile Number *</Typography>
                    <TextField
                        fullWidth
                        placeholder="10-digit mobile number"
                        value={form.mobile}
                        onChange={(e) => update("mobile", e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                                height: "40px",
                            },
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ mb: 1 }}>Address</Typography>
                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        placeholder="Enter your complete address"
                        value={form.address}
                        onChange={(e) => update("address", e.target.value)}
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

export default ComplainantDetails;
