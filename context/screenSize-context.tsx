"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type ScreenSize = "MOBILE" | "DESKTOP" | null; // "TABLET"을 제거

interface ScreenSizeContextProps {
  screenSize: ScreenSize;
}

const ScreenSizeContext = createContext<ScreenSizeContextProps | undefined>(
  undefined
);

const MOBILE_MAX_WIDTH = 1024;

export const ScreenSizeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(null); // 초기값을 null로 설정

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= MOBILE_MAX_WIDTH) setScreenSize("MOBILE");
      else setScreenSize("DESKTOP"); // MOBILE_MAX_WIDTH 초과 시 DESKTOP으로 설정
    };

    handleResize(); // 초기 화면 크기 설정
    window.addEventListener("resize", handleResize); // 리사이즈 이벤트 감지
    return () => window.removeEventListener("resize", handleResize); // 클린업
  }, []);

  return (
    <ScreenSizeContext.Provider value={{ screenSize }}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

export const useScreenSize = (): ScreenSize => {
  const context = useContext(ScreenSizeContext);
  if (!context)
    throw new Error("useScreenSize must be used within a ScreenSizeProvider");
  return context.screenSize;
};
