import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SocketState {
  isConnected: boolean
  rooms: string[]
}

const initialState: SocketState = {
  isConnected: false,
  rooms: [],
}

type RoomAction = PayloadAction<{
  room: string
}>

// Now create the slice
const socketSlice = createSlice({
  name: 'socket',
  initialState,
  // Reducers: Functions we can call on the store
  reducers: {
    initSocket: (state) => {
      return
    },
    connectionEstablished: (state) => {
      state.isConnected = true
      console.log('Connection established')
    },
    connectionLost: (state) => {
      state.isConnected = false
      console.log('Connection lost')
    },
  },
})

// Don't have to define actions, they are automatically generated
export const { initSocket, connectionEstablished, connectionLost } =
  socketSlice.actions
// Export the reducer for this slice
export default socketSlice.reducer
