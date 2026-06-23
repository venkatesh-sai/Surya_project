import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AnimatedLabel from "../components/AnimatedLabel";
import ScrollReveal from "../components/ScrollReveal";
import SEO from "../components/SEO";
import risoDuplicatorImage from "../assets/products/riso-duplicator.svg";
import risoInkjetImage from "../assets/products/riso-inkjet.svg";
import xeroxColorMfpImage from "../assets/products/xerox-color-mfp.svg";
import xeroxMfpImage from "../assets/products/xerox-mfp.svg";
import xeroxPrinterImage from "../assets/products/xerox-printer.svg";

const xeroxCategoryFilters = [
  "A4 Mono Printers",
  "A4 Mono MFP",
  "A3 Mono MFP",
  "A3 Colour MFP",
];

const risoCategoryFilters = [
  "Digital Duplicators",
];

function fallbackImage(product) {
  const category = product.category_name || "";
  const brand = product.brand_name || "";

  if (brand.toLowerCase().includes("riso") && category.toLowerCase().includes("inkjet")) {
    return risoInkjetImage;
  }

  if (brand.toLowerCase().includes("riso")) {
    return risoDuplicatorImage;
  }

  if (category.toLowerCase().includes("colour")) {
    return xeroxColorMfpImage;
  }

  if (category.toLowerCase().includes("mfp")) {
    return xeroxMfpImage;
  }

  return xeroxPrinterImage;
}

function productBrandSlug(product) {
  const brand = product.brand_slug || product.brand_name || "";
  return brand.toLowerCase().includes("riso") ? "riso" : "xerox";
}

function productPath(product) {
  return `/products/${productBrandSlug(product)}/${product.slug || product.id}`;
}

function productName(product) {
  return product.name || `${product.brand_name} ${product.model}`;
}

function productImages(product) {
  return Array.isArray(product.images)
    ? product.images
      .map((image) => image.image_url || image.image)
      .filter(Boolean)
    : [];
}

function normalizeProduct(product) {
  const keyFeatures = Array.isArray(product.key_features)
    ? product.key_features
    : String(product.key_features || "")
      .split(/\r?\n/)
      .map((feature) => feature.trim())
      .filter(Boolean);

  const images = productImages(product);
  const primaryImage = product.primary_image_url || images[0] || product.image_url || fallbackImage(product);

  return {
    ...product,
    brand: product.brand_name || "Contact for details",
    category: product.category_name || "Contact for details",
    type: product.product_type || "Contact for details",
    paperSize: product.paper_size || "Contact for details",
    printSpeed: product.print_speed || "Contact for details",
    keyFeatures,
    brochureFile: product.brochure_file_url || product.brochure_file || "",
    images: images.length ? images : [primaryImage],
    image: primaryImage,
    filters: [
      product.brand_name?.toLowerCase().includes("riso") ? "RISO" : "Xerox",
      product.category_name,
    ].filter(Boolean),
  };
}

async function fetchProducts() {
  const response = await fetch("/api/products/");

  if (!response.ok) {
    throw new Error("Unable to load products.");
  }

  const data = await response.json();
  return data.map(normalizeProduct);
}

function Products() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    fetchProducts()
      .then((data) => {
        if (mounted) {
          setProducts(data);
          setError("");
        }
      })
      .catch((fetchError) => {
        if (mounted) {
          setError(fetchError.message);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesFilter = activeFilter === "All" || product.filters.includes(activeFilter);
      const searchable = [
        product.brand,
        product.model,
        product.category,
        product.type,
        product.paperSize,
        ...product.keyFeatures,
      ].join(" ").toLowerCase();

      return matchesFilter && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [activeFilter, products, query]);

  const groupedProducts = useMemo(() => {
    return filteredProducts.reduce((groups, product) => {
      const group = product.category;
      return {
        ...groups,
        [group]: [...(groups[group] || []), product],
      };
    }, {});
  }, [filteredProducts]);

  return (
    <>
      <SEO
        title="Xerox & RISO Products | Printers, MFPs & Digital Duplicators"
        description="Explore brochure-backed Xerox, Fujifilm, Lexmark and RISO printers, MFPs, digital duplicators and high-speed office printing solutions from Surya Enterprises."
        keywords="Xerox dealer Hyderabad, RISO dealer Telangana, Fujifilm Apeos, A4 mono printers, A3 colour MFP, RISO digital duplicator, printer brochure"
        image="/showroom-hero.png"
        url="/products"
      />
      <section className="page-hero compact-hero products-hero">
        <AnimatedLabel text="Products" />
        <h1>Xerox, Fujifilm and RISO product portfolio</h1>
        <p>
          Browse business printers, multifunction systems and RISO digital duplicators
          organized from the client brochure set for quick comparison and enquiries.
        </p>
      </section>

      <ScrollReveal as="section" className="product-filter-shell product-filter-panel">
        <div className="product-filter-header">
          <div className="product-filter-title">
            <AnimatedLabel text="Product Finder" />
            <h2>Find the right printing solution</h2>
            <p>Search by model, brand, category, speed or paper size.</p>
          </div>
          <div className="product-filter-search">
            <input
              type="search"
              placeholder="Search products"
              aria-label="Search products"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>

        <button
          aria-pressed={activeFilter === "All"}
          className={`product-filter-chip product-filter-chip-all ${activeFilter === "All" ? "product-filter-chip-active" : ""}`}
          type="button"
          onClick={() => setActiveFilter("All")}
        >
          All Products
        </button>

        <div className="product-filter-groups" aria-label="Product filters">
          <article className="product-brand-filter-card product-brand-filter-card-xerox">
            <div className="product-brand-filter-card-header">
              <button
                aria-pressed={activeFilter === "Xerox"}
                className={`product-filter-chip product-filter-chip-brand ${activeFilter === "Xerox" ? "product-filter-chip-active" : ""}`}
                type="button"
                onClick={() => setActiveFilter("Xerox")}
              >
                Xerox Products
              </button>
              <span>Office printers & MFPs</span>
            </div>
            <div className="product-filter-chip-row">
              {xeroxCategoryFilters.map((filter) => (
                <button
                  aria-pressed={activeFilter === filter}
                  className={`product-filter-chip ${activeFilter === filter ? "product-filter-chip-active" : ""}`}
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </article>

          <article className="product-brand-filter-card product-brand-filter-card-riso">
            <div className="product-brand-filter-card-header">
              <button
                aria-pressed={activeFilter === "RISO"}
                className={`product-filter-chip product-filter-chip-brand ${activeFilter === "RISO" ? "product-filter-chip-active" : ""}`}
                type="button"
                onClick={() => setActiveFilter("RISO")}
              >
                RISO Products
              </button>
              <span>Duplicators & high-volume print</span>
            </div>
            <div className="product-filter-chip-row">
              {risoCategoryFilters.map((filter) => (
                <button
                  aria-pressed={activeFilter === filter}
                  className={`product-filter-chip ${activeFilter === filter ? "product-filter-chip-active" : ""}`}
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </article>
        </div>
      </ScrollReveal>

      <section className="page-section product-catalog-section">
        <div className="section-header">
          <AnimatedLabel text="Catalog" />
          <h2>Products by category</h2>
          <p>
            Each card links to a detail view, enquiry flow and brochure download.
            Missing brochure specifications are clearly marked for consultation.
          </p>
        </div>

        {loading ? (
          <div className="empty-products">
            <h3>Loading products...</h3>
            <p>Fetching the latest catalog from the database.</p>
          </div>
        ) : error ? (
          <div className="empty-products">
            <h3>Unable to load products</h3>
            <p>{error}</p>
          </div>
        ) : Object.keys(groupedProducts).length ? (
          <div className="product-category-stack">
            {Object.entries(groupedProducts).map(([category, items]) => (
              <div className="product-category-block" key={category}>
                <div className="product-category-heading">
                  <h3>{category}</h3>
                  <span>{items.length} model{items.length === 1 ? "" : "s"}</span>
                </div>
                <div className="product-grid">
                  {items.map((product, index) => (
                    <ScrollReveal className="product-card" index={index} key={product.id}>
                      <div className="product-card-image">
                        <img src={product.image} alt={`${productName(product)} product visual`} />
                        <span>{product.brand}</span>
                      </div>
                      <div className="product-card-body">
                        <p className="product-card-category">{product.category}</p>
                        <h3>{product.model}</h3>
                        <dl className="product-card-specs">
                          <div>
                            <dt>Speed</dt>
                            <dd>{product.printSpeed}</dd>
                          </div>
                          <div>
                            <dt>Paper</dt>
                            <dd>{product.paperSize}</dd>
                          </div>
                        </dl>
                        <ul>
                          {product.keyFeatures.slice(0, 3).map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="product-card-actions">
                        <Link to={productPath(product)} className="primary-btn">View Details</Link>
                        <Link
                          to={`/enquiry?product=${encodeURIComponent(productName(product))}`}
                          className="secondary-btn"
                        >
                          Enquire Now
                        </Link>
                        <a href={product.brochureFile} className="text-link" download>
                          Download Brochure
                        </a>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-products">
            <h3>No products found</h3>
            <p>Try another filter or search term.</p>
          </div>
        )}
      </section>
    </>
  );
}

export default Products;
