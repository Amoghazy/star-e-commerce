import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IProduct from "./../../types/IProduct";
interface ShopState {
  checkedCategory: string[];
  checkedBrand: string[];
  products: IProduct[];
  allBrands: string[];
  visibleBrands: string[];
}

const initialState: ShopState = {
  checkedCategory: [],
  checkedBrand: [],
  products: [] as IProduct[],
  allBrands: [],
  visibleBrands: [],
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
  },
});

export const {
  setProducts,
  setAllBrands,
  setVisibleBrands,
  setCheckedCategory,
  setCheckedBrand,
} = shopSlice.actions;

export default shopSlice.reducer;
