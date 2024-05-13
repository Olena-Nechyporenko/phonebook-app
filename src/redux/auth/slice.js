import { createSlice } from '@reduxjs/toolkit';
import { userRegister, userLogin, userLogout, refreshUser } from './operations';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { email: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
  },
  extraReducers: {
    [userRegister.pending](state, action) {
      state.isLoading = true;
    },
    [userRegister.fulfilled](state, action) {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [userRegister.rejected](state, action) {
      state.isLoading = false;
    },
    [userLogin.pending](state, action) {
      state.isLoading = true;
    },
    [userLogin.fulfilled](state, action) {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [userLogin.rejected](state, action) {
      state.isLoading = false;
    },
    [userLogout.fulfilled](state) {
      state.user = { email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [refreshUser.pending](state) {
      state.isRefreshing = true;
    },
    [refreshUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    },
    [refreshUser.rejected](state) {
      state.isRefreshing = false;
    },
  },
});

export const authReducer = authSlice.reducer;
