"use client";

import React, {
  createContext,
  useContext,
  useRef,
  ReactNode,
  RefObject,
} from "react";

interface ScrollRefContextProps {
  serviceRef: RefObject<HTMLDivElement>;
  spaceRef: RefObject<HTMLDivElement>;
  historyRef: RefObject<HTMLDivElement>;
  feedbackRef: RefObject<HTMLDivElement>;
  contactRef: RefObject<HTMLDivElement>;
  scrollToRef: (ref: RefObject<HTMLDivElement>) => void; // 부드러운 스크롤 메소드
}

const ScrollRefContext = createContext<ScrollRefContextProps | undefined>(
  undefined
);

export const ScrollRefProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // 각 ref를 생성합니다.
  const serviceRef = useRef<HTMLDivElement>(null);
  const spaceRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // 부드럽게 스크롤하는 메소드
  const scrollToRef = (ref: RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <ScrollRefContext.Provider
      value={{
        serviceRef,
        spaceRef,
        historyRef,
        feedbackRef,
        contactRef,
        scrollToRef,
      }}
    >
      {children}
    </ScrollRefContext.Provider>
  );
};

// useScrollRefs 훅을 통해 각 ref를 사용할 수 있도록 함
export const useScrollRefs = (): ScrollRefContextProps => {
  const context = useContext(ScrollRefContext);
  if (!context)
    throw new Error("useScrollRefs must be used within a ScrollRefProvider");
  return context;
};
