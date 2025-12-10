import React, { useState } from "react";
import {
    Card,
    CardContent,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableFooter,
    Button,
    Typography,
    Chip,
    Box,
} from "@mui/material";
import type { ScholarshipRow } from "../../../types/scholarship";

type Props = {
    rows: ScholarshipRow[];
};

export default function ScholarshipTable({ rows }: Props) {
    const [page, setPage] = useState(0);
    const pageSize = 10;

    const slice = rows.slice(page * pageSize, page * pageSize + pageSize);

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" fontWeight={700} mb={1}>
                    Scholarship Records
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={2}>
                    Showing {Math.min((page + 1) * pageSize, rows.length)} of {rows.length} scholarships
                </Typography>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Scholarship Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Funding Agency</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell>Beneficiaries</TableCell>
                            <TableCell>Total Amount</TableCell>
                            <TableCell>Per Student</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {slice.map((r, i) => (
                            <TableRow key={i}>
                                <TableCell sx={{ fontWeight: 600 }}>{r.name}</TableCell>

                                <TableCell>
                                    <Chip
                                        label={r.type}
                                        size="small"
                                        sx={{
                                            bgcolor: r.type === "Government" ? "#e0ecff" : "#fce4fd",
                                            color: r.type === "Government" ? "#2563eb" : "#9333ea",
                                            fontWeight: 600,
                                        }}
                                    />
                                </TableCell>

                                <TableCell>{r.agency}</TableCell>

                                <TableCell>
                                    <Chip
                                        label={r.year}
                                        size="small"
                                        sx={{
                                            bgcolor: "#facc15",
                                            color: "#000",
                                            fontWeight: 600,
                                        }}
                                    />
                                </TableCell>

                                <TableCell sx={{ fontWeight: 700 }}>
                                    {r.beneficiaries}
                                </TableCell>

                                <TableCell sx={{ color: "#166534", fontWeight: 700 }}>
                                    ₹{r.totalAmount.toLocaleString("en-IN")}
                                </TableCell>

                                <TableCell sx={{ fontWeight: 600 }}>
                                    ₹{r.perStudent.toLocaleString("en-IN")}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination Footer */}
                <TableFooter>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            gap: 2,
                            mt: 2,
                        }}
                    >
                        <Button
                            size="small"
                            disabled={page === 0}
                            onClick={() => setPage(prev => prev - 1)}
                        >
                            Previous
                        </Button>

                        <Typography fontWeight={600}>
                            Page {page + 1} of {Math.ceil(rows.length / pageSize)}
                        </Typography>

                        <Button
                            size="small"
                            disabled={(page + 1) * pageSize >= rows.length}
                            onClick={() => setPage(prev => prev + 1)}
                        >
                            Next
                        </Button>
                    </Box>
                </TableFooter>
            </CardContent>
        </Card>
    );
}
