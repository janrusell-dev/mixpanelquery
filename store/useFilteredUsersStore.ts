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

// Store for users filtered by the active query builder rules
export const useFilteredUsersStore = create<FilteredUsersStore>((set) => ({
  filteredUsers: dummyUsers,
  isLoading: false,

  // Applies query rules to users and updates filtered list
  filterUsers: () => {
    set({ isLoading: true });
    setTimeout(() => {
      const query = useQueryStore.getState().query;
      let filtered = [...dummyUsers];

      if (query.rules.length > 0) {
        filtered = filtered.filter((user) => {
          return matchRule(user, query);
        });
      }

      set({ filteredUsers: filtered, isLoading: false });
    }, 500);
  },
}));

// Re-run filtering whenever the query store changes
useQueryStore.subscribe(() => {
  useFilteredUsersStore.getState().filterUsers();
});
