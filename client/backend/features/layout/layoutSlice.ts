import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LayoutSlice = {
  visible: boolean;
};

const defaultState: LayoutSlice = {
  visible: true,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: defaultState,
  reducers: {
    setVisibility: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
});

export const { setVisibility } = layoutSlice.actions;

export default layoutSlice.reducer;

