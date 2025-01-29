'use client'

import { TextField, Slider, Checkbox, FormControlLabel, Box, Typography } from '@mui/material';
import { useRoomStore } from '@/store/store';

export default function SearchFilters() {
  const { filters, setFilters, fetchRooms } = useRoomStore();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, name: event.target.value });
    fetchRooms();
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    const [priceMin, priceMax] = newValue as number[];
    setFilters({ ...filters, priceMin, priceMax });
    fetchRooms();
  };

  const handleCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, capacity: Number(event.target.value) });
    fetchRooms();
  };

  const handleFeatureChange = (feature: 'wifi' | 'airConditioner') => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      features: {
        ...filters.features,
        [feature]: event.target.checked
      }
    });
    fetchRooms();
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField 
        label="Nome do Quarto" 
        variant="outlined"
        value={filters.name}
        onChange={handleNameChange}
      />

      <Box>
        <Typography gutterBottom>Faixa de Preço</Typography>
        <Slider
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          value={[filters.priceMin, filters.priceMax]}
          onChange={handlePriceChange}
        />
      </Box>

      <TextField
        label="Capacidade"
        type="number"
        InputProps={{ inputProps: { min: 1 } }}
        variant="outlined"
        value={filters.capacity}
        onChange={handleCapacityChange}
      />

      <FormControlLabel
        control={
          <Checkbox 
            checked={filters.features.wifi}
            onChange={handleFeatureChange('wifi')}
          />
        }
        label="Wi-Fi"
      />
      <FormControlLabel
        control={
          <Checkbox 
            checked={filters.features.airConditioner}
            onChange={handleFeatureChange('airConditioner')}
          />
        }
        label="Ar Condicionado"
      />
    </Box>
  )
}