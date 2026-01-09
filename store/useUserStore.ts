import { dummyUsers } from "@/lib/dummy-data";
import { matchRule } from "@/lib/filter-utils";
import { UserStore } from "@/types/user";
import { RuleType } from "react-querybuilder";
import { create } from "zustand";

export const useUserStore = create<UserStore>((set) => ({
  query: { combinator: "", rules: [] },
  filteredUsers: dummyUsers,
  setQuery: (newQuery) => {
    const filtered = dummyUsers.filter((user) => {
      if (newQuery.rules.length === 0) return true;

      const method = newQuery.combinator === "and" ? "every" : "some";

      // using RuleType to access .field and .operator safely
      return newQuery.rules[method]((ruleOrGroup) => {
        const rule = ruleOrGroup as RuleType;
        return matchRule(user, rule);
      });
    });

    set({ query: newQuery, filteredUsers: filtered });
  },
}));
