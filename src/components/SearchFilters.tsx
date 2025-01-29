'use client'

import { TextField, Slider, Checkbox, FormControlLabel, Box, Typography } from '@mui/material';
import {useRoomStore} from '../app/page';
import { useState } from 'react';
import { useEffect } from 'react';

export default function SearchFilters() { 

  const [username, setUsername] = useState("")
  const [priceRange, setPriceRange] =  useState([0, 1000]);
  const [capacity, setCapacity] = useState(5)
  const [wifi, setWifi] = useState(false)
  const [airConditioner, setAirconditioner] = useState(false)
  
  const setFilters = useRoomStore((state) => state.setFilters);
  const fetchRooms = useRoomStore((state) => state.fetchRooms);

  const handleChange = (e: any) => {

    if(e.target.name == "roomName") {setUsername(e.target.value)}
    if(e.target.name == "priceRange") {
      const newPriceRange = [e.target.value[0], e.target.value[1]]
      setPriceRange(newPriceRange);
    }
    if(e.target.name == "capacity"){setCapacity(e.target.value)}
    
    if(e.target.name == "wifi"){
      setWifi(e.target.checked)
    }
    if(e.target.name == "airConditioning"){
      setAirconditioner(e.target.checked)
    }

    console.log(capacity)

    let filters = {
      name: username,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      capacity: capacity,
      features: {
        wifi: wifi,
        airConditioner: airConditioner
      }
    }

    setFilters(filters)
    fetchRooms()

  };
  
  useEffect(() => {
    let filters = {
      name: username,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      capacity: 5,
      features: {
        wifi: wifi,
        airConditioner: airConditioner
      }
    }

    setFilters(filters)
    fetchRooms()
  }, [])
 

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Nome do Quarto"
        variant="outlined"
        value={username}
        onChange={handleChange}
        name="roomName"
      />

      <Box>
        <Typography gutterBottom>Faixa de Preço</Typography>
        <Slider
          value={priceRange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          onChange={handleChange}
          name="priceRange"
        />
      </Box>

      <TextField
        label="Capacidade"
        type="number"
        InputProps={{ inputProps: { min: 1 } }}
        value={capacity}
        variant="outlined"
        onChange={handleChange}
        name="capacity"
      />

      <FormControlLabel
        control={<Checkbox onChange={handleChange} checked={wifi} name="wifi" />}
        label="Wi-Fi"
      />
      <FormControlLabel
        control={<Checkbox onChange={handleChange} checked={airConditioner} name="airConditioning" />}
        label="Ar Condicionado"
      />
    </Box>
  );
};


