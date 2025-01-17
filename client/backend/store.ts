// import { configureStore } from '@reduxjs/toolkit'

import sessionsReducer from './features/session/sessionSlice'
import layoutReducer from './features/layout/layoutSlice'

// export const store = configureStore({
//   reducer: {
//     sessionState: sessionsReducer,
//     layoutState: layoutReducer,
//   },
// })
import { configureStore } from '@reduxjs/toolkit'
// Custom Middleware
import socketMiddleware from '@/SocketMiddleware'

export const store = configureStore({
  reducer: {
    sessionState: sessionsReducer,
    layoutState: layoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
})
