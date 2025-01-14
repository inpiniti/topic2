import dayjs from 'dayjs';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useDayStore = create<{
  day: string | null;
  setDay: (day: string) => void;
}>()(
  devtools(
    persist(
      (set) => ({
        day: dayjs().format('YYYY-MM-DD'),
        setDay: (day: string) =>
          set({
            day,
          }),
      }),
      {
        name: 'day-storage', // unique name for the storage
      }
    ),
    {
      name: 'day',
    }
  )
);
