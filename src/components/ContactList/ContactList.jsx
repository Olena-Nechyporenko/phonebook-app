import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contacts/operations';
import { selectFilteredContacts } from 'redux/contacts/selectors';
import { selectContacts } from 'redux/contacts/selectors';
import { MdDelete } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import css from './ContactList.module.css';
import { useState } from 'react';
import { AddContactModal } from 'components/AddContactModal/AddContactModal';
import img from './contact.jpg';

export function ContactList() {
  const [isOpen, setIsOpen] = useState(false);
  const filteredContacts = useSelector(selectFilteredContacts);
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {contacts.length === 0 ? (
        <div>
          <p className={css.noContact}>
            You have no contacts in the phonebook yet
          </p>
          <button
            onClick={handleOpenModal}
            className={css.addFirstContact}
            type="button"
          >
            Add first contact
          </button>
        </div>
      ) : (
        <ul className={css.contactList}>
          {filteredContacts.map(({ _id, name, phone, email }) => (
            <li className={css.contactItem} key={_id}>
              <div className={css.imgNameWrapp}>
                <img className={css.image} src={img} alt={name} />
                <p className={css.desription}>{name} </p>
              </div>

              <ul className={css.descrList}>
                <li className={css.descrPhoneItem}>
                  Phone
                  <p className={css.desription}>{phone}</p>
                </li>
                <li className={css.descrEmailItem}>
                  Email
                  <p className={css.desription}>{email}</p>
                </li>
              </ul>

              <ul className={css.iconList}>
                <li>
                  <button
                    className={css.favoriteBtn}
                    name="favorite"
                    type="button"
                  >
                    <FaStar className={css.starIcon} />
                  </button>
                </li>
                <li>
                  <button
                    className={css.deleteBtn}
                    onClick={() => handleDeleteContact(_id)}
                    name="delete"
                    type="button"
                  >
                    <MdDelete className={css.deleteIcon} />
                  </button>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      )}

      {isOpen && <AddContactModal onClose={handleOpenModal} />}
    </>
  );
}
