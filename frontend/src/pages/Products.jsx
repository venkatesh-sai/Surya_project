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
  const category = product?.category_name || product?.category || "";
  const brand = product?.brand_name || product?.brand || "";

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
  const brand = product?.brandSlug || product?.brand_slug || product?.brand_name || product?.brand || "";
  return brand.toLowerCase().includes("riso") ? "riso" : "xerox";
}

function productPath(product) {
  return `/products/${productBrandSlug(product)}/${product.slug || product.id}`;
}

function productName(product) {
  return product?.name || [product?.brand_name, product?.model].filter(Boolean).join(" ") || "Product details";
}

function productImages(product) {
  return Array.isArray(product.images)
    ? product.images
      .map((image) => typeof image === "string" ? image : image?.image_url || image?.image)
      .filter(Boolean)
    : [];
}

function normalizeFeatures(features) {
  if (Array.isArray(features)) {
    return features.map((feature) => String(feature).trim()).filter(Boolean);
  }

  return String(features || "")
    .split(/\r?\n/)
    .map((feature) => feature.trim())
    .filter(Boolean);
}

function normalizeProduct(product) {
  const keyFeatures = normalizeFeatures(product.key_features);
  const images = productImages(product);
  const primaryImage = product.primary_image_url || images[0] || product.image_url || fallbackImage(product);
  const brand = product.brand_name || "Contact for details";
  const category = product.category_name || "Contact for details";

  return {
    ...product,
    brand,
    brandSlug: product.brand_slug || productBrandSlug({ ...product, brand_name: brand }),
    category,
    type: product.product_type || "Contact for details",
    paperSize: product.paper_size || "Contact for details",
    printSpeed: product.print_speed || "Contact for details",
    keyFeatures,
    brochureFile: product.brochure_file_url || product.brochure_file || "",
    images: images.length ? images : [primaryImage],
    image: primaryImage,
    filters: [
      brand.toLowerCase().includes("riso") ? "RISO" : "Xerox",
      category,
    ].filter(Boolean),
  };
}

async function fetchProducts() {
  const response = await fetch("/api/products/");

  if (!response.ok) {
    throw new Error("Unable to load products.");
  }

  const data = await response.json();
  const products = Array.isArray(data) ? data : data.results || [];
  return products.map(normalizeProduct);
}

function Products() {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
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
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesFilter = activeFilter === "All" || product.filters.includes(activeFilter);
      const searchableText = [
        productName(product),
        product.brand,
        product.category,
        product.type,
        product.paperSize,
        product.printSpeed,
      ].join(" ").toLowerCase();

      return matchesFilter && (!normalizedSearch || searchableText.includes(normalizedSearch));
    });
  }, [activeFilter, products, searchTerm]);

  const groupedProducts = useMemo(() => {
    return filteredProducts.reduce((groups, product) => {
      const category = product.category || "Products";
      return {
        ...groups,
        [category]: [...(groups[category] || []), product],
      };
    }, {});
  }, [filteredProducts]);

  const visibleCategoryEntries = Object.entries(groupedProducts);

  return (
    <>
      <SEO
        title="Products | Xerox & RISO Printing Solutions | Surya Enterprises"
        description="Browse Xerox printers, multifunction devices, RISO digital duplicators, brochures, specifications and office printing solutions from Surya Enterprises."
        keywords="Xerox printers Hyderabad, RISO duplicators Telangana, Xerox MFP, printer rental, printer AMC, office printing solutions"
        image="/showroom-hero.png"
        url="/products"
      />

      <section className="page-hero compact-hero products-hero">
        <AnimatedLabel text="Products" />
        <h1>Xerox and RISO office printing solutions</h1>
        <p>
          Browse printer, multifunction system, duplicator, rental, AMC and
          support categories for business printing teams.
        </p>
      </section>

      <section className="product-filter-panel">
        <div className="product-filter-shell">
          <div className="product-filter-header">
            <div className="product-filter-title">
              <AnimatedLabel text="Catalog" />
              <h2>Find the right machine for your office workflow</h2>
              <p>Filter by brand, category, model, speed, or paper size.</p>
            </div>
            <div className="product-filter-search">
              <input
                aria-label="Search products"
                type="search"
                placeholder="Search products"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </div>

          <div className="product-filter-groups" aria-label="Product filters">
            <div className="product-brand-filter-card product-brand-filter-card-xerox">
              <div className="product-brand-filter-card-header">
                <button
                  className={`product-filter-chip product-filter-chip-brand ${activeFilter === "Xerox" ? "product-filter-chip-active" : ""}`}
                  type="button"
                  onClick={() => setActiveFilter("Xerox")}
                >
                  Xerox
                </button>
                <span>{xeroxCategoryFilters.length} categories</span>
              </div>
              <div className="product-filter-chip-row">
                {xeroxCategoryFilters.map((category) => (
                  <button
                    className={`product-filter-chip ${activeFilter === category ? "product-filter-chip-active" : ""}`}
                    key={category}
                    type="button"
                    onClick={() => setActiveFilter(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-brand-filter-card product-brand-filter-card-riso">
              <div className="product-brand-filter-card-header">
                <button
                  className={`product-filter-chip product-filter-chip-brand ${activeFilter === "RISO" ? "product-filter-chip-active" : ""}`}
                  type="button"
                  onClick={() => setActiveFilter("RISO")}
                >
                  RISO
                </button>
                <span>{risoCategoryFilters.length} category</span>
              </div>
              <div className="product-filter-chip-row">
                {risoCategoryFilters.map((category) => (
                  <button
                    className={`product-filter-chip ${activeFilter === category ? "product-filter-chip-active" : ""}`}
                    key={category}
                    type="button"
                    onClick={() => setActiveFilter(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            className={`product-filter-chip product-filter-chip-all ${activeFilter === "All" ? "product-filter-chip-active" : ""}`}
            type="button"
            onClick={() => setActiveFilter("All")}
          >
            Show All Products
          </button>
        </div>
      </section>

      <section className="page-section product-catalog-section">
        {loading && (
          <div className="empty-products">
            <AnimatedLabel text="Loading" />
            <h2>Loading products...</h2>
            <p>Fetching the latest product catalog.</p>
          </div>
        )}

        {!loading && error && (
          <div className="empty-products">
            <AnimatedLabel text="Products" />
            <h2>Product catalog could not load</h2>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && !visibleCategoryEntries.length && (
          <div className="empty-products">
            <AnimatedLabel text="Products" />
            <h2>No products found</h2>
            <p>Try another filter or search term.</p>
          </div>
        )}

        {!loading && !error && Boolean(visibleCategoryEntries.length) && (
          <div className="product-category-stack">
            {visibleCategoryEntries.map(([category, categoryProducts], categoryIndex) => (
              <div key={category}>
                <div className="product-category-heading">
                  <h3>{category}</h3>
                  <span>{categoryProducts.length} products</span>
                </div>
                <div className="product-grid">
                  {categoryProducts.map((product, index) => (
                    <ScrollReveal
                      as="article"
                      className="product-card"
                      index={index + categoryIndex}
                      key={product.id || product.slug}
                    >
                      <Link className="product-card-image" to={productPath(product)}>
                        <img
                          src={product.image}
                          alt={`${productName(product)} product visual`}
                          onError={(event) => {
                            event.currentTarget.src = fallbackImage(product);
                          }}
                        />
                        <span>{product.brand}</span>
                      </Link>

                      <div className="product-card-body">
                        <span className="product-card-category">{product.category}</span>
                        <h3>{productName(product)}</h3>
                        <dl className="product-card-specs">
                          <div>
                            <dt>Paper Size</dt>
                            <dd>{product.paperSize}</dd>
                          </div>
                          <div>
                            <dt>Speed</dt>
                            <dd>{product.printSpeed}</dd>
                          </div>
                        </dl>
                        {product.keyFeatures.length ? (
                          <ul>
                            {product.keyFeatures.slice(0, 3).map((feature) => (
                              <li key={feature}>{feature}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>Contact Surya Enterprises for product details.</p>
                        )}
                      </div>

                      <div className="product-card-actions">
                        <Link to={`/enquiry?product=${encodeURIComponent(productName(product))}`} className="primary-btn">
                          Enquire
                        </Link>
                        <Link to={productPath(product)} className="secondary-btn">
                          View Details
                        </Link>
                        {product.brochureFile && (
                          <a href={product.brochureFile} className="text-link" download>
                            Download Brochure
                          </a>
                        )}
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Products;
