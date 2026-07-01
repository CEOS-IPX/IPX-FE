"use client";

import { Button } from "@/components/ui/Button";

type CompleteStepProps = {
  onGoLogin: () => void;
};

export const CompleteStep = ({ onGoLogin }: CompleteStepProps) => {
  return (
    <div className="flex max-w-125 flex-1 flex-col items-start justify-center gap-10 self-stretch">
      <div className="flex w-full flex-col items-start gap-2">
        <h1 className="text-headline-emphasis-28 text-gray-10">회원가입이 완료되었습니다</h1>
        <p className="text-body-19 text-gray-30">
          IPX에 오신 것을 환영합니다. 지금 바로 첫 탐색을 시작하세요!
        </p>
      </div>
      <Button variant="primary" onClick={onGoLogin}>
        로그인
      </Button>
    </div>
  );
};
