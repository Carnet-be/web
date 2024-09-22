import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import i18n from '@/i18n';
import { Button } from '@nextui-org/react';
import { useState } from 'react';

export function LanguageToggle({
  onSelect,
}: {
  onSelect?: (lang: string) => void;
}) {
  function changeLanguage(lang: string) {
    i18n.changeLanguage(lang);
    onSelect?.(lang);
    setIsOpen(false);
  }
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button isIconOnly size={'sm'} onClick={() => setIsOpen(!isOpen)}>
          {i18n.language.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => changeLanguage('en')}
          className="gap-3"
        >
          {/* uk svg flag */}
          <span className="fi fi-gb"></span>
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage('fr')}
          className="gap-3"
        >
          <span className="fi fi-fr"></span>
          Français
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage('ar')}
          className="gap-3"
        >
          <span className="fi fi-ma"></span>
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
