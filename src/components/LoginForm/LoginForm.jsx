import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { userLogin } from 'redux/auth/operations';
import * as Yup from 'yup';
import css from './LoginForm.module.css';

const initialValues = { email: '', password: '' };
const schema = Yup.object().shape({
  email: Yup.string().email(),
  password: Yup.string().min(5, 'too short password'),
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
