"use client";

import * as React from "react";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
        <div className="mt-2 border-gray-100 border-t px-3 py-2 dark:border-gray-800">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Press <Kbd>Ctrl+K</Kbd> to open commands</span>
            <span>ESC to cancel</span>
          </div>
        </div>
      </Command>
    </CommandDialog>
  );
}
