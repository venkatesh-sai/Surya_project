import useScrollReveal from "../hooks/useScrollReveal";

function ScrollReveal({
  as: Component = "div",
  children,
  className = "",
  index = 0,
  style,
  ...props
}) {
  const { ref, isVisible } = useScrollReveal();
  const revealDelay = `${Math.min(index * 90, 360)}ms`;

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
