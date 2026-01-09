"use client";

import { useFilterStore } from "@/store/useFilterStore";
import { useUserStore } from "@/store/useUserStore";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Filter, Pencil, Search, User } from "lucide-react";
import { ActionButton } from "./ui/action-button";

export function FilterBar() {
  const filteredUsers = useUserStore((state) => state.filteredUsers);

  return (
    <div className="flex items-center justify-between  border-slate-200 bg-white">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-900">
            {filteredUsers.length.toLocaleString()}
          </span>
          <p className="text-xs text-slate-900 font-medium whitespace-nowrap">
            Users with profiles
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 text-slate-500">
        <ActionButton
          icon={<Filter className="h-3.5 w-3.5" />}
          label="Hide Filter"
        />
        <ActionButton
          icon={<Pencil className="h-3.5 w-3.5" />}
          label="Edit Columns"
        />
        <ActionButton
          icon={<User className="h-3.5 w-3.5" />}
          label="Add/Edit Profile"
        />
        <div className="h-4 w-px bg-slate-200 mx-1" />
        <ActionButton
          icon={<Search className="h-3.5 w-3.5" />}
          label="Search Profiles"
        />
      </div>
    </div>
  );
}
