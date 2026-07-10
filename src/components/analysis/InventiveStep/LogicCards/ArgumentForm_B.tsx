import ArgumentFormHeader from "./Header";
import { TextArea } from "@/components/ui/TextArea";

export default function ArgumentFormB() {
  return (
    <div className="w-full p-6 flex flex-col gap-6 bg-bg-surface border border-outline-sub rounded-lg">
      <ArgumentFormHeader title="복수인용발명결합" subtitle="Teaching Away 논리" />

      <div className="flex flex-col gap-5">
        <TextArea
          labelSize={15}
          label="배경기술의 한계"
          placeholder="종래기술의 한계를 발명의 해결 방향과 반대로 정리합니다."
          rows={2}
          className="h-18"
        />
        <TextArea
          labelSize={15}
          label="결합 동기의 부재 (Teaching Away)"
          placeholder="D1과 D2가 서로 반대 방향으로 가르쳐 결합 동기가 없음을 논증합니다."
          rows={2}
          className="h-18"
        />
      </div>
    </div>
  );
}
