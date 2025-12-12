import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";

export const ContactTab: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <RoomOutlinedIcon sx={{ mr: 1, color: "#0f6b73" }} />
        <Typography variant="h6" fontWeight={700}>
          Contact Information
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Address and communication details
      </Typography>

      <Grid container spacing={4}>
         <Grid size={{xs:12, md:6}}>
          <Section label="Address">
            <Typography variant="body1" fontWeight={500}>
              123 Education Road, Andheri East
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              Mumbai, Maharashtra - 400069
            </Typography>
          </Section>

          <Section label="Phone" icon={<PhoneInTalkOutlinedIcon />}>
            <Typography variant="body1" fontWeight={500}>
              +91 22 1234 5678
            </Typography>
          </Section>

          <Section label="Website" icon={<PublicOutlinedIcon />}>
            <Typography variant="body1" fontWeight={500}>
              www.mit.edu.in
            </Typography>
          </Section>
        </Grid>
         <Grid size={{xs:12, md:6}}>
          <Section label="Email" icon={<MailOutlineOutlinedIcon />}>
            <Typography variant="body1" fontWeight={500}>
              info@mit.edu.in
            </Typography>
          </Section>

          <Section label="Fax" icon={<PrintOutlinedIcon />}>
            <Typography variant="body1" fontWeight={500}>
              +91 22 1234 5679
            </Typography>
          </Section>
        </Grid>
      </Grid>
    </Box>
  );
};

type SectionProps = {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ label, icon, children }) => (
  <Box sx={{ mb: 3 }}>
    <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
      {icon && <Box sx={{ mr: 1, color: "text.secondary" }}>{icon}</Box>}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontWeight: 500 }}
      >
        {label}
      </Typography>
    </Box>
    {children}
  </Box>
);
