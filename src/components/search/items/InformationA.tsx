import Title from "@/components/search/SearchTitle";
import { TextField } from "@/components/ui/TextField";
import { TextArea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";

type InformationAProps = {
  title: string;
  onChangeTitle: (value: string) => void;
  technicalField: string;
  onChangeTechnicalField: (value: string) => void;
  ipcInput: string;
  onChangeIpcInput: (value: string) => void;
  description: string;
  onChangeDescription: (value: string) => void;
  requiredApplicationNumbers: string[];
  onOpenPatentModal: () => void;
};

export default function InformationA({
  title,
  onChangeTitle,
  technicalField,
  onChangeTechnicalField,
  ipcInput,
  onChangeIpcInput,
  description,
  onChangeDescription,
  requiredApplicationNumbers,
  onOpenPatentModal,
}: InformationAProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <Title stepnum={1} title="발명 정보" />
        <Button variant="secondary" size="sm" onClick={onOpenPatentModal}>
          출원 번호로 불러오기
        </Button>
      </div>

      {requiredApplicationNumbers.length > 0 && (
        <p className="pl-10 text-label-13 text-caption-label">
          탐색 시 반드시 포함할 출원번호: {requiredApplicationNumbers.join(", ")}
        </p>
      )}

      <div className="flex flex-col gap-4 pl-10">
        <TextField
          labelSize={17}
          label="발명의 명칭"
          placeholder="EX) 생분해성 고분자 코팅 조성물"
          gap={1.5}
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
        />

        <div className="flex flex-row gap-3">
          <TextField
            labelSize={17}
            label="기술 분야"
            placeholder="EX) 고분자 화학 코팅"
            gap={1.5}
            value={technicalField}
            onChange={(e) => onChangeTechnicalField(e.target.value)}
          />
          <TextField
            labelSize={17}
            label="IPC 분류"
            placeholder="EX) C09D 5/00 (여러 개는 콤마로 구분)"
            gap={1.5}
            value={ipcInput}
            onChange={(e) => onChangeIpcInput(e.target.value)}
          />
        </div>

        <TextArea
          labelSize={17}
          label="핵심 기술 설명"
          placeholder="발명의 핵심 구성과 작동 방식을 간단히 설명해주세요"
          rows={4}
          value={description}
          onChange={(e) => onChangeDescription(e.target.value)}
        />
      </div>
    </div>
  );
}
