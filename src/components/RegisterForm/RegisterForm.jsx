import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { userRegister } from 'redux/auth/operations';
import * as Yup from 'yup';
import css from './RegisterForm.module.css';

const initialValues = { username: '', email: '', password: '' };
const schema = Yup.object().shape({
  username: Yup.string(),
  email: Yup.string().email(),
  password: Yup.string().min(7, 'Too short password!'),
});

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      userRegister({
        name: values.username,
        email: values.email,
        password: values.password,
      })
    );
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.formLabel} htmlFor="username">
          Username
          <Field
            className={css.formInput}
            type="text"
            name="username"
            required
          />
          <span className={css.error}>
            <ErrorMessage name="username" />
          </span>
        </label>
        <label className={css.formLabel} htmlFor="email">
          Email
          <Field className={css.formInput} type="email" name="email" required />
          <span className={css.error}>
            <ErrorMessage name="email" />
          </span>
        </label>
        <label className={css.formLabel} htmlFor="password">
          Password
          <Field
            className={css.formInput}
            type="password"
            name="password"
            required
          />
          <span className={css.error}>
            <ErrorMessage name="password" />
          </span>
        </label>
        <button className={css.formBtn} type="submit">
          Register
        </button>
      </Form>
    </Formik>
  );
};
