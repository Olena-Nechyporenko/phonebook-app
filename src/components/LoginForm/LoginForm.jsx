import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './LoginForm.module.css';

const initialValues = { email: '', password: '' };
const schema = Yup.object().shape({
  email: Yup.string().email(),
  password: Yup.string().min(5, 'Too short password!'),
});

export const LoginForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      //   onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
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
          Log In
        </button>
      </Form>
    </Formik>
  );
};
