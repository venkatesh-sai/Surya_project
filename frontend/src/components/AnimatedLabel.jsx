import useInViewOnce from "../hooks/useInViewOnce";

function AnimatedLabel({ text, className = "" }) {
  const characterCount = Math.max(String(text).length, 1);
  const { ref, isVisible } = useInViewOnce({
    rootMargin: "0px 0px -8% 0px",
    threshold: 0.2,
  });

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
