import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ScrollRefProvider } from "@/context/scrollRef-context";
import { url } from "inspector";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const TITLE = "ZIGG | 지그";
const DESCRIPTION =
  "ZIGG는 공연예술 분야 및 메신저 앱에서 경험하던 불편함을 개선하고 영상 및 피드백을 한눈에 확인할 수 있으며, 더 나아가 피드백을 주고 받는 과정 속 유용한 도구들을 제공하는 서비스입니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  icons: "../app/favicon.ico",
  keywords: [
    "지그",
    "ZIGG",
    "지그",
    "댄서",
    "인플루언서",
    "댄스",
    "춤",
    "공연",
    "공연연습",
    "춤연습",
    "안무연습",
    "단체연습",
    "활동",
    "단체활동",
    "피드백",
    "커뮤니티",
    "촬영",
    "동영상",
    "비디오",
    "소셜",
    "저장소",
    "공연예술",
    "플랫폼",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: TITLE,
    locale: "ko_KR",
    type: "website",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} overflow-x-hidden antialiased`}>
        <ScrollRefProvider>{children}</ScrollRefProvider>
      </body>
    </html>
  );
}
