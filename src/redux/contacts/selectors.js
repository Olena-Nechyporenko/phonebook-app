import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contactsBook.contacts.items;
export const selectCurrentContact = state =>
  state.contactsBook.contacts.currentContact;
export const selectIsLoading = state => state.contactsBook.contacts.isLoading;
export const selectError = state => state.contactsBook.contacts.error;
export const selectFilter = state => state.contactsBook.filter;

export const selectFilteredContacts = createSelector(
  [selectFilter, selectContacts],
  (savedFilter, items) => {
    const normalizedFilter = savedFilter.toLowerCase();
    return items.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }
);

export const selectFavoriteContacts = createSelector(
  [selectContacts],
  items => {
    return items.filter(({ favorite }) => favorite === true);
  }
);
