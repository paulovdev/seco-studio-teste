import { create } from "zustand";

export const useLoadingStore = create((set) => ({
  loading: true,
  setLoading: (value) => set({ loading: value }),
}));
