import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import React, { useState } from "react";
import ConfiguredFormulasTable from "./ConfiguredFormulasTable";
import NewFormulaForm from "./NewFormulaForm";

export default function FormulaConfig() {
  const [formulas, setFormulas] = useState<any[]>([]);   // <-- STORED DATA
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<any>(null);   // <-- FOR EDIT MODE

  const openAdd = () => {
    setEditData(null);
    setOpenForm(true);
  };

  const openEdit = (row: any) => {
    setEditData(row);
    setOpenForm(true);
  };

  const saveFormula = (data: any) => {
    if (editData) {
      // UPDATE EXISTING
      setFormulas((prev) =>
        prev.map((f) =>
          f.university === editData.university ? data : f
        )
      );
    } else {
      // ADD NEW
      setFormulas((prev) => [...prev, data]);
    }

    setOpenForm(false);
  };

  const PARAMETERS = [
    { key: "studentCount", desc: "Total number of students enrolled", unit: "students" },
    { key: "studentsPerDivision", desc: "Maximum students per division", unit: "students" },
    { key: "theoryPapers", desc: "Number of theory papers", unit: "papers" },
    { key: "practicalPapers", desc: "Number of practical papers", unit: "papers" },
    { key: "lectureHoursPerWeek", desc: "Theory lecture hours per week", unit: "hours" },
    { key: "practicalHoursPerWeek", desc: "Practical hours per week", unit: "hours" },
  ];

  return (
    <>
      {/* ================= HEADER ================= */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Formula Configuration
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Configure university-specific workload calculation formulas
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: 3,
            textTransform: "none",
            bgcolor: "#065f46",
            "&:hover": { bgcolor: "#0b7d72" },
          }}
          onClick={openAdd}
        >
          Add Formula
        </Button>
      </Box>

      {/* ================= PARAMETERS INFO ================= */}
      <Card sx={{ borderRadius: 2, p: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
            <InfoOutlinedIcon fontSize="small" />
            <Typography variant="h6" fontWeight={700}>
              Available Parameters
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" mb={3}>
            Parameters that can be used in formula expressions
          </Typography>

          <Grid container spacing={2}>
            {PARAMETERS.map((p, i) => (
              <Grid key={i} size={{xs:12, md:4}}>
                <Card
                  sx={{
                    borderRadius: 2,
                    p: 1,
                    border: "1px solid #e5e7eb",
                    boxShadow: "none",
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{ color: "#0d6efd", fontWeight: 600, mb: 0.5 }}
                    >
                      {p.key}
                    </Typography>
                    <Typography fontSize={13} color="text.secondary">
                      {p.desc}
                    </Typography>
                    <Typography
                      fontSize={12}
                      mt={1}
                      color="text.secondary"
                      fontStyle="italic"
                    >
                      Unit: {p.unit}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* ========= TABLE ========= */}
      <ConfiguredFormulasTable
        formulas={formulas}
        onEdit={openEdit}
      />

      {/* ========= MODAL FORM ========= */}
      {openForm && (
        <NewFormulaForm
          onClose={() => setOpenForm(false)}
          onSave={saveFormula}
          defaultValues={editData}
        />
      )}
    </>
  );
}
