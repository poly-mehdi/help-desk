import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SessionsSliceState = {
  sessions: Session[]
  loading: boolean
  error: string | null
}

const defaultState: SessionsSliceState = {
  sessions: [],
  loading: false,
  error: null,
}

const sessionSlice = createSlice({
  name: 'sessions',
  initialState: defaultState,
  reducers: {
    addSession(state, action: PayloadAction<Session>) {
      state.sessions.push(action.payload)
    },
    addSessions(state, action: PayloadAction<Session[]>) {
      state.sessions = action.payload
    },
    updateSession(state, action: PayloadAction<Session>) {
      const sessionIndex = state.sessions.findIndex(
        (session) => session.id === action.payload.id
      )
      if (sessionIndex !== -1) {
        state.sessions[sessionIndex] = action.payload
      }
    },
    rejectSession(state, action: PayloadAction<string>) {
      const sessionIndex = state.sessions.findIndex(
        (session) => session.id === action.payload
      )
      state.sessions[sessionIndex].status = 'Rejected'
    },
    removeSession(state, action) {
      state.sessions = state.sessions.filter(
        (session) => session.id !== action.payload
      )
    },
  },
})

export const {
  addSession,
  addSessions,
  updateSession,
  rejectSession,
  removeSession,
} = sessionSlice.actions

export default sessionSlice.reducer

