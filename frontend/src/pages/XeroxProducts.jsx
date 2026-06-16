import AnimatedLabel from "../components/AnimatedLabel";
import CardGrid from "../components/CardGrid";
import SectionHeader from "../components/SectionHeader";
import SEO from "../components/SEO";
import { xeroxCategories } from "../data";

const xeroxCards = xeroxCategories.map((title) => ({
  title,
  text: "Placeholder category card for Xerox specifications, product images, brochures, and model details.",
  meta: "Xerox",
}));

function XeroxProducts() {
  return (
    <>
      <SEO
        title="Xerox Printers & Multifunction Devices | Surya Enterprises"
        description="Browse Xerox A4 and A3 printers, monochrome and colour multifunction devices with authorized sales and support from Surya Enterprises."
        keywords="Xerox dealer Hyderabad, Xerox printer dealer, Xerox MFP, Xerox rental Hyderabad, Printer AMC Telangana, RISO dealer Telangana, Photocopier dealer Hyderabad"
        image="/images/seo-banner.jpg"
        url="/products/xerox"
      />
      {/* Xerox Products Hero Section */}
      <section className="page-hero compact-hero">
        <AnimatedLabel text="Xerox Products" />
        <h1>Xerox printer and MFP categories</h1>
        <p>
          Category placeholders for A4, A3, mono, colour, and multifunction
          Xerox office machines.
        </p>
      </section>

      {/* Xerox Category Cards Section */}
      <section className="page-section">
        <SectionHeader
          eyebrow="Categories"
          title="Xerox product categories"
          text="Professional Xerox product placeholders are ready for final model images, brochures, and specifications."
        />
        <CardGrid items={xeroxCards} variant="compact" />
      </section>
    </>
  );
}

export default XeroxProducts;
