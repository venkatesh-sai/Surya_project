import { useEffect, useRef, useState } from "react";

const scrollRevealOptions = {
  rootMargin: "0px 0px -10% 0px",
  threshold: 0.16,
};

function ScrollReveal({
  as: Component = "div",
  children,
  className = "",
  index = 0,
  style,
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window)
  );
  const revealDelay = `${Math.min(index * 90, 360)}ms`;

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
    }, scrollRevealOptions);

    observer.observe(element);

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <Component
      ref={ref}
      className={`reveal-card ${isVisible ? "visible" : ""} ${className}`.trim()}
      style={{ ...style, "--reveal-delay": revealDelay }}
      {...props}
    >
      {children}
    </Component>
  );
}

export default ScrollReveal;
