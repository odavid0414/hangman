import { configureStore } from '@reduxjs/toolkit';
import { wordsApi } from './words';

export const store = configureStore({
  reducer: {
    [wordsApi.reducerPath]: wordsApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(wordsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
