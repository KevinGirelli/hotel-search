'use client'

import { create } from 'zustand'

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

const useRoomStore = create<RoomStore>((set, get) => ({
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
  setFilters: (filters) => set((state) => ({filters: filters})),
  fetchRooms: async () => {
    set({ loading: true, error: null })
    try {
      const { filters } = get()
      const url = new URL('http://localhost:4000/rooms')
      
      Object.entries(filters).forEach(([key, value]) => {
        if (typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            url.searchParams.append(subKey, String(subValue))
          })
        } else {
          url.searchParams.append(key, String(value))
        }
      })
      
      const response = await fetch(url.toString())
      if (!response.ok) throw new Error('Erro na requisição')
      
      const data = await response.json()
      set((state) =>({ rooms: data, loading: false }))
    } catch (error) {
      set({ error: 'Falha ao buscar quartos', loading: false })
    }
  }
}))
