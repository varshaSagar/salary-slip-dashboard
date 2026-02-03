import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRecord, updateRecord } from "../store/recordsSlice";

import {
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";

const AddRecordForm = ({ selectedRecord, clearSelection, showMessage }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("IT");
  const [status, setStatus] = useState("Active");
  const [salary, setSalary] = useState("");

  // Fill form when editing
  useEffect(() => {
    if (selectedRecord) {
      setName(selectedRecord.name || "");
      setDepartment(selectedRecord.department || "IT");
      setStatus(selectedRecord.status || "Active");
      setSalary(selectedRecord.salary?.toString() || "");
    }
  }, [selectedRecord]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedRecord) {
      dispatch(
        updateRecord({
          id: selectedRecord.id,
          updatedRecord: {
            id: selectedRecord.id,
            name,
            department,
            status,
            salary: Number(salary),
          },
        })
      );
      showMessage("Record Edited Successfully ✅");

      clearSelection();
    } else {
      dispatch(
        addRecord({
          name,
          department,
          status,
          salary: Number(salary),
        })
      );
    }

    setName("");
    setDepartment("IT");
    setStatus("Active");
    setSalary("");
  };

  return (
    <Card sx={{ marginBottom: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {selectedRecord ? "Edit Employee" : "Add Employee"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />

            <TextField
              select
              label="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              fullWidth
            >
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
            </TextField>

            <TextField
              select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>

            <TextField
              label="Salary"
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              fullWidth
              required
            />
          </Stack>

          <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
            <Button type="submit" variant="contained">
              {selectedRecord ? "Save Changes" : "Add"}
            </Button>

            {selectedRecord && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={clearSelection}
              >
                Cancel
              </Button>
            )}
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddRecordForm;
