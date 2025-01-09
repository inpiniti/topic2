"use client";

import { useSiteStore } from "@/store/useSiteStore";
import { useTopicStore } from "@/store/useTopicStore";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const queryClient = new QueryClient();

const Topic = () => {
  const { topic } = useTopicStore();
  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper>
        <div className="flex flex-col gap-4">
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
      <div className="text-blue-400 px-4 pt-4">
        <Link href="/">〈 뒤로</Link>
      </div>
    </div>
  );
};

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <div className="shrink-0 flex justify-between px-4">
      <div className="text-white font-bold text-5xl">{children}</div>
      <div className="text-white flex bg-zinc-800 h-fit p-1 rounded-xl gap-1 items-center">
        <div className="bg-zinc-600 px-2 py-1 rounded-xl">커뮤니티</div>
        <div className="px-2 py-1 hover:bg-zinc-700 rounded-xl cursor-pointer">
          뉴스
        </div>
      </div>
    </div>
  );
};

const Tab = () => {
  const { site, setSite } = useSiteStore();
  //const [tab, setTab] = useState("디시인사이드");

  const list: { [key: string]: string } = {
    디시인사이드: "dcinside.com",
    에펨코리아: "fmkorea.com",
    더쿠: "theqoo.net",
    인벤: "inven.co.kr",
    "엠팍(엠엘비파크)": "mlbpark.donga.com",
    뽐뿌: "ppomppu.co.kr",
    루리웹: "ruliweb.com",
    "네이트 판": "pann.nate.com",
    아카라이브: "arca.live",
    클리앙: "clien.net",
    "일베 (일간베스트)": "ilbe.com",
    인스티즈: "instiz.net",
    보배드림: "bobaedream.co.kr",
    웃긴대학: "humoruniv.com",
    이토랜드: "etoland.co.kr",
    "82쿡": "82cook.com",
    다모앙: "damoang.net",
    에스엘알클럽: "slrclub.com",
    가생이닷컴: "gasengi.com",
    오르비: "orbi.kr",
    해연갤: "hygall.com",
    오늘의유머: "todayhumor.co.kr",
    힙합엘이: "hiphople.com",
  };

  const handleTabClick = (tab: string) => {
    setSite(list[tab]);
    //setTab(tab);
  };

  return (
    <div className="shrink-0 text-white flex overflow-x-auto whitespace-nowrap no-scrollbar border-b border-zinc-500">
      {Object.keys(list).map((item) => (
        <div
          key={item}
          className={`px-2 ${
            site === list[item]
              ? "font-bold border-b-2 border-white"
              : "font-thin"
          } cursor-pointer`}
          onClick={() => handleTabClick(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

const ImgList = () => {
  const { topic } = useTopicStore();
  const { site } = useSiteStore();
  const { isPending, error, data } = useQuery({
    queryKey: ["img", topic, site],
    queryFn: () =>
      fetch(`/api/google/img?word=${topic} site:${site}`).then((res) =>
        res.json()
      ),
    staleTime: 3600000, // 1 hour in milliseconds
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="shrink-0 flex gap-4 p-4 overflow-x-auto no-scrollbar text-white">
      {data.map(
        (
          item: { src: string; title: string; description: string },
          index: number
        ) => (
          <div key={index}>
            <img
              className="rounded-xl h-36 w-96 object-cover"
              src={item.src}
              alt={item.title}
            />
            <p className="line-clamp-1">{item.title}</p>
            <p className="text-xs text-zinc-400 line-clamp-1">
              {item.description}
            </p>
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
    queryKey: ["search", topic, site],
    queryFn: () =>
      fetch(`/api/google/search?word=${topic} site:${site}`).then((res) =>
        res.json()
      ),
    staleTime: 3600000, // 1 hour in milliseconds
  });

  const handleItemClick = (topic: string) => {
    console.log(topic);
    router.push("/topic/detail");
  };

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="grow overflow-hidden h-full p-4 overflow-y-scroll no-scrollbar">
      <div className="overflow-hidden flex flex-col gap-4">
        {data.map(
          (
            item: {
              title: string;
              image: string;
              contents: string;
              date: string;
            },
            index: number
          ) => (
            <div
              key={index}
              className="relative bg-zinc-800 rounded-xl overflow-hidden group text-white"
              onClick={() => handleItemClick(item.image)}
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
