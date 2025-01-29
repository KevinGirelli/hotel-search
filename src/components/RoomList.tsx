'use client'

import { Card, CardContent, Typography, CircularProgress, Grid } from '@mui/material';

interface Room {
  id: string
  name: string
  price: number
  capacity: number
  features: {
    wifi: boolean
    airConditioner: boolean
  }
}

interface RoomListProps {
  rooms: Room[]
  loading: boolean
  currentPage: number
  itemsPerPage: number
}

export default function RoomList({ rooms = [], loading, currentPage, itemsPerPage }: RoomListProps) {
  if (loading) {
    return (
      <Grid container spacing={2}>
        {[1, 2, 3, 4].map((i) => (
          <Grid item xs={12} md={6} key={i}>
            <Card variant="outlined">
              <CardContent>
                <CircularProgress />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    )
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedRooms = rooms.slice(startIndex, startIndex + itemsPerPage);

  if (selectedRooms.length === 0) {
    return (
      <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
        Nenhum quarto encontrado
      </Typography>
    )
  }

  return (
    <Grid container spacing={2}>
      {selectedRooms.map((room) => (
        <Grid item xs={12} md={6} key={room.id}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="div">
                {room.name}
              </Typography>
              <Typography color="textSecondary">
                R$ {room.price}/noite
              </Typography>
              <Typography variant="body2">
                Capacidade: {room.capacity} pessoas
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {room.features.wifi && '📶 Wi-Fi '}
                {room.features.airConditioner && '❄️ Ar Condicionado'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
} 