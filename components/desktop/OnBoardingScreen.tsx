"use client";

const OnboardingScreen: React.FC = () => {
  return (
    <div className="relative w-full h-[100vh]">
      <img
        src="/images/background.png"
        alt="background"
        className="w-full h-[70%] max-h-[800px] object-fill absolute"
      />
      <img
        src="/images/onboarding_mockup.png"
        alt="mockup"
        className="w-1/3 max-w-[500px] absolute right-[16%] top-[20%] animate-float"
      />
      <div className="absolute w-1/3 max-w-[500px] left-[16%] top-[40%]">
        <img src="/images/onboardingText.png" alt="onboardingText" />
        <div className="flex mt-6 gap-2">
          <img
            src="/images/googlePlay.png"
            alt="googlePlay"
            className="w-36 pointer-events-auto cursor-pointer"
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
            className="w-36 pointer-events-auto cursor-pointer"
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
