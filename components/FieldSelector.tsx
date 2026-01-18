import { ChevronRight, User } from "lucide-react";

import { FieldSelectorProps } from "react-querybuilder";
import { FilterMenu } from "./FilterMenu";
import { Button } from "./ui/button";
import { useQueryStore } from "@/store/useQueryStore";

export function FieldSelector({
  options,
  value,
  path,
  handleOnChange,
}: FieldSelectorProps) {
  const isFirstInGroup = path[path.length - 1] === 0;
  const isFirstRuleEver = path.length === 1 && path[0] === 0;
  const query = useQueryStore((state) => state.query);
  const selectedOption = options.find(
    (o) => "name" in o && o.name === value,
  ) as { name: string; label: string } | undefined;
  const combinator = "and";
  return (
    <div className="flex items-center gap-2 text-slate-500 mr-2">
      <span className="text-sm font-bold text-gray-400 w-10">
        {isFirstRuleEver && (
          <span className="text-sm font-black text-slate-400 w-12 uppercase tracking-tight">
            where
          </span>
        )}
      </span>

      <FilterMenu
        onSelectOverride={(newName) => handleOnChange(newName)}
        trigger={
          <Button
            variant={"secondary"}
            className="flex items-center px-2 py-2 bg-gray-100 border border-transparent hover:border-indigo-600"
          >
            <div className="p-1 rounded">
              <User className="h-3 w-3 text-slate-900" />
            </div>
            <div className="font-semibold text-[11px]">User</div>
            <ChevronRight className="h-3 w-3 text-indigo-300" />
            <span className="font-bold text-slate-900 text-sm">
              {(selectedOption as any)?.label || value}
            </span>
          </Button>
        }
      />
    </div>
  );
}
