import { NextRequest, NextResponse } from 'next/server';
import { load } from 'cheerio';
import iconv from 'iconv-lite';

export async function GET(request: NextRequest) {
  try {
    const word = request.nextUrl.searchParams.get('word');

    const query = {
      q: String(word),
      oq: String(word),
      sclient: 'gws-wiz-modeless-video',
      udm: '7',
      biw: '791',
      bih: '899',
    };

    const queryString = new URLSearchParams(query).toString();

    const response = await fetch(
      `https://www.google.com/search?${queryString}`,
      {
        headers: {
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'accept-language': 'ko-KR,ko;q=0.9',
          priority: 'u=0, i',
          'sec-ch-ua':
            '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-arch': '"x86"',
          'sec-ch-ua-bitness': '"64"',
          'sec-ch-ua-full-version-list':
            '"Google Chrome";v="131.0.6778.205", "Chromium";v="131.0.6778.205", "Not_A Brand";v="24.0.0.0"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-model': '""',
          'sec-ch-ua-platform': '"Windows"',
          'sec-ch-ua-platform-version': '"10.0.0"',
          'sec-ch-ua-wow64': '?0',
          'sec-fetch-dest': 'document',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-site': 'none',
          'sec-fetch-user': '?1',
          'upgrade-insecure-requests': '1',
          'x-browser-channel': 'stable',
          'x-browser-copyright':
            'Copyright 2024 Google LLC. All rights reserved.',
          'x-browser-validation': 'Nbt54E7jcg8lQ4EExJrU2ugNG6o=',
          'x-browser-year': '2024',
        },
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: null,
        method: 'GET',
      }
    );

    const textBuffer = await response.arrayBuffer();
    const decodedHtml = iconv.decode(Buffer.from(textBuffer), 'euc-kr'); // 인코딩 확인 후 변경
    const $ = load(decodedHtml);

    const divs = $('#main > div:not([class])').toArray();

    // 'data:image/jpeg;base64,/9j/ 시작해서 ' 으로 끝나는 텍스트 추출
    const imageRegex = /data:image\/jpeg;base64,\/9j\/[A-Za-z0-9+/=]+/g;
    const images = decodedHtml.match(imageRegex) || [];

    // JSON 변환
    const results = divs
      .map((div) => {
        const element = $(div);
        const href = `https://www.google.com${element
          .find('div > div > a')
          .attr('href')}`;

        const title = element
          .find('div > div > a > div > div > h3 > div')
          .text()
          .trim()
          .split('/')[0]
          .trim();

        const time = element
          .find('div > div:nth-child(2) > div > div > div > div > div > span')
          .text()
          .trim()
          .split('·')[0]
          .trim();

        const contents = element
          .find('div > div:nth-child(2) > div > div > div > div > div')
          .clone() // 요소 복제
          .find('span') // <span> 태그 찾기
          .remove() // <span> 태그 제거
          .end() // 원래 요소로 돌아가기
          .text() // 텍스트 추출
          .split('...')[0]
          .trim();

        return {
          href,
          time,
          title,
          contents,
        };
      })
      .filter((result) => result.title);

    return NextResponse.json(
      results.map((result, index) => {
        return {
          ...result,
          src: images[index],
        };
      })
    );
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
