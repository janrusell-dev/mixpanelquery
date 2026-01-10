import { isValid, parseISO } from "date-fns";

// Parse a single date string to Date object
export function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const parsed = parseISO(dateStr);
  return isValid(parsed) ? parsed : null;
}

// Parse date range from "yyyy-MM-dd to yyyy-MM-dd" format
export function parseDateRange(
  rangeStr: string
): { from: Date; to: Date } | null {
  if (!rangeStr) return null;

  // Check if it's a range (contains " to ")
  if (rangeStr.includes(" to ")) {
    const [fromStr, toStr] = rangeStr.split(" to ");
    const from = parseDate(fromStr.trim());
    const to = parseDate(toStr.trim());

    if (from && to) {
      return { from, to };
    }
  }

  // Single date - treat as same day range
  const singleDate = parseDate(rangeStr);
  if (singleDate) {
    return { from: singleDate, to: singleDate };
  }

  return null;
}

// Check if a date string falls within a date range
export function isDateInRange(dateStr: string, rangeStr: string): boolean {
  const date = parseDate(dateStr);
  if (!date) return false;

  const range = parseDateRange(rangeStr);
  if (!range) return false;

  const timestamp = date.getTime();
  const fromTime = range.from.getTime();
  const toTime = range.to.getTime();

  return timestamp >= fromTime && timestamp <= toTime;
}
