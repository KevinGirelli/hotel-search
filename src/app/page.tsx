'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { create } from 'zustand'
import SearchFilters from '@/components/SearchFilters'
import RoomList from '@/components/RoomList'
import Header from '@/components/Header'
import { Container, Box, Typography } from '@mui/material';

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

interface RoomFilters {
  name: string
  priceMin: number
  priceMax: number
  capacity: number
  features: {
    wifi: boolean
    airConditioner: boolean
  }
}

interface RoomStore {
  rooms: Room[]
  loading: boolean
  error: string | null
  filters: RoomFilters
  setFilters: (filters: RoomFilters) => void
  fetchRooms: () => Promise<void>
}

const useRoomStore = create<RoomStore>((set) => ({
  rooms: [],
  loading: false,
  error: null,
  filters: {
    name: '',
    priceMin: 0,
    priceMax: 1000,
    capacity: 1,
    features: {
      wifi: false,
      airConditioner: false
    }
  },
  setFilters: (filters) => set({ filters }),
  fetchRooms: async () => {
    set({ loading: true, error: null })
    try {
      let roomData = useRoomStore.getState().filters
      roomData.features.airConditioner = false
      roomData.features.wifi = true 
      const url = `http://localhost:4000/rooms?minPrice=${roomData.priceMin}&maxPrice=${roomData.priceMax}&wifi=${roomData.features.wifi}&arcondicionado=${roomData.features.airConditioner}`
      console.log(url)

      const response = await fetch(url, {
        method: 'GET'
      })

    
      
      if (!response.ok) {
        throw new Error('Erro na requisição')
      }
      
      const data = await response.json()
      console.log(data)
      set({ rooms: data, loading: false })
    } catch (error) {
      set({ error: 'Falha ao buscar quartos', loading: false })
    }
  }
}))

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const { 
    rooms,
    loading,
    error,
    filters,
    setFilters,
    fetchRooms
  } = useRoomStore()

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
      }
    })
  }, [searchParams, setFilters])

  useEffect(() => {
    fetchRooms()
  }, [filters, fetchRooms])

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
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
