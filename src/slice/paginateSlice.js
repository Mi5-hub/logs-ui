import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 1
};

export const paginateSlice = createSlice({
  name: "paginate",
  initialState,
  reducers: {
    paginateState: (state, { payload }) => {
      state.value = payload;
    },
    paginatePrevious: (state) => {
      state.value -= 1;
    },
    paginateNext: (state) => {
      state.value += 1;
    },
 
    updateByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { paginateState, paginatePrevious, paginateNext, updateByAmount } =
  paginateSlice.actions;

export default paginateSlice.reducer;
