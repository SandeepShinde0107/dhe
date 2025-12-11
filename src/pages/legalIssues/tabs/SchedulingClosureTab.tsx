import React, { useMemo, useState } from "react";
import {
    Box,
    Grid,
    Typography,
    Card,
    TextField,
    MenuItem,
    Button,
    Checkbox,
    FormControlLabel,
    Chip,
    IconButton,
} from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { casesData } from "../../../data/casesData";

import CourtroomsJudgesTab from "./CourtroomsJudgesTab";
import CaseClosureTab from "./CaseClosureTab";
import StatisticsTab from "./StatisticsTab";

type CaseItem = {
    caseNumber: string;
    title: string;
    subTitle: string;
};

type ScheduledEvent = {
    id: string;
    caseNumber: string;
    eventType: string;
    date: string;
    time: string;
    durationMinutes: number;
    courtroom: string;
    judge: string;
    remarks?: string;
    notified: boolean;
};

const EVENT_TYPES = ["Hearing", "Pre-trial", "Final arguments", "Mediation"];

const SAMPLE_COURTROOMS = [
    "Court No. 1",
    "Court No. 2",
    "Court No. 12",
    "Labour Bench 3",
];

const SAMPLE_JUDGES = [
    "Hon. Justice A.B. Sharma",
    "Hon. Justice R.K. Patel",
    "Hon. Justice S. Joshi",
];

export default function SchedulingClosureTab({
    showSidebar = true,      
    defaultTab = 0  
}: {
    showSidebar?: boolean;
    defaultTab?: number;
}) {
   
    const cases: CaseItem[] = casesData.map((c) => ({
        caseNumber: c.caseNumber,
        title: c.title,
        subTitle: c.subTitle,
    }));

    const [selectedCase, setSelectedCase] = useState<string>(cases[0]?.caseNumber ?? "");
    const [innerTab, setInnerTab] = useState<0 | 1 | 2 | 3>(defaultTab as 0 | 1 | 2 | 3);

    const [events, setEvents] = useState<ScheduledEvent[]>([]);

    const [form, setForm] = useState({
        eventType: "Hearing",
        date: "",
        time: "",
        durationMinutes: 120,
        courtroom: "",
        judge: "",
        remarks: "",
        notified: true,
    });

    const onChangeForm = <K extends keyof typeof form>(key: K, value: typeof form[K]) =>
        setForm((s) => ({ ...s, [key]: value }));

    const scheduleEvent = () => {
        if (!selectedCase) return alert("Please select a case first.");
        if (!form.date || !form.time) return alert("Please choose date & time.");

        const newEvent: ScheduledEvent = {
            id: Math.random().toString(36).slice(2, 9),
            caseNumber: selectedCase,
            eventType: form.eventType,
            date: form.date,
            time: form.time,
            durationMinutes: form.durationMinutes,
            courtroom: form.courtroom,
            judge: form.judge,
            remarks: form.remarks,
            notified: form.notified,
        };

        setEvents((prev) => [newEvent, ...prev]);

        setForm((s) => ({
            ...s,
            date: "",
            time: "",
            remarks: "",
        }));
    };

    const removeEvent = (id: string) => {
        if (confirm("Remove scheduled event?")) {
            setEvents((ev) => ev.filter((e) => e.id !== id));
        }
    };

    const selectedCaseObj = useMemo(
        () => cases.find((c) => c.caseNumber === selectedCase),
        [selectedCase]
    );

    const scheduledForCase = events.filter((e) => e.caseNumber === selectedCase);

    return (
        <Box display="flex" gap={3} flexDirection={{ xs: "column", md: "row" }}>
            {showSidebar && (
                <Box width={{ xs: "100%", md: "28%" }}>
                    <Card sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" fontWeight={700} mb={1}>
                            Select Case
                        </Typography>
                        <Typography color="text.secondary" mb={2}>
                            Choose a case to manage
                        </Typography>

                        <Box display="flex" flexDirection="column" gap={1}>
                            {cases.map((c) => {
                                const active = c.caseNumber === selectedCase;
                                return (
                                    <Box
                                        key={c.caseNumber}
                                        onClick={() => setSelectedCase(c.caseNumber)}
                                        sx={{
                                            borderRadius: 1,
                                            border: active ? "2px solid #0b6b66" : "1px solid #ececec",
                                            background: active ? "#f3fcfb" : "transparent",
                                            p: 2,
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Typography fontWeight={700}>{c.caseNumber}</Typography>
                                        <Typography color="text.secondary">{c.title}</Typography>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Card>
                </Box>
            )}
            <Box flex={1}>
                <Card sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h5" fontWeight={700}>
                        Case Scheduling & Management
                    </Typography>

                    {showSidebar && (
                        <Typography color="text.secondary" mb={3}>
                            Managing: <strong>{selectedCase}</strong> – {selectedCaseObj?.title}
                        </Typography>
                    )}

               
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            bgcolor: "#f7f9fa",
                            p: 1,
                            borderRadius: 2,
                            mb: 3,
                        }}
                    >
                        {[
                            "Schedule Event",
                            "Courtrooms & Judges",
                            "Case Closure",
                            "Statistics",
                        ].map((label, index) => {
                            const active = innerTab === index;
                            return (
                                <Box
                                    key={index}
                                    onClick={() => setInnerTab(index as any)}
                                    sx={{
                                        px: 2,
                                        py: 1,
                                        borderRadius: 1,
                                        cursor: "pointer",
                                        fontWeight: 700,
                                        bgcolor: active ? "#fff" : "transparent",
                                        color: active ? "black" : "text.secondary",
                                        boxShadow: active ? "0 2px 6px rgba(0,0,0,0.1)" : "none",
                                        border: active ? "1px solid #e5e7eb" : "1px solid transparent",
                                    }}
                                >
                                    {label}
                                </Box>
                            );
                        })}
                    </Box>

                    {innerTab === 0 && (
                        <>
                            <Grid container spacing={2}>
                              <Grid size={{xs:12, md:6}}>
                                    <TextField
                                        label="Event Type"
                                        fullWidth
                                        select
                                        value={form.eventType}
                                        onChange={(e) => onChangeForm("eventType", e.target.value)}
                                    >
                                        {EVENT_TYPES.map((t) => (
                                            <MenuItem key={t} value={t}>
                                                {t}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                              <Grid size={{xs:12, md:6}}>
                                    <TextField
                                        label="Scheduled Date"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        value={form.date}
                                        onChange={(e) => onChangeForm("date", e.target.value)}
                                    />
                                </Grid>

                              <Grid size={{xs:12, md:6}}>
                                    <TextField
                                        label="Scheduled Time"
                                        type="time"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        value={form.time}
                                        onChange={(e) => onChangeForm("time", e.target.value)}
                                    />
                                </Grid>

                              <Grid size={{xs:12, md:6}}>
                                    <TextField
                                        label="Duration (minutes)"
                                        type="number"
                                        fullWidth
                                        value={form.durationMinutes}
                                        onChange={(e) =>
                                            onChangeForm("durationMinutes", Number(e.target.value))
                                        }
                                    />
                                </Grid>

                              <Grid size={{xs:12, md:6}}>
                                    <TextField
                                        label="Courtroom"
                                        fullWidth
                                        select
                                        value={form.courtroom}
                                        onChange={(e) => onChangeForm("courtroom", e.target.value)}
                                    >
                                        <MenuItem value="">Select courtroom</MenuItem>
                                        {SAMPLE_COURTROOMS.map((r) => (
                                            <MenuItem key={r} value={r}>
                                                {r}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                              <Grid size={{xs:12, md:6}}>
                                    <TextField
                                        label="Judge"
                                        fullWidth
                                        select
                                        value={form.judge}
                                        onChange={(e) => onChangeForm("judge", e.target.value)}
                                    >
                                        <MenuItem value="">Select judge</MenuItem>
                                        {SAMPLE_JUDGES.map((j) => (
                                            <MenuItem key={j} value={j}>
                                                {j}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid size={{xs:12}}>
                                    <TextField
                                        label="Remarks"
                                        fullWidth
                                        multiline
                                        rows={3}
                                        value={form.remarks}
                                        placeholder="Enter any additional remarks..."
                                        onChange={(e) => onChangeForm("remarks", e.target.value)}
                                    />
                                </Grid>

                                <Grid size={{xs:12}}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={form.notified}
                                                onChange={(e) =>
                                                    onChangeForm("notified", e.target.checked)
                                                }
                                            />
                                        }
                                        label="Send notifications to all parties"
                                    />
                                </Grid>

                                <Grid size={{xs:12}}>
                                    <Button
                                        variant="contained"
                                        sx={{ textTransform: "none", bgcolor: "#065f46" }}
                                        onClick={scheduleEvent}
                                    >
                                        <CalendarMonthOutlinedIcon sx={{ mr: 1 }} />
                                        Schedule Event
                                    </Button>
                                </Grid>
                            </Grid>

                      
                            <Box mt={4}>
                                <Typography variant="h6" fontWeight={700} mb={2}>
                                    Scheduled Events
                                </Typography>

                                {scheduledForCase.length === 0 ? (
                                    <Typography color="text.secondary">
                                        No scheduled events
                                    </Typography>
                                ) : (
                                    <Box display="flex" flexDirection="column" gap={2}>
                                        {scheduledForCase.map((ev) => (
                                            <Card key={ev.id} sx={{ p: 2 }}>
                                                <Box
                                                    display="flex"
                                                    justifyContent="space-between"
                                                >
                                                    <Box>
                                                        <Box
                                                            display="flex"
                                                            gap={1}
                                                            alignItems="center"
                                                        >
                                                            <Chip
                                                                label={ev.eventType.toLowerCase()}
                                                                size="small"
                                                            />
                                                            {ev.notified && (
                                                                <Chip label="Notified" size="small" />
                                                            )}
                                                        </Box>

                                                        <Box
                                                            display="flex"
                                                            gap={2}
                                                            color="text.secondary"
                                                            mt={1}
                                                        >
                                                            <CalendarMonthOutlinedIcon
                                                                fontSize="small"
                                                            />
                                                            {ev.date} • {ev.time}
                                                            <PlaceOutlinedIcon
                                                                sx={{ ml: 1 }}
                                                                fontSize="small"
                                                            />
                                                            {ev.courtroom}
                                                            <PersonOutlineOutlinedIcon
                                                                sx={{ ml: 1 }}
                                                                fontSize="small"
                                                            />
                                                            {ev.judge}
                                                        </Box>

                                                        {ev.remarks && (
                                                            <Typography
                                                                color="text.secondary"
                                                                mt={1}
                                                            >
                                                                {ev.remarks}
                                                            </Typography>
                                                        )}
                                                    </Box>

                                                    <IconButton onClick={() => removeEvent(ev.id)}>
                                                        <DeleteOutlineIcon />
                                                    </IconButton>
                                                </Box>
                                            </Card>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        </>
                    )}


                    {innerTab === 1 && <CourtroomsJudgesTab />}

                    {innerTab === 2 && <CaseClosureTab />}

                    {innerTab === 3 && <StatisticsTab />}
                </Card>
            </Box>
        </Box>
    );
}
