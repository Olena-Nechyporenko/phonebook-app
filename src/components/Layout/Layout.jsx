import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { AppBar } from 'components/AppBar/AppBar';
import css from './Layout.module.css';
import { Loader } from 'components/Loader/Loader';

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
