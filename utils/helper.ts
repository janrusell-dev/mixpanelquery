import { RuleGroupType, RuleType } from "react-querybuilder";

export function findGroupById(
  rules: (RuleType | RuleGroupType)[],
  groupId: string,
): boolean {
  return rules.some((rule) => {
    if ("rules" in rule) {
      return rule.id === groupId || findGroupById(rule.rules, groupId);
    }
    return false;
  });
}

export function findGroupIndex(
  rules: (RuleType | RuleGroupType)[],
  groupId: string,
): number {
  return rules.findIndex((rule) => "id" in rule && rule.id === groupId);
}
