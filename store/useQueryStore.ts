import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { RuleGroupType, RuleType, generateID } from "react-querybuilder";
import { QueryStore } from "@/types/query";

function addGroupToTree(
  rules: (RuleType | RuleGroupType)[],
  targetGroupId: string | null,
): (RuleType | RuleGroupType)[] {
  if (!targetGroupId) {
    return [
      ...rules,
      {
        id: generateID(),
        combinator: "and",
        rules: [],
      },
    ];
  }

  return rules.map((rule) => {
    if ("rules" in rule && rule.id === targetGroupId) {
      return {
        ...rule,
        rules: [
          ...rule.rules,
          {
            id: generateID(),
            combinator: "and",
            rules: [],
          },
        ],
      };
    }
    if ("rules" in rule) {
      return {
        ...rule,
        rules: addGroupToTree(rule.rules, targetGroupId),
      };
    }
    return rule;
  });
}

function addRuleToTree(
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

export const useQueryStore = create<QueryStore>()(
  devtools((set, get) => ({
    query: { combinator: "and", rules: [] },

    setQuery: (newQuery) => set({ query: newQuery }),

    addRule: (rule, targetGroupId = null) =>
      set((state) => {
        // If no target, add to root rules
        if (!targetGroupId) {
          return {
            query: {
              ...state.query,
              rules: [...state.query.rules, rule],
            },
          };
        }

        // If there is a target, use the recursive helper
        return {
          query: {
            ...state.query,
            rules: addRuleToTree(state.query.rules, targetGroupId, rule),
          },
        };
      }),

    updateRule: (ruleId, updates) =>
      set((state) => ({
        query: {
          ...state.query,
          rules: state.query.rules.map((rule) =>
            "id" in rule && rule.id === ruleId ? { ...rule, ...updates } : rule,
          ),
        },
      })),

    duplicateRule: (rule) =>
      set((state) => ({
        query: {
          ...state.query,
          rules: [
            ...state.query.rules,
            {
              ...rule,
              id: generateID(),
            },
          ],
        },
      })),

    addGroup: (parentGroupId = null) =>
      set((state) => {
        const newGroupId = generateID();
        const newGroup = {
          id: newGroupId,
          combinator: "and" as const,
          rules: [],
        };

        if (!parentGroupId) {
          return {
            query: {
              ...state.query,
              rules: [...state.query.rules, newGroup],
            },
            lastCreatedGroupId: newGroupId, // Store it
          };
        }

        return {
          query: {
            ...state.query,
            rules: addGroupToTree(state.query.rules, parentGroupId),
          },
          lastCreatedGroupId: newGroupId,
        };
      }),

    lastCreatedGroupId: null as string | null,

    clearQuery: () =>
      set({
        query: { combinator: "and", rules: [] },
      }),
  })),
);
