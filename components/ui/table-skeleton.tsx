import { Skeleton } from "./skeleton";
import { TableCell, TableRow } from "./table";

export function TableSkeleton({ columnCount }: { columnCount: number }) {
  return (
    <>
      {Array.from({ length: 10 }).map((_, rowIndex) => (
        <TableRow key={rowIndex} className="hover:bg-transparent">
          {Array.from({ length: columnCount }).map((_, cellIndex) => (
            <TableCell
              key={cellIndex}
              className="relative py-4 px-4 whitespace-nowrap text-sm border-b border-gray-200"
            >
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
