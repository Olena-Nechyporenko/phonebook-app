import { NavLink } from 'react-router-dom';
export const Navigation = () => {
  // const { isLoggedIn } = useAuth();

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/contacts">Contacts</NavLink>
    </nav>
  );
};
