"use client";

import { useScrollRefs } from "@/context/scrollRef-context";
import { useEffect, useRef, useState } from "react";

const SpaceScreen: React.FC = () => {
  const { spaceRef } = useScrollRefs();

  const spaceNameArrowRef = useRef<HTMLImageElement | null>(null);
  const memberInviteArrowRef = useRef<HTMLImageElement | null>(null);
  const [isSpaceNameVisible, setIsSpaceNameVisible] = useState(false);
  const [isMemberInviteVisible, setIsMemberInviteVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1, // 요소가 10%만 뷰포트에 보여도 콜백이 실행
    };

    const spaceNameObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsSpaceNameVisible(true);
        }
      });
    }, observerOptions);

    const memberInviteObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsMemberInviteVisible(true);
        }
      });
    }, observerOptions);

    if (spaceNameArrowRef.current)
      spaceNameObserver.observe(spaceNameArrowRef.current);
    if (memberInviteArrowRef.current)
      memberInviteObserver.observe(memberInviteArrowRef.current);

    return () => {
      spaceNameObserver.disconnect();
      memberInviteObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full flex flex-col pt-40" ref={spaceRef}>
      <div className="w-full flex justify-center">
        <div className="relative">
          <img
            src="/images/spaceNameEnter.png"
            alt="spaceNameEnter"
            className="max-w-[500px]"
          />
          <img
            src="/images/spaceNameArrow.png"
            alt="spaceNameArrow"
            ref={spaceNameArrowRef}
            className={`max-w-[700px] absolute top-[6.5%] left-[45%] transition-all duration-700 ${
              isSpaceNameVisible
                ? "transform translate-x-0 opacity-100"
                : "transform translate-x-10 opacity-0"
            }`}
          />
        </div>

        <div className="relative top-[500px]">
          <img
            src="/images/spaceMemberInvite.png"
            alt="spaceMemberInvite"
            className="max-w-[500px]"
          />
          <img
            src="/images/memberInviteArrow.png"
            alt="memberInviteArrow"
            ref={memberInviteArrowRef}
            className={`max-w-[400px] absolute top-[61%] right-[100%] transition-all duration-700 ${
              isMemberInviteVisible
                ? "transform translate-x-0 opacity-100"
                : "transform -translate-x-10 opacity-0"
            }`}
          />
        </div>
      </div>

      <img src="/images/space_background.png" alt="spaceBackground" />
    </div>
  );
};

export default SpaceScreen;
