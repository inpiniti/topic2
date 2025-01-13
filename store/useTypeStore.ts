import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useTypeStore = create<{
  type: string | null;
  setType: (type: string) => void;
}>()(
  devtools(
    persist(
      (set) => ({
        type: "community",
        setType: (type: string) =>
          set({
            type,
          }),
      }),
      {
        name: "type-storage", // unique name for the storage
      }
    ),
    {
      name: "type",
    }
  )
);
