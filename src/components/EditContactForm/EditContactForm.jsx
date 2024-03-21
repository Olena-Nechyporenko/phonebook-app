import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { editContact } from 'redux/contacts/operations';
import * as Yup from 'yup';
import css from './EditContactForm.module.css';
import Notiflix from 'notiflix';

const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|ua)$/i;

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'must be at least 2 characters long')
    .max(30, 'must be no more than 30 characters long'),
  email: Yup.string().matches(emailRegex, 'invalid email format').required(),
  phone: Yup.string().required().typeError('field can only contain numbers'),
});

export const EditContactForm = ({ contactInfo, onClose }) => {
  const { _id, name, phone, email } = contactInfo;

  const initialValues = { name: name, phone: phone, email: email };
  const dispatch = useDispatch();

  const handleSubmit = values => {
    const editedContact = {
      name: values.name,
      phone: values.phone,
      email: values.email,
    };
    dispatch(editContact({ _id, editedContact }));
    onClose();
    Notiflix.Notify.success('The contact has been edited');
  };

  return (
    <div className={css.contactFormWrap}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <label className={css.formLabel} htmlFor="name">
            Name
            <Field className={css.formInput} type="text" name="name" />
            <span className={css.error}>
              <ErrorMessage name="name" />
            </span>
          </label>
          <label className={css.formLabel} htmlFor="phone">
            Number
            <Field
              className={css.formInput}
              type="text"
              name="phone"
              placeholder="097XXXXXXX"
            />
            <span className={css.error}>
              <ErrorMessage name="phone" />
            </span>
          </label>
          <label className={css.formLabel} htmlFor="email">
            Email
            <Field
              className={css.formInput}
              type="text"
              name="email"
              placeholder="example@gmail.com"
            />
            <span className={css.error}>
              <ErrorMessage name="email" />
            </span>
          </label>
          <button className={css.formBtn} type="submit">
            Edit contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};
