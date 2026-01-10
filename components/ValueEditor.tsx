import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Calendar } from "./ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useMemo, useState, useEffect } from "react";
import { dummyUsers } from "@/lib/dummy-data";
import { ValueEditorProps } from "react-querybuilder";
import { format, subDays, differenceInDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

export const ValueEditor = (props: ValueEditorProps) => {
  const [open, setOpen] = useState(false);

  // Detect if field is a date type
  const isDateField = useMemo(() => {
    return props.field === "updatedAt" || props.fieldData?.datatype === "date";
  }, [props.field, props.fieldData]);

  // For date range (default: last 7 days)
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    if (isDateField) {
      const today = new Date();
      const sevenDaysAgo = subDays(today, 7);
      return { from: sevenDaysAgo, to: today };
    }
    return undefined;
  });

  // Auto-set to last 7 days when field is selected
  useEffect(() => {
    if (isDateField && !props.value) {
      const today = new Date();
      const sevenDaysAgo = subDays(today, 7);
      setDateRange({ from: sevenDaysAgo, to: today });
      props.handleOnChange(
        `${format(sevenDaysAgo, "yyyy-MM-dd")} to ${format(
          today,
          "yyyy-MM-dd"
        )}`
      );
    }
  }, [isDateField]);

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      props.handleOnChange(
        `${format(range.from, "yyyy-MM-dd")} to ${format(
          range.to,
          "yyyy-MM-dd"
        )}`
      );
    } else if (range?.from) {
      props.handleOnChange(format(range.from, "yyyy-MM-dd"));
    }
  };

  // Calculate days in range
  const daysInRange = useMemo(() => {
    if (dateRange?.from && dateRange?.to) {
      return differenceInDays(dateRange.to, dateRange.from) + 1;
    }
    return 0;
  }, [dateRange]);

  // For regular fields (existing logic)
  const selectedValues = useMemo(() => {
    if (!props.value) return [];
    if (Array.isArray(props.value)) return props.value;
    return props.value.split(", ");
  }, [props.value]);

  const options = useMemo(() => {
    if (isDateField) return [];

    const fieldKey = props.field as keyof (typeof dummyUsers)[0];
    const uniqueValues = new Set(
      dummyUsers.map((user) => user[fieldKey]).filter(Boolean)
    );
    return Array.from(uniqueValues).sort();
  }, [props.field, isDateField]);

  const toggleValue = (val: string) => {
    const nextValues = selectedValues.includes(val)
      ? selectedValues.filter((v: string) => v !== val)
      : [...selectedValues, val];
    props.handleOnChange(nextValues.join(", "));
  };

  const displayLabel = useMemo(() => {
    if (isDateField && dateRange?.from && dateRange?.to) {
      return `${daysInRange} days`;
    }
    if (isDateField && dateRange?.from) {
      return format(dateRange.from, "MMM dd, yyyy");
    }
    if (isDateField) {
      return "Select date range...";
    }
    if (selectedValues.length === 0) return "Select value...";
    if (selectedValues.length <= 2) return selectedValues.join(", ");
    return `${selectedValues.slice(0, 2).join(", ")} + ${
      selectedValues.length - 2
    } more`;
  }, [selectedValues, isDateField, dateRange, daysInRange]);

  // Render date range picker
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
                onClick={() => {
                  const today = new Date();
                  const sevenDaysAgo = subDays(today, 7);
                  setDateRange({ from: sevenDaysAgo, to: today });
                  props.handleOnChange(
                    `${format(sevenDaysAgo, "yyyy-MM-dd")} to ${format(
                      today,
                      "yyyy-MM-dd"
                    )}`
                  );
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-indigo-600 hover:bg-indigo-500"
                onClick={() => setOpen(false)}
              >
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
                  key={option}
                  onSelect={() => toggleValue(option)}
                  className="flex items-center gap-2 px-2 py-2 cursor-pointer"
                >
                  <Checkbox
                    checked={selectedValues.includes(option)}
                    onCheckedChange={() => toggleValue(option)}
                    className="pointer-events-none hover:border-indigo-600 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-transparent data-[state=checked]:text-white"
                  />
                  <span className="text-sm font-medium text-slate-700 hover:text-indigo-600">
                    {option}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          <div className="p-2 border-t border-slate-100">
            <Button
              size="lg"
              className="w-full bg-indigo-600 hover:bg-indigo-500"
              onClick={() => setOpen(false)}
            >
              Add
            </Button>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
