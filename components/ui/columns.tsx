"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user";
import { GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { parseDate } from "@/utils/parser";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="flex items-center gap-1">
        <GripVertical className="h-3.5 w-3.5 text-gray-400 cursor-move opacity-0 group-hover:opacity-100 transition-opacity" />
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-semibold group"
        >
          Name
          <div className="ml-1.5 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-4 border-b-gray-400 mb-px"></div>
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-4 border-t-gray-400"></div>
          </div>
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <div className="flex items-center gap-1">
        <GripVertical className="h-3.5 w-3.5 text-gray-400 cursor-move opacity-0 group-hover:opacity-100 transition-opacity" />
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-semibold group"
        >
          Email
          <div className="ml-1.5 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-4 border-b-gray-400 mb-px"></div>
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-4 border-t-gray-400"></div>
          </div>
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "distinctId",
    header: ({ column }) => (
      <div className="flex items-center gap-1">
        <GripVertical className="h-3.5 w-3.5 text-gray-400 cursor-move opacity-0 group-hover:opacity-100 transition-opacity" />
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-semibold group"
        >
          Distinct ID
          <div className="ml-1.5 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-4 border-b-gray-400 mb-px"></div>
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-4 border-t-gray-400"></div>
          </div>
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const id = row.getValue("distinctId") as string;
      return (
        <span className="text-indigo-600 font-medium hover:text-indigo-800 hover:underline cursor-pointer transition-colors tabular-nums">
          {id}
        </span>
      );
    },
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <div className="flex items-center gap-1">
        <GripVertical className="h-3.5 w-3.5 text-gray-400 cursor-move opacity-0 group-hover:opacity-100 transition-opacity" />
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-semibold group"
        >
          Country Code
          <div className="ml-1.5 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-4 border-b-gray-400 mb-px"></div>
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-4 border-t-gray-400"></div>
          </div>
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "region",
    header: ({ column }) => (
      <div className="flex items-center gap-1">
        <GripVertical className="h-3.5 w-3.5 text-gray-400 cursor-move opacity-0 group-hover:opacity-100 transition-opacity" />
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-semibold group"
        >
          Region
          <div className="ml-1.5 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-4 border-b-gray-400 mb-px"></div>
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-4 border-t-gray-400"></div>
          </div>
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <div className="flex items-center gap-1">
        <GripVertical className="h-3.5 w-3.5 text-gray-400 cursor-move opacity-0 group-hover:opacity-100 transition-opacity" />
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-semibold group"
        >
          City
          <div className="ml-1.5 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-4 border-b-gray-400 mb-px"></div>
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-4 border-t-gray-400"></div>
          </div>
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <div className="flex items-center gap-1">
        <GripVertical className="h-3.5 w-3.5 text-gray-400 cursor-move opacity-0 group-hover:opacity-100 transition-opacity" />
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-semibold group"
        >
          Updated At
          <div className="ml-1.5 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-4 border-b-gray-400 mb-px"></div>
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-4 border-t-gray-400"></div>
          </div>
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const dateStr = row.getValue("updatedAt") as string;
      const parsedDate = parseDate(dateStr);

      if (!parsedDate) return <span className="text-slate-400">-</span>;

      // format to standard date
      const formatted = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(parsedDate);

      return (
        <span className="text-slate-600 font-medium tabular-nums">
          {formatted}
        </span>
      );
    },
  },
];
