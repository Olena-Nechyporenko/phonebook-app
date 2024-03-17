import { IoMdClose } from 'react-icons/io';
import { IoIosContact } from 'react-icons/io';
import css from './EditContactModal.module.css';
import { useEffect } from 'react';
import { EditContactForm } from 'components/EditContactForm/EditContactForm';

export function EditContactModal({ onClose, contactId }) {
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
          <p className={css.title}>Edit contact</p>
          <IoIosContact className={css.iconContact} />
        </div>

        <EditContactForm />
      </div>
    </div>
  );
}
