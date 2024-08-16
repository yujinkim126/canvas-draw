import { createSlice } from "@reduxjs/toolkit";

export const strokeSlice = createSlice({
  name: "stroke",
  initialState: {
    value: 1, // 초기값 설정
  },
  reducers: {
    setStroke: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setStroke } = strokeSlice.actions;
export const selectStroke = (state) => state.stroke.value;

export default strokeSlice.reducer;
