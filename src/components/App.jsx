import { useSelector, useDispatch } from 'react-redux';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { selectContacts, selectError, selectIsLoading } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';
import { useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';

const spinnerStyle = {
  padding: '5px 65px',
  position: 'absolute',
};

//   APP
export const App = () => {
  const contacts = useSelector(selectContacts);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="formTitle">Phonebook</h1>
      <ContactForm />
      <h2 className="contactsTitle">Contacts</h2>
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
    </div>
  );
};
