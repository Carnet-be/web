import { cn } from '@/lib/utils';
import { NavLink, useLocation } from 'react-router-dom';

const Logo = ({ className }: { className?: string }) => {
  const path = useLocation().pathname;
  return (
    <NavLink
      to={path === '/dashboard/marketplace' ? '/' : '/dashboard/marketplace'}
    >
      <img src={'/logo.png'} alt="Logo" className={cn('h-10', className)} />
    </NavLink>
  );
};

export default Logo;
