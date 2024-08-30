import { Route, Routes } from 'react-router-dom';
import Dashboard from './sections/dashboard';
import Register from '@/pages/register.tsx';
import Login from '@/pages/login.tsx';

const RoutesWrapper = () => {
  // const { token } = useAuthStore();
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
};

export default RoutesWrapper;
