import { Pagination as MuiPagination, Stack } from "@mui/material";

const Pagination = ({ total, pageSize, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null; // No pagination needed

  return (
    <Stack spacing={2} alignItems="center" sx={{ marginBottom: 4 }}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => onPageChange(value)}
        color="primary"
      />
    </Stack>
  );
};

export default Pagination;
