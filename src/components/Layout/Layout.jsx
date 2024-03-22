import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar } from 'components/AppBar/AppBar';
import { Loader } from 'components/Loader/Loader';
import css from './Layout.module.css';

export const Layout = () => {
  return (
    <div className={css.container}>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <main className={css.main}>
          <Outlet />
        </main>
      </Suspense>
    </div>
  );
};
