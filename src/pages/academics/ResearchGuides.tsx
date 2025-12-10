import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    Typography,
    CardContent,
    Card,
} from "@mui/material";
import type { ResearchGuide } from "../../data/data.ts";

type Props = {
    rows: ResearchGuide[];
};

export default function ResearchGuidesTable({ rows }: Props) {
    return (
        <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
            <CardContent>
                <Typography variant="h6" fontWeight={700} mb={1}>
                    Research Guides
                </Typography>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Guide Name</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>Program</TableCell>
                            <TableCell>Registered</TableCell>
                            <TableCell>Completed</TableCell>
                            <TableCell>PH/Foreign</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((g) => (
                            <TableRow key={g.name} hover>
                                <TableCell>{g.name}</TableCell>
                                <TableCell>
                                    <Chip label={g.department} size="small" />
                                </TableCell>
                                <TableCell>{g.subject}</TableCell>
                                <TableCell>
                                    <Chip label={g.program} size="small" sx={{ bgcolor: "#E7D089" }} />
                                </TableCell>
                                <TableCell>
                                    {g.registered}
                                    <Typography variant="caption" display="block">
                                        M:{g.gender.male} F:{g.gender.female}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ color: "#16a34a", fontWeight: 600 }}>
                                    {g.completed}
                                </TableCell>
                                <TableCell>
                                    PH: {g.ph.total}/{g.ph.completed}
                                    <br />
                                    For: {g.foreign.total}/{g.foreign.completed}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={g.status}
                                        size="small"
                                        sx={{ bgcolor: "#065f46", color: "white" }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
