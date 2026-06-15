import AnimatedLabel from "../components/AnimatedLabel";
import CardGrid from "../components/CardGrid";
import SectionHeader from "../components/SectionHeader";
import { risoCategories } from "../data";

const risoCards = risoCategories.map((title) => ({
  title,
  text: "Placeholder category card for RISO specifications, product images, brochures, and model details.",
  meta: "RISO",
}));

function RisoProducts() {
  return (
    <>
      {/* RISO Products Hero Section */}
      <section className="page-hero compact-hero">
        <AnimatedLabel text="RISO Products" />
        <h1>RISO digital duplicator categories</h1>
        <p>
          Category placeholders for A4, legal, B4, A3 digital duplicators and
          baby offset machines.
        </p>
      </section>

      {/* RISO Category Cards Section */}
      <section className="page-section">
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
