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
    removeSession(state, action) {
      state.sessions = state.sessions.filter(
        (session) => session.id !== action.payload
      )
    },
  },
})

export const { addSession, addSessions, removeSession } = sessionSlice.actions

export default sessionSlice.reducer