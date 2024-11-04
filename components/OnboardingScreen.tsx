const OnboardingScreen: React.FC = () => {
  return (
    <div className="relative w-full h-[100vh]">
      <img
        src="/images/background.png"
        alt="background"
        className="w-full absolute pointer-events-none"
      />
      <img
        src="/images/onboarding_mockup.png"
        alt="mockup"
        className="w-1/3 absolute right-[10%] top-[20%] pointer-events-none"
      />
    </div>
  );
};

export default OnboardingScreen;
