"use client";

import { useScreenSize } from "@/context/screenSize-context";
import NavButton from "./NavButton";
import { RxHamburgerMenu } from "react-icons/rx";

const NavButtonContainer: React.FC = () => {
  const screenMode = useScreenSize();

  if (screenMode === null) return null;

  // 모바일 전용 햄버거 바
  if (screenMode === "MOBILE") return <RxHamburgerMenu size={24} />;

  return (
    <div className="flex gap-3 lg:gap-4 pointer-events-auto">
      <NavButton onClick={() => {}} title="기능 소개" largeButton />
      <NavButton onClick={() => {}} title="스페이스" />
      <NavButton onClick={() => {}} title="히스토리" />
      <NavButton onClick={() => {}} title="피드백" />
      <div></div>
      <NavButton onClick={() => {}} title="contact" largeButton />
    </div>
  );
};

export default NavButtonContainer;
