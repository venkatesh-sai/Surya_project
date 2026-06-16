import AnimatedLabel from "../components/AnimatedLabel";
import CardGrid from "../components/CardGrid";
import SectionHeader from "../components/SectionHeader";
import SEO from "../components/SEO";
import { services } from "../data";

function Services() {
  return (
    <>
      <SEO
        title="Printer Services in Telangana | Rental, AMC & Repairs"
        description="Professional Xerox and RISO printer rental, AMC, maintenance, installation and repair services for offices and businesses in Telangana."
        keywords="Xerox dealer Hyderabad, Xerox printer dealer, Xerox MFP, Xerox rental Hyderabad, Printer AMC Telangana, RISO dealer Telangana, Photocopier dealer Hyderabad"
        image="/images/seo-banner.jpg"
        url="/services"
      />
      {/* Services Hero Section */}
      <section className="page-hero compact-hero">
        <AnimatedLabel text="Services" />
        <h1>Sales, service, installation, support, and AMC</h1>
        <p>
          End-to-end Xerox, RISO, printer, photocopier, and digital duplicator
          support for Telangana businesses.
        </p>
      </section>

      {/* Service Cards Section */}
      <section className="page-section">
        <SectionHeader
          eyebrow="Service Portfolio"
          title="Professional support across the machine lifecycle"
          text="From product selection to installation, maintenance, rental, AMC, and after-sales support, our service model is designed for business continuity."
        />
        <CardGrid items={services} />
      </section>
    </>
  );
}

export default Services;
