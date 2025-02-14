import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SettingsSliceState = {
  settings: Record<string, unknown>;
  loading: boolean;
  error: string | null;
};

const defaultState: SettingsSliceState = {
  settings: {},
  loading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: defaultState,
  reducers: {
    addSetting(state, action: PayloadAction<Record<string, unknown>>) {
      state.settings = action.payload;
    },
    addSettings(state, action: PayloadAction<Record<string, unknown>>) {
      state.settings = { ...state.settings, ...action.payload };
      console.log(state.settings);
    },
    updateSetting(
      state,
      action: PayloadAction<{ key: string; value: unknown }>
    ) {
      state.settings[action.payload.key] = action.payload.value;
    },
    removeSetting(state, action: PayloadAction<string>) {
      delete state.settings[action.payload];
    },
  },
});

export const { addSetting, addSettings, updateSetting, removeSetting } =
  settingsSlice.actions;

export default settingsSlice.reducer;

