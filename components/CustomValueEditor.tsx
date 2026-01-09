import { SearchIcon, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ValueEditorProps } from "react-querybuilder";
import { useState } from "react";
// ... (keep your existing imports)

export const CustomValueEditor = (props: ValueEditorProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Example dynamic values - in a real app, you'd pull these from props.fieldData.values
  const possibleValues = ["London", "New York", "Paris", "Tokyo", "Berlin"];
  const filteredValues = possibleValues.filter((v) =>
    v.toLowerCase().includes(searchValue.toLowerCase())
  );

  // 1. Logic for your Date Picker (Keep this as is)
  if (
    props.fieldData.type === "date" &&
    (props.operator === "last" || props.operator === "notInLast")
  ) {
    // ... your existing date code
  }

  // 2. The "Mixpanel Style" Value Picker
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-indigo-600 font-bold text-sm transition-colors border border-transparent hover:border-indigo-200">
          {props.value || "Select value..."}
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-64 p-0 shadow-2xl border-slate-200"
        align="start"
      >
        <div className="p-2 space-y-2">
          {/* Search Bar inside the Value Picker */}
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              autoFocus
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-8 h-8 bg-slate-50 border-none text-xs"
              placeholder="Filter values..."
            />
          </div>

          {/* Value List */}
          <div className="max-h-48 overflow-y-auto pt-1">
            {filteredValues.map((val) => (
              <button
                key={val}
                onClick={() => {
                  props.handleOnChange(val);
                  setIsOpen(false);
                }}
                className="w-full text-left px-2 py-1.5 text-sm hover:bg-indigo-50 hover:text-indigo-700 rounded-md transition-colors"
              >
                {val}
              </button>
            ))}
            {filteredValues.length === 0 && (
              <div className="p-2 text-xs text-slate-400 text-center italic">
                No values found
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
