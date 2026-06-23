import AnimatedLabel from "../components/AnimatedLabel";
import CardGrid from "../components/CardGrid";
import SectionHeader from "../components/SectionHeader";
import SEO from "../components/SEO";

const risoCategories = [
  "A4 Digital Duplicators",
  "Legal Size Digital Duplicators",
  "B4 Digital Duplicators",
  "A3 Digital Duplicators",
  "Digital Baby Offset Machines",
];

const risoCards = risoCategories.map((title) => ({
  title,
  text: "Placeholder category card for RISO specifications, product images, brochures, and model details.",
  meta: "RISO",
}));

function RisoProducts() {
  return (
    <>
      <SEO
        title="RISO Digital Duplicators | Authorized RISO Dealer in Telangana"
        description="Discover RISO digital duplicators and high-speed printing solutions with authorized sales, installation and support across Telangana."
        keywords="Xerox dealer Hyderabad, Xerox printer dealer, Xerox MFP, Xerox rental Hyderabad, Printer AMC Telangana, RISO dealer Telangana, Photocopier dealer Hyderabad"
        image="/images/seo-banner.jpg"
        url="/products/riso"
      />
      {/* RISO Products Hero Section */}
      <section className="page-hero compact-hero riso-theme">
        <AnimatedLabel text="RISO Products" />
        <h1>RISO digital duplicator categories</h1>
        <p>
          Category placeholders for A4, legal, B4, A3 digital duplicators and
          baby offset machines.
        </p>
      </section>

      {/* RISO Category Cards Section */}
      <section className="page-section riso-theme">
        <SectionHeader
          eyebrow="Categories"
          title="RISO product categories"
          text="Professional RISO product placeholders are ready for final model images, brochures, and specifications."
        />
        <CardGrid items={risoCards} variant="compact" />
      </section>
    </>
  );
}

export default RisoProducts;
