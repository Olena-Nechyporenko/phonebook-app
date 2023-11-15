import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { fetchContacts } from 'redux/contacts/operations';
import {
  selectIsLoading,
  selectContacts,
  selectError,
} from 'redux/contacts/selectors';

const spinnerStyle = {
  padding: '5px 65px',
  position: 'absolute',
};
export default function ContactsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const contacts = useSelector(selectContacts);
  const error = useSelector(selectError);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <ContactForm />
      <Filter />
      {isLoading && (
        <ThreeDots
          height="20"
          width="50"
          radius="10"
          color="#9B5CFF"
          wrapperClassName="spinner"
          wrapperStyle={spinnerStyle}
          visible={true}
        />
      )}
      {error && <b>{error}</b>}
      {contacts.length !== 0 && <ContactList />}
    </>
  );
}
