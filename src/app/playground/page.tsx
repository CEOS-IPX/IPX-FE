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

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12">
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
