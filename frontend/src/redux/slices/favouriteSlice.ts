import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IProduct from "../../types/IProduct";

const favouriteSlice = createSlice({
  name: "favourite",
  initialState: (localStorage.getItem("favourites")
    ? JSON.parse(localStorage.getItem("favourites") as string)
    : []) as IProduct[],
  reducers: {
    addToFavourite: (state, action: PayloadAction<IProduct>) => {
      state.push(action.payload);
      localStorage.setItem("favourites", JSON.stringify(state));
    },
    removeFromFavourite: (state, action: PayloadAction<IProduct>) => {
      const index = state.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) state.splice(index, 1);

      localStorage.setItem("favourites", JSON.stringify(state));
    },
  },
});

export const { addToFavourite, removeFromFavourite } = favouriteSlice.actions;

export default favouriteSlice.reducer;
