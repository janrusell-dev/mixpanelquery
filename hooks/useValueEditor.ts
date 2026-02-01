import { dummyUsers } from "@/lib/dummy-data";
import { differenceInDays, format, subDays } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { ValueEditorProps } from "react-querybuilder";

// Manages value editor state for QueryBuilder (dates, multi-select, presets)
export function useValueEditorStore(
  props: ValueEditorProps,
  lastAddedRuleId: string | null,
  resetLastAddedRule: () => void,
) {
  const [open, setOpen] = useState(false);
  const operator = props.rule?.operator;

  const isDateField = useMemo(() => {
    return props.field === "updatedAt" || props.fieldData?.datatype === "date";
  }, [props.field, props.fieldData]);

  // Auto-open editor when a rule is newly added
  useEffect(() => {
    if (lastAddedRuleId && props.rule?.id === lastAddedRuleId) {
      if (!isDateField) {
        setOpen(true);
      }
      resetLastAddedRule();
    }
  }, [lastAddedRuleId, props.rule?.id, resetLastAddedRule]);

  const isDaysCountOperator = useMemo(() => {
    return ["last", "notInLast", "beforeLast", "inNext"].includes(
      operator || "",
    );
  }, [operator]);

  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    if (isDateField) {
      const today = new Date();
      const sevenDaysAgo = subDays(today, 7);
      return { from: sevenDaysAgo, to: today };
    }
    return undefined;
  });

  useEffect(() => {
    if (isDateField && !props.value) {
      if (isDaysCountOperator) {
        // Default to 7 days for "last" operators
        props.handleOnChange("7");
      } else {
        const today = new Date();
        const sevenDaysAgo = subDays(today, 6);
        setDateRange({ from: sevenDaysAgo, to: today });
        props.handleOnChange(
          `${format(sevenDaysAgo, "yyyy-MM-dd")} to ${format(
            today,
            "yyyy-MM-dd",
          )}`,
        );
      }
    }
  }, [isDateField, operator]);

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const applyDateRange = () => {
    if (isDaysCountOperator && dateRange?.from && dateRange?.to) {
      const days = differenceInDays(dateRange.to, dateRange.from) + 1;
      props.handleOnChange(String(days));
    } else if (dateRange?.from && dateRange?.to) {
      props.handleOnChange(
        `${format(dateRange.from, "yyyy-MM-dd")} to ${format(
          dateRange.to,
          "yyyy-MM-dd",
        )}`,
      );
    } else if (dateRange?.from) {
      props.handleOnChange(format(dateRange.from, "yyyy-MM-dd"));
    }
    setOpen(false);
  };

  const cancelDateRange = () => {
    const today = new Date();
    const sevenDaysAgo = subDays(today, 6);
    setDateRange({ from: sevenDaysAgo, to: today });
    setOpen(false);
  };

  const daysInRange = useMemo(() => {
    if (dateRange?.from && dateRange?.to) {
      return differenceInDays(dateRange.to, dateRange.from) + 1;
    }
    return 0;
  }, [dateRange?.from, dateRange?.to]);

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      if (!props.value) {
        setSelectedValues([]);
      } else if (Array.isArray(props.value)) {
        setSelectedValues(props.value);
      } else {
        setSelectedValues(props.value.split(", "));
      }
    }
  }, [open, props.value]);

  // Builds selectable values from dummy data (non-date fields)
  const options = useMemo(() => {
    if (isDateField) return [];

    const fieldKey = props.field as keyof (typeof dummyUsers)[0];
    const uniqueValues = new Set(
      dummyUsers
        .map((user) => user[fieldKey])
        .filter((val) => val !== null && val !== undefined),
    );
    uniqueValues.add("");
    return Array.from(uniqueValues)
      .sort()
      .map((val) => ({
        value: val,
        label: val === "" ? "(empty string)" : val,
      }));
  }, [props.field, isDateField]);

  const toggleValue = (val: string) => {
    setSelectedValues((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );
  };

  const applyValues = () => {
    props.handleOnChange(selectedValues.join(", "));
    setOpen(false);
  };

  // Formats the display label shown in the value editor button
  const displayLabel = useMemo(() => {
    if (isDateField && isDaysCountOperator) {
      const days = props.value || "7";
      return `${days} ${days === "1" ? "day" : "days"}`;
    }
    if (isDateField && dateRange?.from && dateRange?.to) {
      return `${daysInRange} ${daysInRange === 1 ? "day" : "days"}`;
    }

    if (isDateField && dateRange?.from) {
      return format(dateRange.from, "MMM dd, yyyy");
    }
    if (isDateField) {
      return "Select date range...";
    }

    const committed = !props.value
      ? []
      : Array.isArray(props.value)
        ? props.value
        : props.value.split(", ");

    if (committed.length === 0) return "Select value...";
    if (committed.length === 1) {
      return committed[0];
    }
    if (committed.length === 2) {
      return `${committed[0]} or ${committed[1]}`;
    }
    return `${committed[0]}, ${committed[1]} or ${committed.length - 2} more`;
  }, [props.value, isDateField, dateRange, daysInRange]);

  return {
    open,
    setOpen,
    isDateField,
    dateRange,
    setDateRange,
    handleDateRangeSelect,
    applyDateRange,
    cancelDateRange,
    daysInRange,
    selectedValues,
    options,
    toggleValue,
    applyValues,
    displayLabel,
  };
}
