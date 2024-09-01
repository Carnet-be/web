import { Route, Routes } from 'react-router-dom';
import Dashboard from './sections/dashboard';
import Shop from './sections/new-shop';
const RoutesWrapper = () => {
  // const { token } = useAuthStore();
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/new-shop" element={<Shop />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
};

export default RoutesWrapper;
