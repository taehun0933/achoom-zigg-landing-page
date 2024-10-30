"use client";

import { useEffect, useRef, useState } from "react";
import FeedbackScreen from "./FeedbackScreen";
import HistoryScreen from "./HistoryScreen";
import SpaceScreen from "./SpaceScreen";

const ServiceScreen: React.FC = () => {
  const serviceHeaderRef = useRef<HTMLImageElement | null>(null);
  const [isServiceHeaderVisible, setIsServiceHeaderVisible] = useState(false);

  console.log(isServiceHeaderVisible);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1, // 요소가 10%만 뷰포트에 보여도 콜백이 실행
    };

    const serviceHeaderObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsServiceHeaderVisible(true);
        }
      });
    }, observerOptions);

    if (serviceHeaderRef.current)
      serviceHeaderObserver.observe(serviceHeaderRef.current);

    return () => {
      serviceHeaderObserver.disconnect();
    };
  }, []);

  return (
    <>
      <header
        ref={serviceHeaderRef}
        className={`w-full flex flex-col my-24 items-center transition-all duration-700 ${
          isServiceHeaderVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        <h1 className="font-semibold text-[52px]">Service</h1>
        <span className="font-medium text-[24px]">기능 소개</span>
      </header>
      <SpaceScreen />
      <HistoryScreen />
      <FeedbackScreen />
    </>
  );
};

export default ServiceScreen;
