import { useUserStore } from "@/store/useUserStore";
import { useUserTable } from "@/store/useUserTable";
import { flexRender } from "@tanstack/react-table";
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

  const { table, setSelectedUser } = useUserTable(filteredUsers, columns);

  return (
    <div className="rounded-lg border bg-white overflow-auto max-h-87.5 relative">
      <Table className="min-w-max table-layout-fixed border-separate border-spacing-0">
        <TableHeader className="sticky top-0 bg-gray-100 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className=" group border-b bg-gray-100 sticky top-0 z-20"
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
              className="cursor-pointer hover:bg-gray-100 transition-colors last:[&>td]:border-b-0"
              onClick={() => setSelectedUser(row.original)}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="relative py-4 px-4 whitespace-nowrap text-sm text-slate-600 border-b border-gray-200"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
