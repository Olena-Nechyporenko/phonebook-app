import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <section className={css.section}>
      <div className={css.textWrapp}>
        <p className={css.text}>Welcome to your Phonebook!</p>
      </div>
    </section>
  );
}
