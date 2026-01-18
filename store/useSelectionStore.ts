import { create } from "zustand";

interface SelectionStore {
  activeGroupId: string | null;
  setActiveGroupId: (id: string | null) => void;
}

export const useSelectionStore = create<SelectionStore>((set) => ({
  activeGroupId: null,
  setActiveGroupId: (id) => set({ activeGroupId: id }),
}));
