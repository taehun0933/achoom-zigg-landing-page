const ServiceScreen: React.FC = () => {
  return (
    <div className="relative w-full flex flex-col pt-40">
      <header className="w-full flex flex-col items-center mb-40">
        <h1 className="font-semibold text-[52px] 2xl:text-[64px]">Service</h1>
        <span className="font-medium text-[24px] 2xl:text-[28px]">
          기능 소개
        </span>
      </header>

      <div className="w-full flex justify-center">
        <div className="relative">
          <img
            src="/images/spaceNameEnter.png"
            alt="spaceNameEnter"
            className="max-w-[500px]"
          />
          {/* 스페이스명 입력 안내 섹션. 해당 영역까지 스크롤 시, 우측에서 fade-in 효과 적용 */}
          <img
            src="/images/spaceNameArrow.png"
            alt="spaceNameArrow"
            className="max-w-[700px] absolute top-[8.5%] left-[45%]"
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
            alt="spaceMemberInvite"
            className="max-w-[400px] absolute top-[61%] right-[100%]"
          />
        </div>
      </div>

      <img src="/images/space_background.png" alt="spaceBackground" />
    </div>
  );
};

export default ServiceScreen;
