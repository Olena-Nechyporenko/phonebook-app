import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  getContactById,
  editContact,
  editContactStatus,
} from 'redux/contacts/operations';

const handlePending = state => {
  state.contacts.isLoading = true;
};
const handleRejected = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = action.payload;
};
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      currentContact: {},
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },

  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    // pending
    [fetchContacts.pending]: handlePending,
    [addContact.pending]: handlePending,
    [deleteContact.pending]: handlePending,
    [getContactById]: handlePending,
    [editContact]: handlePending,
    [editContactStatus]: handlePending,

    // rejected
    [fetchContacts.rejected]: handleRejected,
    [addContact.rejected]: handleRejected,
    [deleteContact.rejected]: handleRejected,
    [getContactById.rejected]: handleRejected,
    [editContact.rejected]: handleRejected,
    [editContactStatus.rejected]: handleRejected,

    // fulfilled
    [fetchContacts.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items = action.payload;
    },
    [addContact.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items = [...state.contacts.items, action.payload];
    },
    [deleteContact.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items = state.contacts.items.filter(
        ({ _id }) => _id !== action.payload._id
      );
    },
    [getContactById.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.currentContact = action.payload;
    },
    [editContact.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      const editedContact = state.contacts.items.map(contact =>
        contact._id === action.payload._id ? action.payload : contact
      );
      state.contacts.items = editedContact;
    },
    [editContactStatus.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      const editedContactStatus = state.contacts.items.map(contact =>
        contact._id === action.payload._id ? action.payload : contact
      );
      state.contacts.items = editedContactStatus;
    },
  },
});

export const { setFilter } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
