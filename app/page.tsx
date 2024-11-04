"use client";

import Header from "@/components/Header";
import DesktopScreen from "@/components/desktop/DesktopScreen";
import MobileScreen from "@/components/mobile/MobileScreen";
import { useState } from "react";

export interface drawerProps {
  isOpen: boolean;
  setIsOpen: any;
  toggleDrawer: any;
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <Header
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toggleDrawer={toggleDrawer}
      />
      <div className="block lg:hidden">
        <MobileScreen
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          toggleDrawer={toggleDrawer}
        />
      </div>
      <div className="hidden lg:block">
        <DesktopScreen />
      </div>
    </>
  );
}
