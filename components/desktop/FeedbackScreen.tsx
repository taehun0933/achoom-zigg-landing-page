const FeedbackScreen: React.FC = () => {
  return (
    <div className="bg-[#101E22]">
      <img src="/images/feedbackBackground.png" alt="feedbackBackground" />
      <div className="relative bottom-[300px] w-full flex flex-col items-center">
        <div className="relative">
          {/* 위에서 아래로 페이드인 */}
          <img
            src="/images/feedbackCreateArrow.png"
            alt="spaceMemberInvite"
            className="max-w-[900px] absolute -top-[54%] right-[1.5%]"
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
              className={`max-w-[450px] absolute top-[29%] left-[70%] transition-all duration-700`}
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
              className={`max-w-[400px] absolute top-[56%] right-[93%] transition-all duration-700 `}
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
          className="max-w-[700px] relative right-[2.5%] my-8"
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
