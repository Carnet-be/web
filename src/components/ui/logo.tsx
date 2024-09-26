import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import { Badge } from './badge';

const Logo = ({
  className,
  type = 'user',
}: {
  className?: string;
  type?: 'admin' | 'garage' | 'user';
}) => {
  const { t } = useTranslation();
  const path = useLocation().pathname;
  return (
    <NavLink
      to={path === '/dashboard/marketplace' ? '/' : '/dashboard/marketplace'}
      className={cn('flex items-end gap-2')}
    >
      <img src={'/logo.png'} alt="Logo" className={cn('h-10', className)} />
      {type !== 'user' ? (
        <Badge
          variant="outline"
          className="text-[9px] uppercase p-1 rounded-[3px] -skew-x-6"
        >
          {t(`common.${type}`)}
        </Badge>
      ) : null}
    </NavLink>
  );
};

export default Logo;
