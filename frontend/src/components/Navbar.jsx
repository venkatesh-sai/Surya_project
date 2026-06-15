import { Link } from "react-router-dom";
import xeroxLogo from "../assets/logos/xerox_logo.png";

function Navbar() {
  return (
    <header className="navbar">
      {/* Logo Area */}
      <div className="navbar-logo">
        <Link to="/">
          <img src={xeroxLogo} alt="Xerox logo" />
        </Link>
        <span>Surya Enterprises</span>
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
