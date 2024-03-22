import { NavLink } from 'react-router-dom';
import { TbFaceIdError } from 'react-icons/tb';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <TbFaceIdError className={css.icon} />
      Sorry, the page with this route does not exist.
      <p>
        Please go to the
        <NavLink className={css.link} to="/">
          HOME PAGE
        </NavLink>
      </p>
    </div>
  );
};

export default NotFoundPage;
