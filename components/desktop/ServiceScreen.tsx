"use client";

import { useEffect, useRef, useState } from "react";
import FeedbackScreen from "./FeedbackScreen";
import HistoryScreen from "./HistoryScreen";
import SpaceScreen from "./SpaceScreen";
import { useScrollRefs } from "@/context/scrollRef-context";

const ServiceScreen: React.FC = () => {
  const { serviceRef, contactRef } = useScrollRefs();

  const serviceHeaderRef = useRef<HTMLImageElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [isServiceHeaderVisible, setIsServiceHeaderVisible] = useState(false);
  const [isFooterTextVisible, setIsFooterTextVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const serviceHeaderObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsServiceHeaderVisible(true);
        }
      });
    }, observerOptions);

    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsFooterTextVisible(true);
          }
        });
      },
      {
        threshold: 0.8,
      }
    );

    if (serviceHeaderRef.current)
      serviceHeaderObserver.observe(serviceHeaderRef.current);

    if (footerRef.current) footerObserver.observe(footerRef.current);

    return () => {
      serviceHeaderObserver.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  return (
    <div>
      <div className="absolute top-[100vh]" ref={serviceRef}></div>
      <header
        ref={serviceHeaderRef}
        className={`w-full flex flex-col my-24 items-center transition-all duration-700 ${
          isServiceHeaderVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="font-semibold text-[52px]">Service</h1>
        <span className="font-medium text-[24px]">기능 소개</span>
      </header>
      <SpaceScreen />
      <HistoryScreen />
      <FeedbackScreen />
      <footer className="bg-[#101E22]" ref={footerRef}>
        <div className="relative" ref={contactRef}>
          <img
            src="/images/footerBackground.png"
            alt="footerBackground"
            className="w-full max-h-[800px]"
          />
          <div
            className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center w-full h-full flex justify-center items-center gap-[20%] transition-opacity duration-700 ${
              isFooterTextVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-[100px] font-extralight">
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
              <div className="flex items-center gap-[100px] font-extralight">
                <div className="w-14 text-center">전 화</div>
                <div className="font-normal">010-9888-8389</div>
              </div>
              <div
                className="flex items-center gap-[100px] font-extralight"
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
              <div className="flex items-center gap-[100px] font-extralight">
                <div className="w-14 text-center">대표자</div>
                <div className="font-normal">김재형</div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-5xl font-bold">ZIGG</h1>
              <span className="text-lg font-semibold">
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
