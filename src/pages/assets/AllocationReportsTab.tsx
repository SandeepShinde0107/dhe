// AllocationReportsTab.tsx
import React, { useMemo, useState } from "react";
import {
    Box,
    Card,
    Grid,
    Typography,
    TextField,
    MenuItem,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Snackbar,
    Alert,
    InputAdornment,
} from "@mui/material";
import LinkOffOutlinedIcon from "@mui/icons-material/LinkOffOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { format } from "date-fns";
import Statistics from "../grievance/statistics/Statistics";
import StatisticsTab from "./StatisticsTab";

type Asset = {
    code: string;
    name: string;
    category?: string;
    type: string;
    purchaseDate?: string;
    currentValue: number | string;
    status: string;
    condition?: string;
    location?: string;
    allocatedTo?: string | null;
    allocatedSince?: string | null; 
};

type Props = {
    assets?: Asset[];
    staffList?: string[];
};

const SAMPLE_ASSETS: Asset[] = Array.from({ length: 10 }).map((_, i) => {
    const idx = i + 1;
    return {
        code: `COMP${String(idx).padStart(4, "0")}`,
        name: `Desktop Computer ${idx}`,
        category: "Desktop",
        type: "Computer",
        purchaseDate: `202${(idx % 3) + 1}-0${((idx % 12) % 9) + 1}-15`,
        currentValue: Math.round(3000 + idx * 200),
        status: idx % 6 === 0 ? "Under Maintenance" : "In Use",
        condition: idx % 3 === 0 ? "Fair" : idx % 2 === 0 ? "Good" : "Excellent",
        location: idx % 2 === 0 ? "Computer Lab 2" : "Computer Lab 1",
        allocatedTo: idx % 3 === 0 ? `Staff Member ${idx}` : null,
        allocatedSince: idx % 3 === 0 ? `202${(idx % 3) + 1}-0${((idx % 12) % 9) + 1}-15` : null,
    };
});

const DEFAULT_STAFF = [
    "Staff Member 1",
    "Staff Member 2",
    "Staff Member 3",
    "Staff Member 4",
    "Staff Member 5",
];

export default function AllocationReportsTab({ assets: incomingAssets, staffList }: Props) {
    const [assets, setAssets] = useState<Asset[]>(incomingAssets ?? SAMPLE_ASSETS);
    const staff = staffList ?? DEFAULT_STAFF;
    const [subTab, setSubTab] = useState<"allocations" | "reports">("allocations");

    const [filterType, setFilterType] = useState<string>("All");
    const [filterStatus, setFilterStatus] = useState<string>("All");
    const [search, setSearch] = useState<string>("");

    const [openAlloc, setOpenAlloc] = useState(false);
    const [allocAsset, setAllocAsset] = useState<Asset | null>(null);
    const [allocStaff, setAllocStaff] = useState<string>("");
    const [allocPurpose, setAllocPurpose] = useState<string>("");
    const [allocRemarks, setAllocRemarks] = useState<string>("");

    const [snack, setSnack] = useState<{ open: boolean; message: string; severity?: "success" | "info" | "error" }>({
        open: false,
        message: "",
        severity: "success",
    });

    const types = useMemo(() => Array.from(new Set(assets.map((a) => a.type))).sort(), [assets]);
    const statuses = useMemo(() => Array.from(new Set(assets.map((a) => a.status))).sort(), [assets]);

    const total = assets.length;
    const allocatedCount = assets.filter((a) => a.allocatedTo).length;
    const availableCount = total - allocatedCount;
    const utilizationPct = total === 0 ? 0 : (allocatedCount / total) * 100;

    const filteredAssets = useMemo(() => {
        return assets.filter((a) => {
            if (filterType !== "All" && a.type !== filterType) return false;
            if (filterStatus !== "All" && a.status !== filterStatus) return false;
            if (search.trim()) {
                const q = search.toLowerCase();
                if (
                    !a.code.toLowerCase().includes(q) &&
                    !a.name.toLowerCase().includes(q) &&
                    !(a.allocatedTo ?? "").toLowerCase().includes(q)
                ) {
                    return false;
                }
            }
            return true;
        });
    }, [assets, filterType, filterStatus, search]);

    const handleOpenAllocate = (a: Asset) => {
        setAllocAsset(a);
        setAllocStaff("");
        setAllocPurpose("");
        setAllocRemarks("");
        setOpenAlloc(true);
    };

    const handleCloseAllocate = () => {
        setOpenAlloc(false);
        setAllocAsset(null);
    };
    const handleAllocate = () => {
        if (!allocAsset) return;
        if (!allocStaff.trim()) {
            setSnack({ open: true, message: "Please select a staff member.", severity: "error" });
            return;
        }
        if (!allocPurpose.trim()) {
            setSnack({ open: true, message: "Please enter purpose.", severity: "error" });
            return;
        }

        const updated = assets.map((a) =>
            a.code === allocAsset.code
                ? {
                    ...a,
                    allocatedTo: allocStaff,
                    allocatedSince: new Date().toISOString().slice(0, 10), 
                    status: "Allocated",
                }
                : a
        );
        setAssets(updated);
        setOpenAlloc(false);
        setSnack({ open: true, message: `Allocated ${allocAsset.code} → ${allocStaff}`, severity: "success" });
    };

    const handleDeallocate = (a: Asset) => {
        if (!confirm(`Deallocate ${a.code} from ${a.allocatedTo}?`)) return;
        const updated = assets.map((asset) =>
            asset.code === a.code ? { ...asset, allocatedTo: null, allocatedSince: null, status: "Available" } : asset
        );
        setAssets(updated);
        setSnack({ open: true, message: `${a.code} deallocated.`, severity: "info" });
    };

    return (
        <Box>
          
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                mb={3}
            >
              
                <Box>
                    <Typography variant="h4" fontWeight={700} mb={1}>
                        Asset Allocation & Reporting
                    </Typography>

                    <Typography color="text.secondary">
                        Manage asset allocations and view utilization reports
                    </Typography>
                </Box>

              
                <Box display="flex" gap={2}>
                    <Box
                        onClick={() => setSubTab("allocations")}
                        sx={{
                            px: 3,
                            py: 1.2,
                            borderRadius: 2,
                            cursor: "pointer",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            bgcolor: subTab === "allocations" ? "#0b6b66" : "white",
                            color: subTab === "allocations" ? "white" : "black",
                            border: subTab === "allocations" ? "none" : "1px solid #d0d7de",
                            boxShadow: subTab === "allocations" ? "0 2px 6px rgba(0,0,0,0.2)" : "none",
                            transition: "0.2s",
                        }}
                    >
                        Allocations
                    </Box>

                    <Box
                        onClick={() => setSubTab("reports")}
                        sx={{
                            px: 3,
                            py: 1.2,
                            borderRadius: 2,
                            cursor: "pointer",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            bgcolor: subTab === "reports" ? "#0b6b66" : "white",
                            color: subTab === "reports" ? "white" : "black",
                            border: subTab === "reports" ? "none" : "1px solid #d0d7de",
                            boxShadow: subTab === "reports" ? "0 2px 6px rgba(0,0,0,0.2)" : "none",
                            transition: "0.2s",
                        }}
                    >
                        Reports
                    </Box>
                </Box>
            </Box>


         
            <Grid container spacing={2} mb={3}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Card sx={{ p: 2 }}>
                        <Typography>Total Assets</Typography>
                        <Typography fontSize="1.6rem" fontWeight={700}>
                            {total}
                        </Typography>
                        <Typography color="text.secondary" variant="caption">
                            All tracked assets
                        </Typography>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Card sx={{ p: 2 }}>
                        <Typography>Allocated</Typography>
                        <Typography fontSize="1.6rem" fontWeight={700} color="success.main">
                            {allocatedCount}
                        </Typography>
                        <Typography color="text.secondary" variant="caption">
                            Currently in use
                        </Typography>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Card sx={{ p: 2 }}>
                        <Typography>Available</Typography>
                        <Typography fontSize="1.6rem" fontWeight={700}>
                            {availableCount}
                        </Typography>
                        <Typography color="text.secondary" variant="caption">
                            Ready for allocation
                        </Typography>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Card sx={{ p: 2 }}>
                        <Typography>Utilization Rate</Typography>
                        <Typography fontSize="1.6rem" fontWeight={700} color="primary.main">
                            {utilizationPct.toFixed(1)}%
                        </Typography>
                        <Typography color="text.secondary" variant="caption">
                            Asset usage efficiency
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

            {subTab === "allocations" && (
                <>
                    <Card sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" fontWeight={700} mb={2}>
                            Filters
                        </Typography>

                        <Grid container spacing={2} alignItems="center">
                            <Grid size={{ xs: 12, md: 3 }}>
                                <TextField
                                    label="Asset Type"
                                    select
                                    fullWidth
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                >
                                    <MenuItem value="All">All</MenuItem>
                                    {types.map((t) => (
                                        <MenuItem key={t} value={t}>
                                            {t}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid size={{ xs: 12, md: 3 }}>
                                <TextField
                                    label="Status"
                                    select
                                    fullWidth
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <MenuItem value="All">All</MenuItem>
                                    {statuses.map((s) => (
                                        <MenuItem key={s} value={s}>
                                            {s}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    placeholder="Search by name, code, or staff..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setFilterType("All");
                                        setFilterStatus("All");
                                        setSearch("");
                                    }}
                                >
                                    Clear Filters
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>

                   
                    <Card sx={{ p: 2 }}>
                        <Typography variant="h6" mb={2}>
                            Asset Allocations ({filteredAssets.length})
                        </Typography>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Asset Code</TableCell>
                                    <TableCell>Asset Name</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Value</TableCell>
                                    <TableCell>Allocated To</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {filteredAssets.map((a) => (
                                    <TableRow key={a.code}>
                                        <TableCell>{a.code}</TableCell>
                                        <TableCell>
                                            <Typography fontWeight={700}>{a.name}</Typography>
                                            <Typography fontSize="0.8rem" color="text.secondary">
                                                {a.category}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{a.type}</TableCell>
                                        <TableCell>₹{Number(a.currentValue).toLocaleString()}</TableCell>
                                        <TableCell>
                                            {a.allocatedTo ? (
                                                <Box>
                                                    <Typography fontWeight={700}>{a.allocatedTo}</Typography>
                                                    {a.allocatedSince && (
                                                        <Typography fontSize="0.8rem" color="text.secondary">
                                                            Since {format(new Date(a.allocatedSince), "dd MMM yyyy")}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            ) : (
                                                <Chip label="Available" size="small" />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {a.allocatedTo ? (
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<LinkOffOutlinedIcon />}
                                                    onClick={() => handleDeallocate(a)}
                                                >
                                                    Deallocate
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<LinkOutlinedIcon />}
                                                    onClick={() => handleOpenAllocate(a)}
                                                >
                                                    Allocate
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>

                   
                    <Dialog open={openAlloc} onClose={handleCloseAllocate} maxWidth="sm" fullWidth>
                        <DialogTitle>
                            Allocate Asset
                            <Typography variant="caption" display="block">
                                {allocAsset ? `${allocAsset.name} (${allocAsset.code})` : ""}
                            </Typography>
                        </DialogTitle>

                        <DialogContent>
                            <Box mt={1} display="flex" flexDirection="column" gap={2}>
                                <TextField
                                    select
                                    label="Staff Member *"
                                    fullWidth
                                    value={allocStaff}
                                    onChange={(e) => setAllocStaff(e.target.value)}
                                >
                                    <MenuItem value="">Select staff member</MenuItem>
                                    {staff.map((s) => (
                                        <MenuItem key={s} value={s}>
                                            {s}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    label="Purpose *"
                                    placeholder="e.g., Teaching, Research, Administration"
                                    fullWidth
                                    value={allocPurpose}
                                    onChange={(e) => setAllocPurpose(e.target.value)}
                                />

                                <TextField
                                    label="Remarks"
                                    placeholder="Any additional notes"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={allocRemarks}
                                    onChange={(e) => setAllocRemarks(e.target.value)}
                                />
                            </Box>
                        </DialogContent>

                        <DialogActions sx={{ px: 3, py: 2 }}>
                            <Button onClick={handleCloseAllocate}>Cancel</Button>
                            <Button variant="contained" onClick={handleAllocate} sx={{ bgcolor: "#0b6b66" }}>
                                Allocate
                            </Button>
                        </DialogActions>
                    </Dialog>

                   
                    <Snackbar
                        open={snack.open}
                        onClose={() => setSnack((s) => ({ ...s, open: false }))}
                        autoHideDuration={2500}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    >
                        <Alert severity={snack.severity ?? "success"} sx={{ width: "100%" }}>
                            {snack.message}
                        </Alert>
                    </Snackbar>
                </>
            )}
            {subTab === "reports" && (
                <StatisticsTab />
            )}

        </Box>
    );
}
