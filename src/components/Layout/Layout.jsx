import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { AppBar } from 'components/AppBar/AppBar';
import css from './Layout.module.css';

export const Layout = () => {
  return (
    <div>
      <AppBar />
      <Suspense fallback={'LOADING PAGE...'}>
        <main className={css.layout}>
          <Outlet />
        </main>
      </Suspense>
    </div>
  );
};
