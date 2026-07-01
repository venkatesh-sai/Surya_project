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
  return <></>;
}

export default Products;