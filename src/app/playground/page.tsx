"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Radio } from "@/components/ui/Radio";
import { TextField } from "@/components/ui/TextField";
import { CodeInput } from "@/components/auth/CodeInput";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { PasswordField } from "@/components/auth/PasswordField";

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
    </main>
  );
}
