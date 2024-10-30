"use client";

import { useEffect, useRef, useState } from "react";
import FeedbackScreen from "./FeedbackScreen";
import HistoryScreen from "./HistoryScreen";
import SpaceScreen from "./SpaceScreen";
import { FiMail } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";

const ServiceScreen: React.FC = () => {
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
    <>
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
      <footer className="bg-black relative -z-10 bottom-1" ref={footerRef}>
        <div className="relative">
          <img
            src="/images/footerBackground.png"
            alt="footerBackground"
            className="w-full h-auto"
          />
          {/* 여기 적용 */}
          <div
            className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center flex flex-col gap-2 transition-opacity duration-700 ${
              isFooterTextVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="text-5xl font-bold">ZIGG</h1>
            <span className="text-lg font-semibold">
              공연예술의 시작과 끝을 함께
            </span>
          </div>
        </div>
        <div
          className="py-4 bg-white flex justify-center items-center pointer-events-auto"
          style={{ userSelect: "text" }}
        >
          <div className="flex gap-2 items-center justify-center w-60">
            <FiMail size={40} />
            <span className="text-lg font-semibold">swachoom@gmail.com</span>
          </div>
          <div className="flex gap-2 items-center justify-center w-60">
            <IoCallOutline size={40} />
            <span className="text-lg font-semibold">010-9887-8389</span>
          </div>
          <div className="flex gap-2 items-center justify-center w-60 mr-[2%]">
            <FaInstagram size={40} />
            <span className="text-lg font-semibold mr-12">지그계정아이디</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ServiceScreen;
