import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useSiteStore = create<{
  site: string | null;
  setSite: (site: string) => void;
}>()(
  devtools(
    persist(
      (set) => ({
        site: "dcinside.com",
        setSite: (site: string) =>
          set({
            site,
          }),
      }),
      {
        name: "site-storage", // unique name for the storage
      }
    ),
    {
      name: "site",
    }
  )
);
