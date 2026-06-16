import AnimatedLabel from "../components/AnimatedLabel";
import SEO from "../components/SEO";

function Locations() {
  return (
    <>
      <SEO
        title="Service Locations | Xerox Dealer Across Telangana"
        description="Surya Enterprises provides Xerox and RISO sales, installation, AMC and repair services across Hyderabad and major cities in Telangana."
        keywords="Xerox dealer Hyderabad, Xerox printer dealer, Xerox MFP, Xerox rental Hyderabad, Printer AMC Telangana, RISO dealer Telangana, Photocopier dealer Hyderabad"
        image="/images/seo-banner.jpg"
        url="/locations"
      />
      {/* Locations Section */}
      <section className="page-hero compact-hero">
        <AnimatedLabel text="Locations" />
        <h1>Service locations placeholder</h1>
        <p>
          Location details will be updated once final branch and coverage area
          information is provided.
        </p>
      </section>
    </>
  );
}

export default Locations;
