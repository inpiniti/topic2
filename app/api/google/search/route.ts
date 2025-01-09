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
            "HSID=Abw-94IjaLccIyo-J; SSID=AmS2p9jPTCRuxTWcH; APISID=Q4tXKB3f0Qxe1zZL/Ayhl6i_lu1u4PG_L8; SAPISID=PdYJB-cMoUTEdMwv/AgoQo2YIuqcndTrRb; __Secure-1PAPISID=PdYJB-cMoUTEdMwv/AgoQo2YIuqcndTrRb; __Secure-3PAPISID=PdYJB-cMoUTEdMwv/AgoQo2YIuqcndTrRb; SEARCH_SAMESITE=CgQIzJwB; SID=g.a000rAhIRJwkjVvsunblGpmO7VlYFkWZu1svzNW7jCu9i7F_UYhoAp88ROFZI5_nEt85ZmhGXAACgYKAcMSARESFQHGX2MiWF01YVFqQNrUfYjjuMPaoRoVAUF8yKrCdg_i-8SKP1o4BsFVdSMp0076; __Secure-1PSID=g.a000rAhIRJwkjVvsunblGpmO7VlYFkWZu1svzNW7jCu9i7F_UYho301WjjS4Vi158xpGbP28MwACgYKARgSARESFQHGX2MiiLhxdQ20A-VGkNovEiUmuxoVAUF8yKpSrix7rGWQV0vhvGO5_CbP0076; __Secure-3PSID=g.a000rAhIRJwkjVvsunblGpmO7VlYFkWZu1svzNW7jCu9i7F_UYhoBvv_R2moFl5fAjEeRNHFEQACgYKAaoSARESFQHGX2MiaRV3nfqlkYuVsCWoT9tqwxoVAUF8yKr8IAozo4UhepThA1lyPUpM0076; AEC=AZ6Zc-W1VjOildgfJAgRTP7KdLFpKFChvjGv6_oyQfMfw4Nklp-Il0_sug; NID=520=oOo_p8OfrKuWLdZMjf7CJdI5eue3nRGupltTmLG27n_Z4L_b9MlA8E_Qpnl73NLGWGqEsSjWePY0SzuiM9HXD8JphsX7BF8ZxabZbd6fc78v3icdL2ij91Y7x7PtFqD-fViwlerlVGTVuXWPDxgGHqtlJI1x1T9Gn98V13VpSTFgOPtg11F1ejvEBffRpueDtP1Sc0QSJjv89EEqPHoe9cy57iUGlg5od2KfbdDEQEls0D5Uj3SDEpE-vFxZEi3btX8niOJFyikZMHUehRUbgpsO6wWcVBBvZPgYCFw72HXqQIn4PApxw-GkE-fFhofP5RIGCL_oodhP0MEJTTuDHKAVTt-faF-OnLPYSuujtqGoGtIjuYlCp-a8zDXDeRplMcwVG19oOcCoordC-zgcU_96V_lmVaswfoqdWCnWuagwJsgPwWuU_iVqnCEt-4914wwVGCB20k0IAuJnSwdDIDCbZ36oTTBuMJQc6yWRPbH4h5hMbHktv8dy_72HVAtwkRByH31rfq-TYZkMCuWEUdp3UJq_WN8EgKUQ9df_xLnp7VVrp6viA1Z4b7TqkuZQ__b1DNZLVJlUOtbTgFrqJoqx1DsFjpG8HzdIn5qXxE_safYhAOqQkG0KdJ59ffWg_F2E9Yp2kiYhF3-r3gHsq5g0w7qJgS7w-xZTMXdFaeqxx7OWm7pknqwzFolARpMwciCfVNZqoKdJZGO45ma93G-OWcwZK35-cm9Q9nhxEUWqe4jXUS3DyoSfcXwXdyvxdMUnufFO5CYlqOBsBY_H_LPP-_oDtQSSTblf; DV=E7ZppFvx0DxRUAuW96t36_7eENHCRJn-BnbWayEtygIAABAgbgrVr3R9VwEAAKTBR8P1m8U1LF4RAGiYBOOXTyoPj1cEAA; __Secure-1PSIDTS=sidts-CjEBmiPuTWqxQfG2qOO70Tj8959oPORmPseuANVZC4hKIQWZCKCVtUEmUIMelqi2dro1EAA; __Secure-3PSIDTS=sidts-CjEBmiPuTWqxQfG2qOO70Tj8959oPORmPseuANVZC4hKIQWZCKCVtUEmUIMelqi2dro1EAA; SIDCC=AKEyXzX3Nu-JGhmz7zlU-F9JlfHOOzb642b0hYa6MHeZaqYbJghjikrX3mrg9ezKRQ8h5X4-HC4; __Secure-1PSIDCC=AKEyXzXd1ev9BaRxpO3IcD4Atd0xXZ5n7JxFWYtPl48hGmsWMm0x3-I2we1jbwOe0pasRN0aAF4; __Secure-3PSIDCC=AKEyXzUiDIKn3J_6lVbZS6__Qzc5iDbyf5DmMR0AWy8tRx4UYGwjwinvv2qmes2AzMT-zMQlAg",
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
