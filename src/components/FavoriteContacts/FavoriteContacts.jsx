import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { SlPencil } from 'react-icons/sl';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { deleteContact, editContactStatus } from 'redux/contacts/operations';
import { selectFavoriteFilteredContacts } from 'redux/contacts/selectors';
import { AddContactModal } from 'components/AddContactModal/AddContactModal';
import { EditContactModal } from 'components/EditContactModal/EditContactModal';
import { ContactInfoModal } from 'components/ContactInfoModal/ContactInfoModal';
import Notiflix from 'notiflix';
import img from './contact.jpg';
import css from './FavoriteContacts.module.css';

export function FavoriteContacts() {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenContactInfoModal, setIsOpenContactInfoMadal] = useState(false);
  const [currentContact, setCurrentContact] = useState({});
  const favoriteFilteredContacts = useSelector(selectFavoriteFilteredContacts);
  const dispatch = useDispatch();

  const handleDeleteContact = id => {
    Notiflix.Confirm.show(
      'Delete a contact',
      'Are you sure you want to remove this contact from the phonebook?',
      'Yes',
      'No',
      function () {
        dispatch(deleteContact(id));
        Notiflix.Notify.success('Contact deleted successfully!');
      },
      function () {
        return;
      },
      {
        titleColor: '#6938ce',
        okButtonBackground: '#6938ce',
      }
    );
  };

  const handleOpenAddModal = () => {
    setIsOpenAddModal(!isOpenAddModal);
  };

  const handleOpenEditModal = contact => {
    setIsOpenEditModal(!isOpenEditModal);
    setCurrentContact(contact);
  };

  const handleOpenContactInfoModal = contact => {
    setIsOpenContactInfoMadal(!isOpenContactInfoModal);
    setCurrentContact(contact);
  };

  const handleChangeStatus = _id => {
    const editedContactStatus = { favorite: false };

    Notiflix.Confirm.show(
      'Remove from favorites',
      'Are you sure you want to remove the contact from your favorites?',
      'Yes',
      'No',
      function () {
        dispatch(editContactStatus({ _id, editedContactStatus }));
        Notiflix.Notify.success('Contact deleted from favorites!');
      },
      function () {
        return;
      },
      {
        titleColor: '#6938ce',
        okButtonBackground: '#6938ce',
      }
    );
  };

  return (
    <>
      {favoriteFilteredContacts.length === 0 ? (
        <div>
          <p className={css.emptyListText}>
            You have no favorite contacts in the phonebook yet
          </p>
        </div>
      ) : (
        <ul className={css.contactList}>
          {favoriteFilteredContacts.map(({ _id, name, phone, email }) => (
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
                <li className={css.iconMoreInfoItem}>
                  <button
                    className={css.moreInfoBtn}
                    onClick={() =>
                      handleOpenContactInfoModal({ name, email, phone })
                    }
                    name="moreInfo"
                    type="button"
                  >
                    <BsThreeDotsVertical className={css.moreInfoIcon} />
                  </button>
                </li>
                <li className={css.iconItem}>
                  <button
                    className={css.editBtn}
                    onClick={() =>
                      handleOpenEditModal({ _id, name, phone, email })
                    }
                    name="edit"
                    type="button"
                  >
                    <SlPencil className={css.editIcon} />
                  </button>
                </li>
                <li className={css.iconItem}>
                  <button
                    className={css.favoriteBtn}
                    onClick={() => handleChangeStatus(_id)}
                    name="favorite"
                    type="button"
                  >
                    <FaStar className={css.favoriteIcon} />
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
            </li>
          ))}
        </ul>
      )}
      {isOpenEditModal && (
        <EditContactModal
          contactInfo={currentContact}
          onClose={handleOpenEditModal}
        />
      )}
      {isOpenContactInfoModal && (
        <ContactInfoModal
          contactInfo={currentContact}
          onClose={handleOpenContactInfoModal}
        />
      )}
      {isOpenAddModal && <AddContactModal onClose={handleOpenAddModal} />}
    </>
  );
}
