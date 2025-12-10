// src/components/instituteProfile/AdministrationTab.tsx
import React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

export const AdministrationTab: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2.5}>
          <Grid size={{xs:12, md:4}}>
          <AdminCard
            title="Principal"
            name="Dr. Rajesh Kumar"
            qualification="Ph.D. in Computer Science"
            experience="25 years"
            email="principal@mit.edu.in"
            phone="+91 98765 43210"
          />
        </Grid>

         <Grid size={{xs:12, md:4}}>
          <AdminCard
            title="Registrar"
            name="Prof. Sunita Sharma"
            qualification="M.Tech"
            experience="15 years"
            email="registrar@mit.edu.in"
            phone="+91 98765 43211"
          />
        </Grid>

        <Grid size={{xs:12, md:4}}>
          <AdminCard
            title="Chairman"
            name="Mr. Anil Mehta"
            designation="Chairman, Governing Body"
            email="chairman@mit.edu.in"
            phone="+91 98765 43212"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

type AdminCardProps = {
  title: string;
  name: string;
  qualification?: string;
  experience?: string;
  designation?: string;
  email: string;
  phone: string;
};

const AdminCard: React.FC<AdminCardProps> = ({
  title,
  name,
  qualification,
  experience,
  designation,
  email,
  phone,
}) => (
  <Card
    sx={{
      borderRadius: 3,
      boxShadow: "none",
      border: "1px solid #e5e7eb",
      bgcolor: "#ffffff",
      height: "100%",
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        {title}
      </Typography>

      <Field label="Name" value={name} strong />

      {qualification && (
        <Field label="Qualification" value={qualification} strong={false} />
      )}

      {experience && (
        <Field label="Experience" value={experience} strong={false} />
      )}

      {designation && (
        <Field label="Designation" value={designation} strong={false} />
      )}

      <Field label="Email" value={email} strong={false} />
      <Field label="Phone" value={phone} strong={false} />
    </CardContent>
  </Card>
);

type FieldProps = {
  label: string;
  value: string;
  strong?: boolean;
};

const Field: React.FC<FieldProps> = ({ label, value, strong = true }) => (
  <Box sx={{ mb: 1.5 }}>
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ mb: 0.3, fontWeight: 500 }}
    >
      {label}
    </Typography>
    <Typography
      variant="body1"
      fontWeight={strong ? 700 : 500}
      sx={{ whiteSpace: "pre-line" }}
    >
      {value}
    </Typography>
  </Box>
);
