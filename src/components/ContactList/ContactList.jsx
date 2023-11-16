import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contacts/operations';
import { selectFilteredContacts, selectFilter } from 'redux/contacts/selectors';
import { selectContacts } from 'redux/contacts/selectors';
import { IoIosContact } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import css from './ContactList.module.css';

export function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);
  const savedFilter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  return (
    <ul className={css.contactList}>
      {contacts.length === 0 ? (
        <span className={css.noContact}>
          You have no contacts in the phonebook yet
        </span>
      ) : (
        <>
          {filteredContacts.map(({ id, name, number }) => (
            <li className={css.contactItem} key={id}>
              <IoIosContact size={25} className={css.contactIcon} />
              {name} : {number}
              <button
                className={css.deleteBtn}
                onClick={() => dispatch(deleteContact(id))}
                name="delete"
                value={savedFilter}
                type="button"
              >
                <MdDelete size={22} className={css.deleteIcon} />
              </button>
            </li>
          ))}
        </>
      )}
    </ul>
  );
}
