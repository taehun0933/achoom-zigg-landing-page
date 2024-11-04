import { useScrollRefs } from "@/context/scrollRef-context";
import NavButton from "./NavButton";
import { RxHamburgerMenu } from "react-icons/rx";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

export interface NavButtonContainerProps {
  isOpen: boolean;
  setIsOpen: any;
  toggleDrawer: any;
}

const NavButtonContainer: React.FC<NavButtonContainerProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const {
    contactRef,
    feedbackRef,
    historyRef,
    scrollToRef,
    serviceRef,
    spaceRef,
    contactRef_mobile,
    feedbackRef_mobile,
    historyRef_mobile,
    serviceRef_mobile,
    spaceRef_mobile,
  } = useScrollRefs();

  return (
    <div>
      <div className="block lg:hidden">
        <RxHamburgerMenu
          size={24}
          onClick={() => {
            setIsOpen(true);
          }}
          className="pointer-events-auto"
        />
        <Drawer
          open={isOpen}
          direction="top"
          enableOverlay={false}
          zIndex={100}
          className="absolute top-0 border-t-8 border-accent text-black font-medium text-[12px] sm:text-[14px] md:text-[16px]"
          size={200}
        >
          <div className="w-full h-full">
            <div
              onClick={() => {
                scrollToRef(serviceRef_mobile);
              }}
              className="mx-5 h-1/5 flex justify-center items-center border-b font-semibold text-[14px] sm:text-[16px] md:text-[18px]"
            >
              기능 소개
            </div>
            <div
              onClick={() => {
                scrollToRef(spaceRef_mobile);
              }}
              className="mx-5 h-1/5 flex justify-center items-center border-b"
            >
              스페이스
            </div>
            <div
              onClick={() => {
                scrollToRef(historyRef_mobile);
              }}
              className="mx-5 h-1/5 flex justify-center items-center border-b"
            >
              히스토리
            </div>
            <div
              onClick={() => {
                scrollToRef(feedbackRef_mobile);
              }}
              className="mx-5 h-1/5 flex justify-center items-center border-b"
            >
              피드백
            </div>
            <div
              onClick={() => {
                scrollToRef(contactRef_mobile);
              }}
              className="mx-5 h-1/5 flex justify-center items-center font-semibold text-[14px] sm:text-[16px] md:text-[18px]"
            >
              contact
            </div>
          </div>
        </Drawer>
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
