import type { Metadata } from "next";
import Image from "next/image";
import LogoIpxFigure from "@/components/icons/logo-ipx-figure.svg";
import LogoIpxChar from "@/components/icons/logo-ipx-char.svg";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full">
      <div className="relative w-1/2 overflow-hidden rounded-[20px] my-5 ml-5">
        <Image
          src="/img/img-auth-graphic.png"
          alt="auth graphic"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white">
          <LogoIpxFigure width={40} height={40} />
          <div className="flex flex-col gap-5">
            <p className="text-headline-32">
              교차하는 가치 <br />
              새로운 연결
            </p>
            <p className="text-body-17">
              IPX는 데이터 를 활용하여 발명자의 노력이 오롯이 인정받을 수 있도록 출원에
              <br />
              필요한 요소들을 검토해주고, 흩어진 정보를 하나로 모아 비즈니스 아이디어와
              <br /> 성장의 시작을 만들어갑니다.
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-1/2 flex-col">
        <div className="pt-6 px-8">
          <LogoIpxChar width={64} height={20} />
        </div>
        <div className="flex flex-1 items-center justify-center px-20 py-15">{children}</div>
      </div>
    </div>
  );
}
