// src/routes.tsx
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './sections/dashboard';
import Overview from './sections/dashboard/overview';

const RoutesWrapper = () => {
  // const { token } = useAuthStore();
  return (
    <Routes>
      <Route path="/dashboard" element={<Navigate to="/dashboard/overview" />} />
      <Route path="/dashboard/overview" element={<Dashboard />} >
        <Route path="" element={<Overview />} />
      </Route>
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
};

export default RoutesWrapper;