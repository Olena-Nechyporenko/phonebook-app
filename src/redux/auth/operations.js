import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://connections-api.herokuapp.com';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';
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
      const newUser = await axios.post('/users/signup', userData);
      setAuthHeader(newUser.data.token);
      return newUser.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  'user/loginUser',
  async (user, { rejectWithValue }) => {
    try {
      const loginUser = await axios.post(`${BASE_URL}/users/login`, {
        email: user.email,
        password: user.password,
      });
      setAuthHeader(loginUser.data.token);
      return loginUser;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const userLogout = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/users/logout`);
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
      // If there is no token, exit without performing any request
      return rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const refreshedUser = await axios.get(`${BASE_URL}/users/current`);
      return refreshUser.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);