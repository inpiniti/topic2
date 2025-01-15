'use client';

import { useTopicStore } from '@/store/useTopicStore';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import dayjs from 'dayjs';
import { useDayStore } from '@/store/useDayStore';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper>
        <DateChange />
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
  const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
  const today = dayjs();
  const [startOfWeek, setStartOfWeek] = useState(today.startOf('week'));
  const { day, setDay } = useDayStore();

  const handleDayClick = (date: string) => {
    if (dayjs(date).isAfter(today, 'day'))
      return alert('미래의 날짜는 선택 불가능합니다.');
    setDay(date);
  };

  const handlePrev = () => {
    const prevWeek = startOfWeek.subtract(1, 'week');
    setStartOfWeek(prevWeek);
    setDay(prevWeek.add(today.day(), 'day').format('YYYY-MM-DD'));
  };

  const handleNext = () => {
    if (startOfWeek.add(1, 'week').isAfter(today, 'day'))
      return alert('미래의 날짜는 선택 불가능합니다.');
    const nextWeek = startOfWeek.add(1, 'week');
    setStartOfWeek(nextWeek);
    setDay(nextWeek.add(today.day(), 'day').format('YYYY-MM-DD'));
  };

  return (
    <div className="shrink-0 px-4 pt-2 pb-1 flex flex-col text-white items-center">
      <div>{dayjs(day).format('YYYY.MM')}</div>
      <div className="flex justify-between items-center w-full">
        <span
          className="text-white cursor-pointer px-2 py-1 hover:bg-zinc-800 rounded-xl"
          onClick={handlePrev}
        >
          {'〈'}
        </span>
        {daysOfWeek.map((_day, index) => {
          const date = startOfWeek.add(index, 'day').format('DD');
          const fullDate = startOfWeek.add(index, 'day').format('YYYY-MM-DD');
          return (
            <div
              key={index}
              className={`text-white cursor-pointer px-2 py-1 rounded-xl ${
                day === fullDate
                  ? 'bg-blue-400 font-bold hover:bg-blue-500'
                  : 'hover:bg-zinc-800'
              }`}
              onClick={() => handleDayClick(fullDate)}
            >
              <div
                className={`font-thin ${
                  day === fullDate ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {date}
              </div>
              <div>{_day}</div>
            </div>
          );
        })}
        <span
          className="text-white cursor-pointer px-2 py-1 hover:bg-zinc-800 rounded-xl"
          onClick={handleNext}
        >
          {'〉'}
        </span>
      </div>
    </div>
  );
};

const List = () => {
  const router = useRouter();
  const { topic, setTopic } = useTopicStore();
  const { day } = useDayStore();

  const payload = dayjs(day).isSame(dayjs(), 'day')
    ? 'realtime'
    : `daily&date=${day}`;

  const { isPending, error, data } = useQuery({
    queryKey: ['repoData', day],
    queryFn: () =>
      fetch(`/api/google/topics?range=${payload}`).then((res) => res.json()),
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
                className={`p-2 hover:text-blue-400 hover:bg-zinc-800 cursor-pointer
                  ${
                    topic === item.topic
                      ? 'text-blue-300 bg-zinc-800 font-bold'
                      : 'text-white'
                  }`}
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
