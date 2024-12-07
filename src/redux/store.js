import { configureStore } from '@reduxjs/toolkit';
import likedProductsReducer from './likedSlice';

export const store = configureStore({
  reducer: {
    likedProducts: likedProductsReducer,
  },
});
