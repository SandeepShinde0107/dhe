import  { useMemo } from "react";
import { Paper, Box, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

type Grievance = {
  id: string;
  name: string;
  emp?: string | null;
  category: "Major" | "Medium" | "Minor";
  nature: string;
  subject: string;
  date: string;
  status: "Resolved" | "Under Investigation" | "Pending";
};

const sampleData: Grievance[] = [
  { id: "GRV/2024/001", name: "Rajesh Kumar", emp: "EMP01000", category: "Major", nature: "Advance", subject: "Delay...", date: "1/15/2024", status: "Resolved" },
  { id: "GRV/2024/002", name: "Priya Sharma", emp: "EMP01001", category: "Medium", nature: "Benefits", subject: "Leave...", date: "1/20/2024", status: "Under Investigation" },
  { id: "GRV/2024/003", name: "Amit Patel", emp: "EMP01002", category: "Minor", nature: "Leave", subject: "Advance...", date: "1/25/2024", status: "Pending" },
  { id: "GRV/2024/004", name: "Sunita Deshmukh", emp: "EMP01003", category: "Major", nature: "Salary", subject: "Benefits...", date: "1/10/2024", status: "Resolved" },
  { id: "GRV/2024/005", name: "Vikram Naik", emp: "EMP01004", category: "Medium", nature: "Promotion", subject: "Promotion...", date: "2/1/2024", status: "Under Investigation" },
  { id: "GRV/2024/006", name: "Rahul Sharma", emp: "EMP01006", category: "Major", nature: "Harassment", subject: "Alleged harassment", date: "2/8/2024", status: "Under Investigation" },
  { id: "GRV/2024/007", name: "Meera Patil", emp: "EMP01007", category: "Medium", nature: "Salary", subject: "Increment not reflected", date: "2/10/2024", status: "Pending" },
  { id: "GRV/2024/008", name: "Suresh Patil", emp: "EMP01008", category: "Minor", nature: "Other", subject: "Increment not granted", date: "2/10/2024", status: "Pending" },
  { id: "GRV/2024/09", name: "Meena Joshi", emp: "EMP01009", category: "Major", nature: "Advance", subject: "Medical reimbursement", date: "1/12/2024", status: "Resolved" },
];

const STATUS_COLORS = {
  Pending: "#ff8a50",
  "Under Investigation": "#f4c24a",
  Resolved: "#19c08a",
};

const CATEGORY_COLORS = {
  Major: "#1e90ff", 
  Medium: "#00c4a7", 
  Minor: "#f4c24a",
};

const CustomTooltip = ({ active, payload, total }: any) => {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0].payload;
  const percent = ((p.value / total) * 100).toFixed(1);
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 1,
        p: 1,
        boxShadow: 2,
        border: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        {p.name}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {p.value} ({percent}%)
      </Typography>
    </Box>
  );
};

function aggregateByStatus(items: Grievance[]) {
  const map: Record<string, number> = {};
  items.forEach((g) => {
    map[g.status] = (map[g.status] || 0) + 1;
  });
  const order = ["Pending", "Under Investigation", "Resolved", "Open"];
  return order
    .filter((k) => map[k])
    .map((k) => ({ name: k, value: map[k] }));
}

function aggregateByCategory(items: Grievance[]) {
  const map: Record<string, number> = {};
  items.forEach((g) => {
    map[g.category] = (map[g.category] || 0) + 1;
  });
  const order = ["Major", "Medium", "Minor"];
  return order
    .filter((k) => map[k])
    .map((k) => ({ name: k, value: map[k] }));
}

export default function DistributionCharts({ grievances = sampleData }: { grievances?: Grievance[] }) {
  const statusData = useMemo(() => aggregateByStatus(grievances), [grievances]);
  const catData = useMemo(() => aggregateByCategory(grievances), [grievances]);

  const totalStatus = statusData.reduce((s, d) => s + d.value, 0) || 1;
  const totalCat = catData.reduce((s, d) => s + d.value, 0) || 1;

  return (
    <Box sx={{ display: "flex", gap: 3, flexWrap: { xs: "wrap", md: "nowrap" }, mt: 3 }}>
      <Paper sx={{ flex: 1, p: 3, borderRadius: 2, border: "1px solid #e8eeee" }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Status Distribution
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Current status of all grievances
        </Typography>

        <Box sx={{ width: "100%", height: 240 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                labelLine={false}
                label={({  percent=0 }) => `${(percent * 100).toFixed(0)}%`}
              >
                {statusData.map((entry) => (
                  <Cell key={entry.name} fill={(STATUS_COLORS as any)[entry.name] ?? "#ccc"} />
                ))}
              </Pie>

              <Tooltip
                content={<CustomTooltip total={totalStatus} />}
                wrapperStyle={{ outline: "none" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 1 }}>
          {statusData.map((d) => {
            const percent = ((d.value / totalStatus) * 100).toFixed(0);
            return (
              <Box key={d.name} sx={{ textAlign: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, bgcolor: (STATUS_COLORS as any)[d.name], borderRadius: 1 }} />
                  <Typography sx={{ fontSize: 13, fontWeight: 700 }}>{d.name}</Typography>
                </Box>
                <Typography sx={{ fontSize: 13, color: "text.secondary" }}>{d.value} • {percent}%</Typography>
              </Box>
            );
          })}
        </Box>
      </Paper>

      <Paper sx={{ flex: 1, p: 3, borderRadius: 2, border: "1px solid #e8eeee" }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Category Distribution
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Grievances by severity category
        </Typography>

        <Box sx={{ width: "100%", height: 240 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={catData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                labelLine={false}
                label={({ percent=0 }) => `${(percent * 100).toFixed(0)}%`}
              >
                {catData.map((entry) => (
                  <Cell key={entry.name} fill={(CATEGORY_COLORS as any)[entry.name] ?? "#ccc"} />
                ))}
              </Pie>

              <Tooltip
                content={<CustomTooltip total={totalCat} />}
                wrapperStyle={{ outline: "none" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 1 }}>
          {catData.map((d) => {
            const percent = ((d.value / totalCat) * 100).toFixed(0);
            return (
              <Box key={d.name} sx={{ textAlign: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, bgcolor: (CATEGORY_COLORS as any)[d.name], borderRadius: 1 }} />
                  <Typography sx={{ fontSize: 13, fontWeight: 700 }}>{d.name}</Typography>
                </Box>
                <Typography sx={{ fontSize: 13, color: "text.secondary" }}>{d.value} • {percent}%</Typography>
              </Box>
            );
          })}
        </Box>
      </Paper>
    </Box>
  );
}
