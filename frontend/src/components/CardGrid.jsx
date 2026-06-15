import AnimatedLabel from "./AnimatedLabel";
import ScrollReveal from "./ScrollReveal";

function CardGrid({ items, variant = "default" }) {
  return (
    <div className={`card-grid card-grid-${variant}`}>
      {items.map((item, index) => (
        <ScrollReveal as="article" className="business-card" index={index} key={item.title}>
          {item.meta && <AnimatedLabel text={item.meta} className="card-meta" />}
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </ScrollReveal>
      ))}
    </div>
  );
}

export default CardGrid;
