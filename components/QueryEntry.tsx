import { useUserStore } from "@/store/useUserStore";
import { Button } from "./ui/button";
import { RuleGroupType } from "react-querybuilder";
import { Plus } from "lucide-react";

export function QueryEntry() {
  const query = useUserStore((state) => state.query);
  const setQuery = useUserStore((state) => state.setQuery);

  const hasFilter = query.rules.length > 0;

  const handleAddGroup = () => {
    setQuery({
      ...query,
      rules: [
        ...query.rules,
        {
          combinator: "and",
          rules: [],
        } as RuleGroupType,
      ],
    });
  };

  const handleClearAll = () => {
    setQuery({ combinator: "and", rules: [] });
  };
  return (
    <div className="flex items-center justify-end gap-2 w-full mt-4 pt-4 border-t border-slate-100">
      {hasFilter && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddGroup}
          className="h-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 gap-1.5 font-semibold"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Group
        </Button>
      )}

      <div className="grow" />

      <Button
        variant="ghost"
        size="sm"
        onClick={handleClearAll}
        className="h-8 text-slate-500 hover:text-red-600 hover:bg-red-50 gap-1.5 font-semibold"
      >
        Clear All
      </Button>

      <Button
        size="sm"
        className="h-8 bg-[#4f46e5] hover:bg-[#4338ca] text-white gap-1.5 font-semibold px-4 shadow-sm transition-all border-none rounded-md"
      >
        Save As
      </Button>
    </div>
  );
}
