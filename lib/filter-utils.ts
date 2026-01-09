import { User } from "@/types/user";
import { RuleType } from "react-querybuilder";

export const matchRule = (user: User, rule: RuleType): boolean => {
  const { field, operator, value } = rule;
  const userValue = user[field as keyof User];

  if (operator === "isSet") {
    return userValue !== undefined && userValue !== null && userValue !== "";
  }

  if (value === undefined || value === "" || value === null) return true;

  const uVal = String(userValue).toLowerCase();
  const rVal = String(value).toLowerCase();

  switch (operator) {
    case "=":
      return uVal === rVal;
    case "!=":
      return uVal !== rVal;
    case "contains":
      return uVal.includes(rVal);
    case "doesNotContain":
      return !uVal.includes(rVal);
    default:
      return true;
  }
};
