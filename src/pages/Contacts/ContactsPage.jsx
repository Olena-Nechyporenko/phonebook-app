import { MdContacts } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { fetchContacts } from 'redux/contacts/operations';
import { selectError } from 'redux/contacts/selectors';
import css from './ContactsPage.module.css';
import { AddContactModal } from 'components/AddContactModal/AddContactModal';

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
            <MdContacts className={css.icon} />
            <button type="button" className={css.button}>
              All Contacts
            </button>
          </li>
          <li className={css.item}>
            <FaStar className={css.icon} />
            <button type="button" className={css.button}>
              My Favorites
            </button>
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
          </button>
        </div>

        <ContactList />
      </div>

      {openModal && <AddContactModal onClose={handleOpenModal} />}
    </section>
  );
}
