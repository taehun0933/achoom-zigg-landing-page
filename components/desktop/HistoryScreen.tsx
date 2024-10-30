"use client";

import { useEffect, useRef, useState } from "react";

const HistoryScreen: React.FC = () => {
  const historyEnterArrowRef = useRef<HTMLImageElement | null>(null);
  const historyCreateArrowRef = useRef<HTMLImageElement | null>(null);
  const [isHistoryEnterArrowVisible, setIsHistoryEnterArrowVisible] =
    useState(false);
  const [isHistoryCreateArrowVisible, setIsHistoryCreateArrowVisible] =
    useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1, // 요소가 10%만 뷰포트에 보여도 콜백이 실행
    };

    const historyEnterArrowObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsHistoryEnterArrowVisible(true);
        }
      });
    }, observerOptions);

    const historyCreateArrowObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsHistoryCreateArrowVisible(true);
        }
      });
    }, observerOptions);

    if (historyEnterArrowRef.current)
      historyEnterArrowObserver.observe(historyEnterArrowRef.current);
    if (historyCreateArrowRef.current)
      historyCreateArrowObserver.observe(historyCreateArrowRef.current);

    return () => {
      historyEnterArrowObserver.disconnect();
      historyCreateArrowObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full flex flex-col pt-40">
      <div className="w-full flex justify-center">
        <div className="relative top-[650px]">
          <img
            src="/images/historyCreate.png"
            alt="historyCreate"
            className="max-w-[500px]"
          />
          <img
            ref={historyEnterArrowRef}
            src="/images/historyCreateArrow.png"
            alt="historyEnterArrow"
            className={`max-w-[400px] absolute top-[55%] left-[91%] transition-all duration-700 ${
              isHistoryEnterArrowVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          />
        </div>

        <div className="relative">
          <img
            src="/images/historyEnter.png"
            alt="spaceMemberInvite"
            className="max-w-[500px]"
          />
          <img
            ref={historyCreateArrowRef}
            src="/images/historyEnterArrow.png"
            alt="historyEnterArrow"
            className={`max-w-[450px] absolute top-[12%] right-[98%] transition-all duration-700 ${
              isHistoryCreateArrowVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          />
        </div>
      </div>

      <img
        src="/images/historyBackground.png"
        alt="historyBackground"
        className="mt-[400px]"
      />
    </div>
  );
};

export default HistoryScreen;
