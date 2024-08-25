import { Route, Routes } from 'react-router-dom';
import Dashboard from './sections/dashboard';

const RoutesWrapper = () => {
  // const { token } = useAuthStore();
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
};

export default RoutesWrapper;
