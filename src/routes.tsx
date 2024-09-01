// src/routes.tsx
import { Route, Routes} from 'react-router-dom';
import Dashboard from './sections/dashboard';
import Overview from './sections/dashboard/overview';

const RoutesWrapper = () => {
  // const { token } = useAuthStore();
  return (
    <Routes>
    <Route path="/dashboard" element={<Dashboard />}>
      <Route index element={<Overview />} />
    </Route>
    <Route path="*" element={<Dashboard />} />
  </Routes>
  );
};

export default RoutesWrapper;