import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadRecords } from "../store/recordsSlice";

import Summary from "../components/Summary";
import RecordsTable from "../components/RecordsTable";
import Pagination from "../components/Pagination";
import AddRecordForm from "../components/AddRecordForm";
import { Snackbar, Alert } from "@mui/material";
import { Dialog, DialogContent } from "@mui/material";

import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Stack,
  Card,
  CardContent,
} from "@mui/material";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { records, loading, error } = useSelector((state) => state.records);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });
  const [editOpen, setEditOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const pageSize = 5;

  useEffect(() => {
    dispatch(loadRecords());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, department]);

  const filteredRecords = records.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) &&
      (department === "ALL" || r.department === department),
  );

  const startIndex = (currentPage - 1) * pageSize;

  const sortedRecords = [...filteredRecords].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const paginatedRecords = sortedRecords.slice(
    startIndex,
    startIndex + pageSize,
  );

  if (loading)
    return (
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h6">Loading records...</Typography>
      </Container>
    );

  if (error)
    return (
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );

  const showMessage = (msg) => {
    setSnackbar({ open: true, message: msg });
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Salary Slip Dashboard
      </Typography>

      <AddRecordForm
        selectedRecord={null}
        clearSelection={() => {}}
        showMessage={showMessage}
      />

      <Summary records={records} />

      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Search & Filter
          </Typography>

          <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
            {/* Search */}
            <TextField
              label="Search by Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
            />

            <TextField
              select
              label="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              fullWidth
            >
              <MenuItem value="ALL">All</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
            </TextField>
          </Stack>
        </CardContent>
      </Card>

      <RecordsTable
        records={paginatedRecords}
        onEdit={(record) => {
          setSelectedRecord(record);
          setEditOpen(true);
        }}
        showMessage={showMessage}
      />

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth>
        <DialogContent>
          <AddRecordForm
            selectedRecord={selectedRecord}
            clearSelection={() => {
              setSelectedRecord(null);
              setEditOpen(false);
            }}
            showMessage={showMessage}
          />
        </DialogContent>
      </Dialog>

      <Pagination
        total={filteredRecords.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: "" })}
      >
        <Alert severity="success" variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard;
