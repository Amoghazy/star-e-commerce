import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      localStorage.setItem(
        "expirationDate",
        JSON.stringify(new Date().getTime() + 1000 * 60 * 60 * 30 * 24)
      );
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});
export const { setUserInfo, logout } = authSlice.actions;

export default authSlice.reducer;
