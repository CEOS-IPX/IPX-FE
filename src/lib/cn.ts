import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// 프로젝트 커스텀 폰트 스케일(globals.css의 --text-* 토큰). tailwind-merge는 이 스케일을 몰라서
// text-label-13 같은 클래스를 text-color로 오인해 text-primary-default 등과 충돌시켜 지워버림.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display-40",
        "headline-24",
        "headline-28",
        "headline-32",
        "headline-emphasis-24",
        "headline-emphasis-28",
        "headline-emphasis-32",
        "headline-emphasis-46",
        "title-18",
        "title-20",
        "title-22",
        "title-emphasis-18",
        "title-emphasis-20",
        "title-emphasis-22",
        "body-15",
        "body-17",
        "body-19",
        "body-emphasis-15",
        "body-emphasis-17",
        "body-emphasis-19",
        "label-13",
        "label-15",
        "label-17",
        "label-emphasis-13",
        "label-emphasis-15",
        "label-emphasis-17",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
