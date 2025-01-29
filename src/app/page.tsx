'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import SearchFilters from '@/components/SearchFilters'
import RoomList from '@/components/RoomList'
import Header from '@/components/Header'
import { Container, Box, Typography } from '@mui/material'
import { useRoomStore } from '@/store/store'
import Pagination from '@/components/Pagination'

export default function Home() {
  const searchParams = useSearchParams()
  const { rooms, loading, error, setFilters, fetchRooms } = useRoomStore()

  useEffect(() => {
    fetchRooms()
  }, [])

  useEffect(() => {
    const name = searchParams.get('name') || ''
    const priceMin = Number(searchParams.get('priceMin')) || 0
    const priceMax = Number(searchParams.get('priceMax')) || 1000
    const capacity = Number(searchParams.get('capacity')) || 1
    const wifi = searchParams.get('wifi') === 'true'
    const airConditioner = searchParams.get('airConditioner') === 'true'

    setFilters({
      name,
      priceMin,
      priceMax, 
      capacity,
      features: {
        wifi,
        airConditioner
      },
      page: 1,
      limit: 6
    })
  }, [searchParams, setFilters])

  useEffect(() => {
    if (error) {
      alert(error)
    }
  }, [error])

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <Container sx={{ py: 8, flex: 1 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Busca de Quartos
          </Typography>
          <Typography variant="subtitle1">
            Encontre o quarto perfeito para sua estadia
          </Typography>
        </Box>

        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
          <Box width={{ xs: '100%', md: 300 }}>
            <SearchFilters />
          </Box>

          <Box flex={1}>
            <RoomList 
              rooms={rooms}
              loading={loading}
            />
            <Pagination />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
