import Link from "next/link";
import { ReactNode } from "react";

const Detail = () => {
  return (
    <Wrapper>
      <Back />
      <Title>Detail</Title>
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
  return (
    <div className="shrink-0">
      <div className="text-blue-400 px-4 pt-4">
        <Link href="/topic">〈 뒤로</Link>
      </div>
    </div>
  );
};

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <div className="shrink-0 flex justify-between p-4 border-b border-zinc-600">
      <div className="text-white font-bold text-5xl">{children}</div>
    </div>
  );
};

const Content = () => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: ``,
      }}
    />
  );
};
