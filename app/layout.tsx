import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { ScreenSizeProvider } from "@/context/screenSize-context";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "ZIGG",
  description: "by Team Achoom",
  icons: "../app/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} overflow-x-hidden antialiased`}>
        <ScreenSizeProvider>
          <Header />
          {children}
        </ScreenSizeProvider>
      </body>
    </html>
  );
}
