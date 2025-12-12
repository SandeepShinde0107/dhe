import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import  { useState } from "react";
import SavedWorkloadsTable from "./SavedWorkloadsTable";

export default function WorkloadCalculator() {
    const [subject, setSubject] = useState("Computer Science");
    const [course, setCourse] = useState("B.Sc. Computer Science");
    const [year, setYear] = useState(1);
    const [semester, setSemester] = useState(1);
    const [students, setStudents] = useState(60);
    const [divisions, setDivisions] = useState(1);
    const [innerTab, setInnerTab] = useState(0);


    const [theoryPapers, setTheoryPapers] = useState(4);
    const [lectureHours, setLectureHours] = useState(4);

    const [practicalPapers, setPracticalPapers] = useState(2);
    const [practicalHours, setPracticalHours] = useState(6);

    const [staff, setStaff] = useState(2);

    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const theoryWorkload = theoryPapers * lectureHours * divisions;
        const practicalWorkload = practicalPapers * practicalHours * divisions;
        const totalWorkload = theoryWorkload + practicalWorkload;

        const requiredStaff = Math.ceil(totalWorkload / 12);
        const utilization = (totalWorkload / (staff * 12)) * 100;

        let status = "Adequate";
        if (utilization > 100) status = "Overloaded";
        else if (utilization >= 70) status = "Optimal";

        setResult({
            theoryWorkload,
            practicalWorkload,
            totalWorkload,
            requiredStaff,
            utilization,
            status,
        });
    };

    const reset = () => setResult(null);

    return (
        <>
            <Typography variant="h6" fontWeight={700} mb={1}>
                Workload Calculator
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
                Calculate faculty workload based on student enrollment and course structure
            </Typography>

            <Card
                sx={{
                    borderRadius: 900,
                    boxShadow: "none",
                    border: "1px solid #e5e7eb",
                    overflow: "hidden",
                    mb: 3,
                }}
            >
                <Tabs
                    value={innerTab}
                    onChange={(_, v) => setInnerTab(v)}
                    variant="fullWidth"
                    TabIndicatorProps={{ style: { display: "none" } }}
                    sx={{
                        bgcolor: "#f3f4f6",
                        borderRadius: 900,
                        minHeight: "48px",
                        "& .MuiTab-root": {
                            textTransform: "none",
                            fontWeight: 600,
                            minHeight: "48px",
                            borderRadius: 900,
                            mx: 0.3,
                            color: "#4b5563",
                        },
                        "& .Mui-selected": {
                            bgcolor: "#ffffff",
                            boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
                            fontWeight: 700,
                            color: "#000000 !important",
                        },
                        "& .MuiTab-root:hover": {
                            bgcolor: "#eef1f2",
                        },
                    }}
                >
                    <Tab label="Calculator" />
                    <Tab label="Saved Workloads" />
                </Tabs>
            </Card>

            {innerTab === 0 && (<Card sx={{ borderRadius: 2, p: 2 }}>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Subject"
                                fullWidth
                                size="small"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Course"
                                fullWidth
                                size="small"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Year"
                                fullWidth
                                size="small"
                                type="number"
                                value={year}
                                onChange={(e) => setYear(+e.target.value)}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Semester"
                                fullWidth
                                size="small"
                                type="number"
                                value={semester}
                                onChange={(e) => setSemester(+e.target.value)}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Student Count"
                                fullWidth
                                size="small"
                                type="number"
                                value={students}
                                onChange={(e) => setStudents(+e.target.value)}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Divisions"
                                fullWidth
                                size="small"
                                type="number"
                                value={divisions}
                                onChange={(e) => setDivisions(+e.target.value)}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Theory Papers"
                                fullWidth
                                size="small"
                                type="number"
                                value={theoryPapers}
                                onChange={(e) => setTheoryPapers(+e.target.value)}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Practical Papers"
                                fullWidth
                                size="small"
                                type="number"
                                value={practicalPapers}
                                onChange={(e) => setPracticalPapers(+e.target.value)}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Lecture Hours/Week"
                                fullWidth
                                size="small"
                                type="number"
                                value={lectureHours}
                                onChange={(e) => setLectureHours(+e.target.value)}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Practical Hours/Week"
                                fullWidth
                                size="small"
                                type="number"
                                value={practicalHours}
                                onChange={(e) => setPracticalHours(+e.target.value)}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Available Staff"
                                fullWidth
                                size="small"
                                type="number"
                                value={staff}
                                onChange={(e) => setStaff(+e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                        <Button
                            variant="contained"
                            startIcon={<CalculateOutlinedIcon />}
                            sx={{ borderRadius: 2, textTransform: "none" }}
                            onClick={calculate}
                        >
                            Calculate
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<RestartAltIcon />}
                            sx={{ borderRadius: 2, textTransform: "none" }}
                            onClick={reset}
                        >
                            Reset
                        </Button>
                    </Box>

                    <Typography variant="h6" mt={4} mb={2}>
                        Calculation Results
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Typography> Theory Workload </Typography>
                                    <Typography fontWeight={700} fontSize={24}>
                                        16 hrs
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Typography> Practical Workload </Typography>
                                    <Typography fontWeight={700} fontSize={24}>
                                        6 hrs
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Typography> Total Workload </Typography>
                                    <Typography fontWeight={700} fontSize={24}>
                                        22 hrs
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} mt={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Card sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Typography>Required Staff:</Typography>
                                    <Typography fontWeight={700}>2</Typography>

                                    <Typography mt={1}>Available Staff:</Typography>
                                    <Typography fontWeight={700}>2</Typography>

                                    <Typography mt={1}>Status:</Typography>

                                    <Box
                                        sx={{
                                            mt: 1,
                                            display: "inline-block",
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: 10,
                                            fontSize: 13,
                                            bgcolor: "#e0f7e9",
                                            color: "green",
                                        }}
                                    >
                                        Adequate
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Card sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Typography>Staff Utilization:</Typography>
                                    <Typography fontWeight={700} color="green" fontSize={24}>
                                        69%
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>


                </CardContent>
            </Card>)}

            {innerTab === 1 && <SavedWorkloadsTable />}
        </>
    );
}
