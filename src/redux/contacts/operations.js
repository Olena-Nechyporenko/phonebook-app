import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://contact-book-express-js.onrender.com/api/';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAllContacts',
  async (_, { rejectWithValue }) => {
    try {
      const contacts = await axios.get('/contacts');
      return contacts.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const getContactById = createAsyncThunk(
  'contacts/getContactById',
  async (contactId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/contacts/${contactId}`);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/contacts', contactData);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async (contactData, { rejectWithValue }) => {
    const { _id, editedContact } = contactData;
    try {
      const response = await axios.put(`/contacts/${_id}`, editedContact);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const editContactStatus = createAsyncThunk(
  'contacts/editContactStatus',
  async (contactData, { rejectWithValue }) => {
    const { _id, editedContactStatus } = contactData;
    try {
      const response = await axios.patch(
        `/contacts/${_id}/favorite`,
        editedContactStatus
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
