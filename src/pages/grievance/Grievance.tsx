import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LodgeGrievance from "./lodgeGrievance/LodgeGrievance";
import TrackGrievance from "./trackGrievance/TrackGrievance";
import Statistics from "./statistics/Statistics";
import type { JSX } from "@emotion/react/jsx-runtime";

export default function Grievance(): JSX.Element {
  const navigate = useNavigate();
  const { tab } = useParams();
  const currentTab = tab ?? "lodgeGrievance";

  const tabItems = [
    {
      key: "lodgeGrievance",
      label: "Lodge Grievance",
      icon: <PersonOutlineIcon fontSize="small" />,
    },
    {
      key: "trackGrievance",
      label: "Track Grievance",
      icon: <SettingsOutlinedIcon fontSize="small" />,
    },
    {
      key: "statistics",
      label: "Statistics",
      icon: <NotificationsNoneOutlinedIcon fontSize="small" />,
    },
  ];

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 4, 
        }}
      >
        <Box sx={{ width: "100%", px: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Grievance Redressal
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Lodge grievances, track status, and view statistics
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              bgcolor: "#f7f9fa",
              p: 1,
              borderRadius: 2,
              mb: 3,
            }}
          >
            {tabItems.map((t) => {
              const isActive = currentTab === t.key;

              return (
                <Box
                  key={t.key}
                  onClick={() => navigate(`/grievance/${t.key}`)}
                  sx={{
                    flex: 1,
                    py: 1.4,
                    px: 2,
                    borderRadius: 2,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    fontWeight: 600,
                    bgcolor: isActive ? "#ffffff" : "transparent",
                    boxShadow: isActive
                      ? "0px 2px 6px rgba(0,0,0,0.08)"
                      : "none",
                    transition:
                      "background-color 150ms ease, box-shadow 150ms ease",
                    "&:hover": {
                      bgcolor: isActive ? "#ffffff" : "#eef1f2",
                    },
                  }}
                >
                  {t.icon}
                  <Typography>{t.label}</Typography>
                </Box>
              );
            })}
          </Box>

          <Box sx={{ mt: 2 }}>
            <Box sx={{ minHeight: "55vh" }}>
              {currentTab === "lodgeGrievance" && (
                <>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    Lodge a Grievance
                  </Typography>

                  <Typography color="text.secondary" sx={{ mb: 3 }}>
                    Submit your complaint and track its resolution status
                  </Typography>

                  <LodgeGrievance />
                </>
              )}

              {currentTab === "trackGrievance" && <TrackGrievance />}
              {currentTab === "statistics" && <Statistics />}
            </Box>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
}
