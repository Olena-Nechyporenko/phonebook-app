import css from './HomePage.module.css';
export default function HomePage() {
  return (
    <div className={css.home}>
      <span className={css.text}>Welcome to your Phonebook!</span>
    </div>
  );
}
