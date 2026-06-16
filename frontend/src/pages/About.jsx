import AnimatedLabel from "../components/AnimatedLabel";
import AnimatedCounter from "../components/AnimatedCounter";
import SectionHeader from "../components/SectionHeader";
import ScrollReveal from "../components/ScrollReveal";
import SEO from "../components/SEO";
import { certificates } from "../data";

function About() {
  return (
    <>
      <SEO
        title="About Surya Enterprises | Authorized Xerox & RISO Dealer Since 1999"
        description="Surya Enterprises is an authorized Xerox India and RISO India dealer serving Telangana since 1999 with sales, service, installation and office printing solutions."
        keywords="Xerox dealer Hyderabad, Xerox printer dealer, Xerox MFP, Xerox rental Hyderabad, Printer AMC Telangana, RISO dealer Telangana, Photocopier dealer Hyderabad"
        image="/images/seo-banner.jpg"
        url="/about"
      />
      {/* Company Overview Section */}
      <section className="page-hero compact-hero">
        <AnimatedLabel text="About Us" />
        <h1>Surya Enterprises, serving Telangana since 1999</h1>
        <p>
          Surya Enterprises is an authorized Xerox India and RISO India business
          partner serving customers across Telangana since 1999.
        </p>
      </section>

      {/* Company Overview Section */}
      <section className="split-section">
        <div>
          <SectionHeader
            eyebrow="Company Overview"
            title="25+ years in office printing and support"
            text="With more than 25 years of experience in office printing, photocopier solutions, multifunction printers, digital duplicators, and managed print services, Surya Enterprises provides sales, installation, maintenance, and after-sales support."
          />
        </div>
        <div className="approval-list">
          <ScrollReveal as="article">
            <h3>Xerox India Authorized Silver Partner</h3>
            <p>Authorized business partner for professional Xerox office printing solutions.</p>
          </ScrollReveal>
          <ScrollReveal as="article" index={1}>
            <h3>RISO India Authorized Channel Partner</h3>
            <p>Certified channel partner for RISO digital duplicator solutions.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section className="page-section light-section">
        <SectionHeader
          eyebrow="Experience Timeline"
          title="From 1999 to today"
          text="Surya Enterprises has grown from local office equipment support into a multi-region Xerox and RISO sales, installation, service, and support partner across Telangana."
          align="center"
        />
        {/* Animated Statistics Counter */}
        <div className="timeline-grid">
          <ScrollReveal as="article"><strong><AnimatedCounter end={1999} /></strong><span>Surya Enterprises established</span></ScrollReveal>
          <ScrollReveal as="article" index={1}><strong><AnimatedCounter end={25} suffix="+" /></strong><span>Years of industry experience</span></ScrollReveal>
          <ScrollReveal as="article" index={2}><strong><AnimatedCounter end={4} /></strong><span>Service regions across Telangana</span></ScrollReveal>
        </div>
      </section>

      {/* Mission Vision Section */}
      <section className="mission-grid">
        <ScrollReveal as="article">
          <AnimatedLabel text="Mission" />
          <h2>Deliver dependable office printing solutions</h2>
          <p>
            Help customers choose, install, and maintain Xerox and RISO equipment
            that fits their real volume, budget, and service expectations.
          </p>
        </ScrollReveal>
        <ScrollReveal as="article" index={1}>
          <AnimatedLabel text="Vision" />
          <h2>Be Telangana's trusted print technology partner</h2>
          <p>
            Build long-term customer relationships through authorized brands,
            transparent advice, reliable service, and after-sales support.
          </p>
        </ScrollReveal>
      </section>

      {/* Certifications Section */}
      <section className="page-section">
        <SectionHeader
          eyebrow="Certifications"
          title="Brand partnerships and authorization records"
          text="Certificate images and official documents will be added once final client files are supplied."
        />
        <div className="certificate-row">
          {certificates.map((certificate, index) => (
            <ScrollReveal className="certificate-card" index={index} key={certificate.title}>
              {certificate.title}
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}

export default About;
