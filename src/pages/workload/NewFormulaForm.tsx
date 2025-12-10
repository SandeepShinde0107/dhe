import {
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import React from "react";

export default function NewFormulaForm({
  onClose,
  onSave,
  defaultValues,
}: any) {
  const { register, handleSubmit } = useForm({
    defaultValues: defaultValues || {
      university: "",
      studentsPerDivision: "",
      theoryFormula: "",
      practicalFormula: "",
      description: "",
      effectiveFrom: "6/1/2024",
      status: "Active",
    },
  });

  const submit = (data: any) => {
    onSave(data);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        bgcolor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
    >
      <Card sx={{ width: "65%", borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} mb={2}>
            New Formula
          </Typography>

          <form onSubmit={handleSubmit(submit)}>
            <Grid container spacing={2}>
               <Grid size={{xs:12}}>
                <TextField
                  label="University Name"
                  fullWidth
                  {...register("university", { required: true })}
                />
              </Grid>

               <Grid size={{xs:12}}>
                <TextField
                  label="Students Per Division"
                  fullWidth
                  type="number"
                  {...register("studentsPerDivision", { required: true })}
                />
              </Grid>

               <Grid size={{xs:12}}>
                <TextField
                  label="Theory Workload Formula"
                  fullWidth
                  multiline
                  minRows={2}
                  {...register("theoryFormula", { required: true })}
                />
              </Grid>

               <Grid size={{xs:12}}>
                <TextField
                  label="Practical Workload Formula"
                  fullWidth
                  multiline
                  minRows={2}
                  {...register("practicalFormula", { required: true })}
                />
              </Grid>

               <Grid size={{xs:12}}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  minRows={2}
                  {...register("description")}
                />
              </Grid>
            </Grid>

            {/* BUTTONS */}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 3 }}>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="contained" type="submit" sx={{ bgcolor: "#065f46",}}>
                Save Formula
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
