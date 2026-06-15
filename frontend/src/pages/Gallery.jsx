import AnimatedLabel from "../components/AnimatedLabel";
import SectionHeader from "../components/SectionHeader";
import ScrollReveal from "../components/ScrollReveal";
import { gallerySections } from "../data";

function Gallery() {
  return (
    <>
      {/* Gallery Hero Section */}
      <section className="page-hero compact-hero">
        <AnimatedLabel text="Gallery" />
        <h1>Product, office, installation, service, and certificates gallery</h1>
        <p>
          Placeholder gallery sections are ready for client product images,
          office photos, installations, service records, and authorization certificates.
        </p>
      </section>

      {/* Gallery Sections */}
      <section className="page-section">
        <SectionHeader
          eyebrow="Media Library"
          title="Gallery categories"
          text="Each gallery area is marked as awaiting client content until final images and certificate scans are available."
        />
        <div className="gallery-grid">
          {gallerySections.map((section, index) => (
            <ScrollReveal as="article" className="gallery-card" index={index} key={section}>
              <div className="gallery-image"></div>
              <h3>{section}</h3>
              <p>Placeholder image set for {section.toLowerCase()}.</p>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}

export default Gallery;
