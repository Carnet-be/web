import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// Add this import
import { useTheme } from '@/themeProvider';
import { Button } from '@nextui-org/react';
import { Code, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation(); // Add this line

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button isIconOnly size={'sm'} onClick={() => setIsOpen(!isOpen)}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setTheme('light');
            setIsOpen(false);
          }}
          className="gap-3"
        >
          <Sun className="size-4" />
          {t('common.light')} {/* Change this line */}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme('dark');
            setIsOpen(false);
          }}
          className="gap-3"
        >
          <Moon className="size-4" />
          {t('common.dark')} {/* Change this line */}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme('system');
            setIsOpen(false);
          }}
          className="gap-3"
        >
          <Code className="size-4" />
          {t('common.system')} {/* Change this line */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
