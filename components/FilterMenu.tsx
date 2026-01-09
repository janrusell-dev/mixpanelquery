import { Plus, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { useFilterStore } from "@/store/useFilterStore";

export function FilterMenu() {
  const {
    draft,
    setField,
    setPropertySearch,
    propertySearch,
    isOpen,
    setIsOpen,
    filteredProperties,
  } = useFilterStore();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="text-indigo-600 font-semibold gap-1.5"
        >
          <Plus className="h-4 w-4" /> Filter
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-1/2 p-0 shadow-2xl border-slate-200"
        align="start"
      >
        <div className="p-2 space-y-2">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              value={propertySearch}
              onChange={(e) => setPropertySearch(e.target.value)}
              className="pl-8 h-9 bg-slate-50 border-none text-sm"
              placeholder="Search..."
            />
          </div>

          <div className="max-h-75 overflow-y-auto pt-1">
            {filteredProperties.map((f) => (
              <button
                key={f.name}
                onClick={() => setField(f.name)}
                className="w-full text-left px-2 py-2 text-sm hover:bg-indigo-50 hover:text-indigo-700 rounded-md transition-colors"
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
