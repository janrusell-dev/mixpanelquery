import { create } from "zustand";
import { RuleGroupType, RuleType } from "react-querybuilder";
import { User, UserStore } from "@/types/user";
import { dummyUsers } from "@/lib/dummy-data";
import { isDateInRange } from "@/utils/parser";

export const useUserStore = create<UserStore>((set, get) => ({
  query: { combinator: "and", rules: [] },
  filteredUsers: dummyUsers,

  setQuery: (newQuery: RuleGroupType) => {
    set({ query: newQuery });

    // Filter users based on the new query
    let filtered = [...dummyUsers];

    newQuery.rules.forEach((rule) => {
      // Skip if it's a group, not a rule
      if (!("field" in rule)) return;

      const { field, value } = rule as RuleType;
      if (!value) return;

      if (field === "updatedAt") {
        filtered = filtered.filter((user) =>
          isDateInRange(user.updatedAt, value as string)
        );
      }
      // REGULAR FIELD FILTERING (country, region, city, etc.)
      else {
        const values = (value as string).split(", ");
        filtered = filtered.filter((user) =>
          values.includes(user[field as keyof User] as string)
        );
      }
    });

    set({ filteredUsers: filtered });
  },
}));
