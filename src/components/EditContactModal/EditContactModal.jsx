import { useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IoIosContact } from 'react-icons/io';
import { EditContactForm } from 'components/EditContactForm/EditContactForm';
import css from './EditContactModal.module.css';

export function EditContactModal({ onClose, contactInfo }) {
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

        <EditContactForm contactInfo={contactInfo} onClose={onClose} />
      </div>
    </div>
  );
}
