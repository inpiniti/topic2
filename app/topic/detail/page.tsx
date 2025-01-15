'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTopicStore } from '@/store/useTopicStore';

const Detail = () => {
  const searchParams = useSearchParams();
  const [item, setItem] = useState<{
    title: string;
    image: string;
    contents: string;
    date: string;
    href: string;
  }>({
    title: '',
    image: '',
    contents: '',
    date: '',
    href: '',
  });

  useEffect(() => {
    const titleParam = searchParams.get('title');
    const imageParam = searchParams.get('image');
    const contentsParam = searchParams.get('contents');
    const dateParam = searchParams.get('date');
    const hrefParam = searchParams.get('href');

    setItem({
      title: decodeURIComponent(String(titleParam)),
      image: decodeURIComponent(String(imageParam)),
      contents: decodeURIComponent(String(contentsParam)),
      date: decodeURIComponent(String(dateParam)),
      href: decodeURIComponent(String(hrefParam)),
    });
  }, [searchParams]);

  return (
    <Wrapper>
      <Back />
      <Title item={item} />
      <Content href={item.href} />
    </Wrapper>
  );
};
export default Detail;

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-black h-svh overflow-hidden flex flex-col">
      {children}
    </div>
  );
};

const Back = () => {
  const { topic } = useTopicStore();

  return (
    <div className="shrink-0">
      <div className="text-blue-400 px-2 pt-2">
        <Link href="/topic">〈 {topic}</Link>
      </div>
    </div>
  );
};

const Title = ({
  item,
}: {
  item: {
    title: string;
    image: string;
    contents: string;
    date: string;
    href: string;
  };
}) => {
  return (
    <div className="shrink-0 flex justify-between p-2 border-b border-zinc-600 gap-2">
      {item.image !== 'null' && (
        <img src={item.image} className="rounded-2xl" />
      )}
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="text-white font-bold text-xl">{item.title}</div>
          {item.date !== 'null' && (
            <div className="text-white text-sm">{item.date}</div>
          )}
        </div>
        <div className="text-white text-sm">{item.contents}</div>
      </div>
    </div>
  );
};

const Content = ({ href }: { href: string }) => {
  return (
    <div className="w-full h-full bg-white">
      <iframe
        src={href}
        className="w-full h-full border-none"
        title="Detail Content"
      />
    </div>
  );
};
