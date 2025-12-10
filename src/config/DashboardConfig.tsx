// Dashboard.tsx
import React from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";

import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import type { Role } from "../types/roles";

export type AnalyticsVariant = "ADMIN_MAIN" | "CITIZEN_MAIN"; // add more later


type MetricConfig = {
  title: string;
  value: number | string;
  delta?: string;
  deltaPositive?: boolean;
  subtitle: string;
  icon: React.ReactNode;
};

type QuickActionConfig = {
  title: string;
  subtitle: string;
  bgcolor: string;
  icon: React.ReactNode;
};

type DashboardConfig = {
  subtitle: string;
  metrics: MetricConfig[];
  quickActions: QuickActionConfig[];    
  analyticsVariant?: AnalyticsVariant | null; // 👈 new field
};

const CITIZEN_STYLE_CONFIG: DashboardConfig = {
  subtitle: "Citizen Dashboard",
  metrics: [
    {
      title: "My Applications",
      value: 3,
      delta: "1% from last period",
      subtitle: "Total applications",
      icon: <DescriptionOutlinedIcon />,
    },
    {
      title: "Pending",
      value: 1,
      delta: "0% from last period",
      deltaPositive: false,
      subtitle: "Under review",
      icon: <AccessTimeOutlinedIcon />,
    },
    {
      title: "Approved",
      value: 2,
      delta: "1% from last period",
      subtitle: "Completed",
      icon: <CheckCircleOutlineIcon />,
    },
    {
      title: "My Grievances",
      value: 1,
      delta: "0% from last period",
      deltaPositive: false,
      subtitle: "Active grievances",
      icon: <InfoOutlinedIcon />,
    },
  ],
  quickActions: [
    {
      title: "File Grievance",
      subtitle: "Submit new grievance",
      bgcolor: "#f44336",
      icon: <InfoOutlinedIcon sx={{ color: "white" }} />,
    },
    {
      title: "File RTI",
      subtitle: "RTI application",
      bgcolor: "#1e88e5",
      icon: <DescriptionOutlinedIcon sx={{ color: "white" }} />,
    },
    {
      title: "Track Applications",
      subtitle: "View status",
      bgcolor: "#2ecc71",
      icon: <TaskAltOutlinedIcon sx={{ color: "white" }} />,
    },
  ],
  analyticsVariant: "CITIZEN_MAIN",
};

const ADMIN_CONFIG: DashboardConfig = {
  subtitle: "System Administrator Dashboard",
  metrics: [
    {
      title: "Total Users",
      value: 1547,
      delta: "↑ 2% from last period",
      subtitle: "Registered users",
      icon: <PeopleOutlineIcon />,
    },
    {
      title: "System Uptime",
      value: "99.8%",
      delta: "↑ 0.2% from last period",
      subtitle: "Availability",
      icon: <AccessTimeOutlinedIcon />,
    },
    {
      title: "Pending Tickets",
      value: 8,
      delta: "↓ 3% from last period",
      deltaPositive: false, // because down is good here
      subtitle: "Open support tickets",
      icon: <ListAltOutlinedIcon />,
    },
    {
      title: "Last Backup",
      value: "2h ago",
       delta: "-0% from last period",
      subtitle: "Successful",
      icon: <BackupOutlinedIcon />,
    },
  ],
  quickActions: [
    {
      title: "Manage Users",
      subtitle: "User management",
      bgcolor: "#1e88e5",
      icon: <PeopleOutlineIcon sx={{ color: "white" }} />,
    },
    {
      title: "System Settings",
      subtitle: "Configuration",
      bgcolor: "#8e24aa",
      icon: <SettingsOutlinedIcon sx={{ color: "white" }} />,
    },
    {
      title: "View Logs",
      subtitle: "System logs",
      bgcolor: "#fb8c00",
      icon: <ListAltOutlinedIcon sx={{ color: "white" }} />,
    },
    {
      title: "Backup Data",
      subtitle: "Data backup",
      bgcolor: "#2ecc71",
      icon: <BackupOutlinedIcon sx={{ color: "white" }} />,
    },
  ],
  analyticsVariant: "ADMIN_MAIN",
};

 export const DASHBOARD_CONFIG_BY_ROLE: Record<Role, DashboardConfig> = {
  ADMIN: ADMIN_CONFIG,
  INSTITUTE: CITIZEN_STYLE_CONFIG,
  JD: CITIZEN_STYLE_CONFIG,
  DIRECTOR: CITIZEN_STYLE_CONFIG,
  SECRETARY: CITIZEN_STYLE_CONFIG,
};
