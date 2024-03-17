import { MdDelete } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { SlPencil } from 'react-icons/sl';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, getContactById } from 'redux/contacts/operations';
import { selectFilteredContacts } from 'redux/contacts/selectors';
import { selectContacts } from 'redux/contacts/selectors';
import css from './ContactList.module.css';
import { useState } from 'react';
import { AddContactModal } from 'components/AddContactModal/AddContactModal';
import img from './contact.jpg';
import { EditContactModal } from 'components/EditContactModal/EditContactModal';

export function ContactList() {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const filteredContacts = useSelector(selectFilteredContacts);
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleOpenAddModal = () => {
    setIsOpenAddModal(!isOpenAddModal);
  };
  const handleOpenEditModal = id => {
    setIsOpenEditModal(!isOpenEditModal);
    dispatch(getContactById(id));
  };

  return (
    <>
      {contacts.length === 0 ? (
        <div>
          <p className={css.noContact}>
            You have no contacts in the phonebook yet
          </p>
          <button
            onClick={handleOpenAddModal}
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
                <li className={css.iconItem}>
                  <button
                    className={css.editBtn}
                    onClick={() => handleOpenEditModal(_id)}
                    name="edit"
                    type="button"
                  >
                    <SlPencil className={css.editIcon} />
                  </button>
                </li>
                <li className={css.iconItem}>
                  <button
                    className={css.favoriteBtn}
                    name="favorite"
                    type="button"
                  >
                    <FaStar className={css.starIcon} />
                  </button>
                </li>
                <li className={css.iconItem}>
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
              {isOpenEditModal && (
                <EditContactModal
                  contactId={_id}
                  onClose={handleOpenEditModal}
                />
              )}
            </li>
          ))}
        </ul>
      )}
      {isOpenAddModal && <AddContactModal onClose={handleOpenAddModal} />}
    </>
  );
}
