'use client';

import { useTopicStore } from '@/store/useTopicStore';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper>
        <DateChange />
        <Title />
        <List />
      </Wrapper>
    </QueryClientProvider>
  );
}

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-black h-svh overflow-hidden flex flex-col">
      {children}
    </div>
  );
};

const DateChange = () => {
  return (
    <div className="shrink-0 px-2 pt-2 pb-1 flex justify-between">
      <div className="text-blue-400 cursor-pointer">〈 PREV</div>
      <div className="text-blue-400 cursor-pointer">NEXT 〉</div>
    </div>
  );
};

const Title = () => {
  return (
    <div className="shrink-0 px-2 pb-2 flex justify-between">
      <div className="text-white font-bold text-2xl">
        {new Date().toISOString().split('T')[0]}
      </div>
    </div>
  );
};

const List = () => {
  const router = useRouter();
  const { setTopic } = useTopicStore();
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('/api/google/topics?range=realtime').then((res) => res.json()),
    staleTime: 3600000, // 1 hour in milliseconds
  });

  const handleItemClick = (topic: string) => {
    setTopic(topic);
    router.push('/topic');
  };

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="grow overflow-hidden h-full p-2 overflow-y-scroll no-scrollbar">
      <div className="divide-y divide-zinc-800 rounded-2xl bg-zinc-900 overflow-hidden">
        {data.map(
          (item: { topic: string; relatedTopics: string[] }, index: number) => (
            <div key={index}>
              <p
                className="text-white p-2 hover:text-blue-400 hover:bg-zinc-800 cursor-pointer"
                onClick={() => handleItemClick(item.topic)}
              >
                <span className="text-blue-400">{index + 1}. </span>
                {item.topic}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
