import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useTopicStore = create<{
  topic: string | null;
  setTopic: (topic: string) => void;
}>()(
  devtools(
    persist(
      (set) => ({
        topic: null,
        setTopic: (topic: string) =>
          set({
            topic,
          }),
      }),
      {
        name: "topic",
      }
    ),
    {
      name: "topic",
    }
  )
);
