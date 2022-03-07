import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: {
    filter: null,
    query: null,
  },
};
const filterSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.value.filter = action.payload;
    },
    removeFilter: (state) => {
      state.value.filter = null;
    },
    setSearchQuery: (state, action) => {
      state.value.query = action.payload;
    },
    removeSearchQuery: (state) => {
      state.value.query = null;
    },
  },
});

export const { setFilter, removeFilter, setSearchQuery, removeSearchQuery } =
  filterSlice.actions;
export default filterSlice.reducer;
