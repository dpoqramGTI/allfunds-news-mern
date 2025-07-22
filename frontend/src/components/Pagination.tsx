import { Pagination as MuiPagination, Stack } from "@mui/material";

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export function Pagination({ current, total, onChange }: PaginationProps) {
  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
      <MuiPagination
        count={total}
        page={current}
        color="primary"
        shape="rounded"
        size="large"
        onChange={(_, page) => onChange(page)}
        sx={{
          "& .MuiPaginationItem-root": {
            fontSize: "1rem",
          },
          "& .Mui-selected": {
            fontWeight: "bold",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          },
        }}
      />
    </Stack>
  );
}
