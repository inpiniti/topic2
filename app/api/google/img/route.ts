import { NextRequest, NextResponse } from 'next/server';
import { load } from 'cheerio';
import iconv from 'iconv-lite';

import cookies from '../cookies.json';

export async function GET(request: NextRequest) {
  try {
    const word = request.nextUrl.searchParams.get('word');

    const results = await fetchWithCookies(String(word));

    if (results.length === 0) {
      return NextResponse.json(
        { error: 'Unknown error occurred' },
        { status: 500 }
      );
    }
    return NextResponse.json(results);

    return new NextResponse(decodedHtml, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }, // 적절한 charset 설정
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error(error);
      return NextResponse.json(
        { error: 'Unknown error occurred' },
        { status: 500 }
      );
    }
  }
}

const usedCookies = new Set<string>();

const fetchWithCookies = async (word: string) => {
  while (usedCookies.size < cookies.length) {
    const query = {
      q: String(word),
      udm: '2',
      biw: '706',
      bih: '1047',
      uact: '5',
      oq: String(word),
      sclient: 'img',
    };

    const queryString = new URLSearchParams(query).toString();

    const randomCookie = cookies[Math.floor(Math.random() * cookies.length)];
    if (usedCookies.has(randomCookie)) {
      continue;
    }
    usedCookies.add(randomCookie);

    const response = await fetch(
      `https://www.google.com/search?${queryString}`,
      {
        headers: {
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'accept-language': 'ko-KR,ko;q=0.9',
          'sec-ch-prefers-color-scheme': 'light',
          'sec-ch-ua':
            '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-arch': '"x86"',
          'sec-ch-ua-bitness': '"64"',
          'sec-ch-ua-form-factors': '"Desktop"',
          'sec-ch-ua-full-version': '"131.0.6778.265"',
          'sec-ch-ua-full-version-list':
            '"Google Chrome";v="131.0.6778.265", "Chromium";v="131.0.6778.265", "Not_A Brand";v="24.0.0.0"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-model': '""',
          'sec-ch-ua-platform': '"Windows"',
          'sec-ch-ua-platform-version': '"10.0.0"',
          'sec-ch-ua-wow64': '?0',
          'sec-fetch-dest': 'document',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-user': '?1',
          'upgrade-insecure-requests': '1',
          'x-browser-channel': 'stable',
          'x-browser-copyright':
            'Copyright 2025 Google LLC. All rights reserved.',
          'x-browser-validation': 'Nbt54E7jcg8lQ4EExJrU2ugNG6o=',
          'x-browser-year': '2025',
          cookie: randomCookie,
          Referer: 'https://www.google.com/',
          'Referrer-Policy': 'origin',
        },
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: null,
        method: 'GET',
      }
    );

    const textBuffer = await response.arrayBuffer();
    const decodedHtml = iconv.decode(Buffer.from(textBuffer), 'euc-kr'); // 인코딩 확인 후 변경
    const $ = load(decodedHtml);

    const tobdys = $('tbody tbody').toArray();

    const results = tobdys.map((tobdy) => {
      const element = $(tobdy);
      const href = `https://www.google.com${element.find('a').attr('href')}`;
      const src = element.find('img').attr('src');

      // 두번째 tr > td > a > div > span > span 안애 내용
      const title = element.find('tr:nth-child(2) td a div span span').text();

      // 두번째 tr > td > a > div > 두번쨰 spna > span 안애 내용
      const contents = element
        .find('tr:nth-child(2) td a div span:nth-child(2) span')
        .text();

      return {
        href,
        src,
        title,
        contents,
      };
    });

    return results;
  }
  throw new Error('Unknown error occurred');
};
