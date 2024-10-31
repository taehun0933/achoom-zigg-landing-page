import { useEffect, useRef, useState } from "react";

const FeedbackScreen: React.FC = () => {
  const arrowRef = useRef<HTMLImageElement | null>(null);
  const checkArrowRef = useRef<HTMLImageElement | null>(null);
  const verticalArrowRef = useRef<HTMLImageElement | null>(null);
  const feedbackExplainRef = useRef<HTMLImageElement | null>(null);

  const [isArrowVisible, setIsArrowVisible] = useState(false);
  const [isCheckArrowVisible, setIsCheckArrowVisible] = useState(false);
  const [isVerticalArrowVisible, setIsVerticalArrowVisible] = useState(false);
  const [isFeedbackExplainVisible, setIsFeedbackExplainVisible] =
    useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const arrowObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsArrowVisible(true);
        }
      });
    }, observerOptions);

    const checkArrowObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsCheckArrowVisible(true);
        }
      });
    }, observerOptions);

    const verticalArrowObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVerticalArrowVisible(true);
        }
      });
    }, observerOptions);

    const feedbackExplainObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsFeedbackExplainVisible(true);
        }
      });
    }, observerOptions);

    if (arrowRef.current) arrowObserver.observe(arrowRef.current);
    if (checkArrowRef.current)
      checkArrowObserver.observe(checkArrowRef.current);
    if (verticalArrowRef.current)
      verticalArrowObserver.observe(verticalArrowRef.current);
    if (feedbackExplainRef.current)
      feedbackExplainObserver.observe(feedbackExplainRef.current);

    return () => {
      arrowObserver.disconnect();
      checkArrowObserver.disconnect();
      feedbackExplainObserver.disconnect();
      verticalArrowObserver.disconnect();
    };
  }, []);

  return (
    <div className="bg-[#101E22]">
      <img src="/images/feedbackBackground.png" alt="feedbackBackground" />
      <div className="relative transition-all bottom-[200px] xl:bottom-[300px] w-full flex flex-col items-center">
        <div className="relative">
          {/* 위에서 아래로 페이드인 */}
          <img
            src="/images/feedbackCreateArrow.png"
            alt="spaceMemberInvite"
            ref={arrowRef}
            className={`max-w-[900px] absolute -top-[54%] right-[1.5%] transition-all duration-700 ${
              isArrowVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          />
          <img
            src="/images/feedbackMockup1.png"
            alt="feedbackMockup"
            className="max-w-[1000px]"
          />
        </div>
        <div className="w-full flex justify-center mt-40 mb-[650px]">
          <div className="relative">
            <img
              src="/images/feedbackMockup2.png"
              alt="feedbackMockup2"
              className="max-w-[500px]"
            />
            {/* 왼쪽에서 오른쪽으로 페이드인 */}
            <img
              src="/images/feedbackCheckArrow.png"
              alt="feedbackCheckArrow.png"
              ref={checkArrowRef}
              className={`max-w-[450px] absolute top-[29%] left-[70%] transition-all duration-700 ${
                isCheckArrowVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            />
          </div>

          <div className="relative top-[500px]">
            <img
              src="/images/feedbackMockup3.png"
              alt="feedbackMockup3"
              className="max-w-[500px]"
            />
            {/* 왼쪽에서 오른쪽으로 페이드인 */}
            <img
              src="/images/verticalFeedbackArrow.png"
              alt="verticalFeedbackArrow"
              ref={verticalArrowRef}
              className={`max-w-[400px] absolute top-[56%] right-[93%] transition-all duration-700 ${
                isVerticalArrowVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            />
          </div>
        </div>

        <img
          src="/images/feedbackMockup4.png"
          alt="feedbackMockup"
          className="max-w-[1000px]"
        />

        {/* opacity 변화 */}
        <img
          src="/images/feedbackExplain.png"
          alt="feedbackMockup"
          ref={feedbackExplainRef}
          className={`max-w-[700px] relative right-[2.5%] my-8 transition-opacity duration-700 ${
            isFeedbackExplainVisible ? "opacity-100" : "opacity-0"
          }`}
        />

        <img
          src="/images/feedbackMockup5.png"
          alt="feedbackMockup"
          className="max-w-[1000px]"
        />
      </div>
    </div>
  );
};

export default FeedbackScreen;
