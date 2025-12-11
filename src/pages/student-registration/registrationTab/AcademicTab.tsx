import React from "react";
import {
    Box,
    Grid,
    Typography,
    TextField,
    MenuItem,
    Button,
} from "@mui/material";
import type {
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
    FieldErrors,
} from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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

type AcademicTabProps = {
    register: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    watch: UseFormWatch<any>;
    innerTab: number;
    setInnerTab: (tab: number) => void;
    errors: FieldErrors;
};

export default function AcademicTab({
    register,
    setValue,
    watch,
    innerTab,
    setInnerTab,
    errors,
}: AcademicTabProps) {
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid size={{xs:12,md:6}}>
                    <FormField
                        label="Course *"
                        error={errors.course?.message as string}
                    >
                        <TextField
                            fullWidth
                            placeholder="e.g., B.A., B.Sc., M.A."
                            {...register("course", {
                                required: "Course is required",
                            })}
                        />
                    </FormField>
                </Grid>
                <Grid size={{xs:12,md:6}}>
                    <FormField
                        label="Course Type *"
                        error={errors.courseType?.message as string}
                    >
                        <TextField
                            select
                            fullWidth
                            {...register("courseType", {
                                required: "Required",
                            })}
                        >
                            <MenuItem value="Regular">Regular</MenuItem>
                            <MenuItem value="Honors">Honors</MenuItem>
                            <MenuItem value="Professional">Professional</MenuItem>
                        </TextField>
                    </FormField>
                </Grid>
                <Grid size={{xs:12,md:4}}>
                    <FormField
                        label="Year *"
                        error={errors.year?.message as string}
                    >
                        <TextField
                            fullWidth
                            type="number"
                            {...register("year", {
                                required: "Expected number, received nan",
                                valueAsNumber: true,
                            })}
                        />
                    </FormField>
                </Grid>
                <Grid size={{xs:12,md:4}}>
                    <FormField
                        label="Semester *"
                        error={errors.semester?.message as string}
                    >
                        <TextField
                            fullWidth
                            type="number"
                            {...register("semester", {
                                required: "Expected number, received nan",
                                valueAsNumber: true,
                            })}
                        />
                    </FormField>
                </Grid>
                <Grid size={{xs:12,md:4}}>
                    <FormField
                        label="Academic Year *"
                        error={errors.academicYear?.message as string}
                    >
                        <TextField
                            fullWidth
                            placeholder="2024-2025"
                            {...register("academicYear", {
                                required: "Academic year is required",
                            })}
                        />
                    </FormField>
                </Grid>
                <Grid size={{xs:12,md:6}}>
                    <FormField
                        label="Admission Date *"
                        error={errors.admissionDate?.message as string}
                    >
                        <DatePicker
                            onChange={(date) => setValue("admissionDate", date)}
                            slotProps={{
                                textField: { fullWidth: true },
                            }}
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
