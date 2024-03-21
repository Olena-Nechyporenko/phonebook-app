import { RegisterForm } from 'components/RegisterForm/RegisterForm';
import css from './RegisterPage.module.css';

export default function RegisterPage() {
  return (
    <section className={css.section}>
      <div className={css.register}>REGISTER</div>
      <RegisterForm />
    </section>
  );
}
