"use client";

import { create } from "zustand";

const INIT = {
  color: "#333333",
};

interface State {
  color: string;
  setColor: (color: string) => void;
  clearColor: () => void;
}

export const useColor = create<State>((set) => ({
  color: INIT["color"],
  setColor: (color: string) => set((s) => ({ ...s, color })),
  clearColor: () => set((s) => ({ ...s, ...INIT })),
}));

export const selectColor = () => useColor((s) => s.color);
