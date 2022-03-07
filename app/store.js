import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./features/tokenSlice";
import filterReducer from "./features/filterSlice";

const store = configureStore({
  reducer: {
    token: tokenReducer,
    filter: filterReducer,
  },
});
export default store;
