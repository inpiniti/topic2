import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useSiteStore = create<{
  site: string | null;
  setSite: (site: string) => void;
}>()(
  devtools(
    (set) => ({
      site: "dcinside.com",
      setSite: (site: string) =>
        set({
          site,
        }),
    }),
    {
      name: "site",
    }
  )
);
