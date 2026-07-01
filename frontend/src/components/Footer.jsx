<<<<<<< Updated upstream
=======
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      {/* Footer Company Section */}
      <div className="footer-grid"> 
        <section>
          <h2>Surya Enterprises</h2>
          <p>
            Authorized Xerox India Silver Partner and RISO India Authorized
            Channel Partner established in 1999.
          </p>

          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="linkedin"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="youtube"
            >
              <FaYoutube />
            </a>

            <a
              href="https://wa.me/919396309283"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="whatsapp"
            >
              <FaWhatsapp />
            </a>
          </div>
        </section>

        {/* Footer Quick Links Section */}
        <section>
          <h3>Quick Links</h3>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/products">Products</Link>
            <Link to="/services">Services</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/blog">Blog</Link>
          </div>
        </section>

        {/* Footer Contact Section */}
        <section>
          <h3>Contact Information</h3>
          <p>Phone: 9396309283 / 9866294418</p>
          <p>Service Areas: Hyderabad,Warangal, Karimnagar, Nizamabad, Nalgonda</p>
          <p>Working Hours: 9:30 AM - 6:30 PM</p>
        </section>
      </div>

      {/* Footer Copyright Section */}
      <div className="footer-bottom">
        <p>Copyright © 2026 Surya Enterprises. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
>>>>>>> Stashed changes
