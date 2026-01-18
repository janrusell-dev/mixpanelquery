import { User } from "@/types/user";
import {
  isRuleOrGroupValid,
  RuleGroupType,
  RuleType,
} from "react-querybuilder";
import { parseDate } from "./parser";

export const matchRule = (
  user: User,
  ruleOrGroup: RuleType | RuleGroupType
): boolean => {
  if ("rules" in ruleOrGroup) {
    return ruleOrGroup.rules.every((r) => matchRule(user, r));
  }

  if (!("field" in ruleOrGroup)) return true;

  const { field, operator, value } = ruleOrGroup;
  const userValue = user[field as keyof User];

  // --- normalize user value ---
  const uVal =
    userValue !== null && userValue !== undefined ? String(userValue) : "";

  // --- normalize rule value ---
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
        uVal.toLowerCase().includes(rVal.toLowerCase())
      );
    case "doesNotContain":
      return rVals.every(
        (rVal) => !uVal.toLowerCase().includes(rVal.toLowerCase())
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
        const pastDate = new Date();
        pastDate.setDate(today.getDate() - nDays);
        return date >= pastDate && date <= today;

      case "notInLast":
        const days = parseInt(rVals[0] ?? "", 10);
        if (isNaN(days)) return false;
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        return date < cutoff;

      case "between":
        if (val1 && val2) return date >= val1 && date <= val2;
        return false;

      case "notBetween":
        if (val1 && val2) return date < val1 || date > val2;
        return false;

      case "on":
        return val1 ? date.toDateString() === val1.toDateString() : false;

      case "notOn":
        return val1 ? date.toDateString() !== val1.toDateString() : false;

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
        const future = new Date();
        future.setDate(future.getDate() + nextDays);
        return date <= future && date >= new Date();
    }
  }

  return false;
};
