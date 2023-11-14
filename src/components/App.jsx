import { useSelector, useDispatch } from 'react-redux';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from 'redux/contacts/selectors';
import { fetchContacts } from 'redux/contacts/operations';
import { useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { Layout } from './Layout/Layout';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';

const HomePage = lazy(() => import('pages/Home/HomePage'));
const ContactsPage = lazy(() => import('pages/Contacts/ContactsPage'));
const LoginPage = lazy(() => import('pages/Login/LoginPage'));
const RegisterPage = lazy(() => import('pages/Register/RegisterPage'));

//   APP
export const App = () => {
  // const contacts = useSelector(selectContacts);
  // const error = useSelector(selectError);
  // const isLoading = useSelector(selectIsLoading);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchContacts());
  // }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="contacts" element={<ContactsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    // <div className="container">
    //   <h1 className="formTitle">Phonebook</h1>
    //   <ContactForm />
    //   <h2 className="contactsTitle">Contacts</h2>
    //   <Filter />
    //   {isLoading && (
    //     <ThreeDots
    //       height="20"
    //       width="50"
    //       radius="10"
    //       color="#9B5CFF"
    //       wrapperClassName="spinner"
    //       wrapperStyle={spinnerStyle}
    //       visible={true}
    //     />
    //   )}
    //   {error && <b>{error}</b>}
    //   {contacts.length !== 0 && <ContactList />}
    // </div>
  );
};
