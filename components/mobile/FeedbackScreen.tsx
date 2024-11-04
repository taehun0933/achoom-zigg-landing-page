import { useEffect, useRef, useState } from "react";

const FeedbackScreen: React.FC = () => {
  const feedbackRef = useRef<HTMLImageElement | null>(null);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const feedbackObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsFeedbackVisible(true);
        }
      });
    }, observerOptions);

    if (feedbackRef.current) feedbackObserver.observe(feedbackRef.current);

    return () => {
      feedbackObserver.disconnect();
    };
  }, []);

  return (
    <div>
      <img
        src="/images/feedbackBackground.png"
        alt="feedbackBackground"
        className="absolute mt-24"
      />
      <div className="flex flex-col items-center mt-12 px-9 relative">
        <div
          className={`flex flex-col w-full items-center gap-10 transition-all duration-700 ${
            isFeedbackVisible
              ? "transform translate-y-0 opacity-100"
              : "transform translate-y-10 opacity-0"
          }`}
          ref={feedbackRef}
        >
          <img
            src="/images/mobile/feedbackText.png"
            alt="feedbackText"
            className="w-[70%] max-w-[400px]"
          />
          <div className="w-full flex justify-center">
            <img
              src="/images/mobile/feedbackMockup.png"
              alt="feedbackMockup"
              className="w-full max-w-[650px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackScreen;
