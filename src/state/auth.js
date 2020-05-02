import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveToken: (state, action) => ({ ...state, token: action.payload }),
  },
});

export const { actions } = slice;

export const selectors = {
  selectToken: (state) => state.auth.token,
};

export default slice.reducer;
