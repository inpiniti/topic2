import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useTopicStore = create<{
  topic: string | null;
  setTopic: (topic: string) => void;
}>()(
  devtools(
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
  )
);
