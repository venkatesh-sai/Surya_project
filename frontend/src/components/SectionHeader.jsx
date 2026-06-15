import AnimatedLabel from "./AnimatedLabel";

function SectionHeader({ eyebrow, title, text, align = "left" }) {
  return (
    <div className={`section-header section-header-${align}`}>
      {eyebrow && <AnimatedLabel text={eyebrow} />}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export default SectionHeader;
