export type TermsSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  numbered?: string[];
};

export type TermsContent = {
  title: string;
  sections: TermsSection[];
};

export const SERVICE_TERMS_CONTENT: TermsContent = {
  title: "IPX 서비스 이용약관",
  sections: [
    {
      heading: "제1조 (목적)",
      paragraphs: [
        '본 약관은 IPX(이하 "서비스")가 제공하는 특허·기술 탐색 및 정보 제공 서비스의 이용과 관련하여 서비스와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.',
      ],
    },
    {
      heading: "제2조 (서비스의 내용)",
      paragraphs: ["IPX는 다음과 같은 서비스를 제공합니다."],
      bullets: [
        "특허 및 기술 정보 탐색 기능",
        "기술 및 시장 정보 제공",
        "사용자 맞춤형 검색 및 추천 기능",
        "기타 IPX가 추가 개발하거나 제휴를 통해 제공하는 서비스",
      ],
    },
    {
      heading: "제4조 (이용자의 의무)",
      paragraphs: ["이용자는 다음 행위를 해서는 안 됩니다."],
      bullets: [
        "타인의 계정 도용",
        "서비스 내 정보 무단 복제 및 배포",
        "불법적 목적의 서비스 이용",
        "서비스 운영을 방해하는 행위",
        "허위 정보 등록",
      ],
    },
    {
      heading: "제5조 (서비스의 변경 및 중단)",
      numbered: [
        "IPX는 운영상 또는 기술상의 필요에 따라 서비스 내용을 변경할 수 있습니다.",
        "서비스 점검, 장애, 기타 불가피한 사유 발생 시 서비스 제공이 일시 중단될 수 있습니다.",
      ],
    },
    {
      heading: "제6조 (지식재산권)",
      paragraphs: [
        "서비스 내 제공되는 콘텐츠 및 자료에 대한 저작권과 지식재산권은 IPX 또는 원저작권자에게 귀속됩니다.",
      ],
    },
    {
      heading: "제7조 (책임의 제한)",
      numbered: [
        "IPX는 제공되는 정보의 정확성 및 완전성을 보장하지 않습니다.",
        "이용자의 판단 및 활동으로 인해 발생한 손해에 대해 책임지지 않습니다.",
      ],
    },
    {
      heading: "제8조 (약관의 변경)",
      paragraphs: [
        "IPX는 관련 법령을 위반하지 않는 범위에서 본 약관을 변경할 수 있으며, 변경 시 서비스 내 공지합니다.",
      ],
    },
  ],
};

export const PRIVACY_POLICY_CONTENT: TermsContent = {
  title: "IPX 개인정보 처리방침",
  sections: [
    {
      heading: "1. 수집하는 개인정보 항목",
      paragraphs: ["IPX는 다음과 같은 개인정보를 수집할 수 있습니다."],
      bullets: [
        "이메일 주소",
        "이름 또는 닉네임",
        "로그인 정보",
        "서비스 이용 기록",
        "접속 로그 및 기기 정보",
      ],
    },
    {
      heading: "2. 개인정보 수집 목적",
      paragraphs: ["수집한 개인정보는 다음 목적을 위해 사용됩니다."],
      bullets: [
        "회원 식별 및 계정 관리",
        "서비스 제공 및 운영",
        "사용자 문의 대응",
        "서비스 개선 및 통계 분석",
        "부정 이용 방지",
      ],
    },
    {
      heading: "3. 개인정보 보관 및 이용 기간",
      paragraphs: [
        "개인정보는 회원 탈퇴 시까지 보관하며, 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안 보관됩니다.",
      ],
    },
    {
      heading: "4. 개인정보 제3자 제공",
      paragraphs: [
        "IPX는 이용자의 개인정보를 외부에 제공하지 않습니다. 단, 법령에 따른 요청이 있는 경우 예외로 합니다.",
      ],
    },
    {
      heading: "5. 개인정보 보호",
      paragraphs: ["IPX는 개인정보 보호를 위해 합리적인 보안 조치를 시행합니다."],
    },
    {
      heading: "6. 이용자의 권리",
      paragraphs: ["이용자는 언제든지 자신의 개인정보를 조회, 수정, 삭제 요청할 수 있습니다."],
    },
    {
      heading: "7. 개인정보처리방침 변경",
      paragraphs: ["본 방침은 변경될 수 있으며, 변경 시 서비스 내 공지합니다."],
    },
  ],
};
