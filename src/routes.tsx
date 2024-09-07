import { Route, Routes } from 'react-router-dom';
import Dashboard from './sections/dashboard';
import LoadingPage from './sections/loading/LoadingPage';
import { ContactSection } from './sections/loading/Contact';


const RoutesWrapper = () => {
  // const { token } = useAuthStore();
  return (
    <Routes>
      <Route path="/" element={<LoadingPage />} />
      <Route path="/contact" element={<ContactSection />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
};

export default RoutesWrapper;
