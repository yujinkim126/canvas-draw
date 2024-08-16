import { createSlice } from "@reduxjs/toolkit";

export const colorSlice = createSlice({
  name: "color",
  initialState: {
    value: "black", // 초기값 설정
  },
  reducers: {
    setColor: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setColor } = colorSlice.actions;
export const selectColor = (state) => state.color.value;

export default colorSlice.reducer;
