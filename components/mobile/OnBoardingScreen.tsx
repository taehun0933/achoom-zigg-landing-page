"use client";

const OnboardingScreen: React.FC = () => {
  return (
    <div className="relative w-full min-h-[100vh] pt-[90px] flex flex-col items-center px-9">
      <div className="flex flex-col max-w-[600px] mb-4">
        <img
          src="/images/mobile/onboardingLogo.png"
          alt="background"
          className="ml-2 transition-all duration-500 w-[250px] sm:w-[300px] md:w-[350px] pointer-events-none"
        />
        <div className="w-full font-medium text-sm leading-5 sm:text-base sm:leading-6 md:text-lg md:leading-7">
          ZIGG는 공연예술 분야 및 메신저 앱에서 경험하던 불편함을 개선하고 영상
          및 피드백을 한눈에 확인할 수 있으며, 더 나아가 피드백을 주고 받는 과정
          속 유용한 도구들을 제공하는 서비스입니다.
        </div>
        <div className="relative flex w-full mt-4 gap-2 justify-end">
          <img
            src="/images/googlePlay.png"
            alt="googlePlay"
            className="w-28 md:w-36 pointer-events-auto cursor-pointer hover:scale-[102%]"
            onClick={() => {
              window.open(
                "https://play.google.com/store/apps/details?id=com.achoom.ZIGG&pcampaignid=web_share",
                "_blank",
                "noopener,noreferrer"
              );
            }}
          />
          <img
            src="/images/appStore.png"
            alt="appStore"
            className="w-28 md:w-36 pointer-events-auto cursor-pointer hover:scale-[102%]"
            onClick={() => {
              window.open(
                "https://apps.apple.com/kr/app/zigg/id6670358731",
                "_blank",
                "noopener,noreferrer"
              );
            }}
          />
        </div>
      </div>
      <img
        src="/images/background.png"
        alt="background"
        className="absolute w-[100vw] top-[45%] left-0 -z-10 pointer-events-none"
      />

      <img
        src="/images/onboarding_mockup.png"
        alt="mockup"
        className="w-full max-w-[600px] mt-6 animate-float-mobile pointer-events-none"
      />
    </div>
  );
};

export default OnboardingScreen;
