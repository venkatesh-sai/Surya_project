import AnimatedLabel from "../components/AnimatedLabel";
import ScrollReveal from "../components/ScrollReveal";
import SEO from "../components/SEO";

function Contact() {
  return (
    <>
      <SEO
        title="Contact Surya Enterprises | Xerox Dealer in Hyderabad"
        description="Contact Surya Enterprises for Xerox printers, RISO duplicators, rentals, AMC, installation and service support in Telangana."
        keywords="Xerox dealer Hyderabad, Xerox printer dealer, Xerox MFP, Xerox rental Hyderabad, Printer AMC Telangana, RISO dealer Telangana, Photocopier dealer Hyderabad"
        image="/images/seo-banner.jpg"
        url="/contact"
      />
      {/* Contact Hero Section */}
      <section className="page-hero compact-hero">
        <AnimatedLabel text="Contact" />
        <h1>Speak with our office equipment team</h1>
        <p>
          Reach out to Surya Enterprises for Xerox machines, RISO duplicators,
          printer service, installation, support, or AMC enquiries.
        </p>
      </section>

      {/* Contact Information Section */}
      <section className="contact-layout">
        <ScrollReveal className="contact-info">
          <h2>Contact Information</h2>
          <p><strong>Company:</strong> Surya Enterprises</p>
          <p><strong>Phone:</strong> 9396309283 / 9866294418</p>
          <p><strong>WhatsApp:</strong> 9396309283</p>
          <p><strong>Service Areas:</strong> Warangal, Karimnagar, Nizamabad, Nalgonda</p>
          <p><strong>Working Hours:</strong> 9:30 AM - 6:30 PM</p>
          <div className="contact-actions">
            <a href="tel:+919396309283" className="primary-btn">Call Now</a>
            <a href="https://wa.me/919396309283" className="secondary-btn">WhatsApp</a>
          </div>
          <div className="map-placeholder">Google Map Placeholder</div>
        </ScrollReveal>

        {/* Contact Form Section */}
        <ScrollReveal as="form" className="contact-form" index={1}>
          <label>
            Name
            <input type="text" placeholder="Your name" />
          </label>
          <label>
            Phone
            <input type="tel" placeholder="Your phone number" />
          </label>
          <label>
            Requirement
            <select defaultValue="">
              <option value="" disabled>Select requirement</option>
              <option>Xerox Machine Sales</option>
              <option>Xerox Machine Rental</option>
              <option>RISO Digital Duplicator</option>
              <option>Printer Service</option>
              <option>AMC Support</option>
            </select>
          </label>
          <label>
            Message
            <textarea placeholder="Tell us what you need"></textarea>
          </label>
          <button type="button" className="primary-btn">Submit Enquiry</button>
        </ScrollReveal>
      </section>
    </>
  );
}

export default Contact;
