import { useScrollRefs } from "@/context/scrollRef-context";
import { useEffect, useRef, useState } from "react";

const FeedbackScreen: React.FC = () => {
  const { feedbackRef_mobile } = useScrollRefs();

  const feedbackSectionRef = useRef<HTMLImageElement | null>(null);
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

    if (feedbackSectionRef.current)
      feedbackObserver.observe(feedbackSectionRef.current);

    return () => {
      feedbackObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative -mt-[150px] -z-10 bg-[#101E22] pt-[60%] pb-32">
      <img
        src="/images/feedbackBackground.png"
        alt="feedbackBackground"
        className="absolute top-0 pointer-events-none"
      />
      <div className="relative -top-24" ref={feedbackRef_mobile}></div>
      <div className="flex flex-col items-center px-9">
        <div
          className={`flex flex-col w-full items-center gap-10 transition-all duration-700 ${
            isFeedbackVisible
              ? "transform translate-y-0 opacity-100"
              : "transform translate-y-10 opacity-0"
          }`}
          ref={feedbackSectionRef}
        >
          <img
            src="/images/mobile/feedbackText.png"
            alt="feedbackText"
            className="w-[70%] max-w-[400px] pointer-events-none"
          />
          <div className="w-full flex justify-center">
            <img
              src="/images/mobile/feedbackMockup.png"
              alt="feedbackMockup"
              className="w-full max-w-[650px] pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackScreen;
