import Title from "@/components/search/SearchTitle";
import { TextField } from "@/components/ui/TextField";
import { TextArea } from "@/components/ui/TextArea";
import { AICreationButton } from "@/components/ui/AI_Creation_Button";

export default function SearchPage() {
  return (
    <div className="flex flex-col gap-15 px-20 pb-5">
      <div className="flex flex-col gap-6">
        <Title stepnum={1} title="발명 정보" />

        <div className="flex flex-col gap-4">
          <TextField label="발명의 명칭" placeholder="EX) 생분해성 고분자 코팅 조성물" />
          <div className="flex flex-row gap-3">
            <TextField label="기술 분야" placeholder="EX) 고분자 화학 코팅" />
            <TextField label="IPC 분류" placeholder="EX) C09D 5/00" />
          </div>
          <TextArea
            label="핵심 기술 설명"
            placeholder="발명의 핵심 구성과 작동 방식을 간단히 설명해주세요"
            rows={4}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <Title stepnum={2} title="출원인 정보" />

        <div className="flex flex-row gap-3">
          <TextField label="사명 (선택)" placeholder="EX) 그린폴리머(주)" />
          <TextField label="의뢰인 (선택)" placeholder="담당자 또는 발명자 성명을 입력해주세요" />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-row justify-between">
          <Title
            stepnum={3}
            title="구성요소 분석"
            label="청구항을 구성요소 단위로 분해해 판단의 정밀성을 높힙니다."
          />
          <AICreationButton />
        </div>
      </div>

      <div></div>
    </div>
  );
}
