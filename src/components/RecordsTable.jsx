import { useDispatch } from "react-redux";
import { deleteRecord } from "../store/recordsSlice";
import { Chip } from "@mui/material";

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
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const RecordsTable = ({ records, onEdit, showMessage }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      dispatch(deleteRecord(id));
      showMessage("Record Deleted Successfully 🗑️");
    }
  };

  return (
    <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
      <Typography variant="h6" sx={{ padding: 2 }}>
        Employee Records
      </Typography>

      <Table>
        <TableHead>
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

        <TableBody>
          {records.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No records found
              </TableCell>
            </TableRow>
          ) : (
            records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.name}</TableCell>
                <TableCell>{record.department}</TableCell>
                <TableCell>
                  <Chip
                    label={record.status}
                    color={record.status === "Active" ? "success" : "error"}
                    size="small"
                  />
                </TableCell>

                <TableCell>₹{record.salary}</TableCell>

                <TableCell align="center">
                  {/* Edit Button */}
                  <IconButton color="primary" onClick={() => onEdit(record)}>
                    <EditIcon />
                  </IconButton>

                  {/* Delete Button */}
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
