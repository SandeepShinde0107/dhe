import React, { useMemo, useState } from "react";
import MainLayout from "../../components/MainLayout";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/FileDownloadOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { FilterDrawer } from "./FilterDrawer";
import type { FilterValues } from "./FilterDrawer";

type StatusType =
  | "Correction Required"
  | "Submitted"
  | "Under Review"
  | "Approved";

type VerificationStatus = "Pending" | "In Progress" | "Verified" |"Approved"| "Correction Required";

type ApplicationRow = {
  id: number;
  applicationNo: string;
  instituteName: string;
  type: string;
  region: string;
  status: StatusType;
  verification: VerificationStatus;
  submittedDate: string;
  dheCode?: string;
};

const baseRows: ApplicationRow[] = [
  {
    id: 1,
    applicationNo: "DHE/2024/021",
    instituteName: "Sample College 21",
    type: "Autonomous College",
    region: "Konkan",
    status: "Correction Required",
    verification: "Pending",
    submittedDate: "11 Jan 2024",
    dheCode: "-",
  },
  {
    id: 2,
    applicationNo: "DHE/2024/022",
    instituteName: "Sample College 22",
    type: "Aided College",
    region: "Mumbai",
    status: "Submitted",
    verification: "In Progress",
    submittedDate: "12 Jan 2024",
    dheCode: "-",
  },
  {
    id: 3,
    applicationNo: "DHE/2024/023",
    instituteName: "Sample College 23",
    type: "Unaided College",
    region: "Pune",
    status: "Under Review",
    verification: "Verified",
    submittedDate: "13 Jan 2024",
    dheCode: "-",
  },
  {
    id: 4,
    applicationNo: "DHE/2024/024",
    instituteName: "Sample College 24",
    type: "Government College",
    region: "Nagpur",
    status: "Approved",
    verification: "Approved",
    submittedDate: "14 Jan 2024",
    dheCode: "PU1024",
  },
  {
    id: 5,
    applicationNo: "DHE/2024/025",
    instituteName: "Sample College 25",
    type: "Autonomous College",
    region: "Aurangabad",
    status: "Correction Required",
    verification: "Correction Required",
    submittedDate: "15 Jan 2024",
    dheCode: "-",
  },
  {
    id: 6,
    applicationNo: "DHE/2024/026",
    instituteName: "Sample College 26",
    type: "Aided College",
    region: "Nashik",
    status: "Submitted",
    verification: "Pending",
    submittedDate: "16 Jan 2024",
    dheCode: "-",
  },
  {
    id: 7,
    applicationNo: "DHE/2024/027",
    instituteName: "Sample College 27",
    type: "Unaided College",
    region: "Kolhapur",
    status: "Under Review",
    verification: "In Progress",
    submittedDate: "17 Jan 2024",
    dheCode: "-",
  },
  {
    id: 8,
    applicationNo: "DHE/2024/028",
    instituteName: "Sample College 28",
    type: "Government College",
    region: "Amravati",
    status: "Approved",
    verification: "Verified",
    submittedDate: "18 Jan 2024",
    dheCode: "PU1028",
  },
  {
    id: 9,
    applicationNo: "DHE/2024/029",
    instituteName: "Sample College 29",
    type: "Autonomous College",
    region: "Konkan",
    status: "Correction Required",
    verification: "Approved",
    submittedDate: "19 Jan 2024",
    dheCode: "-",
  },
  {
    id: 10,
    applicationNo: "DHE/2024/030",
    instituteName: "Sample College 30",
    type: "Aided College",
    region: "Mumbai",
    status: "Submitted",
    verification: "Correction Required",
    submittedDate: "20 Jan 2024",
    dheCode: "-",
  },
]
 const rows: ApplicationRow[] = [
  ...baseRows,
  ...Array.from({ length: 20 }, (_, i) => ({
    ...baseRows[i % baseRows.length],
    id: baseRows.length + i + 1,
    applicationNo: `DHE/2024/${31 + i}`,
  })),
];

const statusChipStyles: Record<StatusType, { bg: string; color: string }> = {
  "Correction Required": { bg: "#f97373", color: "#ffffff" },
  Submitted: { bg: "#facc6b", color: "#1f2933" },
  "Under Review": { bg: "#e5f0ff", color: "#1d4ed8" },
  Approved: { bg: "#0f6b73", color: "#ffffff" },
};

const verificationChipStyles: Record<
  VerificationStatus,
  { bg: string; color: string; outlined?: boolean }
> = {
    Pending: { bg: "#facc6b", color: "#1f2933" },
    "In Progress": { bg: "#e5f0ff", color: "#1d4ed8" },
    Verified: { bg: "#ffffff", color: "#16a34a", outlined: true },
    "Correction Required": { bg: "#f97373", color: "#ffffff" },
    Approved: {
        bg: "",
        color: "",
        outlined: undefined
    }
};

const StatusChip: React.FC<{ status: StatusType }> = ({ status }) => {
  const { bg, color } = statusChipStyles[status];
  return (
    <Chip
      label={status}
      size="small"
      sx={{
        bgcolor: bg,
        color,
        fontWeight: 600,
        borderRadius: 999,
      }}
    />
  );
};

const VerificationChip: React.FC<{ status: VerificationStatus }> = ({
  status,
}) => {
  const { bg, color, outlined } = verificationChipStyles[status];
  return (
    <Chip
      label={status}
      size="small"
      sx={{
        bgcolor: outlined ? "transparent" : bg,
        color,
        borderRadius: 999,
        fontWeight: 600,
        border: outlined ? `1px solid ${color}` : "none",
      }}
    />
  );
};

export const VerifyPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1); // 1-based
  const [rowsPerPage, setRowsPerPage] = useState(10);const [filterOpen, setFilterOpen] = React.useState(false);

const [filters, setFilters] = React.useState<FilterValues>({
  applicationStatus: "",
  verificationStatus: "",
  region: "",
  instituteType: "",
  fromDate: "",
  toDate: "",
});

const handleFilterChange = (field: keyof FilterValues, value: string) => {
  setFilters(prev => ({ ...prev, [field]: value }));
};

const handleClearFilters = () => {
  setFilters({
    applicationStatus: "",
    verificationStatus: "",
    region: "",
    instituteType: "",
    fromDate: "",
    toDate: "",
  });
};

const handleApplyFilters = () => {
  console.log("Apply filters with:", filters);
  setFilterOpen(false);
};



  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => {
      return (
        r.applicationNo.toLowerCase().includes(q) ||
        r.instituteName.toLowerCase().includes(q) ||
        r.region.toLowerCase().includes(q)
      );
    });
  }, [search]);

  const total = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));
  const currentPage = Math.min(page, totalPages);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, total);
  const pageRows = filteredRows.slice(startIndex, endIndex);

  const totalApplications = rows.length;
  const totalPending = rows.filter((r) => r.verification === "Pending").length;
  const totalInProgress = rows.filter(
    (r) => r.verification === "In Progress"
  ).length;
  const totalApproved = rows.filter(
    (r) => r.verification === "Approved" || r.status === "Approved"
  ).length;

  const handleExport = () => {
    console.log("Exporting data:", filteredRows);
    alert("Export triggered (mock) – see console for data.");
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = Number(event.target.value);
    setRowsPerPage(value);
    setPage(1);
  };

  const changePage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    setPage(nextPage);
  };

  return (
    <MainLayout>
      <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh", py: 4 }}>
        <Box sx={{ maxWidth: "95%", mx: "auto", px: { xs: 2, md: 0 } }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "none",
              border: "1px solid #e5e7eb",
              bgcolor: "#ffffff",
            }}
          >
            <CardContent sx={{ p: 3.5 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 3,
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight={700} mb={0.5}>
                    Application Verification
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Review and verify institute registration applications
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={handleExport}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                  }}
                >
                  Export
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                  mb: 3,
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Search by application number, institute name, or DHE code..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "text.disabled" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor: "#f9fafb",
                    },
                  }}
                />

                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  onClick={() => setFilterOpen(true)}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    width: { xs: "100%", md: "auto" },
                  }}
                >
                  Filters
                </Button>
              </Box>
              <Grid container spacing={2.5} mb={3}>
                  <Grid size={{xs:12, md:3}}>
                  <SummaryCard
                    value={totalApplications}
                    label="Total Applications"
                  />
                </Grid>
                  <Grid size={{xs:12, md:3}}>
                  <SummaryCard value={totalPending} label="Pending" />
                </Grid>
                  <Grid size={{xs:12, md:3}}>
                  <SummaryCard value={totalInProgress} label="In Progress" />
                </Grid>
                  <Grid size={{xs:12, md:3}}>
                  <SummaryCard value={totalApproved} label="Approved" />
                </Grid>
              </Grid>

              <TableContainer
                sx={{
                  borderRadius: 2,
                  border: "1px solid #e5e7eb",
                }}
              >
                <Table size="medium">
                  <TableHead>
                    <TableRow>
                      <HeaderCell>Application No.</HeaderCell>
                      <HeaderCell>Institute Name</HeaderCell>
                      <HeaderCell>Type</HeaderCell>
                      <HeaderCell>Region</HeaderCell>
                      <HeaderCell>Status</HeaderCell>
                      <HeaderCell>Verification</HeaderCell>
                      <HeaderCell>Submitted</HeaderCell>
                      <HeaderCell>DHE Code</HeaderCell>
                      <HeaderCell text-align="center">Actions</HeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pageRows.map((row) => (
                      <TableRow key={row.id} hover>
                        <BodyCell sx={{ fontWeight: 600 }}>
                          {row.applicationNo}
                        </BodyCell>
                        <BodyCell>{row.instituteName}</BodyCell>
                        <BodyCell>{row.type}</BodyCell>
                        <BodyCell>{row.region}</BodyCell>
                        <BodyCell>
                          <StatusChip status={row.status} />
                        </BodyCell>
                        <BodyCell>
                          <VerificationChip status={row.verification} />
                        </BodyCell>
                        <BodyCell>{row.submittedDate}</BodyCell>
                        <BodyCell>{row.dheCode ?? "-"}</BodyCell>
                        <BodyCell align="center">
                          <IconButton size="small">
                            <VisibilityOutlinedIcon fontSize="small" />
                          </IconButton>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ ml: 0.5,
                            }}

                          >
                            View
                          </Typography>
                        </BodyCell>
                      </TableRow>
                    ))}
                    {pageRows.length === 0 && (
                      <TableRow>
                        <BodyCell colSpan={9} align="center">
                          No applications found.
                        </BodyCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box
                sx={{
                  mt: 2.5,
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", md: "center" },
                  gap: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {total > 0
                    ? `Showing ${startIndex + 1} to ${endIndex} of ${total} results`
                    : "Showing 0 results"}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.8,
                    }}
                  >
                    <PaginationButton
                      disabled={currentPage === 1}
                      onClick={() => changePage(1)}
                    >
                      «
                    </PaginationButton>
                    <PaginationButton
                      disabled={currentPage === 1}
                      onClick={() => changePage(currentPage - 1)}
                    >
                      ‹
                    </PaginationButton>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (p) => (
                        <PaginationButton
                          key={p}
                          active={p === currentPage}
                          onClick={() => changePage(p)}
                        >
                          {p}
                        </PaginationButton>
                      )
                    )}

                    <PaginationButton
                      disabled={currentPage === totalPages}
                      onClick={() => changePage(currentPage + 1)}
                    >
                      ›
                    </PaginationButton>
                    <PaginationButton
                      disabled={currentPage === totalPages}
                      onClick={() => changePage(totalPages)}
                    >
                      »
                    </PaginationButton>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Rows per page:
                    </Typography>
                    <Select
                      size="small"
                      value={rowsPerPage}
                      onChange={handleChangeRowsPerPage as any}
                      sx={{
                        "& .MuiSelect-select": {
                          py: 0.5,
                          minWidth: 60,
                        },
                        borderRadius: 2,
                      }}
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={25}>25</MenuItem>
                      <MenuItem value={50}>50</MenuItem>
                    </Select>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <FilterDrawer
  open={filterOpen}
  onClose={() => setFilterOpen(false)}
  values={filters}
  onChange={handleFilterChange}
  onClear={handleClearFilters}
  onApply={handleApplyFilters}
/>

    </MainLayout>
  );
};

const SummaryCard: React.FC<{ value: number; label: string }> = ({
  value,
  label,
}) => (
  <Box
    sx={{
      borderRadius: 2,
      border: "1px solid #e5e7eb",
      bgcolor: "#f9fafb",
      px: 2.5,
      py: 1.8,
    }}
  >
    <Typography variant="h5" fontWeight={700}>
      {value}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
  </Box>
);

const HeaderCell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <TableCell
    sx={{
      fontSize: 13,
      fontWeight: 600,
      color: "text.secondary",
      borderBottom: "1px solid #e5e7eb",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </TableCell>
);

const BodyCell: React.FC<{
  children?: React.ReactNode;
  align?: "right" | "left" | "center" | "inherit" | "justify";
  colSpan?: number;
  sx?: any;
}> = ({ children, align, colSpan, sx }) => (
  <TableCell
    align={align}
    colSpan={colSpan}
    sx={{
      fontSize: 13,
      borderBottom: "1px solid #f3f4f6",
      ...sx,
    }}
  >
    {children}
  </TableCell>
);

const PaginationButton: React.FC<{
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}> = ({ children, active, disabled, onClick }) => (
  <Button
    size="small"
    onClick={onClick}
    disabled={disabled}
    sx={{
      minWidth: 32,
      height: 32,
      borderRadius: 1.5,
      textTransform: "none",
      fontSize: 13,
      px: 1,
      bgcolor: active ? "#0f6b73" : "#ffffff",
      color: active ? "#ffffff" : "text.primary",
      border: "1px solid #e5e7eb",
      "&:hover": {
        bgcolor: active ? "#0b5258" : "#f3f4f6",
      },
    }}
  >
    {children}
  </Button>
);

export default VerifyPage;
