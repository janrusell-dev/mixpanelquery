"use client";

import { useUserStore } from "@/store/useUserStore";
import { Button } from "./ui/button";
import { Filter, Pencil, Search, User } from "lucide-react";

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
        <Button
          variant={"ghost"}
          className="h-8 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 gap-2 font-medium px-2"
        >
          <Filter /> Hide Filter
        </Button>
        <Button
          variant={"ghost"}
          className="h-8 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 gap-2 font-medium px-2"
        >
          <Pencil />
          Edit Columns
        </Button>
        <Button
          variant={"ghost"}
          className="h-8 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 gap-2 font-medium px-2"
        >
          <User />
          Add/Edit Profile
        </Button>

        <div className="h-4 w-px bg-slate-200 mx-1" />
        <Button
          variant={"ghost"}
          className="h-8 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 gap-2 font-medium px-2"
        >
          <Search />
          Search Profiles
        </Button>
      </div>
    </div>
  );
}
