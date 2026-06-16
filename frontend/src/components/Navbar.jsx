import { Link } from "react-router-dom";
import risoLogo from "../assets/logos/riso-logo.png";
import xeroxLogo from "../assets/logos/xerox-logo.png";

function Navbar() {
  return (
    <header className="navbar">
      {/* Logo Area */}
      <div className="navbar-logo">
        <Link to="/" className="company-brand">
          <span className="authorized-brand-logos" aria-label="Authorized Xerox and RISO brands">
            <img src={xeroxLogo} alt="Xerox authorized dealer logo" />
            <img src={risoLogo} alt="RISO authorized dealer logo" />
          </span>
          <span className="company-name">Surya Enterprises</span>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="navbar-menu">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
        <Link to="/services">Services</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Navbar Actions */}
      <div className="navbar-actions">
        <Link to="/enquiry" className="quote-btn">
          Get Quote
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
