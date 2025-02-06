import { configureStore } from '@reduxjs/toolkit';

import sessionsReducer from './features/session/sessionSlice';
import layoutReducer from './features/layout/layoutSlice';
import breadcrumbsReducer from './features/breadcrumbs/breadcrumbsSlice';
import settingsReducer from './features/settings/settingsSlice';

export const store = configureStore({
  reducer: {
    sessionState: sessionsReducer,
    layoutState: layoutReducer,
    breadcrumbsState: breadcrumbsReducer,
    settingsState: settingsReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];

