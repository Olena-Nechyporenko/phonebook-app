import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';
export const AuthNav = () => {
  return (
    <div className={css.auth}>
      <NavLink to="/register" className={css.link}>
        Register
      </NavLink>
      <NavLink to="/login" className={css.link}>
        Log In
      </NavLink>
    </div>
  );
};
