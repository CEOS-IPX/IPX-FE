import { TextField } from "@/components/ui/TextField";

export default function GoogleSignupPage() {
  return (
    <div className="flex max-w-125 flex-1 flex-col items-start justify-center gap-10 self-stretch">
      <h1 className="w-full text-headline-emphasis-28 text-title-primary">회원정보</h1>

      <div className="flex w-full flex-col items-start gap-4">
        <TextField
          label="이름"
          disabled
          className="cursor-default bg-bg-neutral-hover disabled:opacity-100"
        />
        <TextField label="회사명 (선택)" placeholder="회사명을 입력해주세요 (선택)" />
      </div>
    </div>
  );
}
