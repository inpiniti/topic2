import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useDetailStore = create<{
  detail: string | null;
  setDetail: (detail: string) => void;
}>()(
  devtools(
    (set) => ({
      detail: {},
      setDetail: (detail: string) =>
        set({
          detail,
        }),
    }),
    {
      name: 'detail',
    }
  )
);
