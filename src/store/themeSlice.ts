import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

const initialState: { value: Theme } = {
  value: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      // eslint-disable-next-line no-param-reassign
      state.value = state.value === 'light' ? 'dark' : 'light';
    },
    setTheme(state, action: PayloadAction<Theme>) {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
