import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AnimatedLabel from "../components/AnimatedLabel";
import ScrollReveal from "../components/ScrollReveal";
import SEO from "../components/SEO";
import risoDuplicatorImage from "../assets/products/riso-duplicator.svg";
import risoInkjetImage from "../assets/products/riso-inkjet.svg";
import xeroxColorMfpImage from "../assets/products/xerox-color-mfp.svg";
import xeroxMfpImage from "../assets/products/xerox-mfp.svg";
import xeroxPrinterImage from "../assets/products/xerox-printer.svg";

const specLabels = [
  ["paperSize", "Paper Size"],
  ["printSpeed", "Print Speed"],
  ["printResolution", "Print Resolution"],
  ["memory", "Memory"],
  ["trayCapacity", "Tray Capacity"],
  ["connectivity", "Connectivity"],
  ["warranty", "Warranty"],
];

const summarySpecs = [
  ["printSpeed", "Speed"],
  ["paperSize", "Paper Size"],
  ["printResolution", "Resolution"],
  ["memory", "Memory"],
  ["trayCapacity", "Tray Capacity"],
  ["connectivity", "Connectivity"],
];

const supportBadges = [
  "Free Consultation",
  "Installation Support",
  "1 Year Warranty",
  "Authorized Dealer",
  "Service Available",
];

function displayValue(value) {
  if (Array.isArray(value)) {
    const values = value.map((item) => displayValue(item)).filter(Boolean);
    return values.length ? values.join(", ") : "Contact for details";
  }

  if (value && typeof value === "object") {
    return Object.entries(value)
      .map(([key, entryValue]) => `${formatSpecLabel(key)}: ${displayValue(entryValue)}`)
      .join(", ") || "Contact for details";
  }

  return value === 0 || value ? String(value) : "Contact for details";
}

function parseJsonSafely(value) {
  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function formatSpecLabel(label) {
  return String(label || "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function normalizeSpecifications(specifications) {
  const parsed = parseJsonSafely(specifications);

  if (!parsed) {
    return [];
  }

  if (Array.isArray(parsed)) {
    return parsed.flatMap((item, index) => {
      const parsedItem = parseJsonSafely(item);

      if (!parsedItem) {
        return [];
      }

      if (Array.isArray(parsedItem)) {
        const [label, value] = parsedItem;
        return label || value ? [[formatSpecLabel(label || `Specification ${index + 1}`), value]] : [];
      }

      if (typeof parsedItem === "object") {
        return Object.entries(parsedItem)
          .filter(([, value]) => value !== null && value !== undefined && value !== "")
          .map(([label, value]) => [formatSpecLabel(label), value]);
      }

      return [[`Specification ${index + 1}`, parsedItem]];
    });
  }

  if (typeof parsed === "object") {
    return Object.entries(parsed)
      .filter(([, value]) => value !== null && value !== undefined && value !== "")
      .map(([label, value]) => [formatSpecLabel(label), value]);
  }

  return String(parsed)
    .split(/\r?\n|,/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      if (line.includes(":")) {
        const [label, ...valueParts] = line.split(":");
        return [formatSpecLabel(label), valueParts.join(":").trim()];
      }

      return [`Specification ${index + 1}`, line];
    });
}

function normalizeFeatures(features) {
  const parsed = parseJsonSafely(features);

  if (Array.isArray(parsed)) {
    return parsed
      .map((feature) => displayValue(feature).trim())
      .filter((feature) => feature && feature !== "Contact for details");
  }

  return String(parsed || "")
    .split(/\r?\n/)
    .map((feature) => feature.trim())
    .filter(Boolean);
}

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

function normalizeProduct(product) {
  const keyFeatures = normalizeFeatures(product.key_features);
  const specifications = normalizeSpecifications(product.specifications);

  const images = productImages(product);
  const primaryImage = product.primary_image_url || images[0] || product.image_url || fallbackImage(product);
  const brand = product.brand_name || "Brand not available";
  const category = product.category_name || "Category not available";

  return {
    ...product,
    brand,
    brandSlug: product.brand_slug || productBrandSlug({ ...product, brand_name: brand }),
    category,
    type: product.product_type || "Contact for details",
    paperSize: product.paper_size || "Contact for details",
    printSpeed: product.print_speed || "Contact for details",
    printResolution: product.print_resolution || "Contact for details",
    memory: product.memory || "Contact for details",
    trayCapacity: product.tray_capacity || "Contact for details",
    connectivity: product.connectivity || "Contact for details",
    warranty: product.warranty || "Contact for details",
    keyFeatures,
    specifications,
    brochureFile: product.brochure_file_url || product.brochure_file || "",
    images: images.length ? images : [primaryImage],
    image: primaryImage,
    description: product.description || "Product details are not available yet. Contact Surya Enterprises for the latest configuration and availability.",
    model: product.model || productName(product),
  };
}

async function fetchProduct(productId) {
  const response = await fetch(`/api/products/${productId}/`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Unable to load product.");
  }

  return normalizeProduct(await response.json());
}

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    let mounted = true;

    fetchProduct(productId)
      .then((data) => {
        if (mounted) {
          setProduct(data);
          setActiveImage(data?.image || "");
          setError(data ? "" : "Product not found.");
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
  }, [productId]);

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/products");
    }
  }

  if (loading) {
    return (
      <section className="page-hero compact-hero">
        <AnimatedLabel text="Products" />
        <h1>Loading product...</h1>
        <p>Fetching the latest product details from the database.</p>
      </section>
    );
  }

  if (error || !product) {
    return (
      <>
        <SEO
          title="Product Not Found | Surya Enterprises"
          description="The requested product could not be found in the Surya Enterprises product catalog."
          url="/products"
        />
        <section className="page-hero compact-hero">
          <AnimatedLabel text="Products" />
          <h1>Product not found</h1>
          <p>{error || "The requested product is not available."}</p>
          <Link to="/products" className="primary-btn">Back to Products</Link>
        </section>
      </>
    );
  }

  const fullName = productName(product);
  const enquiryUrl = `/enquiry?product=${encodeURIComponent(fullName)}`;
  const galleryImages = [...new Set((product.images?.length ? product.images : [product.image]).filter(Boolean))];
  const labelledSpecs = specLabels
    .map(([key, label]) => [label, product[key]])
    .filter(([, value]) => value && value !== "Contact for details");
  const tableSpecs = [...labelledSpecs, ...product.specifications];
  const brandProductPath = productBrandSlug(product).includes("riso") ? "/products/riso" : "/products/xerox";
  const brandProductLabel = productBrandSlug(product).includes("riso") ? "RISO Products" : "Xerox Products";
  const brandIntro = product.brand.toLowerCase().includes("riso")
    ? "RISO solutions are built for high-volume, cost-efficient printing and duplication, with practical workflows for schools, offices, institutions and print rooms."
    : "Xerox and Fujifilm office systems support dependable business printing, scanning and document workflows with local sales, installation and service support from Surya Enterprises.";

  return (
    <>
      <SEO
        title={`${fullName} | ${product.category} | Surya Enterprises`}
        description={product.description}
        keywords={`${product.model}, ${product.brand}, ${product.category}, ${product.type}, Surya Enterprises, Xerox dealer Hyderabad, RISO dealer Telangana`}
        image={product.image}
        url={productPath(product)}
      />

      <div className="product-detail-nav-bar">
        <nav className="breadcrumb-nav" aria-label="Breadcrumb">
          <ol className="breadcrumb-list">
            <li><Link className="breadcrumb-link" to="/">Home</Link></li>
            <li><Link className="breadcrumb-link" to="/products">Products</Link></li>
            <li><Link className="breadcrumb-link" to={brandProductPath}>{brandProductLabel}</Link></li>
            <li><span className="breadcrumb-current">{fullName}</span></li>
          </ol>
        </nav>
        <button className="product-back-button secondary-btn" type="button" onClick={handleBack}>
          Back
        </button>
      </div>

      <section className="product-detail-hero premium-product-detail" id="top">
        <div className="product-gallery-panel">
          <div className="product-main-image">
            <img src={activeImage || product.image} alt={`${fullName} product visual`} />
          </div>
          <a className="product-full-view" href={activeImage || product.image} target="_blank" rel="noreferrer">
            Click to see full view
          </a>
          <div className="product-thumbnail-row" aria-label="Product image thumbnails">
            {galleryImages.map((image, index) => (
              <button
                className={image === activeImage ? "active" : ""}
                key={image}
                type="button"
                onClick={() => setActiveImage(image)}
                aria-label={`View product image ${index + 1}`}
              >
                <img src={image} alt={`${fullName} thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-detail-intro product-purchase-panel">
          <AnimatedLabel text={product.brand} />
          <h1>{product.model}</h1>
          <div className="product-detail-meta">
            <span>{product.brand}</span>
            <span>{product.category}</span>
            <span>{product.type}</span>
          </div>
          <p>{product.description}</p>

          <div className="product-service-badges" aria-label="Service highlights">
            {supportBadges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>

          <div className="product-summary-specs">
            {summarySpecs.map(([key, label]) => (
              <div key={key}>
                <span>{label}</span>
                <strong>{displayValue(product[key])}</strong>
              </div>
            ))}
          </div>

          <div className="product-detail-actions">
            <Link to={enquiryUrl} className="primary-btn">Enquire Now</Link>
            {product.brochureFile ? (
              <a href={product.brochureFile} className="secondary-btn" download>
                Download Brochure
              </a>
            ) : (
              <span className="secondary-btn disabled-link">Brochure not available</span>
            )}
            <Link to={enquiryUrl} className="secondary-btn">Contact for Price</Link>
          </div>
          <Link to="/products" className="text-link">Back to Products</Link>
        </div>
      </section>

      <nav className="product-section-nav" aria-label="Product detail sections">
        <a href="#top">Top</a>
        <a href="#about-item">About this item</a>
        <a href="#product-info">Product Information</a>
        <a href="#specifications">Specifications</a>
        <a href="#brand-story">From the Brand</a>
        <a href="#reviews">Reviews</a>
      </nav>

      <section className="page-section product-detail-content ecommerce-detail-content">
        <ScrollReveal className="product-detail-panel" id="about-item">
          <AnimatedLabel text="About this item" />
          <h2>Highlights and key features</h2>
          {product.keyFeatures.length ? (
            <ul>
              {product.keyFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          ) : (
            <p>Features not available</p>
          )}
        </ScrollReveal>

        <ScrollReveal className="product-detail-panel" id="product-info">
          <AnimatedLabel text="Product Information" />
          <h2>Built for practical office workflows</h2>
          <p>{product.description}</p>
          <p>
            Recommended for teams that need dependable document output, local
            installation support, service availability and guidance on the right
            configuration for their print volume.
          </p>
        </ScrollReveal>

        <ScrollReveal className="product-detail-panel product-spec-table-panel" id="specifications">
          <AnimatedLabel text="Specifications" />
          <h2>Technical specifications</h2>
          {tableSpecs.length ? (
            <table className="product-spec-table">
              <tbody>
                {tableSpecs.map(([label, value], index) => (
                  <tr key={`${label}-${index}`}>
                    <th>{formatSpecLabel(label)}</th>
                    <td>{displayValue(value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Specifications not available</p>
          )}
        </ScrollReveal>

        <ScrollReveal className="product-detail-panel" id="brand-story">
          <AnimatedLabel text="From the Brand" />
          <h2>{product.brand}</h2>
          <p>{brandIntro}</p>
        </ScrollReveal>

        <ScrollReveal className="product-detail-panel" id="reviews">
          <AnimatedLabel text="Reviews" />
          <h2>Reviews / Testimonials</h2>
          <p>Customer reviews will be updated soon.</p>
        </ScrollReveal>
      </section>
    </>
  );
}

export default ProductDetail;
