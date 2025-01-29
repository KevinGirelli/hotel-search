'use client'

import { AppBar, Toolbar, Typography, Box } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" alignItems="center" gap={1}>
          <img 
            src="https://i.ibb.co/6JHSLLqQ/Captura-de-tela-2025-01-29-143950.png" 
            alt="Captura de Tela" 
            width="70" 
            height="70"
          />
          <Typography variant="h6" component="div" sx={{ marginLeft: 2 }}>
            Hotel Search
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
