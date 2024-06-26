import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdContacts } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { Filter } from 'components/Filter/Filter';
import { selectError } from 'redux/contacts/selectors';
import { fetchContacts } from 'redux/contacts/operations';
import { AddContactModal } from 'components/AddContactModal/AddContactModal';
import css from './ContactsPage.module.css';

export default function ContactsPage() {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <section className={css.section}>
      <aside className={css.aside}>
        <ul className={css.list}>
          <li className={css.item}>
            <NavLink to="all" className={css.link}>
              <MdContacts className={css.asideIcon} />
              All Contacts
            </NavLink>
          </li>
          <li className={css.item}>
            <NavLink to="favorite" className={css.link}>
              <FaStar className={css.asideIcon} />
              My Favorites
            </NavLink>
          </li>
        </ul>
      </aside>
      <div className={css.contactsWrap}>
        {error && <b>{error}</b>}

        <div className={css.filterWrapper}>
          <Filter />
          <button
            className={css.addContactBtn}
            onClick={handleOpenModal}
            type="button"
          >
            Add contact
            <FaPlus className={css.iconPlus} />
          </button>
        </div>
        <Outlet />
      </div>

      {openModal && <AddContactModal onClose={handleOpenModal} />}
    </section>
  );
}
