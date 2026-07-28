"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Radio } from "@/components/ui/Radio";
import { TextArea } from "@/components/ui/TextArea";
import { TextField } from "@/components/ui/TextField";
import { createReport } from "@/lib/api/analysis";
import { ApiError } from "@/lib/api/error";
import { useAuthStore } from "@/store/authStore";

const REPORT_ERROR_MESSAGES: Record<string, string> = {
  C001: "입력한 리포트 내용을 확인해주세요.",
  SC001: "로그인이 필요합니다.",
  CA002: "해당 사건에 접근할 권한이 없습니다.",
  CA001: "사건을 찾을 수 없습니다.",
  N001: "신규성 분석을 먼저 완료해주세요.",
  I003: "진보성 분석을 먼저 완료해주세요.",
  C002: "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

type SatisfactionFieldProps = {
  legend: string;
  name: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

function SatisfactionField({ legend, name, value, onChange }: SatisfactionFieldProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-label-15 text-title-secondary">{legend}</legend>
      <div className="flex gap-6">
        {[
          { label: "충족", value: true },
          { label: "미충족", value: false },
        ].map((option) => (
          <label
            key={String(option.value)}
            className="flex cursor-pointer items-center gap-2 text-body-15 text-body-primary"
          >
            <Radio
              name={name}
              value={String(option.value)}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function CreateReportForm({ caseId }: { caseId: string }) {
  const router = useRouter();
  const userName = useAuthStore((state) => state.user?.name ?? "");
  const [authorName, setAuthorName] = useState(userName);
  const [noveltySatisfied, setNoveltySatisfied] = useState(true);
  const [inventiveSatisfied, setInventiveSatisfied] = useState(true);
  const [overallConclusion, setOverallConclusion] = useState("");
  const [authorError, setAuthorError] = useState<string | undefined>();
  const [conclusionError, setConclusionError] = useState<string | undefined>();
  const [requestError, setRequestError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const trimmedAuthorName = authorName.trim();
    const trimmedConclusion = overallConclusion.trim();
    const nextAuthorError = !trimmedAuthorName
      ? "작성 변리사명을 입력해주세요."
      : trimmedAuthorName.length > 100
        ? "작성 변리사명은 100자 이하로 입력해주세요."
        : undefined;
    const nextConclusionError = trimmedConclusion ? undefined : "종합 결론을 입력해주세요.";

    setAuthorError(nextAuthorError);
    setConclusionError(nextConclusionError);
    setRequestError(null);

    if (nextAuthorError || nextConclusionError) return;

    setIsSubmitting(true);

    try {
      await createReport(caseId, {
        authorName: trimmedAuthorName,
        noveltySatisfied,
        inventiveSatisfied,
        overallConclusion: trimmedConclusion,
      });
      router.push(`/myhistory/${encodeURIComponent(caseId)}/report`);
    } catch (error) {
      if (error instanceof ApiError && error.errorCode === "RP001") {
        router.push(`/myhistory/${encodeURIComponent(caseId)}/report`);
        return;
      }

      setRequestError(
        error instanceof ApiError
          ? (REPORT_ERROR_MESSAGES[error.errorCode] ?? error.message)
          : "분석 리포트 생성 중 네트워크 오류가 발생했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-4 flex flex-col gap-6 rounded-lg border border-outline-sub bg-bg-surface p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-title-emphasis-20 text-title-primary">분석 리포트 생성</h2>
        <p className="text-body-15 text-caption-label">
          최종 판단과 종합 결론을 입력해 분석 리포트를 생성해주세요.
        </p>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <TextField
          label="작성 변리사명"
          value={authorName}
          maxLength={100}
          error={authorError}
          onChange={(event) => {
            setAuthorName(event.target.value);
            if (authorError) setAuthorError(undefined);
          }}
          placeholder="작성 변리사명을 입력해주세요"
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:gap-16">
          <SatisfactionField
            legend="신규성 최종 판단"
            name="noveltySatisfied"
            value={noveltySatisfied}
            onChange={setNoveltySatisfied}
          />
          <SatisfactionField
            legend="진보성 최종 판단"
            name="inventiveSatisfied"
            value={inventiveSatisfied}
            onChange={setInventiveSatisfied}
          />
        </div>

        <TextArea
          label="종합 결론"
          value={overallConclusion}
          error={conclusionError}
          onChange={(event) => {
            setOverallConclusion(event.target.value);
            if (conclusionError) setConclusionError(undefined);
          }}
          placeholder="신규성 및 진보성 분석에 대한 종합 결론을 입력해주세요"
          className="h-40"
        />

        {requestError && (
          <p role="alert" aria-live="polite" className="text-body-13 text-error-default">
            {requestError}
          </p>
        )}

        <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? "분석 리포트 생성 중..." : "분석 리포트 생성"}
        </Button>
      </form>
    </section>
  );
}
