import Title from "@/components/search/SearchTitle";
import { TextField } from "@/components/ui/TextField";

type InformationBProps = {
  applicantName: string;
  onChangeApplicantName: (value: string) => void;
  inventorName: string;
  onChangeInventorName: (value: string) => void;
  companyName: string;
  onChangeCompanyName: (value: string) => void;
  clientName: string;
  onChangeClientName: (value: string) => void;
};

export default function InformationB({
  applicantName,
  onChangeApplicantName,
  inventorName,
  onChangeInventorName,
  companyName,
  onChangeCompanyName,
  clientName,
  onChangeClientName,
}: InformationBProps) {
  return (
    <div className="flex flex-col gap-5">
      <Title stepnum={2} title="출원인 정보" />

      <div className="grid grid-cols-2 gap-x-3 gap-y-4 pl-10">
        <TextField
          labelSize={17}
          label="출원인"
          placeholder="출원인 성명을 입력해주세요"
          gap={1.5}
          value={applicantName}
          onChange={(e) => onChangeApplicantName(e.target.value)}
        />

        <TextField
          labelSize={17}
          label="발명자"
          placeholder="발명자 성명을 입력해주세요"
          gap={1.5}
          value={inventorName}
          onChange={(e) => onChangeInventorName(e.target.value)}
        />

        <TextField
          labelSize={17}
          label="사명 (선택)"
          placeholder="EX) 그린폴리머(주)"
          gap={1.5}
          value={companyName}
          onChange={(e) => onChangeCompanyName(e.target.value)}
        />

        <TextField
          labelSize={17}
          label="의뢰인 (선택)"
          placeholder="의뢰인 성명을 입력해주세요"
          gap={1.5}
          value={clientName}
          onChange={(e) => onChangeClientName(e.target.value)}
        />
      </div>
    </div>
  );
}
