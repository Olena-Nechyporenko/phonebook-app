import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { selectFilteredContacts } from 'redux/selectors';
import { selectFilter } from 'redux/selectors';
import css from './ContactList.module.css';

export function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);
  const savedFilter = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <ul className={css.contactList}>
      {filteredContacts.map(({ id, name, phone }) => (
        <li className={css.contactItem} key={id}>
          {name} : {phone}
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
