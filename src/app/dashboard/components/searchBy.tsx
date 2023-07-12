'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

const frameworks = [
  {
    value: 'Id',
    label: 'Id'
  },
  {
    value: 'Name',
    label: 'Name'
  }
];

export function SearchBy() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="md:w-[200px] w-full justify-center hover:bg-black hover:text-white"
        >
          {value
            ? value === 'id'
              ? 'Organization Id'
              : 'Organization Name'
            : 'Serch by'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            <CommandItem
              className="hover:bg-black aria-selected:bg-black aria-selected:text-white hover:text-white hover:cursor-pointer"
              onSelect={() => {
                setValue(value === 'id' ? '' : 'id');
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  'mr-2 h-4 w-4',
                  value === 'id' ? 'opacity-100' : 'opacity-0'
                )}
              />
              Organization Id
            </CommandItem>
            <CommandItem
              className="hover:bg-black aria-selected:bg-black aria-selected:text-white hover:text-white hover:cursor-pointer"
              onSelect={() => {
                setValue(value === 'name' ? '' : 'name');
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  'mr-2 h-4 w-4',
                  value === 'name' ? 'opacity-100' : 'opacity-0'
                )}
              />
              Organization Name
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
