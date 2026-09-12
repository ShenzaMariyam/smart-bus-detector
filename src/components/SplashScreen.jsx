import { useState, useEffect } from "react";

function SplashScreen({ onFinish }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Fade out as the bus reaches the right edge at 2s
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000);

    // Complete transition to Home page at 2.4s
    const finishTimer = setTimeout(() => {
      if (onFinish) {
        onFinish();
      }
    }, 2400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className={`splash-screen ${isFadingOut ? "fade-out" : ""}`}>
      <div className="splash-track-container">
        <div className="splash-text-top">
          <h1 className="splash-title">Smart Bus</h1>
        </div>

        <div className="splash-track">
          <div className="splash-line"></div>
          <div className="splash-bus-driver">
            <span className="splash-bus-icon">🚌</span>
          </div>
        </div>

        <div className="splash-text-bottom">
          <p className="splash-subtitle">Time Detector</p>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
