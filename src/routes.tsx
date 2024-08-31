import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './sections/dashboard';
import Register from '@/pages/register.tsx';
import Login from '@/pages/login.tsx';

const RoutesWrapper = () => {
  // const { token } = useAuthStore();
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/auth" >
        <Route index element={<Navigate to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
};

export default RoutesWrapper;
