"use client";

import { use } from "react";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/Button";
import { PrintButton } from "@/components/ui/PrintButton";
import ReportHeader from "@/components/report/Header";
import ReportOverview from "@/components/report/Overview";
import NoveltyComparison from "@/components/report/NoveltyComparision";
import InventiveStep from "@/components/report/InventiveStep";
import TotalConclusion from "@/components/report/Conclusion";
import { useReport } from "@/hooks/useReport";
import type {
  ReportDetailResponse,
  ReportInventiveArgumentType,
  ReportPriorArt,
} from "@/types/report.type";

type EffectItem = {
  metric?: unknown;
  unit?: unknown;
  prior_art_value?: unknown;
  invention_value?: unknown;
  improvement?: unknown;
};

function text(value: unknown, fallback = "-") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .replace(/\. /g, ".")
    .replace(/\.$/, "");
}

function toReference(priorArt: ReportPriorArt) {
  return {
    patentNumber: priorArt.applicationNumber,
    title: priorArt.title ?? "-",
    organization: priorArt.applicantName ?? "-",
    year: priorArt.applicationDate?.slice(0, 4) ?? "-",
  };
}

function getArgument(report: ReportDetailResponse, argumentType: ReportInventiveArgumentType) {
  return report.inventiveStepAnalysis.arguments.find(
    (argument) => argument.argumentType === argumentType
  );
}

function hasContent(content: Record<string, unknown>) {
  return Object.keys(content).length > 0;
}

export default function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { isAuthenticated, report, errorMessage, isLoading, reload } = useReport(id);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-body-15 text-caption-label">분석 리포트를 불러오고 있습니다...</p>
      </div>
    );
  }

  if (errorMessage || !report) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-10">
        <p role="alert" className="text-body-17 text-body-secondary">
          {errorMessage ?? "분석 리포트를 불러오지 못했습니다."}
        </p>
        {isAuthenticated && (
          <Button variant="secondary" size="sm" onClick={reload}>
            다시 조회
          </Button>
        )}
      </div>
    );
  }

  const numericalArgument = getArgument(report, "NUMERICAL_LIMIT");
  const combinationArgument = getArgument(report, "COMBINATION_MOTIVATION");
  const commonArgument = getArgument(report, "COMMON_TECHNIQUE");
  const simpleArgument = getArgument(report, "SIMPLE_DESIGN");

  const numericalContent = numericalArgument?.content ?? ({} as Record<string, unknown>);
  const combinationContent = combinationArgument?.content ?? ({} as Record<string, unknown>);
  const commonContent = commonArgument?.content ?? ({} as Record<string, unknown>);
  const simpleContent = simpleArgument?.content ?? ({} as Record<string, unknown>);
  const effectItems = Array.isArray(numericalContent.effect_items)
    ? (numericalContent.effect_items as EffectItem[])
    : [];

  return (
    <div data-project-id={id} className="flex min-h-full w-full flex-col items-center">
      <div className="print:hidden flex w-full items-center justify-between px-10 pt-6">
        <BackButton />
        <PrintButton />
      </div>

      <main className="w-full max-w-210 px-10 py-6">
        <article className="flex w-full flex-col gap-16 bg-bg-surface px-17.5 py-15 shadow-[0px_1px_6px_0px_rgba(144,155,165,0.36)] print:shadow-none">
          <ReportHeader
            title={report.caseTitle}
            applicant={report.applicantName ?? "-"}
            inventor={report.inventorName ?? "-"}
            attorney={report.authorName}
            createdAt={formatDate(report.updatedAt)}
          />

          <ReportOverview
            overview={report.description ?? report.technicalField ?? "-"}
            components={[...report.components]
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((component) => ({
                label: String.fromCharCode(64 + component.displayOrder),
                title: component.name,
                description: component.description,
              }))}
          />

          <NoveltyComparison
            satisfied={report.noveltySatisfied}
            conclusion={report.noveltyAnalysis.conclusionText}
            items={[...report.noveltyAnalysis.comparisons]
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((comparison) => ({
                label: String.fromCharCode(64 + comparison.displayOrder),
                title: comparison.componentName,
                diff: comparison.disclosureText,
                matchStatus:
                  comparison.comparisonResult === "NOVEL"
                    ? ("NEW" as const)
                    : comparison.comparisonResult,
              }))}
          />

          <InventiveStep
            satisfied={report.inventiveSatisfied}
            primaryReference={toReference(report.inventiveStepAnalysis.primaryPriorArt)}
            secondaryReference={
              report.inventiveStepAnalysis.secondaryPriorArt
                ? toReference(report.inventiveStepAnalysis.secondaryPriorArt)
                : null
            }
            showNumericalLimits={hasContent(numericalContent)}
            showCombinationMotivation={hasContent(combinationContent)}
            showCommonTechnique={hasContent(commonContent)}
            showSimpleDesign={hasContent(simpleContent)}
            numericalLimits={effectItems.map((effect, index) => ({
              id: String(index + 1),
              category: text(effect.metric),
              unit: text(effect.unit),
              priorArt: text(effect.prior_art_value),
              invention: text(effect.invention_value),
              improvement: text(effect.improvement),
            }))}
            backgroundLimit={text(
              combinationContent.background_limit ?? combinationContent.summary
            )}
            motivationAbsence={text(combinationContent.teaching_away ?? combinationContent.reason)}
            rejectionReason={text(
              [text(commonContent.target_label, ""), text(commonContent.target_name, "")]
                .filter(Boolean)
                .join(". ")
            )}
            rebuttalLogic={text(commonContent.rebuttal ?? commonContent.reason)}
            changedComponent={text(
              [
                text(simpleContent.changed_component_label, ""),
                text(simpleContent.changed_component_name, ""),
              ]
                .filter(Boolean)
                .join(". ")
            )}
            nonObviousnessLogic={text(simpleContent.non_obviousness ?? simpleContent.reason)}
          />

          <TotalConclusion conclusion={report.overallConclusion} />
        </article>
      </main>
    </div>
  );
}
