"use client";

import { drawerProps } from "@/app/page";
import OnboardingScreen from "./OnBoardingScreen";
import ServiceScreen from "./ServiceScreen";

const MobileScreen: React.FC<drawerProps> = ({ setIsOpen }) => {
  return (
    <div
      onClick={() => {
        setIsOpen(false);
      }}
      className="pointer-events-auto"
    >
      <OnboardingScreen />
      <ServiceScreen />
    </div>
  );
};

export default MobileScreen;
