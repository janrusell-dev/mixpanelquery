import { RuleGroupType, RuleType } from "react-querybuilder";

// Checks if a group with the given ID exists anywhere in the tree
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
// Finds the index of a group at the current level (non-recursive)
export function findGroupIndex(
  rules: (RuleType | RuleGroupType)[],
  groupId: string,
): number {
  return rules.findIndex((rule) => "id" in rule && rule.id === groupId);
}

// Adds a new group to the target group, or to root if no target is provided
export function addGroupToTree(
  rules: (RuleType | RuleGroupType)[],
  targetGroupId: string | null,
  newGroup: RuleGroupType,
): (RuleType | RuleGroupType)[] {
  if (!targetGroupId) {
    return [...rules, newGroup];
  }

  return rules.map((rule) => {
    if ("rules" in rule && rule.id === targetGroupId) {
      return {
        ...rule,
        rules: [...rule.rules, newGroup],
      };
    }
    if ("rules" in rule) {
      return {
        ...rule,
        rules: addGroupToTree(rule.rules, targetGroupId, newGroup),
      };
    }
    return rule;
  });
}

// Adds a rule to a specific group in the tree
export function addRuleToTree(
  rules: (RuleType | RuleGroupType)[],
  targetGroupId: string,
  newRule: RuleType,
): (RuleType | RuleGroupType)[] {
  return rules.map((rule) => {
    if ("rules" in rule && rule.id === targetGroupId) {
      return { ...rule, rules: [...rule.rules, newRule] };
    }
    if ("rules" in rule) {
      return {
        ...rule,
        rules: addRuleToTree(rule.rules, targetGroupId, newRule),
      };
    }
    return rule;
  });
}
