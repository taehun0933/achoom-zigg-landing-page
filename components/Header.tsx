"use client";

// md 조건 -> 태블릿
// lg 조건 -> 데스크탑
const Header: React.FC = () => {
  return (
    <header className="w-full h-[60px] md:h-[64px] lg:h-[68px] shadow-lg flex justify-between items-center px-4 transition-all">
      <div className="font-bold text-3xl lg:text-4xl">ZIGG</div>
      <div className="flex"></div>
    </header>
  );
};

export default Header;
