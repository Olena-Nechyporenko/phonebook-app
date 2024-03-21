import { useDispatch } from 'react-redux';
import { useEffect, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { refreshUser } from 'redux/auth/operations';
import { useAuth } from 'hooks/useAuth';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRout';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import { ContactList } from './ContactList/ContactList';
import { FavoriteContacts } from './FavoriteContacts/FavoriteContacts';
import { Loader } from './Loader/Loader';
const HomePage = lazy(() => import('pages/Home/HomePage'));
const ContactsPage = lazy(() => import('pages/Contacts/ContactsPage'));
const LoginPage = lazy(() => import('pages/Login/LoginPage'));
const RegisterPage = lazy(() => import('pages/Register/RegisterPage'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegisterPage />}
            />
          }
        />
        <Route
          path="login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
          }
        />
        <Route
          path="contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
        >
          <Route path="all" element={<ContactList />} />
          <Route path="favorite" element={<FavoriteContacts />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
