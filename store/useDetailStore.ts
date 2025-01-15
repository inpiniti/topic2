import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useDetailStore = create<{
  detail: DetailItem | null;
  setDetail: (detail: DetailItem) => void;
}>()(
  devtools(
    (set) => ({
      detail: {},
      setDetail: (detail: DetailItem) =>
        set({
          detail,
        }),
    }),
    {
      name: "detail",
    }
  )
);

export interface DetailItem {
  src: string;
  title: string;
  contents: string;
  date?: string;
  href: string;
}
