import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addContact } from 'redux/contacts/operations';
import { selectContacts } from 'redux/contacts/selectors';
import Notiflix from 'notiflix';
import * as Yup from 'yup';
import css from './AddContactForm.module.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|ua)$/i;

const initialValues = { name: '', phone: '', email: '' };
const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'must be at least 2 characters long')
    .max(20, 'must be no more than 20 characters long'),
  email: Yup.string().matches(emailRegex, 'invalid email format').required(),
  phone: Yup.string().required().typeError('field can only contain numbers'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, { resetForm }) => {
    const isInContacts = contacts.find(
      ({ name }) => name.toLowerCase() === values.name.toLowerCase()
    );
    if (isInContacts) {
      Notiflix.Notify.failure(`${values.name} is already in contacts!`);
      return;
    }
    dispatch(
      addContact({
        name: values.name,
        phone: values.phone.toString(),
        email: values.email,
      })
    );
    resetForm();
    Notiflix.Notify.success('Contact is added to the phonebook');
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
            <Field className={css.formInput} type="text" name="name" required />
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
              required
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
              required
            />
            <span className={css.error}>
              <ErrorMessage name="email" />
            </span>
          </label>
          <button className={css.formBtn} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};
