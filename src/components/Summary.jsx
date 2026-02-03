import { Paper, Typography, Stack } from "@mui/material";
import "./Summary.css";

const Summary = ({ records = [] }) => {
  const total = records.length;

  const active = records.filter(
    (r) => r.status.trim().toLowerCase() === "active"
  ).length;

  const inactive = records.filter(
    (r) => r.status.trim().toLowerCase() === "inactive"
  ).length;

  const avgSalary =
    total === 0
      ? 0
      : Math.round(records.reduce((sum, r) => sum + r.salary, 0) / total);

  return (
    <Paper className="summary-bar" elevation={1}>
      <Stack direction="row" spacing={4} flexWrap="wrap">
        <Typography>
          👥 <b>Total:</b> {total}
        </Typography>

        <Typography>
          ✅ <b>Active:</b> {active}
        </Typography>

        <Typography>
          ❌ <b>Inactive:</b> {inactive}
        </Typography>

        <Typography>
          💰 <b>Avg Salary:</b> ₹{avgSalary.toLocaleString()}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default Summary;
