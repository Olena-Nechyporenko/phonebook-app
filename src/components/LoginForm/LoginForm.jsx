import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { userLogin } from 'redux/auth/operations';
import * as Yup from 'yup';
import css from './LoginForm.module.css';

const emailRegexp = /^[a-zA-Z][0-9a-zA-Z_]{2,21}@[a-zA-Z]{2,12}.[a-zA-Z]{2,12}/;

const initialValues = { email: '', password: '' };
const schema = Yup.object().shape({
  email: Yup.string().matches(emailRegexp, 'Invalid email format').required(),
  password: Yup.string().min(7, 'too short password').required(),
});

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      userLogin({
        email: values.email,
        password: values.password,
      })
    );
    resetForm();
  };
  return (
    <div className={css.formWrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form} autoComplete="off">
          <label className={css.formLabel} htmlFor="email">
            Email
            <Field
              className={css.formInput}
              type="email"
              name="email"
              required
            />
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
          <button type="submit" className={css.formBtn}>
            Log In
          </button>
        </Form>
      </Formik>
    </div>
  );
};
