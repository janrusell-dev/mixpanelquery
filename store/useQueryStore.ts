import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { RuleGroupType, RuleType, generateID } from "react-querybuilder";
import { QueryStore } from "@/types/query";
import {
  addGroupToTree,
  addRuleToTree,
  findGroupById,
} from "@/utils/queryTree";

// Root query group used as initial state
const initialQuery: RuleGroupType = {
  id: "root-group",
  combinator: "and",
  rules: [],
};

// Global store for query builder state and actions
export const useQueryStore = create<QueryStore>()(
  devtools((set, get) => ({
    query: initialQuery,

    // Replaces entire query (used for resets or imports)
    setQuery: (newQuery) => set({ query: newQuery }),

    // Adds a rule to a target group (or active group / root)
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

    // Creates a copy of a rule with a new ID
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
    // Adds a new group under a parent group or root
    addGroup: (parentGroupId: string | null = null) => {
      const newGroupId = generateID();
      const newGroup: RuleGroupType = {
        id: newGroupId,
        combinator: "and",
        rules: [],
        not: false,
      };

      set((state) => {
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

    // Resets query to initial empty state
    clearQuery: () =>
      set({
        query: initialQuery,
      }),
  })),
);
