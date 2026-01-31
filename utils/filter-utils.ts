import { User } from "@/types/user";
import { RuleGroupType, RuleType } from "react-querybuilder";
import { parseDate } from "./parser";
import { isWithinInterval, subDays } from "date-fns";

export const matchRule = (
  user: User,
  ruleOrGroup: RuleType | RuleGroupType,
): boolean => {
  if ("rules" in ruleOrGroup) {
    const { combinator, rules } = ruleOrGroup;

    return combinator === "and"
      ? rules.every((r) => matchRule(user, r))
      : rules.some((r) => matchRule(user, r));
  }

  if (!("field" in ruleOrGroup)) return true;

  const { field, operator, value } = ruleOrGroup;
  const userValue = user[field as keyof User];

  const uVal =
    userValue !== null && userValue !== undefined ? String(userValue) : "";

  let rVals: string[] = [];
  if (Array.isArray(value)) {
    rVals = value.map((v) => String(v).trim()).filter(Boolean);
  } else if (typeof value === "string") {
    rVals = value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  }

  // --- Text operators ---
  switch (operator) {
    case "=":
      return rVals.some((rVal) => uVal === rVal);
    case "!=":
      return rVals.every((rVal) => uVal !== rVal);
    case "contains":
      return rVals.some((rVal) =>
        uVal.toLowerCase().includes(rVal.toLowerCase()),
      );
    case "doesNotContain":
      return rVals.every(
        (rVal) => !uVal.toLowerCase().includes(rVal.toLowerCase()),
      );
    case "isSet":
      return uVal !== "";
    case "isNotSet":
      return uVal === "";
  }

  // --- Date operators ---
  if (field === "updatedAt") {
    const date = parseDate(uVal);
    if (!date) return false;

    const [val1, val2] =
      rVals[0]?.split(" to ").map((v) => parseDate(v.trim())) ?? [];

    switch (operator) {
      case "last":
        const nDays = parseInt(rVals[0] ?? "", 10);
        if (isNaN(nDays)) return false;
        const today = new Date();
        today.setHours(23, 59, 59, 999); // End of today
        const pastDate = subDays(today, nDays);
        pastDate.setHours(0, 0, 0, 0);
        return isWithinInterval(date, { start: pastDate, end: today });

      case "notInLast":
        const days = parseInt(rVals[0] ?? "", 10);
        if (isNaN(days)) return false;
        const cutoff = subDays(new Date(), days);
        cutoff.setHours(0, 0, 0, 0);
        return date < cutoff;

      case "between":
        if (val1 && val2) {
          return isWithinInterval(date, { start: val1, end: val2 });
        }
        return false;

      case "notBetween":
        if (val1 && val2) {
          return !isWithinInterval(date, { start: val1, end: val2 });
        }
        return false;

      case "on":
        if (!val1) return false;
        const userDateStr = date.toISOString().split("T")[0];
        const targetDateStr = val1.toISOString().split("T")[0];
        return userDateStr === targetDateStr;

      case "notOn":
        if (!val1) return false;
        const userDateStr2 = date.toISOString().split("T")[0];
        const targetDateStr2 = val1.toISOString().split("T")[0];
        return userDateStr2 !== targetDateStr2;

      case "before":
        return val1 ? date < val1 : false;

      case "beforeLast":
        const beforeLastDays = parseInt(rVals[0] ?? "", 10);
        if (isNaN(beforeLastDays)) return false;
        const cutoffBefore = new Date();
        cutoffBefore.setDate(cutoffBefore.getDate() - beforeLastDays);
        return date < cutoffBefore;

      case "since":
        return val1 ? date >= val1 : false;

      case "inNext":
        const nextDays = parseInt(rVals[0] ?? "", 10);
        if (isNaN(nextDays)) return false;
        const now = new Date();
        const future = new Date();
        future.setDate(now.getDate() + nextDays);
        return isWithinInterval(date, { start: now, end: future });
    }
  }

  return false;
};
