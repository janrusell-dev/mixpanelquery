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
          return matchRule(user, query);
        });
      }

      set({ filteredUsers: filtered, isLoading: false });
    }, 500);
  },
}));

useQueryStore.subscribe(() => {
  useFilteredUsersStore.getState().filterUsers();
});
