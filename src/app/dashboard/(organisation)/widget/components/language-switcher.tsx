'use client';

import { Button } from '@/components/ui/Button';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export function LanguageSwitcher() {
  const [selected, setSelected] = useState('english');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-52 justify-evenly hover:bg-primary"
        >
          Language
          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuRadioGroup value={selected} onValueChange={setSelected}>
          <DropdownMenuRadioItem
            icon="check"
            className="focus:bg-indigo-100"
            value="russian"
          >
            Russian
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            icon="check"
            className="focus:bg-indigo-100"
            value="english"
          >
            English
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
