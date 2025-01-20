import { configureStore } from '@reduxjs/toolkit'

import sessionsReducer from './features/session/sessionSlice'
import layoutReducer from './features/layout/layoutSlice'
import breadcrumbsReducer from './features/breadcrumbs/breadcrumbsSlice'

export const store = configureStore({
  reducer: {
    sessionState: sessionsReducer,
    layoutState: layoutReducer,
    breadcrumbsState: breadcrumbsReducer,
  },
})
