import { useQueryStore } from "@/store/useQueryStore";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useFilterBuilder } from "@/hooks/useFilterBuilder";
export function QueryEntry() {
  const { addGroup, activeGroupId, setActiveGroupId } = useQueryStore();
  const { clearAll, hasFilter } = useFilterBuilder();

  const handleAddGroup = () => {
    const newGroupId = addGroup(activeGroupId);
    if (newGroupId) {
      setActiveGroupId(newGroupId);
    }
  };

  return (
    <div
      className="
      flex flex-col gap-3 w-full mt-4 pt-4
      border-t border-slate-100
      sm:flex-row sm:items-center sm:gap-2
    "
    >
      {hasFilter && (
        <Button
          variant="ghost"
          onClick={handleAddGroup}
          size="sm"
          className="
            h-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50
            gap-1.5 font-semibold
            w-full sm:w-auto
          "
        >
          <Plus className="h-3.5 w-3.5" />
          Group
        </Button>
      )}

      <div className="hidden sm:block sm:grow" />
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className="
            h-8 text-slate-500 hover:text-red-600 hover:bg-red-50
            gap-1.5 font-semibold
            w-full sm:w-auto
          "
        >
          Clear All
        </Button>

        <Button
          size="sm"
          className="
            h-8 bg-[#4f46e5] hover:bg-[#4338ca]
            text-white gap-1.5 font-semibold px-4
            shadow-sm transition-all border-none rounded-md
            w-full sm:w-auto
          "
        >
          Save As
        </Button>
      </div>
    </div>
  );
}
