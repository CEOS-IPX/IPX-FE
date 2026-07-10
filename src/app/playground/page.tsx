"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Radio } from "@/components/ui/Radio";
import { TextField } from "@/components/ui/TextField";
import { CodeInput } from "@/components/auth/CodeInput";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { PasswordField } from "@/components/auth/PasswordField";
import { Chip } from "@/components/searchlist/TagChip";
import { TagChip } from "@/components/searchlist/TagChip";
import { Checkbox } from "@/components/searchlist/Checkbox";
import { Pagination } from "@/components/searchlist/Pagination";
import { ResultListHeader } from "@/components/searchlist/ResultListHeader";
import { SaveButton } from "@/components/searchlist/SaveButton";
import { SortingTag } from "@/components/searchlist/SortingTag";
import { StatusBadge } from "@/components/searchlist/StatusBadge";
import { ProjectCard } from "@/components/myhistory/ProjectCard";
import ComparisionPatentBox from "@/components/analysis/InventiveStep/Comparision/ComparisionPatentBox";
import { AIChip } from "@/components/analysis/InventiveStep/InventiveLogics/AIChip";
import { InventiveStepCard } from "@/components/analysis/InventiveStep/InventiveLogics/InventiveStepCard";
import { Tooltip } from "@/components/analysis/InventiveStep/InventiveLogics/Tooltip";
import {
  INVENTIVE_STEP_LOGIC_TYPES,
  type InventiveStepLogicKey,
} from "@/constants/analysis/inventiveStep";

// 추후 api 연동 시 교체 (진보성 논리 유형 4개는 고정, AI 추천 여부/근거는 분석마다 달라짐)
const INVENTIVE_STEP_DEMO_DATA: Record<
  InventiveStepLogicKey,
  { aiRecommended: boolean; tooltipText: string }
> = {
  numericLimitation: {
    aiRecommended: true,
    tooltipText: "정량 데이터 확보로 효과의 현저성 주장",
  },
  multiReferenceCombination: {
    aiRecommended: true,
    tooltipText: "D1·D2 결합 거절 예상으로 Teaching Away 논증 필요",
  },
  commonKnowledge: {
    aiRecommended: false,
    tooltipText: "심사관의 주지관용기술 주장 징후가 없음",
  },
  simpleDesignChange: {
    aiRecommended: false,
    tooltipText: "구성요소 변경이 단순 설계변경 범주에 해당하지 않음",
  },
};

type SectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

function Section({ title, description, children }: SectionProps) {
  return (
    <section className="flex flex-col gap-4 border-b border-gray-80 pb-10">
      <header className="flex flex-col gap-1">
        <h2 className="text-title-emphasis-22 text-black">{title}</h2>
        {description && <p className="text-body-15 text-gray-40">{description}</p>}
      </header>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

export default function PlaygroundPage() {
  const [code, setCode] = useState("");
  const [codeErr, setCodeErr] = useState("");
  const [page, setPage] = useState(1);
  const [headerChecked, setHeaderChecked] = useState(false);
  const [headerIndeterminate, setHeaderIndeterminate] = useState(false);
  const [selectedStep, setSelectedStep] = useState<InventiveStepLogicKey>("numericLimitation");

  return (
    <main className="flex h-full w-full flex-col gap-10 overflow-y-auto px-6 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-headline-emphasis-32 text-black">Component Playground</h1>
        <p className="text-body-15 text-gray-40">컴포넌트 동작/스타일 확인용 페이지입니다.</p>
      </header>

      <Section title="Button" description="primary / secondary · hover · disabled">
        <div className="flex flex-col gap-3">
          <Button variant="primary">다음</Button>
          <Button variant="primary" disabled>
            다음
          </Button>
          <Button variant="secondary">이전</Button>
          <Button variant="secondary" disabled>
            이전
          </Button>
        </div>
      </Section>

      <Section title="GoogleButton">
        <GoogleButton />
      </Section>

      <Section title="TextField" description="default / focused / filled / error">
        <TextField label="이메일" placeholder="이메일을 입력해주세요" />
        <TextField label="이메일" placeholder="이메일을 입력해주세요" autoFocus />
        <TextField label="이메일" defaultValue="abcd@gmail.com" />
        <TextField label="이메일" defaultValue="abcd" error="올바른 이메일 형식인지 확인해주세요" />
      </Section>

      <Section title="PasswordField" description="우측 eye 토글 · 마스킹 on/off">
        <PasswordField label="비밀번호" defaultValue="password123" />
        <PasswordField label="비밀번호" placeholder="비밀번호를 입력해주세요" />
        <PasswordField
          label="비밀번호"
          defaultValue="password123"
          error="비밀번호를 다시 확인해주세요"
        />
      </Section>

      <Section title="CodeInput" description="6자리 · 자동 포커스 · paste 지원">
        <CodeInput value={code} onChange={setCode} />
        <CodeInput value={codeErr} onChange={setCodeErr} error />
      </Section>

      <Section title="Radio" description="unchecked / checked">
        <div className="flex items-center gap-4">
          <Radio name="radio-demo" value="a" defaultChecked />
          <Radio name="radio-demo" value="b" />
        </div>
      </Section>

      <Section title="Chip" description="default / primary variant">
        <div className="flex flex-wrap gap-3">
          <Chip variant="default"># 저온 침출</Chip>
          <Chip variant="primary"># 저온 침출</Chip>
        </div>
      </Section>

      <Section title="TagChip" description="클릭 → selected(파랑+X), X 클릭 → 해제">
        <div className="flex flex-wrap gap-3">
          <TagChip label="저온 침출" />
          <TagChip label="수질 오염" />
          <TagChip label="대기 환경" />
        </div>
      </Section>

      <Section title="Checkbox" description="unchecked / checked / indeterminate / disabled">
        <div className="flex items-center gap-6">
          <Checkbox />
          <Checkbox defaultChecked />
          <Checkbox indeterminate />
          <Checkbox disabled />
          <Checkbox defaultChecked disabled />
        </div>
      </Section>

      <Section title="StatusBadge" description="verygood / good / related / bad / hold">
        <div className="flex flex-wrap gap-3">
          <StatusBadge variant="verygood">매우 적합</StatusBadge>
          <StatusBadge variant="good">적합</StatusBadge>
          <StatusBadge variant="related">관련</StatusBadge>
          <StatusBadge variant="bad">부적합</StatusBadge>
          <StatusBadge variant="hold">보류</StatusBadge>
        </div>
      </Section>

      <Section title="SortingTag" description="정렬 드롭다운 버튼">
        <div className="flex flex-wrap gap-3">
          <SortingTag label="최신순" />
          <SortingTag label="적합도순" />
        </div>
      </Section>

      <Section title="SaveButton" description="선택한 개수 저장하기">
        <div className="flex gap-3">
          <SaveButton count={0} />
          <SaveButton count={3} />
        </div>
      </Section>

      <Section title="Pagination" description="페이지 이동 · 양 끝에서 비활성화">
        <Pagination page={page} totalPages={5} onChange={setPage} />
      </Section>

      <Section title="ProjectCard" description="상태 chip · 제목 · 회사/담당자 · 이미지 그리드">
        <ProjectCard
          id="demo-1"
          status="선행 조사 중"
          title="프로젝트명 프로젝트명 프로젝트명 프로젝트명 프로젝트명 프로젝트명"
          company="그린폴리머(주)"
          manager="김도현"
          patents={[]}
        />
        <ProjectCard
          id="demo-2"
          status="완료"
          title="이미지가 있는 프로젝트"
          company="그린폴리머(주)"
          manager="김도현"
          patents={[
            { id: "p1", thumbnailUrl: "https://picsum.photos/seed/a/200" },
            { id: "p2", thumbnailUrl: "https://picsum.photos/seed/b/200" },
            { id: "p3", thumbnailUrl: "https://picsum.photos/seed/c/200" },
            { id: "p4", thumbnailUrl: "https://picsum.photos/seed/d/200" },
            { id: "p5", thumbnailUrl: "https://picsum.photos/seed/e/200" },
          ]}
        />
      </Section>

      <Section title="ComparisionPatentBox" description="주인용 / 부인용 특허 비교 박스">
        <ComparisionPatentBox
          primaryReference={{
            patentNumber: "KR 10-2023-0145XXX",
            title: "저온 황산침출 기반 니켈·코발트 동시 회수 공정",
            organization: "한국지질자원연구원",
            year: 2024,
          }}
          secondaryReference={{
            patentNumber: "KR 10-2023-0145XXX",
            title:
              "저온 황산침출 기반 니켈·코발트 동시 회수 공정KR 10-2023-0145XXX 저온 황산침출 기...",
            organization: "한국지질자원연구원",
            year: 2024,
          }}
        />
      </Section>

      <Section title="AIChip" description="recommended / selected / none">
        <div className="flex flex-wrap items-center gap-3">
          <AIChip variant="recommended">AI 추천</AIChip>
          <AIChip variant="none">해당 없음</AIChip>
          <AIChip variant="selected">AI 추천</AIChip>
        </div>
      </Section>

      <Section
        title="InventiveStepCard"
        description="클릭하면 선택 상태 토글 · AI 비추천이면 '해당 없음'"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          {INVENTIVE_STEP_LOGIC_TYPES.map((logic) => (
            <InventiveStepCard
              key={logic.key}
              title={logic.title}
              description={logic.description}
              aiRecommended={INVENTIVE_STEP_DEMO_DATA[logic.key].aiRecommended}
              selected={selectedStep === logic.key}
              onClick={() => setSelectedStep(logic.key)}
              tooltipText={INVENTIVE_STEP_DEMO_DATA[logic.key].tooltipText}
            />
          ))}
        </div>
      </Section>

      <Section title="Tooltip" description="AI 추천/비추천 근거 한 줄">
        <div className="flex flex-col gap-2">
          <Tooltip text="정량 데이터 확보로 효과의 현저성 주장" />
          <Tooltip text="D1·D2 결합 거절 예상으로 Teaching Away 논증 필요" />
          <Tooltip text="심사관의 주지관용기술 주장 징후가 없음" />
          <Tooltip text="구성요소 변경이 단순 설계변경 범주에 해당하지 않음" />
        </div>
      </Section>

      <Section title="ResultListHeader" description="전체선택 체크박스 · indeterminate">
        <div className="flex flex-col gap-3">
          <ResultListHeader
            checked={headerChecked}
            indeterminate={headerIndeterminate}
            onCheckedChange={(v) => {
              setHeaderChecked(v);
              setHeaderIndeterminate(false);
            }}
          />
          <div className="flex gap-3 text-sm">
            <button
              type="button"
              className="rounded border px-2 py-1 text-xs"
              onClick={() => {
                setHeaderChecked(false);
                setHeaderIndeterminate(true);
              }}
            >
              indeterminate
            </button>
            <button
              type="button"
              className="rounded border px-2 py-1 text-xs"
              onClick={() => {
                setHeaderChecked(false);
                setHeaderIndeterminate(false);
              }}
            >
              reset
            </button>
          </div>
        </div>
      </Section>
    </main>
  );
}
