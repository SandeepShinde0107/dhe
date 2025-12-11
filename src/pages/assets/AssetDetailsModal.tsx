import {
    Box,
    Modal,
    Typography,
    Grid,
    Chip,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

type AssetDetailsModalProps = {
    open: boolean;
    onClose: () => void;
    data: any; 
};

const modalStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    maxHeight: "75vh",
    overflowY: "auto",
    bgcolor: "white",
    borderRadius: 3,
    p: 3,
};

export default function AssetDetailsModal({ open, onClose, data }: AssetDetailsModalProps) {
    if (!data) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
               
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight={700}>
                        Asset Details
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Typography mb={2} color="text.secondary">
                    {data.code} - {data.name}
                </Typography>

                <Grid container spacing={2}>
                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={700}>Asset Code</Typography>
                        <Typography mb={2}>{data.code}</Typography>
                    </Grid>

                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={700}>Asset Type</Typography>
                        <Typography mb={2}>{data.type}</Typography>
                    </Grid>

                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={700}>Category</Typography>
                        <Typography mb={2}>{data.category}</Typography>
                    </Grid>

                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={700}>Status</Typography>
                        <Chip
                            label={data.status}
                            size="small"
                            sx={{ textTransform: "capitalize" }}
                        />
                    </Grid>

                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={700}>Condition</Typography>
                        <Chip
                            label={data.condition}
                            size="small"
                            color="success"
                        />
                    </Grid>

                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={700}>Location</Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                            <PlaceOutlinedIcon fontSize="small" />
                            <Typography mb={2}>{data.location}</Typography>
                        </Box>
                    </Grid>

                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={700}>Description</Typography>
                        <Typography mb={2}>{data.description}</Typography>
                    </Grid>

                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={700}>Model</Typography>
                        <Typography mb={2}>{data.model}</Typography>
                    </Grid>

                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={700}>Manufacturer</Typography>
                        <Typography mb={2}>{data.manufacturer}</Typography>
                    </Grid>

                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={700}>Serial Number</Typography>
                        <Typography mb={2}>{data.serial}</Typography>
                    </Grid>

                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={700}>Department</Typography>
                        <Typography mb={2}>{data.department}</Typography>
                    </Grid>
                </Grid>

                <Box mt={4} mb={1}>
                    <Typography fontWeight={700}>Purchase Information</Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={600}>Purchase Date</Typography>
                        <Typography mb={2}>{data.purchaseDate}</Typography>
                    </Grid>
                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={600}>Purchase Cost</Typography>
                        <Typography mb={2}>₹{Number(data.cost).toLocaleString()}</Typography>
                    </Grid>

                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={600}>Supplier</Typography>
                        <Typography mb={2}>{data.supplier}</Typography>
                    </Grid>

                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={600}>Invoice Number</Typography>
                        <Typography mb={2}>{data.invoiceNumber}</Typography>
                    </Grid>

                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={600}>Warranty Expiry</Typography>
                        <Typography mb={2}>{data.warrantyExpiry}</Typography>
                    </Grid>
                </Grid>

               
                <Box mt={4} mb={1}>
                    <Typography fontWeight={700}>Depreciation Information</Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={600}>Depreciation Method</Typography>
                        <Typography mb={2}>{data.depreciationMethod}</Typography>
                    </Grid>

                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={600}>Depreciation Rate</Typography>
                        <Typography mb={2}>{data.depreciationRate}%</Typography>
                    </Grid>

                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={600}>Useful Life</Typography>
                        <Typography mb={2}>{data.usefulLife} years</Typography>
                    </Grid>

                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={600}>Current Value</Typography>
                        <Typography mb={2}>₹{Number(data.currentValue).toLocaleString()}</Typography>
                    </Grid>

                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={600}>Accumulated Depreciation</Typography>
                        <Typography mb={2} color="error">
                            ₹{Number(data.accumulatedDepreciation).toLocaleString()}
                        </Typography>
                    </Grid>
                </Grid>

               
                <Box mt={4} mb={1}>
                    <Typography fontWeight={700}>Maintenance Information</Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={600}>Last Maintenance</Typography>
                        <Typography mb={2}>{data.lastMaintenance}</Typography>
                    </Grid>
                  <Grid size={{xs:12,md:6}}>
                        <Typography fontWeight={600}>Next Maintenance</Typography>
                        <Typography mb={2}>{data.nextMaintenance}</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}
