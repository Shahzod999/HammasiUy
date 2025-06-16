import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../index";
import { House } from "../../../types/home";

interface productFavoriteState {
  productFavorite: House[];
  favoritesAmount: number;
}

// Функция для загрузки избранного из localStorage
const loadFavoritesFromStorage = (): House[] => {
  try {
    const saved = localStorage.getItem("savedFavorite");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error("Failed to parse favorites from localStorage", e);
    return [];
  }
};

const favorites = loadFavoritesFromStorage();

const initialState: productFavoriteState = {
  productFavorite: favorites,
  favoritesAmount: favorites.length,
};

export const productFavoriteSlice = createSlice({
  name: "productFavorite",
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<House>) => {
      const exists = state.productFavorite.some(
        (item) => item._id === action.payload._id,
      );

      if (!exists) {
        state.productFavorite.push(action.payload);
        localStorage.setItem(
          "savedFavorite",
          JSON.stringify(state.productFavorite),
        );
      }

      state.favoritesAmount = state.productFavorite.length;
    },
    deleteFromFavorite: (state, action) => {
      state.productFavorite = state.productFavorite.filter(
        (item) => item._id !== action.payload,
      );
      localStorage.setItem(
        "savedFavorite",
        JSON.stringify(state.productFavorite),
      );
      state.favoritesAmount = state.productFavorite.length;
    },
    clearFavorites: (state) => {
      state.productFavorite = [];
      localStorage.removeItem("savedFavorite");
      state.favoritesAmount = state.productFavorite.length;
    },
  },
});

export const { addToFavorite, deleteFromFavorite, clearFavorites } =
  productFavoriteSlice.actions;
export const selectedProductFavoriteSlice = (state: RootState) =>
  state.productFavorite.productFavorite;
export const selectedFavoritesAmount = (state: RootState) =>
  state.productFavorite.favoritesAmount;
export default productFavoriteSlice.reducer;
