import React, { useState } from "react";
import MainLayout from "../../../components/MainLayout";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EventIcon from "@mui/icons-material/Event";
import { BasicInfoTab } from "../../../components/instituteProfile/BasicInfoTab";
import { ContactTab } from "../../../components/instituteProfile/ContactTab";
import { AdministrationTab } from "../../../components/instituteProfile/AdministrationTab";
import { InfrastructureTab } from "../../../components/instituteProfile/InfrastructureTab";
import { ProgramsTab } from "../../../components/instituteProfile/ProgramsTab";

type TabKey = "basic" | "contact" | "administration" | "infrastructure" | "programs";

export const InstituteProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("basic");

  const handleTabChange = (_: React.SyntheticEvent, value: TabKey) => {
    setActiveTab(value);
  };

  return (
    <MainLayout>
      <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fb", py: 3 }}>
        <Box sx={{ maxWidth: "95%", mx: "auto", px: { xs: 2, md: 0 } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="h5"fontWeight={700} mb={0.5}>
                Maharashtra Institute of Technology
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Institute Code: MIT-2024-001
              </Typography>
            </Box>
            <Chip
              label="Approved"
              sx={{
                bgcolor: "#0f6b73",
                color: "#ffffff",
                borderRadius: 999,
                fontWeight: 600,
                px: 2,
                py: 0.5,
                fontSize: 14,
              }}
            />
          </Box>
          <Grid container spacing={2} mb={3}>
            <Grid size={{ xs:12 ,md:3}}>
              <StatCard
                icon={<GroupsIcon />}
                value="2500"
                label="Total Students"
              />
            </Grid>
              <Grid size={{xs:12, md:3}}>
              <StatCard
                icon={<PeopleAltIcon />}
                value="180"
                label="Faculty Members"
              />
            </Grid>
              <Grid size={{xs:12, md:3}}>
              <StatCard icon={<MenuBookIcon />} value="12" label="Programs" />
            </Grid>
              <Grid size={{xs:12, md:3}}>
              <StatCard icon={<EventIcon />} value="2010" label="Established" />
            </Grid>
          </Grid>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "none",
              border: "1px solid #e5e7eb",
              bgcolor: "#f9fafb",
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                borderBottom: "1px solid #e5e7eb",
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: 14,
                  minHeight: 56,
                },
                "& .Mui-selected": {
                  bgcolor: "#ffffff",
                  borderBottom: "2px solid #0f6b73",
                },
                "& .MuiTabs-flexContainer": {
                  bgcolor: "#f9fafb",
                },
              }}
            >
              <Tab label="Basic Info" value="basic" />
              <Tab label="Contact" value="contact" />
              <Tab label="Administration" value="administration" />
              <Tab label="Infrastructure" value="infrastructure" />
              <Tab label="Programs" value="programs" />
            </Tabs>

            <CardContent sx={{ p: 0 }}>
              {activeTab === "basic" && <BasicInfoTab />}
              {activeTab === "contact" && <ContactTab />}
              {activeTab === "administration" && <AdministrationTab />}
              {activeTab === "infrastructure" && <InfrastructureTab />}
              {activeTab === "programs" && <ProgramsTab />}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </MainLayout>
  );
};
type StatCardProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
};

const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => (
  <Card
    sx={{
      borderRadius: 3,
      boxShadow: "none",
      border: "1px solid #e5e7eb",
      bgcolor: "#ffffff",
      height: "100%",
    }}
  >
    <CardContent
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        py: 2.5,
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          bgcolor: "#e5f3f4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#0f6b73",
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="h6" fontWeight={700}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default InstituteProfile;
