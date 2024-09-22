import BackButton from '@/components/backButton';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  pageType: 'login' | 'register' | 'forget-password' | 'reset-password';
}

export default function AuthLayout({ children, pageType }: AuthLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute top-0 left-0 z-20 flex flex-row py-6 h-full w-full backdrop-blur-md md:backdrop-blur-none">
        <div className="layout mx-auto flex flex-row items-center justify-between">
          <div className="flex-grow flex flex-col h-full overflow-hidden justify-center items-center">
            <Card className="shadow-xl rounded-lg p-8 max-w-md w-full border-0 md:border border-gray-200 dark:border-gray-700 space-y-2">
              <BackButton />

              <div>{children}</div>
            </Card>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <Overlay />
      </div>
    </div>
  );
}

const Overlay = () => {
  return (
    <>
      <div className="absolute z-[1] -bottom-[40vh] rotate-12 right-[50vh] rounded-[60px] bg-[#196EBD]/30 w-[100vh] h-[100vh]"></div>
      <div className="absolute z-[2] -top-[50vh] -rotate-[17deg] -right-[60vh] rounded-[60px] bg-[#181BAA] w-[100vh] h-[100vh]"></div>
      <div className="absolute z-[2] -top-[50vh] -rotate-[17deg] right-[80vh] rounded-[60px] bg-[#60A1DC] w-[100vh] h-[100vh]"></div>
    </>
  );
};
