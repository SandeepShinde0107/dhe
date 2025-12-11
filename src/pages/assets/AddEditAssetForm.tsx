import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";

type AssetFormProps = {
    mode: "add" | "edit";
    initial?: any;
    onCancel: () => void;
    onSubmit: (payload: any) => void;
};

export default function AddEditAssetForm({
    mode,
    initial,
    onCancel,
    onSubmit,
}: AssetFormProps) {

    const [form, setForm] = useState({
        name: "",
        category: "",
        type: "",
        manufacturer: "",
        model: "",
        serial: "",
        description: "",
        purchaseDate: "",
        cost: "",
        supplier: "",
        invoiceNumber: "",
        warrantyExpiry: "",
        status: "",
        condition: "",
        location: "",
        department: "",
        depreciationMethod: "",
        depreciationRate: "",
        usefulLife: "",
        remarks: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (mode === "edit" && initial) {
            setForm({ ...initial });
        }
    }, [initial]);

    const update = (key: string, val: any) => {
        setForm({ ...form, [key]: val });
        setErrors((e) => ({ ...e, [key]: "" }));
    };
type FormKeys = keyof typeof form;
  
    const requiredFields: FormKeys[] = [
        "name",
        "type",
        "category",
        "purchaseDate",
        "cost",
        "status",
        "condition",
        "location",
        "depreciationMethod",
        "depreciationRate",
        "usefulLife",
    ];

    const validate = () => {
        let newErrors: Record<string, string> = {};

        requiredFields.forEach((field) => {
            if (!form[field] || form[field].trim() === "") {
                newErrors[field] = "This field is required";
            }
        });

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return; 

        onSubmit(form); 
    };

    return (
        <Box>
           
            <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Typography sx={{ cursor: "pointer" }} onClick={onCancel}>
                    ← Back
                </Typography>

                <Typography variant="h5" fontWeight={700}>
                    {mode === "add" ? "Add New Asset" : "Edit Asset"}
                </Typography>
            </Box>

            
            <Card sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={1}>
                    Basic Information
                </Typography>

                <Grid container spacing={2}>
                   
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600} mb={0.5}>Asset Name *</Typography>
                        <TextField
                            fullWidth
                            placeholder="e.g., Desktop Computer"
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                        />
                    </Grid>

                    
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600} mb={0.5}>Asset Type *</Typography>
                        <TextField
                            fullWidth
                            placeholder="equipment"
                            value={form.type}
                            onChange={(e) => update("type", e.target.value)}
                            error={Boolean(errors.type)}
                            helperText={errors.type}
                        />
                    </Grid>

                   
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600} mb={0.5}>Category *</Typography>
                        <TextField
                            fullWidth
                            placeholder="e.g., Desktop, Laptop"
                            value={form.category}
                            onChange={(e) => update("category", e.target.value)}
                            error={Boolean(errors.category)}
                            helperText={errors.category}
                        />
                    </Grid>

                   
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600} mb={0.5}>Manufacturer</Typography>
                        <TextField
                            fullWidth
                            placeholder="e.g., Dell, HP"
                            value={form.manufacturer}
                            onChange={(e) => update("manufacturer", e.target.value)}
                        />
                    </Grid>

                  
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600} mb={0.5}>Model</Typography>
                        <TextField
                            fullWidth
                            placeholder="e.g., OptiPlex 3000"
                            value={form.model}
                            onChange={(e) => update("model", e.target.value)}
                        />
                    </Grid>

                   
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600} mb={0.5}>Serial Number</Typography>
                        <TextField
                            fullWidth
                            placeholder="e.g., SN-12345"
                            value={form.serial}
                            onChange={(e) => update("serial", e.target.value)}
                        />
                    </Grid>

                    
                    <Grid size={{ xs: 12 }}>
                        <Typography fontWeight={600} mb={0.5}>Description</Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Enter a detailed description of the asset"
                            value={form.description}
                            onChange={(e) => update("description", e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Card>

           
            <Card sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={1}>
                    Purchase Information
                </Typography>

                <Grid container spacing={2}>
                   
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600} mb={0.5}>Purchase Date *</Typography>
                        <TextField
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={form.purchaseDate}
                            onChange={(e) => update("purchaseDate", e.target.value)}
                            error={Boolean(errors.purchaseDate)}
                            helperText={errors.purchaseDate}
                        />
                    </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600} mb={0.5}>Purchase Cost (₹) *</Typography>
                        <TextField
                            type="number"
                            fullWidth
                            value={form.cost}
                            onChange={(e) => update("cost", e.target.value)}
                            error={Boolean(errors.cost)}
                            helperText={errors.cost}
                        />
                    </Grid>

                   
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600} mb={0.5}>Supplier</Typography>
                        <TextField
                            fullWidth
                            placeholder="e.g., Tech Solutions Ltd"
                            value={form.supplier}
                            onChange={(e) => update("supplier", e.target.value)}
                        />
                    </Grid>

                  
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600} mb={0.5}>Invoice Number</Typography>
                        <TextField
                            fullWidth
                            placeholder="e.g., INV-2024-001"
                            value={form.invoiceNumber}
                            onChange={(e) => update("invoiceNumber", e.target.value)}
                        />
                    </Grid>

                  
                    <Grid size={{ xs: 12 }}>
                        <Typography fontWeight={600} mb={0.5}>Warranty Expiry Date</Typography>
                        <TextField
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={form.warrantyExpiry}
                            onChange={(e) => update("warrantyExpiry", e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Card>

           
            <Card sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={1}>
                    Status & Location
                </Typography>

                <Grid container spacing={2}>
                   
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600} mb={0.5}>Status *</Typography>
                        <TextField
                            fullWidth
                            placeholder="available"
                            value={form.status}
                            onChange={(e) => update("status", e.target.value)}
                            error={Boolean(errors.status)}
                            helperText={errors.status}
                        />
                    </Grid>

                  
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600} mb={0.5}>Condition *</Typography>
                        <TextField
                            fullWidth
                            placeholder="excellent"
                            value={form.condition}
                            onChange={(e) => update("condition", e.target.value)}
                            error={Boolean(errors.condition)}
                            helperText={errors.condition}
                        />
                    </Grid>

                    
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600} mb={0.5}>Location *</Typography>
                        <TextField
                            fullWidth
                            placeholder="e.g., Computer Lab 1"
                            value={form.location}
                            onChange={(e) => update("location", e.target.value)}
                            error={Boolean(errors.location)}
                            helperText={errors.location}
                        />
                    </Grid>

                   
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600} mb={0.5}>Department</Typography>
                        <TextField
                            fullWidth
                            placeholder="e.g., Computer Science"
                            value={form.department}
                            onChange={(e) => update("department", e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Card>

           
            <Card sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={1}>
                    Depreciation Settings
                </Typography>

                <Grid container spacing={2}>
                  
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} mb={0.5}>Depreciation Method *</Typography>
                        <TextField
                            select
                            fullWidth
                            value={form.depreciationMethod}
                            onChange={(e) => update("depreciationMethod", e.target.value)}
                            error={Boolean(errors.depreciationMethod)}
                            helperText={errors.depreciationMethod}
                        >
                            <MenuItem value="straight line">Straight Line</MenuItem>
                            <MenuItem value="declining balance">Declining Balance</MenuItem>
                        </TextField>
                    </Grid>

                  
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} mb={0.5}>Depreciation Rate (%) *</Typography>
                        <TextField
                            type="number"
                            fullWidth
                            value={form.depreciationRate}
                            onChange={(e) => update("depreciationRate", e.target.value)}
                            error={Boolean(errors.depreciationRate)}
                            helperText={errors.depreciationRate}
                        />
                    </Grid>

                   
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} mb={0.5}>Useful Life (years) *</Typography>
                        <TextField
                            type="number"
                            fullWidth
                            value={form.usefulLife}
                            onChange={(e) => update("usefulLife", e.target.value)}
                            error={Boolean(errors.usefulLife)}
                            helperText={errors.usefulLife}
                        />
                    </Grid>
                </Grid>
            </Card>

           
            <Card sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={1}>
                    Additional Information
                </Typography>

                <Typography fontWeight={600} mb={0.5}>Remarks</Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Enter any additional notes or remarks"
                    value={form.remarks}
                    onChange={(e) => update("remarks", e.target.value)}
                />
            </Card>

            
            <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="outlined" onClick={onCancel}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    sx={{ bgcolor: "#0b6b66", "&:hover": { bgcolor: "#085a4f" } }}
                    onClick={handleSubmit}
                >
                    {mode === "add" ? "Create Asset" : "Save Changes"}
                </Button>
            </Box>
        </Box>
    );
}
