# IPX

## 1. 프로젝트 소개

AI 기반 특허 탐색 솔루션

---

## 2. 주요 기능

---

## 3. 기술 스택

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- pnpm

### Deployment

- Vercel

### Tools

- GitHub
- ESLint
- Prettier
- Husky
- lint-staged

---

## 4. 프로젝트 구조

```bash
main
|
dev
├── (feat/Landing)           # 랜딩페이지 -> 유저 플로우 상 삭제 가능성 있음
├── feat/Auth                # 로그인/회원가입/비밀번호 재설정 등 통합
├── feat/Project             # 기존 개인 대시보드 페이지 -> 기능 축소로 프로젝트 페이지와 병합
├── feat/Search              # 기술 탐색 페이지
├── feat/Result              # 탐색 결과 페이지
└── feat/Detail              # 후보 상세 페이지
```
