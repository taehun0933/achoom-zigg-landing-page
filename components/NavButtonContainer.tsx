"use client";

import { useScrollRefs } from "@/context/scrollRef-context";
import NavButton from "./NavButton";
import { RxHamburgerMenu } from "react-icons/rx";

const NavButtonContainer: React.FC = () => {
  const {
    contactRef,
    feedbackRef,
    historyRef,
    scrollToRef,
    serviceRef,
    spaceRef,
  } = useScrollRefs();

  return (
    <div>
      <div className="block lg:hidden">
        <RxHamburgerMenu size={24} />
      </div>
      <div className="hidden lg:flex gap-3 lg:gap-4 pointer-events-auto">
        <NavButton
          onClick={() => {
            scrollToRef(serviceRef);
          }}
          title="기능 소개"
          largeButton
        />
        <NavButton
          onClick={() => {
            scrollToRef(spaceRef);
          }}
          title="스페이스"
        />
        <NavButton
          onClick={() => {
            scrollToRef(historyRef);
          }}
          title="히스토리"
        />
        <NavButton
          onClick={() => {
            scrollToRef(feedbackRef);
          }}
          title="피드백"
        />
        <NavButton
          onClick={() => {
            scrollToRef(contactRef);
          }}
          title="contact"
          largeButton
        />
      </div>
    </div>
  );
};

export default NavButtonContainer;
