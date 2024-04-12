import { createSlice } from "@reduxjs/toolkit";

const favoritemoviesSlice = createSlice({
  name: "favoritemovies",
  initialState: null,
  reducers: {
    setFavoriteMovies: (state, action) => {
      return action.payload;
    },
    addFavoriteMovie: (state, action) => {
      state.push(action.payload);
    },
    removeFavoriteMovie: (state, action) => {
      return state.filter((movie) => movie.id !== action.payload.id);
    },
  },
});
export const { setFavoriteMovies, addFavoriteMovie, removeFavoriteMovie } =
  favoritemoviesSlice.actions;
export default favoritemoviesSlice.reducer;
