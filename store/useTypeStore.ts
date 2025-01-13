import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useTypeStore = create<{
  type: string | null;
  setType: (type: string) => void;
}>()(
  devtools(
    (set) => ({
      type: "community",
      setType: (type: string) =>
        set({
          type,
        }),
    }),
    {
      name: "type",
    }
  )
);
