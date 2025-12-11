import React from "react";
import {
    Box,
    Grid,
    Typography,
    TextField,
    MenuItem,
    Switch,
    FormControlLabel,
    Button,
} from "@mui/material";
import type { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

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

type ContactTabProps = {
    register: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    watch: UseFormWatch<any>;
    innerTab: number;
    setInnerTab: (tab: number) => void;
};

export default function ContactTab({
    register,
    setValue,
    watch,
    innerTab,
    setInnerTab,
}: ContactTabProps) {
    return (
        <Box component="form">
            <Grid container spacing={3}>

                <Grid size={{xs:12, md:6}}>
                    <FormField label="Email *">
                        <TextField fullWidth {...register("email")} />
                    </FormField>
                </Grid>

                <Grid size={{xs:12, md:6}}>
                    <FormField label="Mobile *">
                        <TextField fullWidth {...register("mobile")} />
                    </FormField>
                </Grid>

                <Grid size={{xs:12, md:6}}>
                    <FormField label="Alternate Mobile">
                        <TextField
                            fullWidth
                            {...register("altMobile")}
                            placeholder="+91-9876543210"
                        />
                    </FormField>
                </Grid>

                <Grid size={{xs:12}}>
                    <Typography fontWeight={700} mt={3} mb={1} fontSize="1.1rem">
                        Permanent Address
                    </Typography>
                </Grid>

                <Grid size={{xs:12, md:6}}>
                    <FormField label="Address Line 1 *">
                        <TextField fullWidth {...register("permAddress1")} />
                    </FormField>
                </Grid>

                <Grid size={{xs:12, md:6}}>
                    <FormField label="Address Line 2">
                        <TextField fullWidth {...register("permAddress2")} />
                    </FormField>
                </Grid>

                <Grid size={{xs:12,md:4}}>
                    <FormField label="City *">
                        <TextField fullWidth {...register("permCity")} />
                    </FormField>
                </Grid>

                <Grid size={{xs:12,md:4}}>
                    <FormField label="District *">
                        <TextField fullWidth {...register("permDistrict")} />
                    </FormField>
                </Grid>

                <Grid size={{xs:12,md:4}}>
                    <FormField label="State *">
                        <TextField fullWidth {...register("permState")} />
                    </FormField>
                </Grid>

                <Grid size={{xs:12, md:6}}>
                    <FormField label="Pincode *">
                        <TextField fullWidth {...register("permPincode")} />
                    </FormField>
                </Grid>

                <Grid size={{xs:12, md:6}}>
                    <FormField label="Country *">
                        <TextField fullWidth {...register("permCountry")} />
                    </FormField>
                </Grid>

               <Grid size={{xs:12}}  sx={{mt:1}}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={watch("sameAsPermanent")}
                                onChange={(e) =>
                                    setValue("sameAsPermanent", e.target.checked)
                                }
                            />
                        }
                        label="Current address same as permanent address"
                    />
                </Grid>

                <Grid size={{xs:12}}>
                    <Typography fontWeight={700} mt={3} mb={1} fontSize="1.1rem">
                        Current Address
                    </Typography>
                </Grid>

                <Grid size={{xs:12, md:6}}>
                    <FormField label="Address Line 1 *">
                        <TextField
                            fullWidth
                            {...register("currAddress1")}
                            disabled={watch("sameAsPermanent")}
                        />
                    </FormField>
                </Grid>

                <Grid size={{xs:12, md:6}}>
                    <FormField label="Address Line 2">
                        <TextField
                            fullWidth
                            {...register("currAddress2")}
                            disabled={watch("sameAsPermanent")}
                        />
                    </FormField>
                </Grid>

                <Grid size={{xs:12,md:4}}>
                    <FormField label="City *">
                        <TextField
                            fullWidth
                            {...register("currCity")}
                            disabled={watch("sameAsPermanent")}
                        />
                    </FormField>
                </Grid>

                <Grid size={{xs:12,md:4}}>
                    <FormField label="District *">
                        <TextField
                            fullWidth
                            {...register("currDistrict")}
                            disabled={watch("sameAsPermanent")}
                        />
                    </FormField>
                </Grid>

                <Grid size={{xs:12,md:4}}>
                    <FormField label="State *">
                        <TextField
                            fullWidth
                            {...register("currState")}
                            disabled={watch("sameAsPermanent")}
                        />
                    </FormField>
                </Grid>

                <Grid size={{xs:12, md:6}}>
                    <FormField label="Pincode *">
                        <TextField
                            fullWidth
                            {...register("currPincode")}
                            disabled={watch("sameAsPermanent")}
                        />
                    </FormField>
                </Grid>

                <Grid size={{xs:12, md:6}}>
                    <FormField label="Country *">
                        <TextField
                            fullWidth
                            {...register("currCountry")}
                            disabled={watch("sameAsPermanent")}
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
