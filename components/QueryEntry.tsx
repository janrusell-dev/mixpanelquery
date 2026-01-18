import { useQueryStore } from "@/store/useQueryStore";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useFilterBuilder } from "@/hooks/useFilterBuilder";
import { useSelectionStore } from "@/store/useSelectionStore";
import { generateID } from "react-querybuilder";
export function QueryEntry() {
  const { addGroup } = useQueryStore();
  const { clearAll, hasFilter, activeGroupId } = useFilterBuilder();
  const setActiveGroupId = useSelectionStore((state) => state.setActiveGroupId);

  const handleAddGroup = () => {
    addGroup(activeGroupId);

    // Get the ID of the group that was just created
    const newGroupId = useQueryStore.getState().lastCreatedGroupId;
    if (newGroupId) {
      setActiveGroupId(newGroupId);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2 w-full mt-4 pt-4 border-t border-slate-100">
      {hasFilter && (
        <>
          <Button
            variant="ghost"
            onClick={handleAddGroup}
            className="h-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 gap-1.5 font-semibold"
            size="sm"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Group
          </Button>
        </>
      )}

      <div className="grow" />

      <Button
        variant="ghost"
        size="sm"
        onClick={clearAll}
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
