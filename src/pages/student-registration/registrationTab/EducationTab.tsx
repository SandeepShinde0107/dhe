import React from "react";
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
} from "@mui/material";
import type{
    UseFormRegister,
    FieldErrors,
} from "react-hook-form";

// Reusable field wrapper
const FormField = ({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) => (
    <Box mb={1}>
        <Typography fontWeight={600} mb={0.5}>
            {label}
        </Typography>
        {children}
    </Box>
);

type EducationTabProps = {
    register: UseFormRegister<any>;
    innerTab: number;
    setInnerTab: (tab: number) => void;
    onSubmit: () => void;
};

export default function EducationTab({
    register,
    innerTab,
    setInnerTab,
    onSubmit,
}: EducationTabProps) {
    return (
        <Box>
            <Grid container spacing={3}>

                {/* Title */}
                <Grid size={{xs:12}}>
                    <Typography
                        fontWeight={700}
                        fontSize="1.1rem"
                        mt={1}
                        mb={1}
                    >
                        Previous Education
                    </Typography>

                    <Typography color="text.secondary" mb={2}>
                        Add at least one previous education record (SSC, HSC, Graduation, etc.)
                    </Typography>
                </Grid>


                <Grid size={{xs:12}}>
                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        placeholder="Education history management would be implemented here with add/remove functionality"
                        {...register("educationNotes")}
                    />
                </Grid>

            </Grid>

            <Box
                mt={4}
                display="flex"
                justifyContent="space-between"
            >
                <Button
                    variant="outlined"
                    onClick={() => setInnerTab(innerTab - 1)}
                    sx={{ textTransform: "none", borderRadius: 2 }}
                >
                    Previous
                </Button>

                <Button
                    variant="contained"
                    onClick={onSubmit}
                    sx={{ textTransform: "none", borderRadius: 2, bgcolor: "#065f46"}}
                >
                    Submit Registration
                </Button>
            </Box>
        </Box>
    );
}
