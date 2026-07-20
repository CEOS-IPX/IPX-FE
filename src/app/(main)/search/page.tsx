"use client";

import { useState } from "react";
import Title from "@/components/search/SearchTitle";
import { TextField } from "@/components/ui/TextField";
import { TextArea } from "@/components/ui/TextArea";
import { AICreationButton } from "@/components/ui/AI_Creation_Button";
import { ElementList, type Element } from "@/components/search/ElementList/ElementList";
import { Footer } from "@/components/search/Footer";
import { PatentImportModal } from "@/components/search/PatentImportModal";
import { Button } from "@/components/ui/Button";
import { MoreInfoA } from "@/components/search/MoreInfo/MoreInfoA";
import { MoreInfoB } from "@/components/search/MoreInfo/MoreInfoB";
import { extractComponents } from "@/lib/api/search";

export default function SearchPage() {
  const [title, setTitle] = useState("");
  const [technicalField, setTechnicalField] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [clientName, setClientName] = useState("");
  const [elements, setElements] = useState<Element[]>([
    { id: crypto.randomUUID(), name: "", description: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiCreateError, setAiCreateError] = useState<string | null>(null);

  const isInventionInfoFilled = Boolean(
    title.trim() && technicalField.trim() && description.trim()
  );
  const isComponentsFilled =
    elements.length > 0 && elements.every((el) => el.name.trim() && el.description.trim());
  const isReadyToStart = isInventionInfoFilled && isComponentsFilled;

  const handleAdd = () => {
    setElements((prev) => [...prev, { id: crypto.randomUUID(), name: "", description: "" }]);
  };

  const handleDelete = (id: string) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
  };

  const handleChange = (id: string, field: "name" | "description", value: string) => {
    setElements((prev) => prev.map((el) => (el.id === id ? { ...el, [field]: value } : el)));
  };

  //ai 자동 생성 버튼 api 연동 부분
  const handleAICreate = async () => {
    if (!title.trim() || !description.trim() || !technicalField.trim()) {
      setAiCreateError("발명의 명칭, 기술 분야, 핵심 기술 설명을 먼저 입력해주세요.");
      return;
    }

    setAiCreateError(null);
    setIsLoading(true);
    try {
      const { components } = await extractComponents({ title, description, technicalField });
      setElements(
        components.map((component) => ({
          id: crypto.randomUUID(),
          name: component.name,
          description: component.description,
        }))
      );
    } catch (err) {
      setAiCreateError(
        err instanceof Error && err.message ? err.message : "구성요소 추출 중 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-15 px-20 py-5">
      <h1 className="text-headline-28 text-title-primary">새로운 선행 기술 탐색하기</h1>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <Title stepnum={1} title="발명 정보" />
          <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(true)}>
            특허 번호로 불러오기
          </Button>
        </div>

        <div className="flex flex-col gap-4 pl-10">
          <TextField
            labelSize={17}
            label="발명의 명칭"
            placeholder="EX) 생분해성 고분자 코팅 조성물"
            gap={1.5}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex flex-row gap-3">
            <TextField
              labelSize={17}
              label="기술 분야"
              placeholder="EX) 고분자 화학 코팅"
              gap={1.5}
              value={technicalField}
              onChange={(e) => setTechnicalField(e.target.value)}
            />
            <TextField labelSize={17} label="IPC 분류" placeholder="EX) C09D 5/00" gap={1.5} />
          </div>

          <TextArea
            labelSize={17}
            label="핵심 기술 설명"
            placeholder="발명의 핵심 구성과 작동 방식을 간단히 설명해주세요"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <Title stepnum={2} title="출원인 정보" />

        <div className="flex flex-row gap-3 pl-10">
          <TextField
            labelSize={17}
            label="사명 (선택)"
            placeholder="EX) 그린폴리머(주)"
            gap={1.5}
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <TextField
            labelSize={17}
            label="의뢰인 (선택)"
            placeholder="담당자 또는 발명자 성명을 입력해주세요"
            gap={1.5}
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center justify-between">
          <Title
            stepnum={3}
            title="구성요소 분석"
            label="청구항을 구성요소 단위로 분해해 판단의 정밀성을 높힙니다."
          />

          <AICreationButton onClick={handleAICreate} />
        </div>

        {aiCreateError && <p className="ml-10 text-label-13 text-error-default">{aiCreateError}</p>}

        <div className="overflow-hidden border-y border-outline-default ml-10">
          <ElementList
            elements={elements}
            isLoading={isLoading}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <Title
          stepnum={4}
          title="추가 정보 입력하기 (선택)"
          label="알고 있는 정보가 있다면 입력해주세요. 작성 시 분석 결과 향상에 도움이 될 수 있어요"
        />

        <div className="flex flex-col gap-2 pl-10">
          <MoreInfoA label="타 선행기술 대비 차별점" />
          <MoreInfoB label="관련 데이터 수치" />
        </div>
      </div>

      <Footer disabled={!isReadyToStart} />

      {isModalOpen && (
        <PatentImportModal
          initialPatentNumber=""
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
