import { configureStore } from "@reduxjs/toolkit";

import boardsReducer from "./boardsSlice";
import themeReducer from "./themeSlice";
import ellipsisMenuReducer from "./ellipsisMenuSlice";

const store = configureStore({
  reducer: {
    boards: boardsReducer.reducer,
    theme: themeReducer,
    ellipsisMenu: ellipsisMenuReducer,
  },
});

export default store;
