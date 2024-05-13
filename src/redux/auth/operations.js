import axios from 'axios';
import Notiflix from 'notiflix';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://contact-book-express-js.onrender.com/api/';
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};
export const userRegister = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const newUser = await axios.post('/users/register', userData);
      setAuthHeader(newUser.data.token);
      return newUser.data;
    } catch (e) {
      Notiflix.Notify.failure(
        `User with email "${userData.email}" already exists!`
      );
      return rejectWithValue(e.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  'user/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const loginUser = await axios.post('/users/login', userData);
      setAuthHeader(loginUser.data.token);
      return loginUser.data;
    } catch (e) {
      Notiflix.Notify.failure(`Email or password is wrong`);
      return rejectWithValue(e.message);
    }
  }
);

export const userLogout = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/users/logout');
      clearAuthHeader();
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'user/refreshUser',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return rejectWithValue('Unable to fetch user');
    }
    try {
      setAuthHeader(persistedToken);
      const refreshedUser = await axios.get('/users/current');
      return refreshedUser.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
