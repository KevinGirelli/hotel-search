import { Box, Pagination as MuiPagination } from '@mui/material';
import { useRoomStore } from '@/store/store';

export default function Pagination() {
  const { totalRooms, filters, setPage } = useRoomStore();
  const totalPages = Math.ceil(totalRooms / filters.limit);

  if (totalPages <= 1) return null;

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <MuiPagination 
        count={totalPages} 
        page={filters.page}
        onChange={(_, page) => setPage(page)}
        color="primary"
        size="large"
      />
    </Box>
  );
}