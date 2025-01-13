import { NextRequest, NextResponse } from "next/server";
import { load } from "cheerio";
import iconv from "iconv-lite";

export async function GET(request: NextRequest) {
  const response = await fetch(
    "https://www.hani.co.kr/arti/society/society_general/1177572.html",
    {
      headers: {
        "sec-ch-ua":
          '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": '"Android"',
        "upgrade-insecure-requests": "1",
        Referer: "https://www.google.com/",
        "Referrer-Policy": "origin",
      },
      body: null,
      method: "GET",
    }
  );

  const textBuffer = await response.arrayBuffer();
  const decodedHtml = iconv.decode(Buffer.from(textBuffer), "utf-8"); // 인코딩 확인 후 변경

  return new NextResponse(decodedHtml, {
    headers: { "Content-Type": "text/html; charset=utf-8" }, // 적절한 charset 설정
  });
}
