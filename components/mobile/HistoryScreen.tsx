import { useEffect, useRef, useState } from "react";

const HistoryScreen: React.FC = () => {
  const historyRef = useRef<HTMLImageElement | null>(null);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const historyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsHistoryVisible(true);
        }
      });
    }, observerOptions);

    if (historyRef.current) historyObserver.observe(historyRef.current);

    return () => {
      historyObserver.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col items-center mt-12 px-9 mb-40">
      <div
        className={`flex flex-col w-full items-center gap-10 transition-all duration-700  ${
          isHistoryVisible
            ? "transform translate-y-0 opacity-100"
            : "transform translate-y-10 opacity-0"
        }`}
        ref={historyRef}
      >
        <img
          src="/images/mobile/historyText.png"
          alt="historyText"
          className="w-[70%] max-w-[400px]"
        />
        <div className="w-full flex justify-center">
          <img
            src="/images/mobile/historyMockup.png"
            alt="historyMockup"
            className="w-full max-w-[650px]"
          />
        </div>
      </div>
    </div>
  );
};

export default HistoryScreen;
