import React from "react";
import {
    Box,
    Card,
    Tabs,
    Tab,
    Typography,
    Grid,
    TextField,
    MenuItem,
    Button,
    Switch,
    FormControlLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MainLayout from "../../components/MainLayout";
import ContactTab from "./registrationTab/ContactTab";
import GuardianTab from "./registrationTab/GuardianTab";
import AcademicTab from "./registrationTab/AcademicTab";
import EducationTab from "./registrationTab/EducationTab";
import FeeManagement from "./FeeManagement";
import Timetable from "./timetableTab/Timetable";
import AttendancePage from "./attendanceTab/AttendancePage";
import ExaminationPage from "./ExaminationPage";


export default function StudentRegistration() {
    const [outerTab, setOuterTab] = React.useState(0);
    const [innerTab, setInnerTab] = React.useState(0);

    const { register, handleSubmit, setValue, watch, formState } = useForm({
        defaultValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            dob: "",
            gender: "",
            bloodGroup: "",
            nationality: "Indian",
            religion: "",
            motherTongue: "",
            category: "",
            disability: "",
            studentType: "",
            minority: false,
        },
    });

    const onSubmit = (data: any) => {
        console.log("Form Data:", data);
    };

    const outertabs = [
        { key: 0, label: "Registration" },
        { key: 1, label: "Fee Management" },
        { key: 2, label: "Timetable" },
        { key: 3, label: "Attendance" },
        { key: 4, label: "Examinations" },
    ];
    const innerTabs = [
        { key: 0, label: "Personal" },
        { key: 1, label: "Contact" },
        { key: 2, label: "Guardian" },
        { key: 3, label: "Academic" },
        { key: 4, label: "Education" },
    ];


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

    const handleNext = () => {
        if (innerTab < innerTabs.length - 1) {
            setInnerTab(innerTab + 1);
        }
    };

    return (
        <MainLayout>
            <Box p={4}>
                <Typography variant="h4" fontWeight={600}>
                    Student Academic Module
                </Typography>

                <Typography color="text.secondary" mb={3}>
                    Manage student registration, fees, academic activities, and examinations
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 2,
                        bgcolor: "#f7f9fa",
                        p: 1,
                        borderRadius: 2,
                        mb: 3,
                    }}
                >
                    {outertabs.map((t) => {
                        const isActive = outerTab === t.key;

                        return (
                            <Box
                                key={t.key}
                                onClick={() => setOuterTab(t.key)}
                                sx={{
                                    flex: 1,
                                    py: 1.4,
                                    borderRadius: 2,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 1,
                                    fontWeight: 600,
                                    fontSize: "0.95rem",
                                    bgcolor: isActive ? "#ffffff" : "transparent",
                                    boxShadow: isActive ? "0px 2px 6px rgba(0,0,0,0.1)" : "none",
                                    border: isActive ? "1px solid #e5e7eb" : "1px solid transparent",
                                    transition: "all 0.2s ease",
                                    color: isActive ? "#000" : "#6b7280",
                                    "&:hover": {
                                        bgcolor: isActive ? "#ffffff" : "#eef1f2",
                                    },
                                }}
                            >
                                <Typography fontWeight={600}>{t.label}</Typography>
                            </Box>
                        );
                    })}
                </Box>

                {outerTab === 0 && (
                    <Card sx={{ p: 4, borderRadius: 3 }}>
                        <Typography variant="h5" fontWeight={600}>
                            Student Registration
                        </Typography>

                        <Typography color="text.secondary" mb={3}>
                            Register a new student by filling in all required information
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 2,
                                bgcolor: "#f7f9fa",
                                p: 1,
                                borderRadius: 2,
                                mb: 3,
                            }}
                        >
                            {innerTabs.map((t) => {
                                const isActive = innerTab === t.key;

                                return (
                                    <Box
                                        key={t.key}
                                        onClick={() => setInnerTab(t.key)}
                                        sx={{
                                            flex: 1,
                                            py: 1.4,
                                            borderRadius: 2,
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 1,
                                            fontWeight: 600,
                                            fontSize: "0.95rem",
                                            bgcolor: isActive ? "#ffffff" : "transparent",
                                            boxShadow: isActive ? "0px 2px 6px rgba(0,0,0,0.1)" : "none",
                                            border: isActive ? "1px solid #e5e7eb" : "1px solid transparent",
                                            transition: "all 0.2s ease",
                                            color: isActive ? "#000" : "#6b7280",
                                            "&:hover": {
                                                bgcolor: isActive ? "#ffffff" : "#eef1f2",
                                            },
                                        }}
                                    >
                                        <Typography fontWeight={600}>{t.label}</Typography>
                                    </Box>
                                );
                            })}
                        </Box>


                        {innerTab === 0 && (
                            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={3}>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <FormField label="First Name *">
                                            <TextField fullWidth {...register("firstName")} />
                                        </FormField>
                                    </Grid>

                                   
                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <FormField label="Middle Name">
                                            <TextField fullWidth {...register("middleName")} />
                                        </FormField>
                                    </Grid>

                                  
                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <FormField label="Last Name *">
                                            <TextField fullWidth {...register("lastName")} />
                                        </FormField>
                                    </Grid>

                                   
                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <FormField label="Date of Birth *">
                                            <DatePicker
                                                onChange={(date) => {
                                                    setValue("dob", date ? date.format("YYYY-MM-DD") : "");
                                                }}
                                                slotProps={{ textField: { fullWidth: true } }}
                                            />

                                        </FormField>
                                    </Grid>

                                   
                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <FormField label="Gender *">
                                            <TextField select fullWidth {...register("gender")}>
                                                <MenuItem value="Male">Male</MenuItem>
                                                <MenuItem value="Female">Female</MenuItem>
                                                <MenuItem value="Other">Other</MenuItem>
                                            </TextField>
                                        </FormField>
                                    </Grid>

                                    
                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <FormField label="Blood Group">
                                            <TextField select fullWidth {...register("bloodGroup")}>
                                                {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((bg) => (
                                                    <MenuItem key={bg} value={bg}>
                                                        {bg}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </FormField>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <FormField label="Nationality *">
                                            <TextField fullWidth {...register("nationality")} />
                                        </FormField>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <FormField label="Religion">
                                            <TextField fullWidth {...register("religion")} />
                                        </FormField>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <FormField label="Mother Tongue">
                                            <TextField fullWidth {...register("motherTongue")} />
                                        </FormField>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <FormField label="Category *">
                                            <TextField select fullWidth {...register("category")}>
                                                <MenuItem value="General">General</MenuItem>
                                                <MenuItem value="OBC">OBC</MenuItem>
                                                <MenuItem value="SC">SC</MenuItem>
                                                <MenuItem value="ST">ST</MenuItem>
                                            </TextField>
                                        </FormField>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <FormField label="Disability">
                                            <TextField select fullWidth {...register("disability")}>
                                                <MenuItem value="None">None</MenuItem>
                                                <MenuItem value="Physical">Physical</MenuItem>
                                                <MenuItem value="Visual">Visual</MenuItem>
                                            </TextField>
                                        </FormField>
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <FormField label="Student Type *">
                                            <TextField select fullWidth {...register("studentType")}>
                                                <MenuItem value="Regular">Regular</MenuItem>
                                                <MenuItem value="Private">Private</MenuItem>
                                            </TextField>
                                        </FormField>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <FormField label="Minority Student">
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={watch("minority")}
                                                        onChange={(e) => setValue("minority", e.target.checked)}
                                                    />
                                                }
                                                label=""
                                            />
                                        </FormField>
                                    </Grid>

                                </Grid>
                                <Box mt={4} textAlign="right">
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{
                                            px: 4,
                                            py: 1,
                                            textTransform: "none",
                                            borderRadius: 2,
                                        }}
                                    >
                                        Next
                                    </Button>

                                </Box>
                            </Box>

                        )}

                        {innerTab === 1 && (
                            <ContactTab
                                register={register}
                                setValue={setValue}
                                watch={watch}
                                innerTab={innerTab}
                                setInnerTab={setInnerTab}
                            />
                        )}

                        {innerTab === 2 && (
                            <GuardianTab
                                register={register}
                                watch={watch}
                                innerTab={innerTab}
                                setInnerTab={setInnerTab}
                                errors={formState.errors}
                            />
                        )}
                        {innerTab === 3 && (
                            <AcademicTab
                                register={register}
                                setValue={setValue}
                                watch={watch}
                                innerTab={innerTab}
                                setInnerTab={setInnerTab}
                                errors={formState.errors}
                            />
                        )}
                        {innerTab === 4 && (
                            <EducationTab
                                register={register}
                                innerTab={innerTab}
                                setInnerTab={setInnerTab}
                                onSubmit={handleSubmit((data) => console.log("Final Submit", data))}
                            />

                        )}
                    </Card>

                )}

                {outerTab === 1 && (
                    <FeeManagement />
                )}

                {outerTab === 2 && (
                    <Timetable />
                )}
                {outerTab === 3 && (
                    <AttendancePage />
                )}
                {outerTab === 4 && (
                    <ExaminationPage />
                )}
            </Box>
        </MainLayout >
    );
}
