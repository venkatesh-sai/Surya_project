function Navbar() {
  return (
<<<<<<< Updated upstream
    <nav>
      <h2>Xerox Dealer</h2>
    </nav>
=======
    <header className={`navbar ${menuOpen ? "navbar-open" : ""}`}>
      <div className="navbar-mobile-row">
        {/* Logo Area */}
        <div className="navbar-logo">
          <Link to="/" className="company-brand" onClick={closeMenu}>
            <span className="authorized-brand-logos" aria-label="Authorized Xerox and RISO brands">
              <img id="xerox-logo" src={xeroxLogo} alt="Xerox authorized dealer logo" />
              <img src={risoLogo} alt="RISO authorized dealer logo" />
            </span>
            <span className="drawer-subtitle">Authorized By</span>
            <span className="company-name">Surya Enterprises</span>
          </Link>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="navbar-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <button
        aria-hidden={!menuOpen}
        aria-label="Close navigation menu"
        className="navbar-overlay"
        tabIndex={menuOpen ? 0 : -1}
        type="button"
        onClick={closeMenu}
      ></button>

      <div
        className={`navbar-drawer ${menuOpen ? "active" : ""}`}
        id="mobile-navigation"
      >
        <div className="navbar-drawer-header">
          <div className="drawer-brand">
            <span className="company-name">Surya Enterprises</span>
          </div>

          <button
            type="button"
            className="navbar-drawer-close"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          >
            <span className="close-line"></span>
            <span className="close-line"></span>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="navbar-menu">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>
          <Link to="/products" onClick={closeMenu}>Products</Link>
          <Link to="/services" onClick={closeMenu}>Services</Link>
          <Link to="/locations" onClick={closeMenu}>Locations</Link>
          <Link to="/gallery" onClick={closeMenu}>Gallery</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
        </nav>

        {/* Navbar Actions */}
        <div className="navbar-actions">
          <Link to="/enquiry" className="quote-btn" onClick={closeMenu}>
            Get Quote
          </Link>
        </div>
      </div>
    </header>
>>>>>>> Stashed changes
  );
}

export default Navbar;