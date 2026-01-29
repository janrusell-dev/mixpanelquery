import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { RuleGroupType, RuleType, generateID } from "react-querybuilder";
import { QueryStore } from "@/types/query";
import { findGroupById, findGroupIndex } from "@/utils/helper";

const initialQuery: RuleGroupType = {
  id: "root-group",
  combinator: "and",
  rules: [],
};

function addGroupToTree(
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
    query: initialQuery,

    setQuery: (newQuery) => set({ query: newQuery }),

    addRule: (rule, targetGroupId = null) =>
      set((state) => {
        const groupId = targetGroupId ?? state.activeGroupId;
        if (!groupId) {
          return {
            query: {
              ...state.query,
              rules: [...state.query.rules, rule],
            },
          };
        }

        return {
          query: {
            ...state.query,
            rules: addRuleToTree(state.query.rules, groupId, rule),
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

    addGroup: (parentGroupId: string | null = null) => {
      const newGroupId = generateID();
      const newGroup: RuleGroupType = {
        id: newGroupId,
        combinator: "and",
        rules: [],
        not: false,
      };

      set((state) => {
        // If parentGroupId doesn't exist in tree, add to root
        let validParentId = parentGroupId;
        if (parentGroupId) {
          const groupExists = findGroupById(state.query.rules, parentGroupId);
          if (!groupExists) {
            console.warn(
              `Parent group ${parentGroupId} not found, adding to root`,
            );
            validParentId = null;
          }
        }
        const newRules = !parentGroupId
          ? [...state.query.rules, newGroup]
          : addGroupToTree(state.query.rules, parentGroupId, newGroup);

        return {
          query: { ...state.query, rules: newRules },
          activeGroupId: newGroupId,
        };
      });

      return newGroupId;
    },

    activeGroupId: null as string | null,

    setActiveGroupId: (id: string | null) => set({ activeGroupId: id }),

    clearQuery: () =>
      set({
        query: initialQuery,
      }),
  })),
);
