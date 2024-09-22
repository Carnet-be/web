import ForgetPassword from '@/pages/forget-password.tsx';
import Login from '@/pages/login.tsx';
import Register from '@/pages/register.tsx';
import ResetPassword from '@/pages/reset-password.tsx';
import { ReactNode } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import Dashboard from './sections/dashboard';

import useAuthStore from './state/auth';
// src/routes.tsx
import MyCarsPage from './pages/dashboard/my-cars';
import CarForm from './pages/dashboard/my-cars/carForm';
import GarageProfilePage from './pages/dashboard/my-garage';
import Overview from './sections/dashboard/overview';

const RoutesWrapper = () => {
  const { token } = useAuthStore();

  const Protected = ({ children }: { children: ReactNode }) => {
    if (token?.token) {
      return children;
    }
    return <Navigate to="/auth/login" />;
  };
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      >
        <Route index element={<Navigate to="overview" />} />
        <Route path="my-cars" element={<MyCarsPage />} />
        <Route path="my-cars/add" element={<CarForm />} />
        <Route path="my-cars/edit/:id" element={<CarForm />} />
        <Route path="my-garage" element={<GarageProfilePage />} />
        <Route path="overview" element={<Overview />} />
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center h-screen">
              <h1>404</h1>
              <p>Page not found</p>
            </div>
          }
        />
      </Route>
      <Route
        path="/auth"
        element={token?.token ? <Navigate to={'/dashboard'} /> : <Outlet />}
      >
        <Route index element={<Navigate to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      <Route
        path="*"
        element={
          <div className="flex flex-col items-center justify-center h-screen">
            <h1>404</h1>
            <p>Page not found</p>
          </div>
        }
      />
    </Routes>
  );
};

export default RoutesWrapper;
