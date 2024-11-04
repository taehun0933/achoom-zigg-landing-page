// md 조건 -> 태블릿
import NavButtonContainer from "./NavButtonContainer";
import { drawerProps } from "@/app/page";

// lg 조건 -> 데스크탑
const Header: React.FC<drawerProps> = ({ isOpen, setIsOpen, toggleDrawer }) => {
  return (
    <header className="fixed z-50 w-full h-[60px] lg:h-[68px] shadow-lg flex justify-between items-center px-4 lg:px-8 transition-all bg-white text-accent pointer-events-auto">
      <div className="font-bold text-3xl lg:text-4xl">ZIGG</div>
      <NavButtonContainer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toggleDrawer={toggleDrawer}
      />
    </header>
  );
};

export default Header;
