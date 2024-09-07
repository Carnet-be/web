import ForgetPassword from '@/pages/forget-password.tsx';
import Login from '@/pages/login.tsx';
import Register from '@/pages/register.tsx';
import ResetPassword from '@/pages/reset-password.tsx';
import { ReactNode } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Dashboard from './sections/dashboard';
import useAuthStore from './state/auth';

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
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />
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
