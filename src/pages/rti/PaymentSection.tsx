import { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ErrorToast from "../../components/ErrorToast";
import useToast from "../../hooks/useToast";

export default function PaymentSection({ onBack }: any) {
  const { toast, showToast, closeToast } = useToast();
  const [openPopup, setOpenPopup] = useState(false);
  const handlePayment = () => {
    setOpenPopup(true);
  };

  const handlePopupClose = () => {
    setOpenPopup(false);
    showToast(
      "RTI application submitted successfully. You will receive a confirmation via email and SMS.",
      "success"
    );
  };

  return (
    <>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          mt: 3,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Payment for RTI Application
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3, fontSize: "14px" }}>
          Complete the payment to submit your RTI application
        </Typography>
        <Paper
          sx={{
            p: 2,
            bgcolor: "#f3f7f9",
            borderRadius: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
              RTI Application Fee:
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: 13 }}>
              As per RTI Act 2005, the application fee is ₹10
            </Typography>
          </Box>

          <Typography sx={{ fontWeight: 700, fontSize: 20 }}>₹10</Typography>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
          <Typography sx={{ fontWeight: 600, mb: 1, fontSize: 14 }}>
            Payment Gateway (Dummy)
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3, fontSize: 13 }}>
            This is a dummy payment gateway for demonstration purposes
          </Typography>

          <Button
            fullWidth
            variant="contained"
            startIcon={<CreditCardIcon />}
            sx={{
              bgcolor: "#0b5c60",
              "&:hover": { bgcolor: "#09494d" },
              borderRadius: 2,
              py: 1.2,
              textTransform: "none",
              fontSize: 15,
            }}
            onClick={handlePayment}
          >
            Pay ₹10 and Submit Application
          </Button>
        </Paper>

        <Button
          variant="outlined"
          onClick={onBack}
          sx={{ borderRadius: 2, textTransform: "none", px: 3 }}
        >
          Back to Application
        </Button>
      </Paper>
      <Dialog open={openPopup} onClose={handlePopupClose}>
        <DialogContent sx={{ p: 4, textAlign: "center" }}>
          <Typography sx={{ fontWeight: 700, mb: 2, fontSize: 18 }}>
            RTI Application submitted successfully!
          </Typography>

          <Typography sx={{ fontSize: 14, mb: 1 }}>
            Application Number: RTI/2025/016
          </Typography>

          <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
            You will receive a confirmation via email and SMS.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            variant="contained"
            onClick={handlePopupClose}
            sx={{
              bgcolor: "#0b5c60",
              "&:hover": { bgcolor: "#09494d" },
              textTransform: "none",
              borderRadius: 2,
              px: 4,
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <ErrorToast
        open={toast.open}
        message={toast.message}
        type="success"
        onClose={closeToast}
      />
    </>
  );
}
