import React from 'react';
import { Button, Box } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (start > 2) {
        pages.push(-1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages - 1) {
        pages.push(-1);
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <Box display="flex" justifyContent="center" gap={1} mt={4}>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outlined"
        size="small"
      >
        Anterior
      </Button>

      {getPageNumbers().map((pageNum, index) => (
        pageNum === -1 ? (
          <Button
            key={`ellipsis-${index}`}
            disabled
            size="small"
          >
            ...
          </Button>
        ) : (
          <Button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            variant={currentPage === pageNum ? "contained" : "outlined"}
            size="small"
          >
            {pageNum}
          </Button>
        )
      ))}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outlined"
        size="small"
      >
        Próxima
      </Button>
    </Box>
  );
};

export default Pagination;