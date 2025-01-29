'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { create } from 'zustand'
import SearchFilters from '@/components/SearchFilters'
import RoomList from '@/components/RoomList'
import Header from '@/components/Header'
import { Container, Box, Typography } from '@mui/material';
import Pagination from '@/components/Pagination';

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
  currentPage: number
  setCurrentPage: (page: number) => void
  setFilters: (filters: RoomFilters) => void
  fetchRooms: () => Promise<void>
}

export const useRoomStore = create<RoomStore>((set) => ({
  rooms: [],
  loading: false,
  error: null,
  currentPage: 1,
  setCurrentPage: (page: number) => set({ currentPage: page }),
  filters: {
    name: '',
    priceMin: 0,
    priceMax: 1000,
    capacity: 5,
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
      let wifi = !roomData.features.wifi
      let airConditioning = !roomData.features.airConditioner

      let url = ""
      if(roomData.name){
        url = `http://localhost:4000/rooms?name=${roomData.name}&capacity=${roomData.capacity}&minPrice=${roomData.priceMin}&maxPrice=${roomData.priceMax}&wifi=${wifi}&arcondicionado=${airConditioning}`
      }else{
        url = `http://localhost:4000/rooms?capacity=${roomData.capacity}&minPrice=${roomData.priceMin}&maxPrice=${roomData.priceMax}&wifi=${wifi}&arcondicionado=${airConditioning}`
      }
      
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
  const ITEMS_PER_PAGE = 4;
  
  const { 
    rooms,
    loading,
    error,
    filters,
    setFilters,
    fetchRooms,
    currentPage,
    setCurrentPage
  } = useRoomStore()

  const totalPages = Math.ceil(rooms.length / ITEMS_PER_PAGE);

  useEffect(() => {
    fetchRooms()
  }, [filters])

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
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
            />
            
            {!loading && rooms.length > 0 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
