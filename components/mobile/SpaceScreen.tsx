"use client";

import { useEffect, useRef, useState } from "react";

const SpaceScreen: React.FC = () => {
  const spaceNameArrowRef = useRef<HTMLImageElement | null>(null);
  const [isSpaceNameVisible, setIsSpaceNameVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const spaceNameObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsSpaceNameVisible(true);
        }
      });
    }, observerOptions);

    if (spaceNameArrowRef.current)
      spaceNameObserver.observe(spaceNameArrowRef.current);

    return () => {
      spaceNameObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-center mt-12 px-9">
        <div
          className={`flex flex-col w-full items-center gap-10 transition-all duration-700  ${
            isSpaceNameVisible
              ? "transform translate-y-0 opacity-100"
              : "transform translate-y-10 opacity-0"
          }`}
          ref={spaceNameArrowRef}
        >
          <img
            src="/images/mobile/spaceText.png"
            alt="spaceText"
            className="w-[70%] max-w-[400px]"
          />
          <div className="w-full flex justify-center">
            <img
              src="/images/mobile/spaceMockup.png"
              alt="spaceMockup"
              className="w-full max-w-[650px]"
            />
          </div>
        </div>
      </div>
      <img src="/images/space_background.png" alt="spaceBackground" />
    </>
  );
};

export default SpaceScreen;
