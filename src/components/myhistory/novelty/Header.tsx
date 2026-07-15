import { Button } from "@/components/ui/Button";
import ExternalIcon from "@/components/icons/icon-external.svg";
import { Chip } from "@/components/myhistory/ProjectCardChip";

interface HeaderProps {
  title: string;
  status: string;
  patentNumber: string;
  organization: string;
}

export default function Header({ title, status, patentNumber, organization }: HeaderProps) {
  return (
    <div className="flex flex-row items-end justify-between">
      <div className="flex flex-row gap-5.25">
        <div className="h-25 w-25 shrink-0 rounded-sm border border-outline-sub"></div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <p className="text-headline-emphasis-24 text-title-primary">{title}</p>
            <Chip variant="primary">{status}</Chip>
          </div>

          <div className="flex flex-row gap-3 text-title-18 text-body-disabled">
            <p>{patentNumber}</p>
            <p>|</p>
            <p>{organization}</p>
          </div>
        </div>
      </div>

      <Button variant="secondary" className="h-10 w-fit shrink-0 justify-center px-3 py-2.5">
        <ExternalIcon className="h-5 w-5 [&_path]:fill-current" />
        원문보기
      </Button>
    </div>
  );
}
