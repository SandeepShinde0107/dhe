
import React from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorred";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import type { Role } from "./roles";

export type NavItemId =
  | "DASHBOARD"
  | "INSTITUTE_REGISTRATION"
  | "REGISTER"
  | "PROFILE"
  | "VERIFICATION"
  | "APPLICATION"
  | "STAFFING"
  | "ACADEMICS"
  | "WORKLOAD"
  | "NOC"
  | "ASSETS"
  | "LEGAL_CASES"
  | "STUDENTS"
  | "RTI"
  | "GRIEVANCE"
  | "REPORTS"
  | "SETTINGS";

type BaseNavLeaf = {
  id: NavItemId;
  label: string;
  path: string;
  icon?: React.ReactNode;
};

type BaseNavGroup = {
  id: NavItemId;
  label: string;
  icon?: React.ReactNode;
  children: NavItemId[];
};

export type BaseNavItem = BaseNavLeaf | BaseNavGroup;
export const NAV_REGISTRY: Record<NavItemId, BaseNavItem> = {
  DASHBOARD: {
    id: "DASHBOARD",
    label: "Dashboard",
    path: "/dashboard",
    icon: <DashboardOutlinedIcon />,
  },

  INSTITUTE_REGISTRATION: {
    id: "INSTITUTE_REGISTRATION",
    label: "Institute Registration",
    icon: <MenuBookOutlinedIcon />,
    children: ["REGISTER", "PROFILE"],
  },
  REGISTER: {
    id: "REGISTER",
    label: "Register",
    path: "/institute/register",
  },
  PROFILE: {
    id: "PROFILE",
    label: "Profile",
    path: "/institute/profile",
  },

  VERIFICATION: {
    id: "VERIFICATION",
    label: "Verification",
    children: ["APPLICATION"],
  },
  APPLICATION: {
    id: "APPLICATION",
    label: "Application",
    path: "/verification/application",
  },

  STAFFING: {
    id: "STAFFING",
    label: "Staffing",
    path: "/staffing",
  },
  ACADEMICS: {
    id: "ACADEMICS",
    label: "Academics",
    path: "/academics",
  },
  WORKLOAD: {
    id: "WORKLOAD",
    label: "Workload",
    path: "/workload",
  },
  NOC: {
    id: "NOC",
    label: "NOC",
    path: "/noc",
  },
  ASSETS: {
    id: "ASSETS",
    label: "Assets",
    path: "/assets",
  },
  LEGAL_CASES: {
    id: "LEGAL_CASES",
    label: "Legal Cases",
    path: "/legal",
  },
  STUDENTS: {
    id: "STUDENTS",
    label: "Students",
    path: "/students",
  },
  RTI: {
    id: "RTI",
    label: "RTI",
    path: "/rti/apply",
    icon: <MenuBookOutlinedIcon />,
  },
  GRIEVANCE: {
    id: "GRIEVANCE",
    label: "Grievance",
    path: "/grievance/lodgeGrievance",
    icon: <ReportGmailerrorredOutlinedIcon />,
  },
  REPORTS: {
    id: "REPORTS",
    label: "Reports",
    path: "/reports",
  },
  SETTINGS: {
    id: "SETTINGS",
    label: "Settings",
    path: "/settings/profile",
    icon: <SettingsOutlinedIcon />,
  },
};

export const ROLE_NAVS: Record<Role, NavItemId[]> = {
  ADMIN: [
    "DASHBOARD",
    "INSTITUTE_REGISTRATION",
    "VERIFICATION",
    "STAFFING",
    "ACADEMICS",
    "WORKLOAD",
    "NOC",
    "ASSETS",
    "LEGAL_CASES",
    "STUDENTS",
    "RTI",
    "GRIEVANCE",
    "REPORTS",
    "SETTINGS",
  ],
  INSTITUTE: [
    "DASHBOARD",
    "INSTITUTE_REGISTRATION",
    "STAFFING",
    "ACADEMICS",
    "WORKLOAD",
    "NOC",
    "ASSETS",
    "LEGAL_CASES",
    "STUDENTS",
    "RTI",
    "GRIEVANCE",
    "SETTINGS",
  ],
  JD: [
    "DASHBOARD",
    "VERIFICATION",
    "STAFFING",
    "WORKLOAD",
    "NOC",
    "RTI",
    "GRIEVANCE",
    "REPORTS",
    "SETTINGS",
  ],
  DIRECTOR: [
    "DASHBOARD",
    "VERIFICATION",
    "NOC",
    "RTI",
    "GRIEVANCE",
    "REPORTS",
    "SETTINGS",
  ],
  SECRETARY: [
    "DASHBOARD",
    "VERIFICATION",
    "NOC",
    "RTI",
    "GRIEVANCE",
    "REPORTS",
    "SETTINGS",
  ],
};
