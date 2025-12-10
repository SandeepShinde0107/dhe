// SideNav.tsx
import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useLocation, useNavigate } from "react-router-dom";
import { NAV_REGISTRY, ROLE_NAVS } from "../types/navConfig";
import type { BaseNavItem } from "../types/navConfig";
import type { Role } from "../types/roles";
import { useAuth } from "../context/AuthContext"; // ⬅️ import this

function useCurrentRole(): Role {
  const { auth } = useAuth();
  return auth?.user.role ?? "INSTITUTE";
}

export default function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname;
  const role = useCurrentRole(); // 🔥 this now comes from auth

  const topLevelItems: BaseNavItem[] = ROLE_NAVS[role].map(
    (id) => NAV_REGISTRY[id]
  );

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isItemSelected = (item: BaseNavItem): boolean => {
    if ("path" in item && item.path) {
      return activePath === item.path;
    }
    if ("children" in item) {
      return item.children.some((childId) => {
        const child = NAV_REGISTRY[childId];
        return "path" in child && child.path && activePath === child.path;
      });
    }
    return false;
  };

  const handleLeafClick = (item: BaseNavItem) => {
    if ("path" in item && item.path) {
      navigate(item.path);
    }
  };

  const renderLeaf = (item: BaseNavItem, inset?: boolean) => {
    if (!("path" in item)) return null;

    const selected = isItemSelected(item);

    return (
      <ListItemButton
        key={item.id}
        selected={selected}
        onClick={() => handleLeafClick(item)}
        sx={{
          mb: 0.5,
          borderRadius: 2,
          py: 1,
          px: inset ? 3 : 1,
          "&:hover": {
            backgroundColor: "#e7a61aff",
          },
          "&.Mui-selected": {
            bgcolor: "rgba(15,95,99,0.06)",
            "&:hover": {
              backgroundColor: "#e7a61aff",
            },
          },
        }}
      >
        <ListItemText
          primary={item.label}
          primaryTypographyProps={{ fontWeight: 600 }}
        />
      </ListItemButton>
    );
  };

  const renderGroup = (item: BaseNavItem) => {
    if (!("children" in item)) return renderLeaf(item);

    const open = !!openGroups[item.id];
    const selected = isItemSelected(item);

    return (
      <React.Fragment key={item.id}>
        <ListItemButton
          onClick={() => toggleGroup(item.id)}
          selected={selected}
          sx={{
            mb: 0.5,
            borderRadius: 2,
            py: 1,
            px: 1,
            "&:hover": {
              backgroundColor: "#e7a61aff",
            },
            "&.Mui-selected": {
              bgcolor: "rgba(15,95,99,0.06)",
              "&:hover": {
                backgroundColor: "#e7a61aff",
              },
            },
          }}
        >
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {item.children.map((childId) => {
              const child = NAV_REGISTRY[childId];
              return renderLeaf(child, true);
            })}
          </List>
        </Collapse>
      </React.Fragment>
    );
  };

  return (
    <Box
      sx={{
        width: 220,
        bgcolor: "#ffffff",
        height: "100%",
      }}
    >
      <List disablePadding sx={{ mt: 0 }}>
        {topLevelItems.map((item) => renderGroup(item))}
      </List>
    </Box>
  );
}
