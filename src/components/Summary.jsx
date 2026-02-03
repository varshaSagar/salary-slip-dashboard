import { Card, CardContent, Typography, Grid } from "@mui/material";

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
    <Grid container spacing={2} sx={{ marginBottom: 3 }}>
      <Grid item xs={12} sm={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h4">{total}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Active</Typography>
            <Typography variant="h4">{active}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Inactive</Typography>
            <Typography variant="h4">{inactive}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Avg Salary</Typography>
            <Typography variant="h4">₹{avgSalary}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Summary;
