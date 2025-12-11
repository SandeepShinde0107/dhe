import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    Grid,
    Chip,
} from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import type { CSSProperties } from "react";

export default function Timetable() {
    const [activeDay, setActiveDay] = useState(0);

    const days = [
        { label: "Mon", date: "11 Dec", display: "Monday, 11 Dec" },
        { label: "Tue", date: "12 Dec", display: "Tuesday, 12 Dec" },
        { label: "Wed", date: "13 Dec", display: "Wednesday, 13 Dec" },
        { label: "Thu", date: "14 Dec", display: "Thursday, 14 Dec" },
        { label: "Fri", date: "15 Dec", display: "Friday, 15 Dec" },
        { label: "Sat", date: "16 Dec", display: "Saturday, 16 Dec" },
    ];

    const weekClasses: Record<number, any[]> = {
        0: [
            {
                title: "Software Engineering",
                type: "Practical",
                color: "#d9a406",
                code: "CS305",
                time: "9:00 AM - 10:00 AM",
                teacher: "Dr. Mehta",
                room: "Lab 1",
            },
            {
                title: "Database Management",
                type: "Lecture",
                color: "#025f5a",
                code: "CS302",
                time: "10:00 AM - 11:00 AM",
                teacher: "Prof. Patel",
                room: "Room 106",
            },
            {
                title: "Database Management",
                type: "Lecture",
                color: "#025f5a",
                code: "CS302",
                time: "11:15 AM - 12:15 PM",
                teacher: "Prof. Patel",
                room: "Room 105",
            },
            {
                title: "Operating Systems",
                type: "Lecture",
                color: "#025f5a",
                code: "CS303",
                time: "12:15 PM - 1:15 PM",
                teacher: "Dr. Kumar",
                room: "Room 105",
            },
            {
                title: "Data Structures",
                type: "Lecture",
                color: "#025f5a",
                code: "CS301",
                time: "3:00 PM - 4:00 PM",
                teacher: "Dr. Sharma",
                room: "Room 103",
            },
        ],

        1: [
            {
                title: "Operating Systems",
                type: "Lecture",
                color: "#025f5a",
                code: "CS303",
                time: "9:00 AM - 10:00 AM",
                teacher: "Dr. Kumar",
                room: "Room 102",
            },
            {
                title: "Software Engineering",
                type: "Lecture",
                color: "#025f5a",
                code: "CS305",
                time: "10:00 AM - 11:00 AM",
                teacher: "Dr. Mehta",
                room: "Room 102",
            },
            {
                title: "Data Structures",
                type: "Lecture",
                color: "#025f5a",
                code: "CS301",
                time: "11:15 AM - 12:15 PM",
                teacher: "Dr. Sharma",
                room: "Room 105",
            },
            {
                title: "Computer Networks",
                type: "Lecture",
                color: "#025f5a",
                code: "CS304",
                time: "12:15 PM - 1:15 PM",
                teacher: "Prof. Singh",
                room: "Room 107",
            },
        ],

        2: [
            {
                title: "Data Structures",
                type: "Lecture",
                color: "#025f5a",
                code: "CS301",
                time: "9:00 AM - 10:00 AM",
                teacher: "Dr. Sharma",
                room: "Room 103",
            },
            {
                title: "Computer Networks",
                type: "Lecture",
                color: "#025f5a",
                code: "CS304",
                time: "10:00 AM - 11:00 AM",
                teacher: "Prof. Singh",
                room: "Room 103",
            },
            {
                title: "Data Structures",
                type: "Practical",
                color: "#d9a406",
                code: "CS301",
                time: "12:15 PM - 1:15 PM",
                teacher: "Dr. Sharma",
                room: "Lab 1",
            },
            {
                title: "Computer Networks",
                type: "Practical",
                color: "#d9a406",
                code: "CS304",
                time: "3:00 PM - 4:00 PM",
                teacher: "Prof. Singh",
                room: "Lab 1",
            },
        ],

        3: [
            {
                title: "Computer Networks",
                type: "Practical",
                color: "#d9a406",
                code: "CS304",
                time: "10:00 AM - 11:00 AM",
                teacher: "Prof. Singh",
                room: "Lab 2",
            },
            {
                title: "Operating Systems",
                type: "Lecture",
                color: "#025f5a",
                code: "CS303",
                time: "11:15 AM - 12:15 PM",
                teacher: "Dr. Kumar",
                room: "Room 107",
            },
            {
                title: "Operating Systems",
                type: "Lecture",
                color: "#025f5a",
                code: "CS303",
                time: "12:15 PM - 1:15 PM",
                teacher: "Dr. Kumar",
                room: "Room 108",
            },
            {
                title: "Database Management",
                type: "Lecture",
                color: "#025f5a",
                code: "CS302",
                time: "2:00 PM - 3:00 PM",
                teacher: "Prof. Patel",
                room: "Room 109",
            },
        ],

        4: [
            {
                title: "Database Management",
                type: "Lecture",
                color: "#025f5a",
                code: "CS302",
                time: "9:00 AM - 10:00 AM",
                teacher: "Prof. Patel",
                room: "Room 103",
            },
            {
                title: "Data Structures",
                type: "Lecture",
                color: "#025f5a",
                code: "CS301",
                time: "10:00 AM - 11:00 AM",
                teacher: "Dr. Sharma",
                room: "Room 102",
            },
            {
                title: "Software Engineering",
                type: "Practical",
                color: "#d9a406",
                code: "CS305",
                time: "12:15 PM - 1:15 PM",
                teacher: "Dr. Mehta",
                room: "Lab 3",
            },
            {
                title: "Software Engineering",
                type: "Lecture",
                color: "#025f5a",
                code: "CS305",
                time: "2:00 PM - 3:00 PM",
                teacher: "Dr. Mehta",
                room: "Room 101",
            },
            {
                title: "Software Engineering",
                type: "Lecture",
                color: "#025f5a",
                code: "CS305",
                time: "3:00 PM - 4:00 PM",
                teacher: "Dr. Mehta",
                room: "Room 102",
            },
        ],

        5: [
            {
                title: "Database Management",
                type: "Lecture",
                color: "#025f5a",
                code: "CS302",
                time: "9:00 AM - 10:00 AM",
                teacher: "Prof. Patel",
                room: "Room 109",
            },
            {
                title: "Operating Systems",
                type: "Lecture",
                color: "#025f5a",
                code: "CS303",
                time: "10:00 AM - 11:00 AM",
                teacher: "Dr. Kumar",
                room: "Room 102",
            },
            {
                title: "Data Structures",
                type: "Lecture",
                color: "#025f5a",
                code: "CS301",
                time: "11:15 AM - 12:15 PM",
                teacher: "Dr. Sharma",
                room: "Room 106",
            },
            {
                title: "Data Structures",
                type: "Lecture",
                color: "#025f5a",
                code: "CS301",
                time: "2:00 PM - 3:00 PM",
                teacher: "Dr. Sharma",
                room: "Room 106",
            },
            {
                title: "Database Management",
                type: "Lecture",
                color: "#025f5a",
                code: "CS302",
                time: "3:00 PM - 4:00 PM",
                teacher: "Prof. Patel",
                room: "Room 104",
            },
        ],
    };

    const timeSlots = [
        "09:00-10:00",
        "10:00-11:00",
        "11:15-12:15",
        "12:15-13:15",
        "14:00-15:00",
        "15:00-16:00",
    ];

    const weekGrid: Record<string, Record<string, { title: string; room: string } | null>> = {
        "09:00-10:00": {
            Monday: { title: "Software Engineering", room: "Lab 1" },
            Tuesday: { title: "Operating Systems", room: "Room 102" },
            Wednesday: { title: "Data Structures", room: "Room 103" },
            Thursday: null,
            Friday: { title: "Database Management", room: "Room 103" },
            Saturday: { title: "Database Management", room: "Room 109" },
        },
        "10:00-11:00": {
            Monday: { title: "Database Management", room: "Room 106" },
            Tuesday: { title: "Software Engineering", room: "Room 102" },
            Wednesday: { title: "Computer Networks", room: "Room 103" },
            Thursday: { title: "Computer Networks", room: "Lab 2" },
            Friday: { title: "Data Structures", room: "Room 102" },
            Saturday: { title: "Operating Systems", room: "Room 102" },
        },
        "11:15-12:15": {
            Monday: { title: "Database Management", room: "Room 105" },
            Tuesday: { title: "Data Structures", room: "Room 105" },
            Wednesday: null,
            Thursday: { title: "Operating Systems", room: "Room 107" },
            Friday: null,
            Saturday: { title: "Data Structures", room: "Room 106" },
        },
        "12:15-13:15": {
            Monday: { title: "Operating Systems", room: "Room 105" },
            Tuesday: { title: "Computer Networks", room: "Room 107" },
            Wednesday: { title: "Data Structures", room: "Lab 1" },
            Thursday: { title: "Operating Systems", room: "Room 108" },
            Friday: { title: "Software Engineering", room: "Lab 3" },
            Saturday: null,
        },
        "14:00-15:00": {
            Monday: null,
            Tuesday: null,
            Wednesday: null,
            Thursday: { title: "Database Management", room: "Room 109" },
            Friday: { title: "Software Engineering", room: "Room 101" },
            Saturday: { title: "Data Structures", room: "Room 106" },
        },
        "15:00-16:00": {
            Monday: { title: "Data Structures", room: "Room 103" },
            Tuesday: null,
            Wednesday: { title: "Computer Networks", room: "Lab 1" },
            Thursday: null,
            Friday: { title: "Software Engineering", room: "Room 102" },
            Saturday: { title: "Database Management", room: "Room 104" },
        },
    };

    const classes = weekClasses[activeDay] || [];

    const thStyle: CSSProperties = {
    textAlign: "left",
    padding: "10px 5px",
    fontWeight: 600,
    color: "#374151",
    fontSize: "0.95rem",
};


    const timeCellStyle = {
        padding: "12px 5px",
        fontWeight: 600,
        color: "#111827",
        width: "110px",
    };

    const cellStyle = {
        padding: "12px 5px",
        verticalAlign: "top",
    };

    return (
        <Box p={2}>

            <Typography variant="h4" fontWeight={600}>
                Class Timetable
            </Typography>
            <Typography color="text.secondary" mb={3}>
                B.Sc. Computer Science - Year 2, Semester 3
            </Typography>

            <Card sx={{ p: 3, borderRadius: 3 }}>

                <Typography variant="h6" fontWeight={600} mb={1}>
                    Weekly Schedule
                </Typography>
                <Typography color="text.secondary" mb={3}>
                    View your class schedule for the week
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        bgcolor: "#f7f9fa",
                        p: 1,
                        borderRadius: 2,
                        mb: 2,
                    }}
                >
                    {days.map((d, index) => {
                        const isActive = index === activeDay;
                        return (
                            <Box
                                key={index}
                                onClick={() => setActiveDay(index)}
                                sx={{
                                    flex: 1,
                                    py: 1.3,
                                    textAlign: "center",
                                    borderRadius: 2,
                                    cursor: "pointer",
                                    bgcolor: isActive ? "#fff" : "transparent",
                                    fontWeight: 600,
                                    border: isActive
                                        ? "1px solid #e5e7eb"
                                        : "1px solid transparent",
                                    boxShadow: isActive
                                        ? "0px 2px 6px rgba(0,0,0,0.1)"
                                        : "none",
                                    transition: "0.2s",
                                }}
                            >
                                <Typography>{d.label}</Typography>
                                <Typography fontSize="0.85rem" color="text.secondary">
                                    {d.date}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <CalendarMonthOutlinedIcon fontSize="small" />
                    <Typography fontWeight={600}>{days[activeDay].display}</Typography>
                    <Box flex={1}></Box>
                    <Typography color="text.secondary">{classes.length} classes</Typography>
                </Box>

                <Grid container spacing={2}>
                    {classes.map((c, index) => (
                        <Grid size={{ xs: 12 }} key={index}>
                            <Card
                                sx={{
                                    p: 2,
                                    borderRadius: 3,
                                    border: "1px solid #e5e7eb",
                                }}
                            >
                                <Box sx={{ display: "flex", gap: 1, mb: 0.5 }}>
                                    <Typography fontSize="1.1rem" fontWeight={600}>
                                        {c.title}
                                    </Typography>

                                    <Chip
                                        label={c.type}
                                        size="small"
                                        sx={{
                                            bgcolor: c.color,
                                            color: "white",
                                            fontWeight: 600,
                                        }}
                                    />
                                </Box>

                                <Typography mb={1} color="text.secondary" fontWeight={600}>
                                    {c.code}
                                </Typography>

                                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        <AccessTimeOutlinedIcon fontSize="small" />
                                        <Typography>{c.time}</Typography>
                                    </Box>

                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        <PersonOutlineOutlinedIcon fontSize="small" />
                                        <Typography>{c.teacher}</Typography>
                                    </Box>

                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        <RoomOutlinedIcon fontSize="small" />
                                        <Typography>{c.room}</Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

            </Card>

            <Card sx={{ p: 3, borderRadius: 3, mt: 4 }}>
                <Typography variant="h6" fontWeight={600}>
                    Complete Week Schedule
                </Typography>
                <Typography color="text.secondary" mb={3}>
                    Overview of all classes for the week
                </Typography>

                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Time</th>
                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
                                (day) => (
                                    <th key={day} style={thStyle}>{day}</th>
                                )
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {timeSlots.map((slot) => (
                            <tr key={slot} style={{ borderTop: "1px solid #e5e7eb" }}>
                                <td style={timeCellStyle}>{slot}</td>
                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
                                    (day) => {
                                        const entry = weekGrid[slot][day];

                                        return (
                                            <td key={day} style={cellStyle}>
                                                {entry ? (
                                                    <>
                                                        <div style={{ fontWeight: 600 }}>{entry.title}</div>
                                                        <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                                                            {entry.room}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <span style={{ color: "#aaa" }}>-</span>
                                                )}
                                            </td>
                                        );
                                    }
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </Box>
    );
}
