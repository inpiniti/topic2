import { NextRequest, NextResponse } from "next/server";
import { load } from "cheerio";
import iconv from "iconv-lite";

export async function GET(request: NextRequest) {
  try {
    const word = request.nextUrl.searchParams.get("word");

    const query = {
      q: String(word),
      sca_esv: "5077fa036b9a50a9",
      sxsrf: "ADLYWIJGB3H-I73zxDPtRnyiULSSOfPAuw:1735715810768",
      ei: "4ut0Z8jHLpW9vr0P7v6PyAw",
      ved: "0ahUKEwjIwNOi_dOKAxWVnq8BHW7_A8kQ4dUDCBA",
      uact: "5",
      oq: String(word),
      gs_lp:
        "Egxnd3Mtd2l6LXNlcnAiF-ydhOyCrOuFhCDsg4jtlbQg7J247IKsMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHSPsTUABYAHACeAGQAQCYAQCgAQCqAQC4AQPIAQCYAgKgAhGYAwCIBgGQBgqSBwEyoAcA",
      sclient: "gws-wiz-serp",
    };

    const queryString = new URLSearchParams(query).toString();

    const response = await fetch(
      `https://www.google.com/search?${queryString}`,
      {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
          priority: "u=0, i",
          "sec-ch-prefers-color-scheme": "light",
          "sec-ch-ua":
            '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          "sec-ch-ua-arch": '"x86"',
          "sec-ch-ua-bitness": '"64"',
          "sec-ch-ua-form-factors": '"Desktop"',
          "sec-ch-ua-full-version": '"131.0.6778.205"',
          "sec-ch-ua-full-version-list":
            '"Google Chrome";v="131.0.6778.205", "Chromium";v="131.0.6778.205", "Not_A Brand";v="24.0.0.0"',
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
            "Copyright 2024 Google LLC. All rights reserved.",
          "x-browser-validation": "Nbt54E7jcg8lQ4EExJrU2ugNG6o=",
          "x-browser-year": "2024",
          "x-client-data":
            "CJG2yQEIprbJAQipncoBCOX7ygEIk6HLAQiJo8sBCIWgzQEIjafNAQi6yM0BCKzJzgEIx8/OAQjJ0c4BCLLTzgEI2tTOAQjt1c4BCLPYzgEYldTOARjP1c4B",
          cookie:
            "HSID=Abw-94IjaLccIyo-J; SSID=AmS2p9jPTCRuxTWcH; APISID=Q4tXKB3f0Qxe1zZL/Ayhl6i_lu1u4PG_L8; SAPISID=PdYJB-cMoUTEdMwv/AgoQo2YIuqcndTrRb; __Secure-1PAPISID=PdYJB-cMoUTEdMwv/AgoQo2YIuqcndTrRb; __Secure-3PAPISID=PdYJB-cMoUTEdMwv/AgoQo2YIuqcndTrRb; SEARCH_SAMESITE=CgQIzJwB; SID=g.a000rAhIRJwkjVvsunblGpmO7VlYFkWZu1svzNW7jCu9i7F_UYhoAp88ROFZI5_nEt85ZmhGXAACgYKAcMSARESFQHGX2MiWF01YVFqQNrUfYjjuMPaoRoVAUF8yKrCdg_i-8SKP1o4BsFVdSMp0076; __Secure-1PSID=g.a000rAhIRJwkjVvsunblGpmO7VlYFkWZu1svzNW7jCu9i7F_UYho301WjjS4Vi158xpGbP28MwACgYKARgSARESFQHGX2MiiLhxdQ20A-VGkNovEiUmuxoVAUF8yKpSrix7rGWQV0vhvGO5_CbP0076; __Secure-3PSID=g.a000rAhIRJwkjVvsunblGpmO7VlYFkWZu1svzNW7jCu9i7F_UYhoBvv_R2moFl5fAjEeRNHFEQACgYKAaoSARESFQHGX2MiaRV3nfqlkYuVsCWoT9tqwxoVAUF8yKr8IAozo4UhepThA1lyPUpM0076; AEC=AZ6Zc-W1VjOildgfJAgRTP7KdLFpKFChvjGv6_oyQfMfw4Nklp-Il0_sug; GOOGLE_ABUSE_EXEMPTION=ID=7045566f531616c3:TM=1736449314:C=r:IP=221.151.152.177-:S=c5BAwIebxOFpqxhjMJ3AbdU; __Secure-1PSIDTS=sidts-CjEB7wV3sVwJGFSiLJ6mWSqNMUHLVGfSUs3Wafw8KQOHHpVoPftnEkNYIQs9bWaLe5EWEAA; __Secure-3PSIDTS=sidts-CjEB7wV3sVwJGFSiLJ6mWSqNMUHLVGfSUs3Wafw8KQOHHpVoPftnEkNYIQs9bWaLe5EWEAA; NID=520=KgTWEvy4yBDP23b7-95RLEytRWDvgjxD2COkVeDIp_ouoXiav17RIWLpM4huXu1hiSlfu36GBuQN6VmtPnpy9ql-lPif2HRIMu847hPXNE5O6Qjla7f99KrpNOdg-uKTmcjnK_oF2xSKptTiLVm_xcd9s9KiuKKxpXmemE41Sri9oZOFRHfsGmEUWtW2RXkMCWMEy8qWiSm1D1E0Xl2RN6C-Ngux4h1_g2XEH0ErvSXFHc7mtF4p2dwOsWbsediZTGgU_ZmFtD34IKeP3ZT3-KOD7jFAP1GujJ8k5bGzxGNdp2q-9v8jHfi9bjmnWfhXQ_-FaCPrpHC6eMIfZIsRQ6u0fPDjDmaq7ElAocbeXeSR_PVoKli9UrN-AnUkjXC6jrykS0W_dZC437hAb10b6VRkvcSQ30Ns3yTUhss6F3pAdat4c7YTKSnUUKrkRjmi_eIlSCg8sQ24sd3uKNlSgJLyl4evpBKgAtT56GS3Gb16C0Xu8kTfL-zjLN0I7EZgY3LUdqKfXNG4KPf-CmsT-w4ZuwQs5fch4J8WpZpDCGN7XWJcqrEAni9urKrB2hQLgR1fubchVsEIgnUSjiMNCdPSX-uOQg7ZMDF-qfnrPVOWs2p_QGacd6HNVMYtWY1VJ-Q2Fv736pE_UpF9vAu6WAy3H2THUGNoMg3xncC5QdjB78h6J4hnO2D6KQ40pdG95Ltz3J329x2-sVpHlG6dLm1bEZ26ylyujBuMZEszFFi8fJjp6qEZl5S2q9UF6Y8O8QhMAkKiC3XHvzVznz5i3ZtipF8E3AKZzlXB; DV=E7ZppFvx0DxRECBuCtWvdH3XEyLHRFktWN6v3q37OwIAAKC_gZ31WkiLwgAAAKBhEoxfPqk8OAAAAGnw0XD9ZnENEQAAAA; SIDCC=AKEyXzW48-WOmS9hn6fTU0wSmAuvvbxxX0vtolx9eDXceVCUNFMGlfpAEKgkdY3jQGqZCDGJI5I; __Secure-1PSIDCC=AKEyXzXGAuGPFDvMYnWip3CkPVrCTuUasWvu-49Hr3MUVjzz1jaJ2nsGnBNZsmzscBBYePAp8MM; __Secure-3PSIDCC=AKEyXzX70pKvPd7We4vBVQQrSFXN3p4D3N_QiE9TS_F5UgQ1SOOmu6X3juF33IT2GuRQOQpPGA",
          Referer: "https://www.google.com/",
          "Referrer-Policy": "origin",
        },
        body: null,
        method: "GET",
      }
    );

    const textBuffer = await response.arrayBuffer();
    const decodedHtml = iconv.decode(Buffer.from(textBuffer), "euc-kr"); // 인코딩 확인 후 변경
    const $ = load(decodedHtml);

    const divs = $("#main > div:not([class])").toArray();

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

        const img = element.find("div img").attr("src");

        return {
          href,
          site,
          path,
          title,
          date,
          contents,
          ...(img && { img }),
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
