"use client";

import CancelIcon from "@/components/icons/icon-cancel.svg";
import { Radio } from "@/components/ui/Radio";
import type { TermsContent } from "@/constants/auth/terms";

type TermsModalProps = {
  content: TermsContent;
  agreementLabel: string;
  checked: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export function TermsModal({
  content,
  agreementLabel,
  checked,
  onToggle,
  onClose,
}: TermsModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-scrim-2"
      onClick={onClose}
    >
      <div
        className="flex h-112.5 w-138.5 flex-col gap-6 rounded-lg bg-bg-surface p-8 shadow-[0px_1px_6px_0px_rgba(144,155,165,0.36)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-body-emphasis-17 text-title-primary">{content.title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex cursor-pointer items-center justify-center"
          >
            <CancelIcon className="h-6 w-6" aria-hidden />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto pr-1 scrollbar-hide">
          {content.sections.map((section) => (
            <div key={section.heading} className="flex flex-col gap-2">
              <h3 className="text-body-emphasis-17 text-title-secondary">{section.heading}</h3>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="text-body-15 text-body-secondary">
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="flex flex-col gap-1 pl-4">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="list-disc text-body-15 text-body-secondary">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
              {section.numbered && (
                <ol className="flex flex-col gap-1 pl-4">
                  {section.numbered.map((item) => (
                    <li key={item} className="list-decimal text-body-15 text-body-secondary">
                      {item}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </div>

        <hr className="h-px w-full border-0 bg-outline-sub" />

        <label className="flex cursor-pointer items-center gap-2">
          <Radio checked={checked} readOnly onClick={onToggle} />
          <span className="flex items-center gap-1">
            <span className="text-label-15 text-primary-default">[필수]</span>
            <span className="text-label-15 text-title-secondary">{agreementLabel}</span>
          </span>
        </label>
      </div>
    </div>
  );
}
