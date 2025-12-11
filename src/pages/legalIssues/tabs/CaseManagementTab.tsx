import { Box, Typography } from "@mui/material";
import CaseStatsCards from "../components/CaseStatsCards";
import CaseFilters from "../components/CaseFiltersCards";
import CaseListTable from "../components/CaseListTable";
import { casesData } from "../../../data/casesData";

export default function CaseManagementTab() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={1}>
        All Cases
      </Typography>
      <Typography color="text.secondary" mb={3}>
        View and manage all legal cases with filtering options
      </Typography>
      <CaseStatsCards />
      <CaseFilters />
      <CaseListTable data={casesData} />
    </Box>
  );
}
