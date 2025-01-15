import { NextRequest, NextResponse } from "next/server";
import { load } from "cheerio";
import iconv from "iconv-lite";

import cookies from "../cookies.json";

export async function GET(request: NextRequest) {
  try {
    const word = request.nextUrl.searchParams.get("word");

    const query = {
      q: String(word),
      oq: String(word),
      sourceid: "chrome",
      ie: "UTF-8",
    };

    const queryString = new URLSearchParams(query).toString();

    const randomCookie = cookies[Math.floor(Math.random() * cookies.length)];

    const response = await fetch(
      `https://www.google.com/search?${queryString}`,
      {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "ko-KR,ko;q=0.9",
          "sec-ch-prefers-color-scheme": "light",
          "sec-ch-ua":
            '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          "sec-ch-ua-arch": '"x86"',
          "sec-ch-ua-bitness": '"64"',
          "sec-ch-ua-form-factors": '"Desktop"',
          "sec-ch-ua-full-version": '"131.0.6778.265"',
          "sec-ch-ua-full-version-list":
            '"Google Chrome";v="131.0.6778.265", "Chromium";v="131.0.6778.265", "Not_A Brand";v="24.0.0.0"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-model": '""',
          "sec-ch-ua-platform": '"Windows"',
          "sec-ch-ua-platform-version": '"10.0.0"',
          "sec-ch-ua-wow64": "?0",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "x-browser-channel": "stable",
          "x-browser-copyright":
            "Copyright 2025 Google LLC. All rights reserved.",
          "x-browser-validation": "Nbt54E7jcg8lQ4EExJrU2ugNG6o=",
          "x-browser-year": "2025",
          cookie: randomCookie,
          Referer: "https://www.google.com/",
          "Referrer-Policy": "origin",
        },
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
      }
    );

    const textBuffer = await response.arrayBuffer();
    const decodedHtml = iconv.decode(Buffer.from(textBuffer), "euc-kr"); // 인코딩 확인 후 변경
    const $ = load(decodedHtml);

    const divs = $("#main > div:not([class])").toArray();

    console.log(decodedHtml);

    //const filteredDivs = divs.filter((_, index) => ![0, 1, 3].includes(index));

    // JSON 변환
    const results = divs
      .map((div) => {
        const element = $(div);
        const href = `https://www.google.com${element
          .find("div > div > a")
          .attr("href")}`;
        const split = element
          .find("a > div > div > h3 > div")
          .text()
          .trim()
          .split("-");

        const title = split[0] && split[0].trim();
        const site = split[1] && split[1].trim();

        const path = element.find("a > div > div").eq(1).text().trim();
        const date = element
          .find("div > div > div > div > div > div > span")
          .first()
          .text()
          .trim();
        const contents = element
          .find("div > div > div > div > div > div")
          .clone() // 요소 복제
          .find("span") // <span> 태그 찾기
          .remove() // <span> 태그 제거
          .end() // 원래 요소로 돌아가기
          .text() // 텍스트 추출
          .trim();

        const src = element.find("div img").attr("src");

        return {
          href,
          site,
          path,
          title,
          date,
          contents,
          ...(src && { src }),
        };
      })
      .filter((result) => result.title);

    // return new NextResponse(decodedHtml, {
    //   headers: { 'Content-Type': 'text/html; charset=utf-8' }, // 적절한 charset 설정
    // });

    return NextResponse.json(results);

    //   #main >
    //       div 들 중에 class 가 안달려 있는거만 뽑아서
    //   divs 라는 변수에 리스트로 담아줘

    // 위 주석 내용 작성해줘

    // return new NextResponse(decodedHtml, {
    //   headers: { 'Content-Type': 'text/html; charset=utf-8' }, // 적절한 charset 설정
    // });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json([]);
    } else {
      console.error(error);
      return NextResponse.json([]);
    }
  }
}
