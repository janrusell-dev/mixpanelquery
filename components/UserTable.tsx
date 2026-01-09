import { useUserStore } from "@/store/useUserStore";
import { useUserTable } from "@/store/useUserTable";
import { User } from "@/types/user";
import { flexRender, SortingState } from "@tanstack/react-table";
import { columns } from "./ui/columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function UserTable() {
  const filteredUsers = useUserStore((state) => state.filteredUsers);

  const { table, selectedUser, setSelectedUser } = useUserTable(
    filteredUsers,
    columns
  );

  return (
    <div>
      <div className="rounded-md border bg-white overflow-auto max-h-87.5 relative">
        <Table className="min-w-max border-separate border-spacing-0">
          <TableHeader className="sticky top-0 bg-white z-10 shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="relative group border-b"
                    style={{ width: header.getSize() }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`absolute right-0 top-0 h-full w-1 cursor-col-resize bg-slate-200 opacity-0 group-hover:opacity-100 ${
                        header.column.getIsResizing()
                          ? "bg-indigo-500 opacity-100"
                          : ""
                      }`}
                    ></div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => setSelectedUser(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="py-4 px-4 whitespace-nowrap text-sm text-slate-600 "
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
