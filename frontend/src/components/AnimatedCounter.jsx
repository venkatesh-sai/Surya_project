import { useEffect, useState } from "react";
import useInViewOnce from "../hooks/useInViewOnce";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function AnimatedCounter({ end, suffix = "", duration = 1800 }) {
  const reduceMotion = prefersReducedMotion();
  const [value, setValue] = useState(() => (reduceMotion ? end : 0));
  const { ref, isVisible } = useInViewOnce({
    rootMargin: "0px 0px -8% 0px",
    threshold: 0.25,
  });

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
