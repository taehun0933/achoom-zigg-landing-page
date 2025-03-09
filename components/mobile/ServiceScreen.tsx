"use client";

import { useEffect, useRef, useState } from "react";
import SpaceScreen from "./SpaceScreen";
import HistoryScreen from "./HistoryScreen";
import FeedbackScreen from "./FeedbackScreen";
import { useScrollRefs } from "@/context/scrollRef-context";

const ServiceScreen: React.FC = () => {
  const { serviceRef_mobile, contactRef_mobile } = useScrollRefs();

  const footerRef = useRef<HTMLImageElement | null>(null);
  const [isFooterTextVisible, setIsFooterTextVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
    };

    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsFooterTextVisible(true);
        }
      });
    }, observerOptions);

    if (footerRef.current) footerObserver.observe(footerRef.current);

    return () => {
      footerObserver.disconnect();
    };
  }, []);

  return (
    <div>
      <header
        className={`w-full flex flex-col mt-16 md:mt-36 items-center transition-all duration-700 relative`}
      >
        <div
          className="absolute -top-24 opacity-0"
          ref={serviceRef_mobile}
        ></div>
        <h1 className="font-semibold text-[24px] sm:text-[30px] md:text-[36px]">
          Service
        </h1>
        <span className="font-medium text-[16px] sm:text-[20px] md:text-[24px]">
          기능 소개
        </span>
      </header>
      <SpaceScreen />
      <HistoryScreen />
      <FeedbackScreen />
      {/* <footer className="bg-[#101E22] relative" ref={footerRef}>
        <img
          src="/images/footerBackground.png"
          alt="footerBackground"
          className="w-full h-[30vh] pointer-events-none"
        />
        <div
          className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center flex flex-col justify-center items-center gap-2 transition-opacity duration-700 ${
            isFooterVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-3xl sm:text-4xl font-bold">ZIGG</h1>
          <span className="text-sm sm:text-base font-semibold">
            공연예술의 시작과 끝을 함께
          </span>
        </div>
      </footer> */}
      <footer className="bg-[#101E22]" ref={footerRef}>
        <div className="relative" ref={contactRef_mobile}>
          <img
            src="/images/footerBackground.png"
            alt="footerBackground"
            className="w-full h-[30vh] pointer-events-none"
          />
          <div
            className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center  text-[12px] sm:text-[14px] md:text-[16px] w-full h-full flex justify-center items-center transition-opacity duration-700 ${
              isFooterTextVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-[10px] font-extralight">
                <div className="w-14 text-center">이메일</div>
                <div
                  className="font-normal border-b pointer-events-auto cursor-pointer"
                  onClick={() => {
                    // 기본 이메일 클라이언트를 열도록 함
                    window.location.href = "mailto:sw15achoom@gmail.com";
                  }}
                >
                  sw15achoom@gmail.com
                </div>
              </div>
              <div className="flex items-center gap-[10px] font-extralight">
                <div className="w-14 text-center">전 화</div>
                <div className="font-normal">010-9888-8389</div>
              </div>
              <div
                className="flex items-center gap-[10px] font-extralight"
                onClick={() => {
                  window.open(
                    "https://www.instagram.com/achoom_zigg",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                <div className="w-14 text-center">인스타</div>
                <div className="font-normal border-b pointer-events-auto cursor-pointer">
                  @achoom_zigg
                </div>
              </div>
              <div className="flex items-center gap-[10px] font-extralight">
                <div className="w-14 text-center">대표자</div>
                <div className="font-normal">김재형</div>
              </div>
            </div>

            <div className="flex flex-col">
              <h1 className="text-[32px] sm:text-[36px] md:text-[40px] font-bold">
                ZIGG
              </h1>
              <span className="hidden xs:block text-[16px] sm:text-[20px] md:text-[24px] font-semibold">
                공연예술의 시작과 끝을 함께
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServiceScreen;
