import { configureStore } from '@reduxjs/toolkit';
import nodesReducer from '../features/nodesSlice';
import edgesReducer from '../features/edgesSlice';
import { loadState, saveState } from '../helpers/sessionStorageHelpers';

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    nodes: nodesReducer,
    edges: edgesReducer,
  },
  preloadedState: persistedState
});


store.subscribe(() => {
  saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
