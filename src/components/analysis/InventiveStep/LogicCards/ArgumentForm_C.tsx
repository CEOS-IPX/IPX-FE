import ArgumentFormHeader from "./Header";
import { TextArea } from "@/components/ui/TextArea";

export default function ArgumentFormC() {
  return (
    <div className="w-full p-6 flex flex-col gap-5 bg-bg-surface border border-outline-sub rounded-lg">
      <ArgumentFormHeader title="주지관용기술" subtitle="주지관용기술 반박 논리" />

      <div className="flex flex-col gap-5">
        <TextArea
          labelSize={15}
          label="거절 또는 예상 거절 사유 (주지관용기술 주장 대상)"
          placeholder="EX) 구성요소 B(표면개질 나노 충진제)를 단순 주지관용기술로 봄."
          rows={2}
          className="h-18"
        />
        <TextArea
          labelSize={15}
          label="주지관용기술이 아님을 입증하는 반박 논리"
          placeholder="해당 구성이 관용적으로 채택되는 것이 아님을 입증하는 반박 논리를 작성합니다."
          rows={2}
          className="h-18"
        />
      </div>
    </div>
  );
}
