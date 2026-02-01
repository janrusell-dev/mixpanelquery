import { useState } from "react";
import { generateID, RuleGroupType, RuleType } from "react-querybuilder";
import { fields } from "@/lib/fields";
import { useQueryStore } from "@/store/useQueryStore";
// Handles query builder logic and syncs rules/groups with the store
export function useQueryBuilder() {
  // Query state from store
  const query = useQueryStore((state) => state.query);

  // Store actions
  const addRuleToStore = useQueryStore((state) => state.addRule);
  const addGroupToStore = useQueryStore((state) => state.addGroup);
  const updateRuleInStore = useQueryStore((state) => state.updateRule);
  const duplicateRuleInStore = useQueryStore((state) => state.duplicateRule);
  const clearQuery = useQueryStore((state) => state.clearQuery);
  const activeGroupId = useQueryStore((state) => state.activeGroupId);

  // UI state
  const lastAddedRuleId = useQueryStore((state) => state.lastAddedRuleId);
  const setLastAddedRuleId = useQueryStore((state) => state.setLastAddedRuleId);

  // Adds a new rule with default operator to a target group
  const addRuleWithField = (
    newFieldname: string,
    targetGroupId?: string | null,
  ) => {
    const config = fields.find((f) => f.name === newFieldname);

    if (!config) return;

    const firstOperator = config.operators?.[0] as { name: string } | undefined;
    const defaultOperator = firstOperator?.name || "contains";

    const groupId = targetGroupId !== undefined ? targetGroupId : activeGroupId;
    const newRuleId = generateID();

    addRuleToStore(
      {
        id: newRuleId,
        field: newFieldname,
        operator: defaultOperator,
        value: "",
      } as RuleType,
      groupId,
    );

    setLastAddedRuleId(newRuleId);
    return newRuleId;
  };

  const resetLastAddedRule = () => {
    setLastAddedRuleId(null);
  };

  // Checks if any rule in a group is incomplete
  const hasIncompleteRules = (group: RuleGroupType): boolean => {
    return group.rules.some((rule) => {
      if ("rules" in rule) {
        return hasIncompleteRules(rule);
      }
      if ("value" in rule) {
        return (
          !rule.value || rule.value === "" || rule.value === "Select value..."
        );
      }
      return false;
    });
  };

  const hasFilter = query.rules.length > 0;

  return {
    lastAddedRuleId,
    resetLastAddedRule,
    activeGroupId,
    hasFilter,
    hasIncompleteRules,
    clearQuery,
    addGroup: addGroupToStore,
    updateRule: updateRuleInStore,
    duplicateRule: duplicateRuleInStore,
    addRuleWithField,
  };
}
