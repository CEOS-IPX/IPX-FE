"use client";

import { useState } from "react";
import Title from "@/components/search/SearchTitle";
import { TextField } from "@/components/ui/TextField";
import { TextArea } from "@/components/ui/TextArea";
import { AICreationButton } from "@/components/ui/AI_Creation_Button";
import { ElementList, type Element } from "@/components/search/ElementList/ElementList";
import { Checklist } from "@/components/search/Checklist";
import { Footer } from "@/components/search/Footer";
import { PatentImportModal } from "@/components/search/PatentImportModal";
import { Button } from "@/components/ui/Button";

export default function SearchPage() {
  const [elements, setElements] = useState<Element[]>([
    { id: crypto.randomUUID(), name: "", description: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => {
    setElements((prev) => [...prev, { id: crypto.randomUUID(), name: "", description: "" }]);
  };

  const handleDelete = (id: string) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
  };

  const handleChange = (id: string, field: "name" | "description", value: string) => {
    setElements((prev) => prev.map((el) => (el.id === id ? { ...el, [field]: value } : el)));
  };

  const handleAICreate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setElements([
        {
          id: crypto.randomUUID(),
          name: "생분해성 베이스 수지",
          description: "PLA·PBAT 블렌드 폴리에스터",
        },
        {
          id: crypto.randomUUID(),
          name: "표면개질 나노 충전제",
          description: "실란 처리된 무기 나노입자",
        },
        {
          id: crypto.randomUUID(),
          name: "무용제 수계 분산 공정",
          description: "유기용제 없이 수계 분산으로 코팅층 형성",
        },
        {
          id: crypto.randomUUID(),
          name: "UV 경화 기교",
          description: "자외선 경화형 가교제에 의한 표면 가교",
        },
      ]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-13 px-20 pb-5">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <Title stepnum={1} title="발명 정보" />
          <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(true)}>
            특허 번호로 불러오기
          </Button>
        </div>

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

      <div className="flex flex-col gap-5">
        <Title stepnum={2} title="출원인 정보" />
        <div className="flex flex-row gap-3">
          <TextField label="사명 (선택)" placeholder="EX) 그린폴리머(주)" />
          <TextField label="의뢰인 (선택)" placeholder="담당자 또는 발명자 성명을 입력해주세요" />
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

        <div className="overflow-hidden border-y border-outline-default">
          <ElementList
            elements={elements}
            isLoading={isLoading}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onChange={handleChange}
          />
        </div>

        <Checklist />
      </div>

      <Footer />

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
