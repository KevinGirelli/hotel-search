import { create } from 'zustand';

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
  page: number
  limit: number
}

interface RoomStore {
  rooms: Room[]
  totalRooms: number
  loading: boolean
  error: string | null
  filters: RoomFilters
  setFilters: (filters: RoomFilters) => void
  setPage: (page: number) => void
  fetchRooms: () => Promise<void>
}

export const useRoomStore = create<RoomStore>((set, get) => ({
  rooms: [],
  totalRooms: 0,
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
    },
    page: 1,
    limit: 6
  },
  setFilters: (filters) => {
    set({ filters });
    get().fetchRooms();
  },
  setPage: (page) => {
    set(state => ({ 
      filters: { ...state.filters, page } 
    }));
    get().fetchRooms();
  },
  fetchRooms: async () => {
    set({ loading: true, error: null })
    try {
      const { filters } = get()
      const params = new URLSearchParams({
        name: filters.name,
        minPrice: filters.priceMin.toString(),
        maxPrice: filters.priceMax.toString(),
        capacity: filters.capacity.toString(),
        wifi: filters.features.wifi.toString(),
        arcondicionado: filters.features.airConditioner.toString(),
        page: filters.page.toString(),
        limit: filters.limit.toString()
      })
      
      const response = await fetch(`http://localhost:4000/rooms?${params}`)
      
      if (!response.ok) {
        throw new Error('Erro na requisição')
      }
      
      const data = await response.json()
      set({ 
        rooms: data.rooms,
        totalRooms: data.total,
        loading: false 
      })
    } catch (error) {
      set({ error: 'Falha ao buscar quartos', loading: false })
    }
  }
}));