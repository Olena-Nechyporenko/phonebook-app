import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { AppBar } from 'components/AppBar/AppBar';
import css from './Layout.module.css';

export const Layout = () => {
  return (
    <div className={css.container}>
      <AppBar />
      <Suspense fallback={<span className={css.loading}>Loading page...</span>}>
        <main className={css.main}>
          <Outlet />
        </main>
      </Suspense>
    </div>
  );
};
