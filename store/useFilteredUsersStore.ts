import { create } from "zustand";
import { User } from "@/types/user";
import { dummyUsers } from "@/lib/dummy-data";
import { useQueryStore } from "./useQueryStore";
import { matchRule } from "@/utils/filter-utils";

interface FilteredUsersStore {
  filteredUsers: User[];
  isLoading: boolean;
  filterUsers: () => void;
}

export const useFilteredUsersStore = create<FilteredUsersStore>((set) => ({
  filteredUsers: dummyUsers,
  isLoading: false,

  filterUsers: () => {
    set({ isLoading: true });
    setTimeout(() => {
      const query = useQueryStore.getState().query;
      let filtered = [...dummyUsers];

      if (query.rules.length > 0) {
        filtered = filtered.filter((user) => {
          return query.rules.every((rule) => {
            if ("field" in rule && "value" in rule) {
              const ruleValue = rule.value;
              if (
                !ruleValue ||
                ruleValue === "" ||
                ruleValue === "Select value..."
              ) {
                return true;
              }
            }

            return matchRule(user, rule);
          });
        });
      }

      set({ filteredUsers: filtered, isLoading: false });
    }, 500);
  },
}));

useQueryStore.subscribe(() => {
  useFilteredUsersStore.getState().filterUsers();
});
