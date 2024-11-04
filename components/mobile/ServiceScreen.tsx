"use client";

import { useEffect, useRef, useState } from "react";
import SpaceScreen from "./SpaceScreen";
import HistoryScreen from "./HistoryScreen";
import FeedbackScreen from "./FeedbackScreen";

const ServiceScreen: React.FC = () => {
  const footerRef = useRef<HTMLImageElement | null>(null);
  const [isFooterVisible, setIsFooter] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
    };

    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsFooter(true);
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
        className={`w-full flex flex-col mt-16 md:mt-36 items-center transition-all duration-700`}
      >
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
      <footer className="bg-[#101E22] relative" ref={footerRef}>
        <img
          src="/images/footerBackground.png"
          alt="footerBackground"
          className="w-full"
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
      </footer>
    </div>
  );
};

export default ServiceScreen;
