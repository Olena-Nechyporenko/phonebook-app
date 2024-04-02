import { useDispatch } from 'react-redux';
import { useAuth } from 'hooks/useAuth';
import { userLogout } from 'redux/auth/operations';
import css from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <div className={css.wrapper}>
      <p className={css.userEmail}>{user?.email}</p>
      <button
        onClick={() => dispatch(userLogout())}
        className={css.button}
        type="button"
      >
        Logout
      </button>
    </div>
  );
};
