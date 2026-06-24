# IPX Frontend

변리사를 위한 AI 기반 선행특허 조사·분석 플랫폼 **IPX**의 프론트엔드 레포지토리입니다.

---

## 서비스 소개

IPX는 변리사가 특허 출원 전 수행하는 선행기술 조사 업무를 AI로 자동화하는 SaaS 플랫폼입니다.  
발명 내용을 자연어로 입력하면 구성요소 분해 → 유사특허 탐색 → 신규성·진보성 분석 → 리포트 생성까지의 전 과정을 지원합니다.

---

## 주요 기능

**사건 관리**

- 사건 생성/수정/삭제 및 단계별 상태 추적 (선행조사중 / 분석중 / 완료 / 검토대기)
- 사건당 선행문헌함 1:1 자동 생성 및 Cascade 삭제

**STEP 1 — 구성요소 분해**

- 발명 기술 설명 자유 형식 입력
- 변리사 핵심 인터뷰 6개 항목 구조화 입력
- LLM 기반 구성요소 A·B·C·D 자동 분해 + 수동 편집

**STEP 2 — 신규성 분석**

- Kipris API + Vector DB 기반 유사특허 자동 탐색 (최대 D50)
- 구성요소 × 선행문헌 Claim Chart 자동 생성 (✓/✗)
- 호버 팝오버로 원문 인용 / AI 해설 구분 표시
- 변리사 직접 수정 및 수정 이력 저장
- 신규성 포인트 도출 + 독립항 초안 자동 생성

**STEP 3 — 진보성 분석**

- 4가지 논리 유형 멀티칩 선택 (주지관용기술 / 단순설계변경 / 수치한정 / 복수인용발명결합)
- 유형별 동적 입력 섹션 및 LLM 초안 생성
- 선택 유형 기준 종합 진보성 근거 문서 합성

**기술비교 & 리포트**

- 신규성(제29조1항) + 진보성(제29조2항) 분석 결과 PDF 리포트 생성

**공통**

- 구성요소 수정 → 재탐색 → 재분석 반복 루프의 회차별 이력 관리
- 특허 상세 페이지 (3줄 요약, 외부 원문 이동)

---

## 기술 스택

| 분류            | 기술                                   |
| --------------- | -------------------------------------- |
| Framework       | Next.js 15 (App Router)                |
| Language        | TypeScript                             |
| Styling         | Tailwind CSS v4                        |
| State           | Zustand                                |
| Form            | react-hook-form + Zod                  |
| Auth            | Google OAuth (Authorization Code Flow) |
| Multi-step flow | @use-funnel/next                       |
| Package manager | pnpm                                   |
| Deployment      | Vercel                                 |

---

## 시작하기

```bash
# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

---

## 브랜치 전략

```
feat/* → dev → main
```

- `feat/*` : 기능 단위 개발
- `dev` : 통합 및 QA
- `main` : 배포 브랜치 (Vercel 연동)

---

## 환경 변수

```env
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
```
