import ForgetPassword from '@/pages/forget-password.tsx';
import Login from '@/pages/login.tsx';
import Register from '@/pages/register.tsx';
import ResetPassword from '@/pages/reset-password.tsx';
import { ReactNode } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Dashboard from './sections/dashboard';

import useAuthStore from './state/auth';
// src/routes.tsx
import AdminCarPage from './admin/pages/cars/adminCarPage';
import AdminGaragePage from './admin/pages/garages/adminGaragePage';
import AdminLogin from './admin/pages/login';
import AdminUserPage from './admin/pages/users/adminUserPage';
import UserAdminEdit from './admin/pages/users/userAdminEdit';
import CarDetailPage from './pages/car';
import MarketPlacePage from './pages/dashboard/marketplace/marketPlacePage';
import MyCarsPage from './pages/dashboard/my-cars';
import CarForm, { CarFormAdd } from './pages/dashboard/my-cars/carForm';
import GarageProfilePage from './pages/dashboard/my-garage';
import ProfilePage from './pages/dashboard/settings/profilePage';
import GaragePage from './pages/garage';
import ListCars from './pages/garage/listCars';
import GaragesPage from './pages/garages';
import Page from './pages/home';
import Overview from './sections/dashboard/overview';

const RoutesWrapper = () => {
  const { token } = useAuthStore();

  const Protected = ({
    children,
    isAdmin,
  }: {
    children: ReactNode;
    isAdmin?: boolean;
  }) => {
    if (token?.token) {
      return children;
    }
    return <Navigate to={isAdmin ? '/admin/login' : '/auth/login'} />;
  };

  const AdminProtected = ({ children }: { children: ReactNode }) => {
    if (token?.token && token.role === 'admin') {
      return children;
    }
    return <Navigate to="/admin/login" />;
  };

  return (
    <Routes>
      <Route path="/" element={<Page />} />

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
        path="/admin"
        element={token?.token ? <Navigate to="/dashboard" /> : <Outlet />}
      >
        <Route index element={<Navigate to="login" />} />
        <Route path="login" element={<AdminLogin />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard isAdmin={token?.role === 'admin'} />
          </Protected>
        }
      >
        <Route
          index
          element={
            token?.role === 'admin' ? (
              <Navigate to="admin" />
            ) : (
              <Navigate to="marketplace" />
            )
          }
        />
        <Route
          path="admin"
          element={
            <AdminProtected>
              <Outlet />
            </AdminProtected>
          }
        >
          <Route index element={<Navigate to="cars" />} />
          <Route path="cars" element={<Outlet />}>
            <Route index element={<AdminCarPage />} />
            <Route path="edit/:id" element={<CarForm />} />
          </Route>
          <Route path="users" element={<Outlet />}>
            <Route index element={<AdminUserPage />} />
            <Route path="edit/:id" element={<UserAdminEdit />} />
          </Route>
          <Route path="garages" element={<Outlet />}>
            <Route index element={<AdminGaragePage />} />
            <Route path="edit/:id" element={<GarageProfilePage />} />
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
        </Route>
        <Route path="garages" element={<Outlet />}>
          <Route index element={<GaragesPage />} />
        </Route>
        <Route path="my-cars" element={<Outlet />}>
          <Route index element={<MyCarsPage />} />
          <Route path="add" element={<CarFormAdd />} />
          <Route path="edit/:id" element={<CarForm />} />
        </Route>
        <Route path="settings" element={<Outlet />}>
          <Route index element={<Navigate to="profile" />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="marketplace" element={<Outlet />}>
          <Route index element={<MarketPlacePage />} />
          <Route path=":id" element={<CarDetailPage />} />
        </Route>
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

      <Route path="/:slug" element={<GaragePage />}>
        <Route index element={<ListCars />} />
        <Route path="car/:id" element={<CarDetailPage view="garage" />} />
      </Route>
    </Routes>
  );
};

export default RoutesWrapper;
