import { useEffect, useRef, useState } from "react";

const counterObserverOptions = {
  rootMargin: "0px 0px -8% 0px",
  threshold: 0.25,
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function AnimatedCounter({ end, suffix = "", duration = 1800 }) {
  const reduceMotion = prefersReducedMotion();
  const ref = useRef(null);
  const [value, setValue] = useState(() => (reduceMotion ? end : 0));
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
    }, counterObserverOptions);

    observer.observe(element);

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || reduceMotion) {
      return undefined;
    }

    let frameId;
    let startTime;

    const updateCounter = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(end * easedProgress));

      if (progress < 1) {
        frameId = requestAnimationFrame(updateCounter);
      }
    };

    frameId = requestAnimationFrame(updateCounter);

    return () => cancelAnimationFrame(frameId);
  }, [duration, end, isVisible, reduceMotion]);

  return (
    <span ref={ref} className="animated-counter">
      {value}
      {suffix}
    </span>
  );
}

export default AnimatedCounter;
