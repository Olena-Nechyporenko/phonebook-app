import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { userRegister } from 'redux/auth/operations';
import { TailSpin } from 'react-loader-spinner';
import * as Yup from 'yup';
import css from './RegisterForm.module.css';
import { selectIsLoading } from 'redux/auth/selectors';

const loaderStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const emailRegexp =
  /^[a-zA-Z][0-9a-zA-Z_]{2,21}@[a-zA-Z]{2,12}\.[a-zA-Z]{2,12}/;

const initialValues = { email: '', password: '' };

const schema = Yup.object().shape({
  email: Yup.string().matches(emailRegexp, 'Invalid email format').required(),
  password: Yup.string().min(6, 'too short password').required(),
});

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      userRegister({
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
          {isLoading ? (
            <button className={css.formBtn} type="submit">
              <TailSpin
                visible={true}
                height="26"
                width="26"
                color="rgba(200, 134, 255, 0.66)"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={loaderStyle}
              />
            </button>
          ) : (
            <button className={css.formBtn} type="submit">
              Register
            </button>
          )}
        </Form>
      </Formik>
    </div>
  );
};
