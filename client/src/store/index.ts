import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";
import toastReducer from "./slices/Toast/toastSlice";
import userLocationSlice from "./slices/userLocationSlice";
import productFavoriteSlice from "./slices/Product/productFavoriteSlice";
import singleProductSlice from "./slices/Product/singleProductSlice";
export const store = configureStore({
  reducer: {
    toast: toastReducer,
    userLocation: userLocationSlice,
    productFavorite: productFavoriteSlice,
    singleProduct: singleProductSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.MODE !== "production",
});

// Опциональная настройка для refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

// Типы для TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
