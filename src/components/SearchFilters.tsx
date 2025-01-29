'use client'

import { TextField, Slider, Checkbox, FormControlLabel, Box, Typography } from '@mui/material';

export default function SearchFilters() {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField label="Nome do Quarto" variant="outlined" />

      <Box>
        <Typography gutterBottom>Faixa de Preço</Typography>
        <Slider
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          defaultValue={[0, 1000]}
        />
      </Box>

      <TextField
        label="Capacidade"
        type="number"
        InputProps={{ inputProps: { min: 1 } }}
        variant="outlined"
      />

      <FormControlLabel
        control={<Checkbox />}
        label="Wi-Fi"
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Ar Condicionado"
      />
    </Box>
  )
}