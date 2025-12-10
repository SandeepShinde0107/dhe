import React, { useMemo, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
} from "@mui/material";

type Row = {
    year: string;
    course: string;
    type: string;
    total: number;
    gender: { male: number; female: number; other: number };
    minority: number;
    ph: number;
    nri: number;
    foreign: number;
};

type Props = {
    rows: Row[];
};

export default function AdmissionTable({ rows }: Props) {
    const pageSize = 10;
    const [page, setPage] = useState(0);

    const pageCount = Math.ceil(rows.length / pageSize);

    const pageRows = useMemo(() => {
        const start = page * pageSize;
        return rows.slice(start, start + pageSize);
    }, [page, rows]);

    const startIndex = page * pageSize + 1;
    const endIndex = Math.min((page + 1) * pageSize, rows.length);

    return (
        <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
            <CardContent>
                <Typography variant="h6" fontWeight={700} mb={1}>
                    Admission Records
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                    Showing {rows.length} records
                </Typography>

                <Box sx={{ overflowX: "auto" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Academic Year</TableCell>
                                <TableCell>Course</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell align="center">Gender (M/F/O)</TableCell>
                                <TableCell align="right">Minority</TableCell>
                                <TableCell align="right">PH</TableCell>
                                <TableCell align="right">NRI</TableCell>
                                <TableCell align="right">Foreign</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {pageRows.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                bgcolor: "#e5f0ff",
                                                px: 1.2,
                                                py: 0.3,
                                                borderRadius: 16,
                                                fontSize: 12,
                                                fontWeight: 600,
                                                display: "inline-block",
                                            }}
                                        >
                                            {row.year}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>{row.course}</TableCell>

                                    <TableCell>
                                        <Typography
                                            sx={{
                                                bgcolor: "#fef3c7",
                                                px: 1.2,
                                                py: 0.3,
                                                borderRadius: 16,
                                                fontSize: 12,
                                                fontWeight: 600,
                                                display: "inline-block",
                                            }}
                                        >
                                            {row.type}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="right">{row.total}</TableCell>

                                    <TableCell align="center">
                                        {row.gender.male}/{row.gender.female}/{row.gender.other}
                                    </TableCell>

                                    <TableCell align="right">{row.minority}</TableCell>
                                    <TableCell align="right">{row.ph}</TableCell>
                                    <TableCell align="right">{row.nri}</TableCell>
                                    <TableCell align="right">{row.foreign}</TableCell>
                                </TableRow>
                            ))}

                            {pageRows.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={9} align="center">
                                        <Typography color="text.secondary">
                                            No admission data found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Box>

                {/* Pagination */}
                <Box
                    sx={{
                        mt: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 1,
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        {rows.length === 0
                            ? "Showing 0 results"
                            : `Showing ${startIndex} to ${endIndex} of ${rows.length} results`}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                            variant="outlined"
                            disabled={page === 0}
                            onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                            sx={{ textTransform: "none", borderRadius: 2 }}
                        >
                            Previous
                        </Button>

                        <Typography variant="body2" color="text.secondary">
                            Page {page + 1} of {pageCount}
                        </Typography>

                        <Button
                            variant="outlined"
                            disabled={page >= pageCount - 1}
                            onClick={() => setPage((prev) => Math.min(pageCount - 1, prev + 1))}
                            sx={{ textTransform: "none", borderRadius: 2 }}
                        >
                            Next
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
