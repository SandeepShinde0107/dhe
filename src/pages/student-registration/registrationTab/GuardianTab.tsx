import React from "react";
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
} from "@mui/material";
import  type {
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
    FieldErrors,
} from "react-hook-form";

const FormField = ({
    label,
    children,
    error,
}: {
    label: string;
    children: React.ReactNode;
    error?: string;
}) => (
    <Box mb={1}>
        <Typography fontWeight={600} mb={0.5}>
            {label}
        </Typography>
        {children}
        {error && (
            <Typography mt={0.5} fontSize="0.85rem" color="error">
                {error}
            </Typography>
        )}
    </Box>
);

type GuardianTabProps = {
    register: UseFormRegister<any>;
    watch: UseFormWatch<any>;
    innerTab: number;
    setInnerTab: (tab: number) => void;
    errors: FieldErrors;
};

export default function GuardianTab({
    register,
    watch,
    innerTab,
    setInnerTab,
    errors,
}: GuardianTabProps) {
    return (
        <Box>
            <Grid container spacing={3}>
                 <Grid size={{xs:12}}>
                    <Typography fontWeight={700} fontSize="1.1rem" mt={1} mb={2}>
                        Father's Information
                    </Typography>
                </Grid>
                <Grid size={{xs:12,md:6}}>
                    <FormField
                        label="Name *"
                        error={errors.fatherName?.message as string}
                    >
                        <TextField
                            fullWidth
                            {...register("fatherName", { required: "Name is required" })}
                        />
                    </FormField>
                </Grid>

                <Grid size={{xs:12,md:6}}>
                    <FormField
                        label="Occupation *"
                        error={errors.fatherOccupation?.message as string}
                    >
                        <TextField
                            fullWidth
                            {...register("fatherOccupation", {
                                required: "Occupation is required",
                            })}
                        />
                    </FormField>
                </Grid>


                 <Grid size={{xs:12,md:4}}>
                    <FormField
                        label="Mobile *"
                        error={errors.fatherMobile?.message as string}
                    >
                        <TextField
                            fullWidth
                            placeholder="+91-9876543210"
                            {...register("fatherMobile", {
                                required: "Invalid mobile number",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Invalid mobile number",
                                },
                            })}
                        />
                    </FormField>
                </Grid>

                 <Grid size={{xs:12,md:4}}>
                    <FormField label="Email">
                        <TextField
                            fullWidth
                            {...register("fatherEmail")}
                        />
                    </FormField>
                </Grid>

                 <Grid size={{xs:12,md:4}}>
                    <FormField
                        label="Annual Income *"
                        error={errors.fatherIncome?.message as string}
                    >
                        <TextField
                            fullWidth
                            type="number"
                            {...register("fatherIncome", {
                                required: "Expected number, received nan",
                                valueAsNumber: true,
                            })}
                        />
                    </FormField>
                </Grid>
                 <Grid size={{xs:12}} sx={{mt:4}}>
                    <Typography fontWeight={700} fontSize="1.1rem" mb={2}>
                        Mother's Information
                    </Typography>
                </Grid>

                <Grid size={{xs:12,md:6}}>
                    <FormField
                        label="Name *"
                        error={errors.motherName?.message as string}
                    >
                        <TextField
                            fullWidth
                            {...register("motherName", { required: "Name is required" })}
                        />
                    </FormField>
                </Grid>

                <Grid size={{xs:12,md:6}}>
                    <FormField
                        label="Occupation *"
                        error={errors.motherOccupation?.message as string}
                    >
                        <TextField
                            fullWidth
                            {...register("motherOccupation", {
                                required: "Occupation is required",
                            })}
                        />
                    </FormField>
                </Grid>

                 <Grid size={{xs:12,md:4}}>
                    <FormField
                        label="Mobile *"
                        error={errors.motherMobile?.message as string}
                    >
                        <TextField
                            fullWidth
                            placeholder="+91-9876543210"
                            {...register("motherMobile", {
                                required: "Invalid mobile number",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Invalid mobile number",
                                },
                            })}
                        />
                    </FormField>
                </Grid>

               
                 <Grid size={{xs:12,md:4}}>
                    <FormField label="Email">
                        <TextField
                            fullWidth
                            {...register("motherEmail")}
                        />
                    </FormField>
                </Grid>

              
                 <Grid size={{xs:12,md:4}}>
                    <FormField
                        label="Annual Income *"
                        error={errors.motherIncome?.message as string}
                    >
                        <TextField
                            fullWidth
                            type="number"
                            {...register("motherIncome", {
                                required: "Expected number, received nan",
                                valueAsNumber: true,
                            })}
                        />
                    </FormField>
                </Grid>
            </Grid>

            <Box mt={4} display="flex" justifyContent="space-between">
                <Button
                    variant="outlined"
                    onClick={() => setInnerTab(innerTab - 1)}
                    sx={{ textTransform: "none", borderRadius: 2 }}
                >
                    Previous
                </Button>

                <Button
                    variant="contained"
                    onClick={() => setInnerTab(innerTab + 1)}
                    sx={{ textTransform: "none", borderRadius: 2 }}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
}
