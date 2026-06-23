import AnimatedLabel from "../components/AnimatedLabel";
import ScrollReveal from "../components/ScrollReveal";
import SEO from "../components/SEO";
import { useSearchParams } from "react-router-dom";

function Enquiry() {
  const [searchParams] = useSearchParams();
  const selectedProduct = searchParams.get("product") || "";

  return (
    <>
      <SEO
        title="Get a Quote | Xerox & RISO Solutions | Surya Enterprises"
        description="Submit your enquiry for Xerox printers, RISO duplicators, rentals, AMC and office printing solutions. Our team will contact you shortly."
        keywords="Xerox dealer Hyderabad, Xerox printer dealer, Xerox MFP, Xerox rental Hyderabad, Printer AMC Telangana, RISO dealer Telangana, Photocopier dealer Hyderabad"
        image="/images/seo-banner.jpg"
        url="/enquiry"
      />
      {/* Enquiry Hero Section */}
      <section className="page-hero compact-hero">
        <AnimatedLabel text="Get Quote" />
        <h1>Request a product or service quote</h1>
        <p>
          Share your printing requirement and our team will help you select the
          right Xerox, RISO, rental, installation, support, or AMC solution.
        </p>
      </section>

      {/* Enquiry Form Section */}
      <section className="contact-layout single-form">
        <ScrollReveal as="form" className="contact-form">
          <label>
            Company Name
            <input type="text" placeholder="Company name" />
          </label>
          <label>
            Contact Number
            <input type="tel" placeholder="Phone number" />
          </label>
          <label>
            Product Interest
            <select defaultValue={selectedProduct}>
              <option value="" disabled>Select product interest</option>
              {selectedProduct && <option value={selectedProduct}>{selectedProduct}</option>}
              <option>Xerox Printer</option>
              <option>Xerox MFP</option>
              <option>RISO Digital Duplicator</option>
              <option>Rental Solution</option>
              <option>AMC Support</option>
            </select>
          </label>
          <label>
            Message
            <textarea placeholder="Share print volume, model interest, or service need"></textarea>
          </label>
          <button type="button" className="primary-btn">Request Quote</button>
        </ScrollReveal>
      </section>
    </>
  );
}

export default Enquiry;
