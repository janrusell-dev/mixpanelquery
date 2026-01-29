"use client";

import { useFilteredUsersStore } from "@/store/useFilteredUsersStore";
import { Button } from "./ui/button";
import { Filter, Pencil, Search, User, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function FilterBar() {
  const filteredUsers = useFilteredUsersStore((state) => state.filteredUsers);

  return (
    <div className="flex items-center justify-between border-slate-200 bg-white">
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-xs sm:text-sm font-bold text-slate-900">
            {filteredUsers.length.toLocaleString()}
          </span>
          <p className="text-xs sm:text-sm text-slate-900 font-medium whitespace-nowrap">
            Users
            <span className="hidden sm:inline"> with profiles</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 text-slate-500">
        <div className="hidden lg:flex items-center gap-1">
          <Button
            variant={"ghost"}
            className="h-8 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 gap-2 font-medium px-2"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden xl:inline">Hide Filter</span>
          </Button>
          <Button
            variant={"ghost"}
            className="h-8 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 gap-2 font-medium px-2"
          >
            <Pencil className="h-4 w-4" />
            <span className="hidden xl:inline">Edit Columns</span>
          </Button>
          <Button
            variant={"ghost"}
            className="h-8 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 gap-2 font-medium px-2"
          >
            <User className="h-4 w-4" />
            <span className="hidden xl:inline">Add/Edit Profile</span>
          </Button>

          <div className="h-4 w-px bg-slate-200 mx-1" />

          <Button
            variant={"ghost"}
            className="h-8 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 gap-2 font-medium px-2"
          >
            <Search className="h-4 w-4" />
            <span className="hidden xl:inline">Search Profiles</span>
          </Button>
        </div>
        <div className="hidden md:flex lg:hidden items-center gap-1">
          <Button
            variant={"ghost"}
            size="icon"
            className="h-8 w-8 text-slate-500 hover:text-indigo-600 hover:bg-slate-50"
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button
            variant={"ghost"}
            size="icon"
            className="h-8 w-8 text-slate-500 hover:text-indigo-600 hover:bg-slate-50"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant={"ghost"}
            size="icon"
            className="h-8 w-8 text-slate-500 hover:text-indigo-600 hover:bg-slate-50"
          >
            <User className="h-4 w-4" />
          </Button>
          <Button
            variant={"ghost"}
            size="icon"
            className="h-8 w-8 text-slate-500 hover:text-indigo-600 hover:bg-slate-50"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                size="icon"
                className="h-8 w-8 text-slate-500 hover:text-indigo-600 hover:bg-slate-50"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <Filter className="h-4 w-4" />
                Hide Filter
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <Pencil className="h-4 w-4" />
                Edit Columns
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                Add/Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <Search className="h-4 w-4" />
                Search Profiles
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
