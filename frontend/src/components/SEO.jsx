import { Helmet } from "react-helmet-async";

const BASE_URL = "http://localhost:5173";

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Surya Enterprises",
  description:
    "Authorized Xerox India and RISO India dealer providing printers, multifunction devices, rentals, AMC, installation and repair services.",
  url: BASE_URL,
  image: `${BASE_URL}/showroom-hero.png`,
  logo: `${BASE_URL}/xerox_logo.jpg`,
  sameAs: [],
  telephone: ["+91 9396309283", "+91 9866294418"],
  foundingDate: "1999",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:30",
      closes: "18:30",
    },
  ],
  areaServed: [
    {
      "@type": "Place",
      name: "Hyderabad",
    },
    {
      "@type": "Place",
      name: "Telangana",
    },
    {
      "@type": "Place",
      name: "Vijayawada",
    },
  ],
  serviceType: [
    "Xerox Printers",
    "Xerox Multifunction Devices",
    "RISO Digital Duplicators",
    "Printer Rentals",
    "AMC",
    "Printer Repairs",
  ],
};

export default function SEO({
  title = "Surya Enterprises",
  description = "Authorized Xerox India and RISO India dealer in Telangana.",
  keywords = "Xerox dealer Hyderabad, Xerox printer dealer, Printer AMC Telangana, RISO dealer Telangana",
  image = "/showroom-hero.png",
  url = "/",
}) {
  const canonicalUrl = `${BASE_URL}${url}`;
  const imageUrl = image.startsWith("http") ? image : `${BASE_URL}${image}`;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta
        name="keywords"
        content={keywords}
      />

      <meta
        name="robots"
        content="index, follow"
      />

      {/* Canonical URL */}
      <link
        rel="canonical"
        href={canonicalUrl}
      />

      {/* Open Graph */}
      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:image"
        content={imageUrl}
      />

      <meta
        property="og:url"
        content={canonicalUrl}
      />

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:site_name"
        content="Surya Enterprises"
      />

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={imageUrl}
      />

      <meta
        name="twitter:url"
        content={canonicalUrl}
      />

      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
