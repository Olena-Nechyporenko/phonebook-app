import css from './UserMenu.module.css';
import { useAuth } from 'hooks/useAuth';
import { useDispatch } from 'react-redux';
export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <div className={css.wrapper}>
      <p className={css.welcome}>{user.email}</p>
      <button className={css.button} type="button">
        Logout
      </button>
    </div>
  );
};
