import React, { useState, useMemo } from "react";
import {
    Box,
    Card,
    Typography,
    Tabs,
    Tab,
    Grid,
    TextField,
    MenuItem,
    Button,
    Chip,
    IconButton,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Pagination,
    InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MainLayout from "../../components/MainLayout";
import Systemfeatures from "./SystemFeatures";
import AddEditAssetForm from "./AddEditAssetForm";
import AssetDetailsModal from "./AssetDetailsModal";
import AllocationReportsTab from "./AllocationReportsTab";

const ASSET_TYPES = ["Computer", "Furniture", "Electronics", "Lab Equipment"];
const STATUSES = ["In Use", "Under Maintenance", "Retired"];
const CONDITIONS = ["Excellent", "Good", "Fair", "Poor"];
const LOCATIONS = ["Computer Lab 1", "Computer Lab 2", "Library", "Admin Office"];
const DEPARTMENTS = ["IT", "Science", "Commerce", "Admin"];
const generateAssets = () => {
    const arr = [];
    for (let i = 1; i <= 60; i++) {
        arr.push({
            code: `COMP${String(i).padStart(4, "0")}`,
            name: `Desktop Computer ${i}`,
            type: "Computer",
            purchaseDate: `15 Jan 201${Math.floor(Math.random() * 4)}`,
            currentValue: (Math.random() * 50000 + 3000).toFixed(2),
            cost: (Math.random() * 90000 + 30000).toFixed(2),
            status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
            condition: CONDITIONS[Math.floor(Math.random() * CONDITIONS.length)],
            location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
        });
    }
    return arr;
};

export default function AssetManagementPage() {
    const [tab, setTab] = useState(0);
    const [assets, setAssets] = useState(generateAssets());
    const [search, setSearch] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [editItem, setEditItem] = useState<any | null>(null);
    const [editAsset, setEditAsset] = useState<any>(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState<any>(null);
    const [filters, setFilters] = useState({
        type: "All",
        status: "All",
        condition: "All",
        location: "All",
        department: "All",
    });

    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const filteredAssets = useMemo(() => {
        return assets.filter((a) => {
            if (filters.type !== "All" && a.type !== filters.type) return false;
            if (filters.status !== "All" && a.status !== filters.status) return false;
            if (filters.condition !== "All" && a.condition !== filters.condition)
                return false;
            if (filters.location !== "All" && a.location !== filters.location)
                return false;

            if (
                search &&
                !(
                    a.code.toLowerCase().includes(search.toLowerCase()) ||
                    a.name.toLowerCase().includes(search.toLowerCase())
                )
            )
                return false;

            return true;
        });
    }, [assets, search, filters]);

    const paginated = filteredAssets.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const handleEditAsset = (asset: any) => {
        setIsEditMode(true);
        setEditAsset(asset);
        setTab(2);
    };
    const handleUpdateAsset = (e: any) => {
        e.preventDefault();

        setAssets((prev) =>
            prev.map((a) => (a.code === editAsset.code ? editAsset : a))
        );

        alert("Asset updated successfully!");

        setIsEditMode(false);
        setEditAsset(null);
        setTab(0); 
    };
    const addAsset = (newAsset: any) => {
        const assetWithId = {
            ...newAsset,
            id: Math.random().toString(36).slice(2),
        };

        setAssets((prev) => [...prev, assetWithId]);
    };

    const handleAddMock = () => {
        alert("Add Asset clicked — will build modal when you tell me.");
    };

    function updateAsset(data: any) {
        throw new Error("Function not implemented.");
    }

    return (
        <MainLayout>
            <Box p={3}>
                <Typography variant="h5" fontWeight={700}>
                    Complete Asset Management System
                </Typography>
                <Typography color="text.secondary" mb={3}>
                    Manage institutional assets, track allocations, and generate utilization reports.
                </Typography>

                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                   
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            bgcolor: "#f7f9fa",
                            p: 1,
                            borderRadius: 2,
                            flex: 1,
                        }}
                    >
                        {[
                            "Asset List",
                            "Allocation & Reports",
                            isEditMode ? "Edit Asset" : "Add Asset"
                        ].map((t, i) => {

                            const active = tab === i;
                            return (
                                <Box
                                    key={i}
                                    onClick={() => setTab(i)}
                                    sx={{
                                        flex: 1,
                                        px: 2.5,
                                        py: 1.2,
                                        textAlign: "center",
                                        borderRadius: 1.5,
                                        cursor: "pointer",
                                        fontWeight: 700,
                                        bgcolor: active ? "#fff" : "transparent",
                                        color: active ? "black" : "text.secondary",
                                        boxShadow: active ? "0 2px 6px rgba(0,0,0,0.10)" : "none",
                                        border: active ? "1px solid #e5e7eb" : "1px solid transparent",
                                        transition: "0.2s",
                                    }}
                                >
                                    {t}
                                </Box>
                            );
                        })}
                    </Box>

                </Box>

                {tab === 0 && (
                    <>
                        <Box
                            mt={1}
                            mb={3}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                         
                            <Box>
                                <Typography variant="h5" fontWeight={700}>
                                    Asset Management
                                </Typography>
                                <Typography color="text.secondary">
                                    Track and manage institutional assets
                                </Typography>
                            </Box>

                          
                            <Button
                                variant="contained"
                                onClick={() => setTab(2)}
                                sx={{
                                    bgcolor: "#0b6b66",
                                    textTransform: "none",
                                    borderRadius: 2,
                                    px: 2.5,
                                    py: 1,
                                    "&:hover": { bgcolor: "#095a54" },
                                }}
                            >
                                + Add Asset
                            </Button>
                        </Box>

                        <Grid container spacing={2} mb={3}>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Card sx={{ p: 2 }}>
                                    <Typography>Total Assets</Typography>
                                    <Typography fontSize="1.8rem" fontWeight={700}>
                                        {assets.length}
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Card sx={{ p: 2 }}>
                                    <Typography>Current Value</Typography>
                                    <Typography fontSize="1.5rem" fontWeight={700}>
                                        ₹{filteredAssets
                                            .reduce((a, b) => a + Number(b.currentValue), 0)
                                            .toLocaleString()}
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Card sx={{ p: 2 }}>
                                    <Typography>Depreciation</Typography>
                                    <Typography fontSize="1.5rem" fontWeight={700}>
                                        ₹{filteredAssets
                                            .reduce(
                                                (a, b) => a + (Number(b.cost) - Number(b.currentValue)),
                                                0
                                            )
                                            .toLocaleString()}
                                    </Typography>
                                </Card>
                            </Grid>
                        </Grid>

                        <Card sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                            <Typography variant="h6" fontWeight={700} mb={2}>
                                Filters
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 2.4 }}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Asset Type"
                                        value={filters.type}
                                        onChange={(e) =>
                                            setFilters({ ...filters, type: e.target.value })
                                        }
                                    >
                                        <MenuItem value="All">All</MenuItem>
                                        {ASSET_TYPES.map((t) => (
                                            <MenuItem key={t} value={t}>
                                                {t}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid size={{ xs: 12, md: 2.4 }}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Status"
                                        value={filters.status}
                                        onChange={(e) =>
                                            setFilters({ ...filters, status: e.target.value })
                                        }
                                    >
                                        <MenuItem value="All">All</MenuItem>
                                        {STATUSES.map((s) => (
                                            <MenuItem key={s} value={s}>
                                                {s}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid size={{ xs: 12, md: 2.4 }}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Condition"
                                        value={filters.condition}
                                        onChange={(e) =>
                                            setFilters({ ...filters, condition: e.target.value })
                                        }
                                    >
                                        <MenuItem value="All">All</MenuItem>
                                        {CONDITIONS.map((c) => (
                                            <MenuItem key={c} value={c}>
                                                {c}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid size={{ xs: 12, md: 2.4 }}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Location"
                                        value={filters.location}
                                        onChange={(e) =>
                                            setFilters({ ...filters, location: e.target.value })
                                        }
                                    >
                                        <MenuItem value="All">All</MenuItem>
                                        {LOCATIONS.map((l) => (
                                            <MenuItem key={l} value={l}>
                                                {l}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid size={{ xs: 12, md: 2.4 }}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Department"
                                        value={filters.department}
                                        onChange={(e) =>
                                            setFilters({ ...filters, department: e.target.value })
                                        }
                                    >
                                        <MenuItem value="All">All</MenuItem>
                                        {DEPARTMENTS.map((d) => (
                                            <MenuItem key={d} value={d}>
                                                {d}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        placeholder="Search by name, code, category, serial number..."
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
                                        onClick={() =>
                                            setFilters({
                                                type: "All",
                                                status: "All",
                                                condition: "All",
                                                location: "All",
                                                department: "All",
                                            })
                                        }
                                    >
                                        Clear Filters
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>

                        <Card sx={{ p: 2, borderRadius: 3 }}>
                            <Typography variant="h6" mb={2}>
                                Assets ({filteredAssets.length})
                            </Typography>

                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Asset Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Purchase Date</TableCell>
                                        <TableCell>Current Value</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Condition</TableCell>
                                        <TableCell>Location</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {paginated.map((a) => (
                                        <TableRow key={a.code}>
                                            <TableCell>{a.code}</TableCell>
                                            <TableCell>
                                                <Typography fontWeight={600}>{a.name}</Typography>
                                                <Typography fontSize="0.75rem" color="text.secondary">
                                                    Desktop
                                                </Typography>
                                            </TableCell>
                                            <TableCell>{a.type}</TableCell>
                                            <TableCell>{a.purchaseDate}</TableCell>
                                            <TableCell>₹{Number(a.currentValue).toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Chip label={a.status} size="small" />
                                            </TableCell>
                                            <TableCell>
                                                <Chip label={a.condition} size="small" />
                                            </TableCell>
                                            <TableCell>{a.location}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => { setSelectedAsset(a); setViewOpen(true); }}>
                                                    <VisibilityOutlinedIcon />
                                                </IconButton>

                                                <IconButton
                                                    onClick={() => {
                                                        setEditItem(a);  
                                                        setTab(2);   
                                                    }}
                                                >
                                                    <EditOutlinedIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <Box display="flex" justifyContent="center" mt={2}>
                                <Pagination
                                    count={Math.ceil(filteredAssets.length / rowsPerPage)}
                                    page={page}
                                    onChange={(_, v) => setPage(v)}
                                />
                            </Box>
                            <AssetDetailsModal
                                open={viewOpen}
                                onClose={() => setViewOpen(false)}
                                data={selectedAsset}
                            />

                        </Card>
                    </>
                )}

                {tab === 1 && (
                    <AllocationReportsTab/>
                )}

                {tab === 2 && (
                    <AddEditAssetForm
                        mode={editItem ? "edit" : "add"}
                        initial={editItem}
                        onCancel={() => {
                            setEditItem(null);
                            setTab(0); 
                        }}
                        onSubmit={(data) => {
                            if (editItem) {
                                updateAsset(data);
                            } else { 
                                addAsset(data);
                            }

                            setEditItem(null);
                            setTab(0); 
                        }}
                    />
                )}


                <Systemfeatures />
            </Box>
        </MainLayout>

    );
}
