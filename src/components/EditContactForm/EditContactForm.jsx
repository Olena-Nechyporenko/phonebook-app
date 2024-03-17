import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/operations';
import { selectContacts, selectCurrentContact } from 'redux/contacts/selectors';
import Notiflix from 'notiflix';
import * as Yup from 'yup';
import css from './EditContactForm.module.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|ua)$/i;

// init.values and schema for Formik
const initialValues = { name: '', phone: '', email: '' };
const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Must be at least 2 characters long')
    .max(70, 'Must be no more than 70 characters long'),
  email: Yup.string().matches(emailRegex, 'Invalid email format').required(),
  phone: Yup.number().required().typeError('field can only contain numbers'),
});

export const EditContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const currentContact = useSelector(selectCurrentContact);
  console.log(currentContact);

  const handleSubmit = (values, { resetForm }) => {
    const isInContacts = contacts.find(
      ({ name }) => name.toLowerCase() === values.name.toLowerCase()
    );
    if (isInContacts) {
      Notiflix.Notify.failure(`${values.name} is already in contacts!`, {
        position: 'left-top',
        distance: '10px',
      });
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
  };

  return (
    <div className={css.contactFormWrap}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form} autoComplete="off">
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
              type="number"
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
