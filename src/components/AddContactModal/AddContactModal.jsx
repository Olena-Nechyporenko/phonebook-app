import { IoMdClose } from 'react-icons/io';
import { IoIosContact } from 'react-icons/io';
import { ContactForm } from 'components/ContactForm/ContactForm';
import css from './AddContactModal.module.css';
import { useEffect } from 'react';

export function AddContactModal({ onClose }) {
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
          <p className={css.title}>New contact</p>
          <IoIosContact className={css.iconContact} />
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
