import { Link } from "react-router-dom";
import AnimatedLabel from "../components/AnimatedLabel";
import CardGrid from "../components/CardGrid";
import SectionHeader from "../components/SectionHeader";
import ScrollReveal from "../components/ScrollReveal";
import { productCategories, risoCategories, xeroxCategories } from "../data";

const xeroxCards = xeroxCategories.map((title) => ({
  title,
  text: "Xerox product category placeholder for specifications, model images, and brochure details.",
  meta: "Xerox",
}));

const risoCards = risoCategories.map((title) => ({
  title,
  text: "RISO product category placeholder for specifications, model images, and brochure details.",
  meta: "RISO",
}));

function Products() {
  return (
    <>
      {/* Products Hero Section */}
      <section className="page-hero compact-hero">
        <AnimatedLabel text="Products" />
        <h1>Xerox and RISO product portfolio</h1>
        <p>
          Browse business printers, multifunction systems, duplicators, and
          office printing solutions from authorized partner categories.
        </p>
      </section>

      {/* Product Search Section */}
      <ScrollReveal as="section" className="filter-panel">
        <input type="search" placeholder="Search products or categories" aria-label="Search products" />
        <div className="filter-buttons" aria-label="Category filters">
          <button type="button">All</button>
          <button type="button">Xerox</button>
          <button type="button">RISO</button>
          <button type="button">MFP</button>
          <button type="button">Duplicators</button>
        </div>
      </ScrollReveal>

      {/* Product Categories Section */}
      <section className="page-section">
        <SectionHeader
          eyebrow="Categories"
          title="Product categories overview"
          text="Professional product cards are placeholders until final model images, inventory data, and brochures are provided."
        />
        <CardGrid items={productCategories} />
      </section>

      {/* Xerox Products Section */}
      <section className="page-section light-section">
        <SectionHeader
          eyebrow="Xerox Products"
          title="Xerox printer and MFP categories"
          text="A4, A3, mono, colour, and multifunction categories for professional office environments."
        />
        <CardGrid items={xeroxCards} variant="compact" />
        <Link to="/products/xerox" className="text-link">View Xerox categories</Link>
      </section>

      {/* RISO Products Section */}
      <section className="page-section">
        <SectionHeader
          eyebrow="RISO Products"
          title="Digital duplicators and offset solutions"
          text="RISO categories for high-volume, economical duplication and print room productivity."
        />
        <CardGrid items={risoCards} variant="compact" />
        <Link to="/products/riso" className="text-link">View RISO categories</Link>
      </section>
    </>
  );
}

export default Products;
