"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { parseDate } from "@/utils/parser";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent p-0 font-semibold"
      >
        Name
        <ArrowUpDown className="ml-2" />
      </Button>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent p-0 font-semibold"
      >
        Email
        <ArrowUpDown className="ml-2" />
      </Button>
    ),
  },
  {
    accessorKey: "distinctId",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent p-0 font-semibold "
      >
        Distinct ID
        <ArrowUpDown className="ml-2" />
      </Button>
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
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent p-0 font-semibold"
      >
        Country Code
        <ArrowUpDown className="ml-2" />
      </Button>
    ),
  },
  {
    accessorKey: "region",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent p-0 font-semibold"
      >
        Region
        <ArrowUpDown className="ml-2" />
      </Button>
    ),
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent p-0 font-semibold"
      >
        City
        <ArrowUpDown className="ml-2" />
      </Button>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent p-0 font-semibold"
      >
        Updated At
        <ArrowUpDown className="ml-2" />
      </Button>
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
