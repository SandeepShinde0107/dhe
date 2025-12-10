import { Snackbar, Alert } from "@mui/material";

export default function ErrorToast({ open, message, onClose, type = "error" }:any) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert
                onClose={onClose}
                severity={type}
                variant="filled"
                icon={false}
                sx={{
                    width: "100%",
                    bgcolor: type === "success" ? "#d4f5dd" : "#fdecea",
                    color: type === "success" ? "#1b5e20" : "#b71c1c",
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                    fontSize: "15px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {type === "success" ? "✔ " : "✖ "} {message}
            </Alert>
        </Snackbar>
    );
}
