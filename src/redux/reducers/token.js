import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("token");

const tokenSlice = createSlice({
  name: "token",
  initialState: storedToken ? storedToken : null,
  reducers: {
    setToken: (state, action) => {
      return action.payload;
    },
  },
});
export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
