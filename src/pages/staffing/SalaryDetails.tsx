import React, { useMemo } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Chip,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from "@mui/material";

export type SalaryStaffRow = {
    id: string;
    name: string;
    designation: string;
    appointmentType: string;
};

type Props = {
    staff: any;
    onBack: () => void;
};

// Dummy Salary Structure
const BASIC_PAY = 75000;

const ALLOWANCES = [
    { type: "DA", name: "Dearness Allowance", taxable: true, amount: 12750 },
    { type: "HRA", name: "House Rent Allowance", taxable: true, amount: 18000 },
    { type: "TA", name: "Transport Allowance", taxable: false, amount: 3200 },
];

const DEDUCTIONS = [
    { type: "PF", name: "Provident Fund", amount: 9000 },
    { type: "PT", name: "Professional Tax", amount: 200 },
];

export default function SalaryDetails({ staff, onBack }: Props) {
    if (!staff) {
        return (
            <Box sx={{ maxWidth: "95%", mx: "auto", mt: 3 }}>
                <Typography variant="h5" fontWeight={700}>
                    Salary Details
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                    Select a staff member to view salary details
                </Typography>

                <Typography variant="body1" color="text.secondary" mb={2}>
                    Please select a staff member from the Staff List tab to view their salary details.
                </Typography>

                <Button
                    variant="contained"
                    sx={{ textTransform: "none", borderRadius: 2 }}
                    onClick={onBack}
                >
                    Go to Staff List
                </Button>
            </Box>
        );
    }
    const totalAllowances = ALLOWANCES.reduce((s, x) => s + x.amount, 0);
    const totalDeductions = DEDUCTIONS.reduce((s, x) => s + x.amount, 0);

    const grossSalary = BASIC_PAY + totalAllowances;
    const netSalary = grossSalary - totalDeductions;

    return (
        <Box sx={{ maxWidth: "95%", mx: "auto", mt: 3 }}>
            {/* BACK BUTTON */}
            <Button
                variant="outlined"
                onClick={onBack}
                sx={{ textTransform: "none", mb: 2 }}
            >
                ← Back to Staff List
            </Button>

            {/* STAFF HEADER */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h5" fontWeight={700}>
                        {staff.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {staff.id} • {staff.designation}
                    </Typography>

                    <Chip
                        label={staff.appointmentType.toLowerCase()}
                        sx={{ bgcolor: "#0f766e", color: "white", mt: 1 }}
                    />
                </CardContent>
            </Card>

            {/* BASIC PAY CARD */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" fontWeight={700}>
                        ₹ Basic Pay
                    </Typography>
                    <Typography variant="body2" mb={2}>
                        Base salary as per pay scale
                    </Typography>

                    <Typography variant="h4" fontWeight={700}>
                        ₹{BASIC_PAY.toLocaleString("en-IN")}
                    </Typography>
                </CardContent>
            </Card>

            {/* ALLOWANCES */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" fontWeight={700}>
                        Allowances
                    </Typography>
                    <Typography variant="body2" mb={2}>
                        Additional benefits and allowances
                    </Typography>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Taxable</TableCell>
                                <TableCell align="right">Amount</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {ALLOWANCES.map((x) => (
                                <TableRow key={x.type}>
                                    <TableCell>{x.type}</TableCell>
                                    <TableCell>{x.name}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={x.taxable ? "Taxable" : "Non-taxable"}
                                            size="small"
                                            sx={{ bgcolor: "#facc15" }}
                                        />
                                    </TableCell>
                                    <TableCell align="right" sx={{ color: "#166534", fontWeight: 700 }}>
                                        ₹{x.amount.toLocaleString("en-IN")}
                                    </TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Typography fontWeight={700}>Total Allowances</Typography>
                                </TableCell>
                                <TableCell align="right" sx={{ color: "#166534", fontWeight: 700 }}>
                                    ₹{totalAllowances.toLocaleString("en-IN")}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* DEDUCTIONS */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" fontWeight={700}>
                        Deductions
                    </Typography>
                    <Typography variant="body2" mb={2}>
                        Statutory and other deductions
                    </Typography>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Amount</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {DEDUCTIONS.map((x) => (
                                <TableRow key={x.type}>
                                    <TableCell>{x.type}</TableCell>
                                    <TableCell>{x.name}</TableCell>
                                    <TableCell align="right" sx={{ color: "#b91c1c", fontWeight: 700 }}>
                                        ₹{x.amount.toLocaleString("en-IN")}
                                    </TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell colSpan={2}>
                                    <Typography fontWeight={700}>Total Deductions</Typography>
                                </TableCell>
                                <TableCell align="right" sx={{ color: "#b91c1c", fontWeight: 700 }}>
                                    ₹{totalDeductions.toLocaleString("en-IN")}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* SALARY SUMMARY */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" fontWeight={700}>
                        Salary Summary
                    </Typography>
                    <Typography variant="body2" mb={2}>
                        Total compensation breakdown
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography>Basic Pay</Typography>
                        <Typography>₹{BASIC_PAY.toLocaleString("en-IN")}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography>Total Allowances</Typography>
                        <Typography sx={{ color: "#166534" }}>
                            +₹{totalAllowances.toLocaleString("en-IN")}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                        <Typography fontWeight={700}>Gross Salary</Typography>
                        <Typography fontWeight={700}>
                            ₹{grossSalary.toLocaleString("en-IN")}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography>Total Deductions</Typography>
                        <Typography sx={{ color: "#b91c1c" }}>
                            -₹{totalDeductions.toLocaleString("en-IN")}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            mt: 2,
                            p: 2,
                            bgcolor: "#e2e8f0",
                            borderRadius: 2,
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography fontWeight={700}>Net Salary</Typography>
                        <Typography fontWeight={700}>
                            ₹{netSalary.toLocaleString("en-IN")}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
