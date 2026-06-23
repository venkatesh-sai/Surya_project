import { Link } from "react-router-dom";
import AnimatedLabel from "../components/AnimatedLabel";
import CardGrid from "../components/CardGrid";
import SectionHeader from "../components/SectionHeader";
import ScrollReveal from "../components/ScrollReveal";
import SEO from "../components/SEO";
import risoLogo from "../assets/logos/riso-logo.png";
import xeroxLogo from "../assets/logos/xerox-logo.png";

const productCategories = [
  { title: "Xerox Printers", text: "A4 and A3 Xerox printer categories for offices, schools, institutions, and business teams.", meta: "Xerox" },
  { title: "Xerox Multifunction Systems", text: "Mono and colour MFP solutions for print, copy, scan, and document workflow needs.", meta: "MFP" },
  { title: "RISO Digital Duplicators", text: "Fast, cost-efficient RISO duplicator machines for bulk printing and high-volume output.", meta: "RISO" },
  { title: "Rental and AMC Solutions", text: "Rental, installation, AMC, maintenance, and dependable after-sales support.", meta: "Support" },
];

const featuredXeroxProducts = [
  { title: "A4 Mono Printers", text: "Professional Xerox mono printers for compact, reliable office printing.", meta: "Xerox" },
  { title: "A3 Colour Printers", text: "Business-ready Xerox colour output for presentations, reports, and office documents.", meta: "Xerox" },
  { title: "A3 Colour MFP", text: "Multifunction Xerox systems for print, copy, scan, and document productivity.", meta: "Xerox" },
];

const featuredRisoProducts = [
  { title: "A4 Digital Duplicators", text: "Compact RISO digital duplicators for economical and high-speed bulk printing.", meta: "RISO" },
  { title: "A3 Digital Duplicators", text: "High-volume RISO digital duplicators for institutions, schools, and print rooms.", meta: "RISO" },
  { title: "Digital Baby Offset Machines", text: 'Popularly known as "Aam Aadmi Ka Digital Press", ideal for fast and cost-effective bulk printing.', meta: "RISO" },
];

const whyChooseUs = [
  { title: "25+ Years Experience", text: "Serving Telangana customers with office printing expertise since 1999.", meta: "1999" },
  { title: "Authorized Xerox Partner", text: "Xerox India Authorized Silver Partner for business printing solutions.", meta: "Xerox" },
  { title: "Authorized RISO Partner", text: "RISO India Authorized Channel Partner for digital duplicator solutions.", meta: "RISO" },
  { title: "Sales & Service Support", text: "Sales, maintenance, rental, AMC, and after-sales support under one roof.", meta: "Support" },
  { title: "Multi-City Presence", text: "Service coverage across Warangal, Karimnagar, Nizamabad, and Nalgonda.", meta: "Telangana" },
  { title: "Expert Installation Services", text: "Machine setup, workflow handover, and practical usage guidance.", meta: "Install" },
];

const serviceAreas = ["Hyderabad", "Warangal", "Karimnagar", "Nizamabad", "Nalgonda"];

const certificates = [
  { title: "Xerox India Silver Partner Certificate", text: "Authorization document placeholder awaiting final certificate image.", meta: "Xerox India" },
  { title: "RISO India Authorized Channel Partner Certificate", text: "Authorization document placeholder awaiting final certificate image.", meta: "RISO India" },
];

function Home() {
  const marqueeServiceAreas = [...serviceAreas, ...serviceAreas];

  return (
    <>
      <SEO
        title="Xerox Dealer in Hyderabad | Printers, Rentals & AMC | Surya Enterprises"
        description="Authorized Xerox India and RISO India dealer in Hyderabad offering printers, multifunction devices, rentals, AMC, installation and repair services across Telangana."
        keywords="Xerox dealer Hyderabad, Xerox printer dealer, Xerox MFP, Xerox rental Hyderabad, Printer AMC Telangana, RISO dealer Telangana, Photocopier dealer Hyderabad"
        image="/images/seo-banner.jpg"
        url="/"
      />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <AnimatedLabel text="Authorized Xerox India & RISO India Dealer" />
          <h1>Surya Enterprises Office Printing Solutions</h1>
          <p>
            Serving Telangana since 1999 with 25+ years of industry experience
            in sales, service, installation, support, and office printing solutions.
          </p>
          <div className="hero-badges">
            <span>Sales</span>
            <span>Service</span>
            <span>Support</span>
          </div>
          <div className="hero-actions">
            <a href="tel:+919396309283" className="primary-btn">Call Now</a>
            <Link to="/enquiry" className="secondary-btn">Get Quote</Link>
          </div>
        </div>
        <ScrollReveal className="hero-visual" aria-label="Modern printer showroom">
          <img src="/showroom-hero.png" alt="Modern office printer showroom" />
          <div className="machine machine-large"></div>
          <div className="machine machine-small"></div>
        </ScrollReveal>
      </section>

      {/* About Section */}
      <section className="page-section">
        <SectionHeader
          eyebrow="About Company"
          title="Authorized business partner serving Telangana since 1999"
          text="Surya Enterprises provides Xerox and RISO sales, service, installation, maintenance, and after-sales support for office printing teams."
          align="center"
        />
        <div className="stats-grid home-stats">
          <ScrollReveal><strong>25+</strong><span>Years Experience</span></ScrollReveal>
          <ScrollReveal index={1}><strong>4</strong><span>Service Centers</span></ScrollReveal>
          <ScrollReveal index={2}><strong>2</strong><span>Authorized Brands</span></ScrollReveal>
          <ScrollReveal index={3}><strong>1999</strong><span>Established</span></ScrollReveal>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="page-section light-section">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="Trusted support for business printing needs"
          text="Customers choose Surya Enterprises for authorized brand partnerships, local coverage, and dependable service support."
        />
        <CardGrid items={whyChooseUs} variant="compact" />
      </section>

      {/* Authorized Brands Section */}
      <section className="page-section">
        <SectionHeader
          eyebrow="Authorized Brands"
          title="Authorized Dealer Since 1999"
          text="Official Partner of Xerox India & RISO India"
          align="center"
        />
        <ScrollReveal className="authorized-brands-panel">
          <div className="brand-grid">
            <article className="brand-card brand-card-xerox">
              <div className="brand-logo-frame">
                <img src={xeroxLogo} alt="Xerox India logo" />
              </div>
              <h3>Xerox India</h3>
              <p>Authorized Silver Partner</p>
              <AnimatedLabel text="Authorized Business Partner" className="brand-label" />
            </article>
            <article className="brand-card brand-card-riso">
              <div className="brand-logo-frame">
                <img src={risoLogo} alt="RISO India logo" />
              </div>
              <h3>RISO India</h3>
              <p>Authorized Channel Partner</p>
              <AnimatedLabel text="Certified Sales & Service Support" className="brand-label" />
            </article>
          </div>
        </ScrollReveal>
      </section>

      {/* Product Categories Section */}
      <section className="page-section light-section">
        <SectionHeader
          eyebrow="Product Categories"
          title="Office equipment for every print environment"
          text="Explore Xerox printers, multifunction systems, RISO duplicators, rentals, and service solutions."
        />
        <CardGrid items={productCategories} />
      </section>

      {/* Featured Xerox Products Section */}
      <section className="page-section">
        <SectionHeader
          eyebrow="Featured Xerox Products"
          title="Xerox printer and MFP categories"
          text="Professional Xerox product placeholders until final model data and brochures are supplied."
        />
        <CardGrid items={featuredXeroxProducts} variant="featured" />
      </section>

      {/* Featured RISO Products Section */}
      <section className="page-section light-section riso-theme">
        <SectionHeader
          eyebrow="Featured RISO Products"
          title="Digital Duplicator / Digital Baby Offset Machine"
          text="Aam Aadmi Ka Digital Press, designed for fast and cost-effective bulk printing."
        />
        <CardGrid items={featuredRisoProducts} variant="featured" />
      </section>

      {/* Certificates Section */}
      <section className="split-section">
        <div>
          <AnimatedLabel text="Certificates" />
          <h2>Authorization documents that build customer trust</h2>
          <p>
            Xerox India Silver Partner and RISO India Authorized Channel Partner
            certificates are highlighted here as premium trust markers.
          </p>
          <Link to="/gallery" className="text-link">View Certificate</Link>
        </div>
        <CardGrid items={certificates} variant="compact" />
      </section>

      {/* Service Areas Section */}
      <section className="page-section">
        <SectionHeader
          eyebrow="Service Areas"
          title="Telangana coverage for sales and support"
          text="Serving key business regions with installation, support, maintenance, and office printing solutions."
          align="center"
        />
        <ScrollReveal className="area-marquee" aria-label="Service areas carousel">
          <div className="area-marquee-track">
            {marqueeServiceAreas.map((area, index) => (
              <article className="area-card" key={`${area}-${index}`}>
                <AnimatedLabel text="Telangana" />
                <h3>{area}</h3>
                {area === "Hyderabad" && (
                  <span className="area-badge">Now Serving Hyderabad</span>
                )}
              </article>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Contact CTA Section */}
      <ScrollReveal as="section" className="cta-section">
        <h2>Need Xerox or RISO support in Telangana?</h2>
        <p>Call 9396309283 or 9866294418 for product selection, installation, service, or AMC support.</p>
        <Link to="/enquiry" className="primary-btn">Get Quote</Link>
      </ScrollReveal>
    </>
  );
}

export default Home;
