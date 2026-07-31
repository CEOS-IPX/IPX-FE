export const SITE_URL = "https://ipx-patent.com";

export const siteConfig = {
  name: "IPX",
  url: SITE_URL,
  locale: "ko_KR",
  lang: "ko-KR",

  // SEO 핵심
  title: "IPX | 변리사 AI 선행기술조사 자동화 · 자연어 기반 특허 검색",
  titleTemplate: "%s | IPX",
  description:
    "변리사의 선행기술조사를 자동화하는 AI 특허 검색 플랫폼. 발명을 자연어로 입력하면 키워드가 놓치는 유사 선행문헌을 KIPRIS 원문과 함께 찾아 신규성·진보성 검토 시간을 줄입니다.",

  keywords: [
    "선행기술조사",
    "선행기술조사 자동화",
    "AI 선행기술조사",
    "변리사 선행기술조사",
    "시맨틱 특허 검색",
    "유사 특허 검색",
    "신규성 조사",
    "진보성 검토",
    "무효자료조사",
    "거절이유 대응",
    "OA 대응",
    "의견제출통지서 대응",
    "특허 선행조사",
    "셀프 특허출원",
    "직접 특허출원",
    "개인 특허출원",
    "청구항 비교",
    "AI 특허 검색",
    "KIPRIS",
    "구글 특허 검색",
    "Google Patents",
  ],

  ogImage: `${SITE_URL}/images/og-image.png`,
  ogImageAlt: "IPX 변리사 선행기술조사 자동화 화면",
  ogTitle: "IPX | 변리사 AI 선행기술조사 자동화",
  ogDescription:
    "발명을 자연어로 입력하면 유사 선행문헌을 의미 기반으로 찾아냅니다. 변리사 선행기술조사를 위한 AI 특허 검색.",

  twitterHandle: "@ipx",
  author: "IPX",
  geoRegion: "KR",
  geoPlacename: "Seoul",
} as const;

export type SiteConfig = typeof siteConfig;

export const landingCopy = {
  lead: "IPX는 변리사의 선행기술조사를 자동화하는 AI 특허 검색 플랫폼입니다. 출원하고 싶은 발명의 기술 내용을 간단히 입력하면, 청구항·요약·명세서를 임베딩한 의미 기반 검색으로 키워드 조사가 놓치는 유사 선행문헌을 찾아내고 신규성과 진보성을 분석해줍니다. 모든 결과에는 KIPRIS 원문 링크가 함께 제공됩니다.",

  sections: [
    {
      h2: "키워드 검색만으로는 선행문헌을 놓칩니다",
      body: "동일한 기술을 다른 용어로 기재한 특허, 다른 IPC로 분류된 특허는 키워드 조사에서 누락됩니다. 선행기술조사에서 이런 누락은 곧 신규성·진보성 판단의 공백으로 이어집니다. IPX는 한국어 특허 문서에 특화된 임베딩 모델로 표현이 달라도 의미가 유사한 선행문헌을 찾습니다.",
    },
    {
      h2: "변리사 선행기술조사, 이렇게 자동화합니다",
      bullets: [
        "자연어 조사 — 발명 내용을 문장으로 입력하면 유사 선행문헌을 유사도 순으로 반환",
        "청구항 단위 대비 — 발명과 인용문헌의 청구항을 구절 단위로 매칭해 구성요소 대응 관계 표시",
        "신규성·진보성 근거 정리 — 각 인용문헌이 어느 구성과 대응하는지 구조화해 제시",
        "KIPRIS 원문 연결 — 모든 결과에 출원번호·원문 링크 첨부, 인용 근거 추적 가능",
      ],
    },
    {
      h2: "어떤 조사에 사용하나요",
      bullets: [
        "출원 전 신규성·진보성 검토",
        "거절이유(OA) 대응을 위한 인용문헌 재검토 및 회피 논리 확보",
        "무효심판·정보제공용 무효자료조사",
        "FTO(자유실시) 검토",
      ],
    },
    {
      h2: "직접 출원을 준비하는 개인·스타트업도",
      body: "변리사 상담 전 아이디어의 신규성을 스스로 확인하려는 개인 발명가·초기 스타트업도 IPX로 출원 전 선행기술조사를 수행할 수 있습니다. 유사 선행문헌을 미리 파악해 출원 여부와 방향을 판단하는 데 활용합니다. IPX는 출원을 대행하는 도구가 아니라, 그 앞단의 선행조사를 지원하는 도구입니다.",
    },
    {
      h2: "작동 원리",
      body: "IPX는 KIPRIS Plus API로 수집한 공식 특허 데이터에 한국어 특허 특화 임베딩 모델을 결합합니다. 1차 후보군은 벡터 유사도로 추출하고, 2차로 청구항·요약을 활용해 재정렬(reranking)합니다. AI는 특허를 자유롭게 해석·요약하지 않고 실재하는 특허 DB를 검색·정렬하는 역할만 하며, 모든 결과에 KIPRIS 원문 링크와 매칭 근거가 함께 표시됩니다. 존재하지 않는 특허를 인용할 위험이 구조적으로 차단됩니다.",
    },
  ],
} as const;

export const faqItems = [
  {
    question: "IPX는 무엇인가요?",
    answer:
      "IPX는 변리사의 선행기술조사를 자동화하는 AI 기반 한국 특허 검색 법적 요소 스크리닝 플랫폼입니다. 키워드가 아니라 발명의 의미로 유사 선행문헌을 검색하며, 모든 결과에 KIPRIS 원문 링크를 제공합니다.",
  },
  {
    question: "변리사 선행기술조사에 어떻게 활용하나요?",
    answer:
      "발명 내용을 자연어로 입력하면 의미적으로 유사한 선행문헌을 유사도 순으로 반환합니다. 출원 전 신규성·진보성 검토, 거절이유 대응, 무효자료조사에 사용할 수 있습니다.",
  },
  {
    question: "KIPRIS와 무엇이 다른가요?",
    answer:
      "KIPRIS는 키워드 기반 공식 검색 서비스이고, IPX는 KIPRIS 데이터를 정식 API로 받아 임베딩 기반 의미 검색과 청구항 대비 기능을 더한 도구입니다. 표현이 다른 유사 특허를 키워드 없이 찾아냅니다.",
  },
  {
    question: "워트인텔리전스·WIPS 같은 기존 검색 툴과 어떻게 다른가요?",
    answer:
      "기존 툴이 키워드·필터·통계 분석 중심이라면, IPX는 발명의 자연어 설명에서 바로 의미 유사 선행문헌을 찾는 시맨틱 검색과 구성요소 단위 대비에 특화되어 있습니다.",
  },
  {
    question: "Google Patents(구글 특허 검색)와 무엇이 다른가요?",
    answer:
      "Google Patents는 해외 특허 커버리지와 무료 접근이 강점이지만, 한국 특허는 기계번역 기반이라 한국어 청구항 정밀 검색과 국내 심사정보 연계가 제한적입니다. IPX는 KIPRIS 원문을 기반으로 한국어 특허에 특화된 의미 검색과 청구항 대비를 제공합니다.",
  },
  {
    question: "신규성·진보성 검토에도 쓸 수 있나요?",
    answer:
      "네. 발명과 인용문헌의 청구항을 구절 단위로 대비해 구성요소 대응 관계를 정리하므로, 신규성·진보성 판단의 근거 자료로 활용할 수 있습니다.",
  },
  {
    question: "거절이유(OA) 대응에도 활용할 수 있나요?",
    answer:
      "네. 심사관이 인용한 선행문헌과 발명 청구항을 구절 단위로 대비해 구성요소 차이를 정리하고, 인용문헌 주변의 유사 선행문헌을 추가로 탐색합니다. 대응 논리는 변리사가 세우되, 근거가 되는 문헌 검토를 자동화합니다.",
  },
  {
    question: "개인이 직접 특허출원을 준비할 때도 쓸 수 있나요?",
    answer:
      "네. 출원 전 신규성 확인을 위한 선행기술조사에 활용할 수 있습니다. 유사 선행문헌을 미리 파악해 출원 가능성과 방향을 판단하는 데 도움이 됩니다. 다만 IPX는 명세서 작성·출원 대행 도구가 아니라 선행조사 도구입니다.",
  },
  {
    question: "AI가 존재하지 않는 특허를 만들어낼 위험은 없나요?",
    answer:
      "없습니다. IPX는 데이터베이스에 실재하는 특허만 반환하며 결과마다 KIPRIS 원문 링크가 첨부됩니다. LLM이 자유 텍스트로 답변을 생성하는 구조가 아니므로 환각 위험이 구조적으로 차단됩니다.",
  },
] as const;

/* ============================================================
 * JSON-LD 구조화 데이터
 * <head>에 <script type="application/ld+json"> 로 주입.
 * React 예시(App Router):
 *   <script
 *     type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 *   />
 * ============================================================ */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${SITE_URL}/images/logo-ipx-char.svg`,
  description: "변리사 선행기술조사를 자동화하는 AI 기반 한국 특허 검색 플랫폼",
  sameAs: [
    // REPLACE 또는 삭제
    "https://www.linkedin.com/company/ipx",
  ],
} as const;

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Prior Art Search",
  operatingSystem: "Web",
  inLanguage: siteConfig.lang,
  url: siteConfig.url,
  description:
    "발명을 자연어로 입력하면 유사 선행문헌을 의미 기반으로 검색하는 변리사용 AI 특허 검색 플랫폼. KIPRIS Plus API와 한국어 특화 임베딩 모델을 결합해 키워드 조사가 놓치는 선행문헌을 찾아냅니다.",
  featureList: [
    "자연어 시맨틱 선행기술조사",
    "청구항 단위 대비",
    "신규성·진보성 근거 정리",
    "무효자료조사",
    "거절이유(OA) 대응 문헌 검토",
    "KIPRIS 원문 링크 제공",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KRW",
    availability: "https://schema.org/InStock",
  },
} as const;

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
} as const;

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  inLanguage: siteConfig.lang,
  // 공개 검색 엔드포인트가 있으면 아래 potentialAction 주석 해제 후 target 교체:
  // potentialAction: {
  //   "@type": "SearchAction",
  //   target: `${SITE_URL}/search?q={query}`,
  //   "query-input": "required name=query",
  // },
} as const;

export const jsonLd = [
  organizationSchema,
  softwareApplicationSchema,
  faqSchema,
  websiteSchema,
] as const;
