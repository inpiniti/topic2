'use client';

import { useSiteStore } from '@/store/useSiteStore';
import { useTopicStore } from '@/store/useTopicStore';
import { useTypeStore } from '@/store/useTypeStore';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

const Topic = () => {
  const { topic } = useTopicStore();
  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper>
        <div className="flex flex-col gap-2">
          <Back />
          <Title>{topic}</Title>
          <Tab />
        </div>
        <ImgList />
        <List />
      </Wrapper>
    </QueryClientProvider>
  );
};
export default Topic;

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-black h-svh overflow-hidden flex flex-col">
      {children}
    </div>
  );
};

const Back = () => {
  return (
    <div className="shrink-0">
      <div className="text-blue-400 px-2 pt-2">
        <Link href="/">〈 실시간 검색어</Link>
      </div>
    </div>
  );
};

const Title = ({ children }: { children: ReactNode }) => {
  const { type, setType } = useTypeStore();
  const { setSite } = useSiteStore();

  const communityClass =
    type === 'community' ? 'bg-zinc-600' : 'hover:bg-zinc-700  cursor-pointer';
  const newsClass =
    type === 'news' ? 'bg-zinc-600' : 'hover:bg-zinc-700  cursor-pointer';
  const wikiClass =
    type === 'wiki' ? 'bg-zinc-600' : 'hover:bg-zinc-700  cursor-pointer';

  const handleTypeClick = (type: string) => {
    setType(type);
    switch (type) {
      case 'wiki':
        setSite('namu.wiki');
        break;
      case 'community':
        setSite('dcinside.com');
        break;
      case 'news':
        setSite('joongang.co.kr');
        break;
    }
  };

  return (
    <div className="shrink-0 flex justify-between px-2">
      <div className="text-white font-bold text-2xl">{children}</div>
      <div className="text-white flex bg-zinc-800 h-fit p-1 rounded-xl gap-1 items-center text-xs">
        <div
          className={`px-2 py-1 rounded-xl ${wikiClass}`}
          onClick={() => handleTypeClick('wiki')}
        >
          위키
        </div>
        <div
          className={`px-2 py-1 rounded-xl ${communityClass}`}
          onClick={() => handleTypeClick('community')}
        >
          커뮤니티
        </div>
        <div
          className={`px-2 py-1 rounded-xl ${newsClass}`}
          onClick={() => handleTypeClick('news')}
        >
          뉴스
        </div>
      </div>
    </div>
  );
};

const Tab = () => {
  const { site, setSite } = useSiteStore();
  const { type } = useTypeStore();
  //const [tab, setTab] = useState("디시인사이드");

  const list: { [key: string]: string } = {
    디시인사이드: 'dcinside.com',
    에펨코리아: 'fmkorea.com',
    더쿠: 'theqoo.net',
    인벤: 'inven.co.kr',
    '엠팍(엠엘비파크)': 'mlbpark.donga.com',
    뽐뿌: 'ppomppu.co.kr',
    루리웹: 'ruliweb.com',
    '네이트 판': 'pann.nate.com',
    아카라이브: 'arca.live',
    클리앙: 'clien.net',
    '일베 (일간베스트)': 'ilbe.com',
    인스티즈: 'instiz.net',
    보배드림: 'bobaedream.co.kr',
    웃긴대학: 'humoruniv.com',
    이토랜드: 'etoland.co.kr',
    '82쿡': '82cook.com',
    다모앙: 'damoang.net',
    에스엘알클럽: 'slrclub.com',
    가생이닷컴: 'gasengi.com',
    오르비: 'orbi.kr',
    해연갤: 'hygall.com',
    오늘의유머: 'todayhumor.co.kr',
    힙합엘이: 'hiphople.com',
  };

  const newList: { [key: string]: string } = {
    중앙일보: 'joongang.co.kr',
    세계일보: 'segye.com',
    동아일보: 'donga.com',
    조선일보: 'chosun.com',
    서울신문: 'seoul.co.kr',
    한겨레: 'hani.co.kr',
    문화일보: 'munhwa.com',
    국민일보: 'kmib.co.kr',
    한국일보: 'hankookilbo.com',
    경향신문: 'khan.co.kr',
    연합뉴스: 'yna.co.kr',
    'SBS Biz': 'biz.sbs.co.kr',
    TV조선: 'news.tvchosun.com',
    뉴스1: 'news1.kr',
    한국경제TV: 'wowtv.co.kr',
    채널A: 'ichannela.com',
    MBC: 'imbc.com',
    연합뉴스TV: 'yonhapnewstv.co.kr',
    KBS: 'kbs.co.kr',
    SBS: 'sbs.co.kr',
    YTN: 'ytn.co.kr',
    JTBC: 'jtbc.co.kr',
    MBN: 'mbn.co.kr',
    뉴시스: 'newsis.com',
  };

  const wikiList: { [key: string]: string } = {
    나무위키: 'namu.wiki',
    위키백과: 'wikipedia.org',
  };

  const selectedList =
    type === 'community' ? list : type === 'news' ? newList : wikiList;

  const handleTabClick = (tab: string) => {
    setSite(selectedList[tab]);
    //setTab(tab);
  };

  return (
    <div className="shrink-0 text-white flex overflow-x-auto whitespace-nowrap no-scrollbar border-b border-zinc-500">
      {Object.keys(selectedList).map((item) => (
        <div
          key={item}
          className={`px-2 ${
            site === selectedList[item]
              ? 'font-bold border-b-2 border-blue-400 text-blue-400'
              : 'font-thin'
          } cursor-pointer hover:text-blue-400 hover:border-blue-400 hover:border-b-2`}
          onClick={() => handleTabClick(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

const ImgList = () => {
  const router = useRouter();
  const { topic } = useTopicStore();
  const { site } = useSiteStore();
  const { isPending, error, data } = useQuery({
    queryKey: ['img', topic, site],
    queryFn: () =>
      fetch(`/api/google/img?word=${topic} site:${site}`).then((res) =>
        res.json()
      ),
    staleTime: 3600000, // 1 hour in milliseconds
  });

  const handleClick = (href: string) => {
    router.push(href);
  };

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="shrink-0 flex gap-2 px-2 pt-2 overflow-x-auto no-scrollbar text-white">
      {data.map(
        (
          item: {
            src: string;
            title: string;
            description: string;
            href: string;
          },
          index: number
        ) => (
          <div key={index} className="w-28 h-20 relative">
            <img
              className="rounded-xl w-full h-full object-cover"
              src={item.src}
              alt={item.title}
            />
            <div
              className="w-full h-full bg-black absolute top-0 left-0 bg-opacity-30 cursor-pointer hover:bg-opacity-0"
              onClick={() => handleClick(item.href)}
            />
            <div className="w-24 line-clamp-1 absolute bottom-1 left-2 text-xs text-nowrap text-ellipsis">
              {item.title}
            </div>
            <div className="w-28 h-20"></div>
          </div>
        )
      )}
    </div>
  );
};

const List = () => {
  const router = useRouter();
  const { topic } = useTopicStore();
  const { site } = useSiteStore();
  const { isPending, error, data } = useQuery({
    queryKey: ['search', topic, site],
    queryFn: () =>
      fetch(`/api/google/search?word=${topic} site:${site}`).then((res) =>
        res.json()
      ),
    staleTime: 3600000, // 1 hour in milliseconds
  });

  const handleItemClick = (href: string) => {
    router.push(href);
  };

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="grow overflow-hidden h-full p-2 overflow-y-scroll no-scrollbar">
      <div className="overflow-hidden flex flex-col gap-2">
        {data.map(
          (
            item: {
              title: string;
              image: string;
              contents: string;
              date: string;
              href: string;
            },
            index: number
          ) => (
            <div
              key={index}
              className="relative bg-zinc-800 rounded-xl overflow-hidden group text-white"
              onClick={() => handleItemClick(item.href)}
            >
              <div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="text-white p-2 relative">
                  <p className="font-bold text-blue-400">{item.title}</p>
                  <p className="line-clamp-3">{item.contents}</p>
                  <p className="text-xs text-zinc-400">{item.date}</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
