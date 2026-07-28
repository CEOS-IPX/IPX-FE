"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Radio } from "@/components/ui/Radio";
import { TextArea } from "@/components/ui/TextArea";
import { TextField } from "@/components/ui/TextField";
import { updateReport } from "@/lib/api/analysis";
import { ApiError } from "@/lib/api/error";
import type { UpdateReportRequest, UpdateReportResponse } from "@/types/report.type";

const REPORT_UPDATE_ERROR_MESSAGES: Record<string, string> = {
  C001: "수정할 리포트 내용을 확인해주세요.",
  SC001: "로그인이 필요합니다.",
  CA002: "해당 사건에 접근할 권한이 없습니다.",
  CA001: "사건을 찾을 수 없습니다.",
  RP002: "분석 리포트를 찾을 수 없습니다.",
  C002: "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

type UpdateReportFormProps = {
  caseId: string;
  initialValues: {
    authorName: string;
    noveltySatisfied: boolean;
    inventiveSatisfied: boolean;
    overallConclusion: string;
  };
  onUpdated: (report: UpdateReportResponse) => void;
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

export function UpdateReportForm({ caseId, initialValues, onUpdated }: UpdateReportFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [authorName, setAuthorName] = useState(initialValues.authorName);
  const [noveltySatisfied, setNoveltySatisfied] = useState(initialValues.noveltySatisfied);
  const [inventiveSatisfied, setInventiveSatisfied] = useState(initialValues.inventiveSatisfied);
  const [overallConclusion, setOverallConclusion] = useState(initialValues.overallConclusion);
  const [authorError, setAuthorError] = useState<string | undefined>();
  const [conclusionError, setConclusionError] = useState<string | undefined>();
  const [requestError, setRequestError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setAuthorName(initialValues.authorName);
    setNoveltySatisfied(initialValues.noveltySatisfied);
    setInventiveSatisfied(initialValues.inventiveSatisfied);
    setOverallConclusion(initialValues.overallConclusion);
    setAuthorError(undefined);
    setConclusionError(undefined);
    setRequestError(null);
  };

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

    const body: UpdateReportRequest = {};
    if (trimmedAuthorName !== initialValues.authorName) body.authorName = trimmedAuthorName;
    if (noveltySatisfied !== initialValues.noveltySatisfied) {
      body.noveltySatisfied = noveltySatisfied;
    }
    if (inventiveSatisfied !== initialValues.inventiveSatisfied) {
      body.inventiveSatisfied = inventiveSatisfied;
    }
    if (trimmedConclusion !== initialValues.overallConclusion) {
      body.overallConclusion = trimmedConclusion;
    }

    if (Object.keys(body).length === 0) {
      setRequestError("변경된 내용이 없습니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      const updated = await updateReport(caseId, body);
      setAuthorName(updated.authorName);
      setNoveltySatisfied(updated.noveltySatisfied);
      setInventiveSatisfied(updated.inventiveSatisfied);
      setOverallConclusion(updated.overallConclusion);
      onUpdated(updated);
      setIsEditing(false);
    } catch (error) {
      setRequestError(
        error instanceof ApiError
          ? (REPORT_UPDATE_ERROR_MESSAGES[error.errorCode] ?? error.message)
          : "분석 리포트 수정 중 네트워크 오류가 발생했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="print:hidden flex w-full max-w-210 justify-end px-10 pt-4">
        <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
          리포트 수정
        </Button>
      </div>
    );
  }

  return (
    <section className="print:hidden mt-4 flex w-full max-w-210 flex-col gap-6 rounded-lg border border-outline-sub bg-bg-surface p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-title-emphasis-20 text-title-primary">분석 리포트 수정</h2>
          <p className="text-body-15 text-caption-label">
            최종 판단과 종합 결론을 수정할 수 있습니다.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            resetForm();
            setIsEditing(false);
          }}
          disabled={isSubmitting}
        >
          취소
        </Button>
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
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:gap-16">
          <SatisfactionField
            legend="신규성 최종 판단"
            name="updateNoveltySatisfied"
            value={noveltySatisfied}
            onChange={setNoveltySatisfied}
          />
          <SatisfactionField
            legend="진보성 최종 판단"
            name="updateInventiveSatisfied"
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
          className="h-40"
        />

        {requestError && (
          <p role="alert" aria-live="polite" className="text-body-13 text-error-default">
            {requestError}
          </p>
        )}

        <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? "수정 내용 저장 중..." : "수정 내용 저장"}
        </Button>
      </form>
    </section>
  );
}
