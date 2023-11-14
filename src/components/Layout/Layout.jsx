import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { AppBar } from 'components/AppBar/AppBar';

export const Layout = () => {
  return (
    <div>
      <AppBar />
      <Suspense fallback={'LOADING PAGE...'}>
        <Outlet />
      </Suspense>
    </div>
  );
};
