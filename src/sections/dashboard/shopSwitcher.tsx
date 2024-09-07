import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import query from '@/lib/query';
import { cn, getImageUrl } from '@/lib/utils';
import sellerService from '@/services/seller.service';
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons';
import { useMutation } from '@tanstack/react-query';
import * as React from 'react';
import ShopFormPage from './shopFormPage';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {
  user: Seller;
}

export default function ShopSwitcher({ className, user }: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);

  const { mutate: updateSeller } = useMutation({
    mutationFn: sellerService.updateSeller,
  });

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn('w-full justify-between', className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={getImageUrl(user.selectedShop?.logo)}
                alt={user.selectedShop?.name}
                className="grayscale"
              />
            </Avatar>
            {user.selectedShop?.name}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search shop..." />
            <CommandList>
              <CommandEmpty>No shop found.</CommandEmpty>

              <CommandGroup heading={'Active Shops'}>
                {user.shops?.map((shop) => (
                  <CommandItem
                    key={shop.id}
                    onSelect={() => {
                      // setSelectedTeam(shop);
                      setOpen(false);
                      query.setQueryData(['seller-me'], (data: Seller) => {
                        return {
                          ...data,
                          selectedShop: shop,
                        };
                      });
                      updateSeller({
                        selectedShopId: shop.id,
                      });
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={getImageUrl(shop.logo, undefined)}
                        alt={shop.name}
                        className="grayscale"
                      />
                    </Avatar>
                    {shop.name}
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        user.selectedShop?.id === shop.id
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    className="cursor-pointer"
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create Shop
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        {/* <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Shop name</Label>
              <Input id="name" placeholder="Type your shop name" />
            </div>
          </div>
        </div> */}
        <ShopFormPage
          user={user}
          onSuccess={() => setShowNewTeamDialog(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
