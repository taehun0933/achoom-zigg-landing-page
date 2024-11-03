// md 조건 -> 태블릿

import NavButtonContainer from "./NavButtonContainer";

// lg 조건 -> 데스크탑
const Header: React.FC = () => {
  return (
    <header className="fixed z-50 w-full h-[60px] lg:h-[68px] shadow-lg flex justify-between items-center px-4 lg:px-8 transition-all bg-white text-accent">
      <div className="font-bold text-3xl lg:text-4xl">ZIGG</div>
      <NavButtonContainer />
    </header>
  );
};

export default Header;
