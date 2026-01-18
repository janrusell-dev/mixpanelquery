import { ValueEditorProps } from "react-querybuilder";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useValueEditorStore } from "@/hooks/useValueEditor";
import { Calendar } from "./ui/calendar";
import { useFilterBuilder } from "@/hooks/useFilterBuilder";

export function DateRangeEditor(props: ValueEditorProps) {
  const { lastAddedRuleId, resetLastAddedRule } = useFilterBuilder();
  const {
    open,
    setOpen,
    isDateField,
    daysInRange,
    dateRange,
    displayLabel,
    handleDateRangeSelect,
    cancelDateRange,
    applyDateRange,
  } = useValueEditorStore(props, lastAddedRuleId, resetLastAddedRule);
  if (isDateField) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-2 py-2 px-3 bg-gray-100 border border-transparent rounded-sm hover:border-indigo-600 transition-all outline-none">
            <span className="text-xs font-semibold truncate max-w-60 text-indigo-600">
              {displayLabel}
            </span>
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3">
            <div className="mb-3 pb-3 border-b border-slate-200">
              <div className="text-sm font-medium text-slate-700">
                <div className="flex space-x-2">
                  <div className="flex-1 text-slate-600 border border-transparent rounded-md h-10 px-4 bg-gray-100 text-md flex items-center justify-center">
                    <p>{daysInRange}</p>
                  </div>
                  <div className="flex-1 text-slate-600 border border-transparent rounded-md h-10 px-4 bg-gray-100 text-md flex items-center justify-center">
                    <p>days</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-h-75 overflow-y-auto">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={handleDateRangeSelect}
                numberOfMonths={1}
              />
            </div>

            <div className="pt-3 border-t border-slate-200 mt-3 flex gap-2">
              <Button
                className="rounded-md border border-slate-200"
                variant="outline"
                size="sm"
                onClick={cancelDateRange}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-indigo-600 hover:bg-indigo-500"
                onClick={applyDateRange}
              >
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
}
