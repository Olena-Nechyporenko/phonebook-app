import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contacts/operations';
import { selectFilteredContacts, selectFilter } from 'redux/contacts/selectors';
import css from './ContactList.module.css';

export function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);
  const savedFilter = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <ul className={css.contactList}>
      {filteredContacts.map(({ id, name, number }) => (
        <li className={css.contactItem} key={id}>
          {name} : {number}
          <button
            className={css.deleteBtn}
            onClick={() => dispatch(deleteContact(id))}
            name="delete"
            value={savedFilter}
            type="button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
