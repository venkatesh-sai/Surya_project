import { useEffect, useRef, useState } from "react";

const labelObserverOptions = {
  rootMargin: "0px 0px -8% 0px",
  threshold: 0.2,
};

function AnimatedLabel({ text, className = "" }) {
  const characterCount = Math.max(String(text).length, 1);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window)
  );

  useEffect(() => {
    const element = ref.current;

    if (!element || isVisible) {
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, labelObserverOptions);

    observer.observe(element);

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <span
      ref={ref}
      className={`animated-label ${isVisible ? "visible" : ""} ${className}`.trim()}
      style={{
        "--animated-label-characters": characterCount,
      }}
    >
      <span className="animated-label-text">{text}</span>
    </span>
  );
}

export default AnimatedLabel;
