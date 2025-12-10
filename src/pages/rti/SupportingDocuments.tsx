import { useState, type DragEvent } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function SupportingDocuments({
  onSaveDraft,
  onProceed,
  onSubmit,
  mode = "rti", 
}: any) {
  const [files, setFiles] = useState<File[]>([]);

  const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
  const maxSize = 5 * 1024 * 1024;

  const validateFile = (file: File) => {
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Allowed: PDF, JPG, JPEG, PNG");
      return false;
    }
    if (file.size > maxSize) {
      alert("File too large. Maximum allowed: 5MB");
      return false;
    }
    return true;
  };

  const handleFiles = (selected: FileList | null) => {
    if (!selected) return;

    const validFiles: File[] = [];
    Array.from(selected).forEach((file) => {
      if (validateFile(file)) validFiles.push(file);
    });

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        mt: 4,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Supporting Documents
      </Typography>

      <Typography sx={{ color: "text.secondary", mb: 3 }}>
        Upload any supporting documents (optional)
      </Typography>

      {/* UPLOAD AREA */}
      <Box
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        sx={{
          border: "2px dashed #b7d0d0",
          borderRadius: 3,
          p: 4,
          textAlign: "center",
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": { backgroundColor: "#f7fbfb" },
        }}
      >
        <CloudUploadOutlinedIcon
          sx={{ fontSize: 50, color: "#0f5f63", mb: 2 }}
        />

        <Typography sx={{ fontWeight: 600 }}>Drag & drop files here</Typography>

        <Typography
          component="label"
          sx={{ color: "#0f5f63", textDecoration: "underline", cursor: "pointer" }}
        >
          or browse files
          <input type="file" multiple hidden onChange={(e) => handleFiles(e.target.files)} />
        </Typography>

        <Typography sx={{ mt: 2, fontSize: 13, color: "text.secondary" }}>
          Accepted: .pdf, .jpg, .jpeg, .png  
        </Typography>
        <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
          Max size: 5 MB
        </Typography>
      </Box>

      {/* FILE LIST */}
      {files.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography sx={{ fontWeight: 600, mb: 1 }}>Uploaded Files</Typography>

          {files.map((file) => (
            <Box
              key={file.name}
              sx={{
                p: 1.5,
                borderRadius: 2,
                mb: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#f7fafb",
                border: "1px solid #e0ebeb",
              }}
            >
              <Typography>{file.name}</Typography>

              <IconButton onClick={() => removeFile(file.name)} color="error">
                <DeleteOutlineIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      <Typography sx={{ mt: 2, fontSize: 13, color: "text.secondary" }}>
        Accepted formats: PDF, JPG, PNG. Maximum size: 5MB per file
      </Typography>

      {/* BUTTONS */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
        
        {/* SAVE DRAFT ALWAYS SAME */}
        <Button
          variant="outlined"
          sx={{ px: 4, borderRadius: 2 }}
          onClick={onSaveDraft}
        >
          Save Draft
        </Button>

        {/* MODE-BASED FINAL BUTTON */}
        {mode === "rti" ? (
          <Button
            variant="contained"
            sx={{
              px: 4,
              borderRadius: 2,
              bgcolor: "#0b5c60",
              "&:hover": { bgcolor: "#09494d" },
            }}
            onClick={() => onProceed(files)}
          >
            Proceed to Payment
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              px: 4,
              borderRadius: 2,
              bgcolor: "#0b5c60",
              "&:hover": { bgcolor: "#09494d" },
            }}
            onClick={() => onSubmit(files)}
          >
            Submit Grievance
          </Button>
        )}
      </Box>
    </Paper>
  );
}
