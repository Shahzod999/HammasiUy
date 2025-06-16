import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { House } from "../../../types/home";
import { RootState } from "../../index";

interface singleProductState {
  product: House | null;
}

const initialState: singleProductState = {
  product: null,
};

export const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<House>) => {
      state.product = action.payload;
    },
  },
});

export const { setProduct } = singleProductSlice.actions;
export const selectedProduct = (state: RootState) => state.singleProduct.product;
export default singleProductSlice.reducer;
