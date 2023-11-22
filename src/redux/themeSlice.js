import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: JSON.parse(localStorage.getItem("darkTheme")) || false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = !state.theme;
      localStorage.setItem("darkTheme", JSON.stringify(state.theme));
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
