import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';
export const AuthNav = () => {
  return (
    <ul className={css.auth}>
      <li>
        <NavLink to="/register" className={css.link}>
          Register
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" className={css.link}>
          Log In
        </NavLink>
      </li>
    </ul>
  );
};
