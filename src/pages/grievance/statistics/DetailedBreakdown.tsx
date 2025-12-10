import  { useMemo } from "react";
import { Paper, Box, Typography, Grid } from "@mui/material";

type Grievance = {
  id: string;
  name?: string;
  emp?: string | null;
  office?: string;
  category: "Major" | "Medium" | "Minor" | string;
  nature: string;
  subject?: string;
  date?: string;
  status?: string;
};

const sampleData: Grievance[] = [
  { id: "GRV/1", name: "A", category: "Major", nature: "Advance" },
  { id: "GRV/2", name: "B", category: "Major", nature: "Benefits" },
  { id: "GRV/3", name: "C", category: "Major", nature: "Leave" },
  { id: "GRV/4", name: "D", category: "Medium", nature: "Salary" },
  { id: "GRV/5", name: "E", category: "Medium", nature: "Promotion" },
  { id: "GRV/6", name: "F", category: "Minor", nature: "Advance" },
  { id: "GRV/7", name: "G", category: "Minor", nature: "Benefits" },
  { id: "GRV/8", name: "H", category: "Major", nature: "Leave" },
  { id: "GRV/9", name: "I", category: "Major", nature: "Salary" },
  { id: "GRV/10", name: "J", category: "Medium", nature: "Promotion" },
  { id: "GRV/11", name: "K", category: "Major", nature: "Other" },
  { id: "GRV/12", name: "L", category: "Major", nature: "Transfer" },
  { id: "GRV/13", name: "M", category: "Medium", nature: "Working Conditions" },
  { id: "GRV/14", name: "N", category: "Minor", nature: "Harassment" },
  { id: "GRV/15", name: "O", category: "Medium", nature: "Other" },
];


function countBy<T extends string>(items: Grievance[], keyFn: (g: Grievance) => T) {
  const map: Record<string, number> = {};
  items.forEach((g) => {
    const k = keyFn(g) ?? "Unknown";
    map[k] = (map[k] || 0) + 1;
  });
  return map;
}

const categoryOrder = ["Major", "Medium", "Minor"] as const;
const natureOrder = [
  "Advance",
  "Benefits",
  "Leave",
  "Salary",
  "Promotion",
  "Transfer",
  "Working Conditions",
  "Harassment",
  "Other",
];

export default function DetailedBreakdown({ grievances = sampleData }: { grievances?: Grievance[] }) {
  const categoryCounts = useMemo(() => countBy(grievances || [], (g) => g.category || "Unknown"), [grievances]);
  const natureCounts = useMemo(() => countBy(grievances || [], (g) => g.nature || "Other"), [grievances]);

  const categories = categoryOrder.map((c) => ({ key: c, count: categoryCounts[c] ?? 0 }));

  const extraNatures = Object.keys(natureCounts).filter((n) => !natureOrder.includes(n));
  const natureList = [...natureOrder, ...extraNatures].filter((n) => natureCounts[n]);
  const natures = (natureList.length ? natureList : Object.keys(natureCounts)).map((n) => ({
    key: n,
    count: natureCounts[n] ?? 0,
  }));

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        mt: 3,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.02)",
        border: "1px solid #eef3f4",
      }}
      aria-labelledby="detailed-breakdown-heading"
    >
      <Typography id="detailed-breakdown-heading" variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Detailed Breakdown
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontWeight: 700, mb: 1 }}>By Category</Typography>

        <Grid container spacing={2}>
          {categories.map((cat) => (
             <Grid size={{ xs:12, sm:6, md:4, lg:4}}>
              <Box
                role="group"
                aria-label={`category-${cat.key}`}
                tabIndex={0}
                sx={{
                  p: 2.25,
                  borderRadius: 2,
                  border: "1px solid #e9f0f0",
                  background: "#fff",
                  minHeight: 72,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 0.5,
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: 20 }}>{cat.count}</Typography>
                <Typography sx={{ color: "text.secondary", fontSize: 14 }}>{cat.key}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box>
        <Typography sx={{ fontWeight: 700, mb: 1 }}>By Nature</Typography>

        <Grid container spacing={2}>
          {natures.map((n) => (
            <Grid size={{ xs:12, sm:6, md:4, lg:3}}>
              <Box
                role="group"
                aria-label={`nature-${n.key}`}
                tabIndex={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid #e9f0f0",
                  background: "#fff",
                  minHeight: 72,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: 18 }}>{n.count}</Typography>
                <Typography sx={{ color: "text.secondary", fontSize: 14, mt: 0.5 }}>{n.key}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}