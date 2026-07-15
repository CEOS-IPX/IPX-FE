import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export type MatchStatus = "identical" | "similar" | "novel";

const matchStatusChipVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center rounded-[2px] px-2 py-0.5 text-label-emphasis-13",
  {
    variants: {
      matchStatus: {
        identical: "bg-bg-semantic-4 text-caption-semantic-4",
        similar: "bg-bg-semantic-3 text-caption-semantic-3",
        novel: "bg-bg-semantic-6 text-primary-default",
      },
    },
  }
);

const MATCH_STATUS_LABEL: Record<MatchStatus, string> = {
  identical: "동일",
  similar: "유사",
  novel: "신규",
};

interface MatchStatusChipProps extends VariantProps<typeof matchStatusChipVariants> {
  matchStatus: MatchStatus;
}

export function MatchStatusChip({ matchStatus }: MatchStatusChipProps) {
  return (
    <span className={cn(matchStatusChipVariants({ matchStatus }))}>
      {MATCH_STATUS_LABEL[matchStatus]}
    </span>
  );
}
