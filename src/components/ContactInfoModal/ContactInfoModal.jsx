import { useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IoIosContact } from 'react-icons/io';
import css from './ContactInfoModal.module.css';

export function ContactInfoModal({ contactInfo, onClose }) {
  const { name, email, phone } = contactInfo;

  useEffect(() => {
    const handleCloseOnKeydown = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleCloseOnKeydown);

    return () => {
      window.removeEventListener('keydown', handleCloseOnKeydown);
    };
  }, [onClose]);

  const handleCloseOnBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className={css.backdrop} onClick={handleCloseOnBackdrop}>
      <div className={css.modalContainer}>
        <button className={css.closeBtn} type="button">
          <IoMdClose className={css.closeIcon} onClick={onClose} />
        </button>
        <div className={css.titleWrapper}>
          <p className={css.title}>Contact Info</p>
          <IoIosContact className={css.iconContact} />
        </div>
        <ul className={css.infoList}>
          <li className={css.infoItem}>
            <span className={css.descrName}>Name : </span>
            <p className={css.description}>{name}</p>
          </li>
          <li className={css.infoItem}>
            <span className={css.descrName}>Phone : </span>
            <p className={css.description}>{phone}</p>
          </li>
          <li className={css.infoItem}>
            <span className={css.descrName}>Email : </span>
            <p className={css.description}>{email}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
