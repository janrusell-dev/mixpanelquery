import { useQueryBuilder } from "@/hooks/useQueryBuilder";
import { useValueEditorStore } from "@/hooks/useValueEditor";
import { ValueEditorProps } from "react-querybuilder";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Checkbox } from "./ui/checkbox";

export function DefaultValueEditor(props: ValueEditorProps) {
  const { lastAddedRuleId, resetLastAddedRule } = useQueryBuilder();
  const {
    open,
    setOpen,
    displayLabel,
    options,
    toggleValue,
    applyValues,
    selectedValues,
  } = useValueEditorStore(props, lastAddedRuleId, resetLastAddedRule);
  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <button className="flex items-center py-2 px-3 bg-gray-100 border border-transparent rounded-sm hover:border-indigo-600 transition-all outline-none">
          <span className="text-xs font-semibold truncate max-w-50 text-indigo-600">
            {displayLabel}
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-xs p-0 shadow-2xl border-slate-200"
        align="start"
      >
        <Command className="p-2 border border-gray-100">
          <CommandInput placeholder={`Search...`} className="h-9" />
          <CommandList className="max-h-75">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value || "(empty string)"}
                  onSelect={() => toggleValue(option.value)}
                  className="flex items-center gap-2 px-2 py-2 cursor-pointer"
                >
                  <Checkbox
                    checked={selectedValues.includes(option.value)}
                    onCheckedChange={() => toggleValue(option.value)}
                    className="pointer-events-none hover:border-indigo-600 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-transparent data-[state=checked]:text-white"
                  />
                  <span className="text-sm font-medium text-slate-700 hover:text-indigo-600">
                    {option.label}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          <div className="p-2 border-t border-slate-100">
            <Button
              size="lg"
              className="w-full bg-indigo-600 hover:bg-indigo-500"
              onClick={applyValues}
            >
              Add
            </Button>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
