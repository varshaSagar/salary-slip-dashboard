import { useDispatch } from "react-redux";
import { deleteRecord } from "../store/recordsSlice";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./RecordsTable.css";

const RecordsTable = ({ records, onEdit, showMessage }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      dispatch(deleteRecord(id));
      showMessage("Record Deleted Successfully 🗑️");
    }
  };

  return (
    <TableContainer component={Paper} className="records-table-container">
      {/* Table Title */}
      <Typography variant="h6" className="records-table-title">
        Employee Records
      </Typography>

      <Table size="small">
        {/* Table Header */}
        <TableHead className="records-table-head">
          <TableRow>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell>
              <b>Department</b>
            </TableCell>
            <TableCell>
              <b>Status</b>
            </TableCell>
            <TableCell>
              <b>Salary</b>
            </TableCell>
            <TableCell align="center">
              <b>Action</b>
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {records.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No records found
              </TableCell>
            </TableRow>
          ) : (
            records.map((record) => (
              <TableRow key={record.id} hover>
                <TableCell>{record.name}</TableCell>
                <TableCell>{record.department}</TableCell>

                {/* Status Chip */}
                <TableCell>
                  <Chip
                    label={record.status}
                    color={record.status === "Active" ? "success" : "error"}
                    size="small"
                  />
                </TableCell>

                {/* Salary */}
                <TableCell>
                  ₹{Number(record.salary || 0).toLocaleString()}
                </TableCell>

                {/* Actions */}
                <TableCell align="center">
                  {/* Edit */}
                  <IconButton color="primary" onClick={() => onEdit(record)}>
                    <EditIcon />
                  </IconButton>

                  {/* Delete */}
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(record.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecordsTable;
