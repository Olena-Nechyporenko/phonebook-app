import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://connections-api.herokuapp.com';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAllContacts',
  async (_, { rejectWithValue }) => {
    try {
      const contacts = await axios.get(`${BASE_URL}/contacts`);
      return contacts;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/contacts`, {
        name: contact.name,
        phone: contact.phone,
        id: contact.id,
      });
      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/contacts/${contactId}`);
      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
