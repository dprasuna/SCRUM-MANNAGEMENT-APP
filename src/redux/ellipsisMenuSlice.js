import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showEllipsisMenu: false,
  place: null,
};
const ellipsisMenuSlice = createSlice({
  name: "ellipsisMenu",
  initialState,
  reducers: {
    toggleEllipsisMenu: (state) => {
      state.showEllipsisMenu = !state.showEllipsisMenu;
    },
    changePlace: (state, actions) => {
      state.place = actions.payload;
    },

    closeMenu: (state) => {
      state.showEllipsisMenu = false;
    },
  },
});

export default ellipsisMenuSlice.reducer;
export const { toggleEllipsisMenu, changePlace, closeMenu } =
  ellipsisMenuSlice.actions;
