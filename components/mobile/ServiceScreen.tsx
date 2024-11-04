"use client";

import { useEffect, useRef, useState } from "react";
import SpaceScreen from "./SpaceScreen";
import HistoryScreen from "./HistoryScreen";
import FeedbackScreen from "./FeedbackScreen";

const ServiceScreen: React.FC = () => {
  const serviceHeaderRef = useRef<HTMLImageElement | null>(null);
  const [isServiceHeaderVisible, setIsServiceHeaderVisible] = useState(false);

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

    if (serviceHeaderRef.current)
      serviceHeaderObserver.observe(serviceHeaderRef.current);

    return () => {
      serviceHeaderObserver.disconnect();
    };
  }, []);

  return (
    <div>
      <header
        ref={serviceHeaderRef}
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
    </div>
  );
};

export default ServiceScreen;
