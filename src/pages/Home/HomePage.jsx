import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={css.home}>
      <div className={css.textWrapp}>
        <p className={css.text}>Welcome to your Phonebook!</p>
      </div>
    </div>
  );
}
