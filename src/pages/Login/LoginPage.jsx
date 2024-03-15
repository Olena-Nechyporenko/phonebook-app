import { LoginForm } from 'components/LoginForm/LoginForm';
import css from './LoginPage.module.css';

export default function LoginPage() {
  return (
    <section className={css.wrapper}>
      <div className={css.login}>LOGIN</div>
      <LoginForm />
    </section>
  );
}
