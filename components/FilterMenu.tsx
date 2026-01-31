import { Plus, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { useQueryBuilder } from "@/hooks/useQueryBuilder";
import { useQueryStore } from "@/store/useQueryStore";
import { useFilterMenu } from "@/hooks/useFilterMenu";

interface FilterMenuProps {
  onSelectOverride?: (fieldName: string) => void;
  trigger?: React.ReactNode;
  targetGroupId?: string | null;
}

export function FilterMenu({
  onSelectOverride,
  trigger,
  targetGroupId,
}: FilterMenuProps) {
  const { addRuleWithField } = useQueryBuilder();
  const setActiveGroupId = useQueryStore((state) => state.setActiveGroupId);
  const {
    isOpen,
    setIsOpen,
    propertySearch,
    setPropertySearch,
    hoveredProperty,
    filteredProperties,
    setHoveredProperty,
    resetSearch,
  } = useFilterMenu();

  const handleSelect = (fieldName: string) => {
    if (targetGroupId !== undefined) {
      setActiveGroupId(targetGroupId);
    }
    if (onSelectOverride) {
      onSelectOverride(fieldName);
    } else {
      addRuleWithField(fieldName, targetGroupId);
    }

    setIsOpen(false);
    setPropertySearch("");
    resetSearch();
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {trigger || (
          <Button
            variant="ghost"
            className="hover:text-indigo-600 hover:bg-indigo-50 font-semibold gap-1.5"
          >
            <Plus className="h-4 w-4" /> Filter
          </Button>
        )}
      </PopoverTrigger>

      <PopoverContent
        className="w-2xl p-0 shadow-2xl border-slate-200"
        align="start"
      >
        <div className="p-2">
          <div className="relative mb-2">
            <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              value={propertySearch}
              onChange={(e) => setPropertySearch(e.target.value)}
              className="pl-8 h-9 bg-slate-50 border-none text-sm"
              placeholder="Search..."
            />
          </div>
          <div className="flex space-x-2 h-72">
            <div className="w-1/4 bg-transparent border-r  p-2 overflow-y-auto">
              <div className="mb-1 p-1 bg-indigo-100 rounded text-sm">All</div>
              <div className="mb-1 p-1 hover:bg-indigo-50 rounded text-sm">
                User
              </div>
            </div>
            <div className="w-2/4  rounded-md p-2 overflow-y-auto space-y-2 border-r">
              <Button
                className="cursor-pointer w-full hover:bg-indigo-100"
                variant={"ghost"}
              >
                <Plus /> Create New
              </Button>
              <p className="text-xs font-medium text-slate-800">
                All User Properties
              </p>
              {filteredProperties.map((f) => (
                <button
                  key={f.name}
                  onClick={() => handleSelect(f.name)}
                  onMouseEnter={() => setHoveredProperty(f)}
                  onMouseLeave={() => setHoveredProperty(null)}
                  className="w-full text-left px-2 py-2 text-sm hover:bg-indigo-50 hover:text-indigo-700 rounded-md transition-colors"
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="w-1/4  rounded-md p-2 p overflow-y-auto">
              {hoveredProperty ? (
                <div>
                  <h3 className="text-sm font-semibold mb-1">
                    {hoveredProperty.label}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {hoveredProperty.description || "No description available."}
                  </p>
                </div>
              ) : (
                <p className="text-xs py-2 text-slate-400">
                  Hover a property to see its description
                </p>
              )}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
