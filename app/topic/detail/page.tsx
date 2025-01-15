"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useTopicStore } from "@/store/useTopicStore";
import { useDetailStore } from "@/store/useDetailStore";

const Detail = () => {
  return (
    <Wrapper>
      <Back />
      <Title />
      <Content />
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

const Title = () => {
  const { detail } = useDetailStore();

  return (
    <div className="shrink-0 flex justify-between p-2 border-b border-zinc-600 gap-2">
      {detail?.src && <img src={detail?.src} className="rounded-2xl" />}
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="text-white font-bold text-2xl">{detail?.title}</div>
        </div>
        <div className="text-white text-sm">{detail?.contents}</div>
        {detail?.date && (
          <div className="text-zinc-400 text-xs font-thin">{detail?.date}</div>
        )}
      </div>
    </div>
  );
};

const Content = () => {
  const { detail } = useDetailStore();

  return (
    <div className="w-full h-full bg-white">
      <iframe
        src={detail?.href}
        className="w-full h-full border-none"
        title="Detail Content"
      />
    </div>
  );
};
