"use client";

const OnboardingScreen: React.FC = () => {
  return (
    <div className="relative w-full h-[100vh]">
      <img
        src="/images/background.png"
        alt="background"
        className="w-full h-[500px] xl:h-[600px] 3xl:h-[800px] object-fill absolute transition-all duration-1000"
      />
      <img
        src="/images/onboarding_mockup.png"
        alt="mockup"
        className="w-1/3 max-w-[600px] absolute right-[16%] top-[55%] animate-float"
      />
      <div className="absolute w-1/3 max-w-[450px] left-[16%] top-[36%]">
        <img src="/images/onboardingText.png" alt="onboardingText" />
        <div className="flex mt-6 gap-2">
          <img
            src="/images/googlePlay.png"
            alt="googlePlay"
            className="w-40 pointer-events-auto cursor-pointer"
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
            className="w-40 pointer-events-auto cursor-pointer"
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
    </div>
  );
};

export default OnboardingScreen;
