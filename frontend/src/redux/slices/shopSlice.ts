import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IProduct from "./../../types/IProduct";
interface ShopState {
  checkedCategory: string[];
  checkedBrand: string[];
  products: IProduct[];
  allBrands: string[];
  visibleBrands: string[];
  price: string | null;
}

const initialState: ShopState = {
  checkedCategory: [],
  checkedBrand: [],
  products: [] as IProduct[],
  allBrands: [],
  visibleBrands: [],
  price: null,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },

    setAllBrands(state, action: PayloadAction<string[]>) {
      state.allBrands = action.payload;
    },
    setVisibleBrands(state, action: PayloadAction<string[]>) {
      state.visibleBrands = action.payload;
    },

    setCheckedCategory(state, action) {
      state.checkedCategory = action.payload;
    },

    setCheckedBrand(state, action) {
      state.checkedBrand = action.payload;
    },

    setPriceSearch(state, action) {
      state.price = action.payload;
    },
  },
});

export const {
  setProducts,
  setAllBrands,
  setVisibleBrands,
  setCheckedCategory,
  setCheckedBrand,
  setPriceSearch,
} = shopSlice.actions;

export default shopSlice.reducer;
