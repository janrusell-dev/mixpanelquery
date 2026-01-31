import { User } from "@/types/user";
import {
  ColumnDef,
  ColumnOrderState,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

export function useUserTable(data: User[], columns: ColumnDef<User>[]) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

  // Sets up react-table with sorting, column order, and selection
  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnOrder },
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
  });

  return { table, selectedUser, setSelectedUser };
}
