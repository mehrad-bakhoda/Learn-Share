import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: {
    searchedParam: "",
    filter: "",
  },
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.value.filter = action.payload;
    },
    removeFilter: (state) => {
      state.value.filter = null;
    },
    setSearchParam: (state, action) => {
      state.value.searchedParam = action.payload;
    },
    removeSearchParam: (state) => {
      state.value.searchedParam = null;
    },
  },
});

export const { setFilter, removeFilter, setSearchParam, removeSearchParam } =
  filterSlice.actions;
export default filterSlice.reducer;
