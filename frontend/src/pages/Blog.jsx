import AnimatedLabel from "../components/AnimatedLabel";
import SectionHeader from "../components/SectionHeader";
import ScrollReveal from "../components/ScrollReveal";
import SEO from "../components/SEO";

const blogPosts = [
  {
    title: "How to Choose the Right Xerox Multifunction Printer for Your Office",
    description:
      "Learn how to select the ideal Xerox multifunction printer based on printing volume, speed, and office requirements.",
  },
  {
    title: "Benefits of RISO Digital Duplicators for High-Volume Printing",
    description:
      "Discover why RISO duplicators are the preferred choice for schools, offices, and organizations with large print demands.",
  },
  {
    title: "Why Regular Printer Maintenance Improves Performance",
    description:
      "Understand the importance of preventive maintenance and how it increases the lifespan of your office printers.",
  },
  {
    title: "Top Office Printing Solutions for Small Businesses",
    description:
      "Explore cost-effective printing solutions that help small businesses improve productivity and reduce expenses.",
  },
  {
    title: "Managed Print Services: Everything You Need to Know",
    description:
      "Find out how managed print services can optimize workflows and lower printing costs for organizations.",
  },
  {
    title: "Tips to Reduce Printing Costs in Your Workplace",
    description:
      "Simple and practical strategies to minimize printing expenses while maintaining efficiency and quality.",
  },
];

function Blog() {
  return (
    <>
      <SEO
        title="Blog | Surya Enterprises"
        description="Latest articles, printer guides, office printing solutions, Xerox and RISO product information, and maintenance tips from Surya Enterprises."
        keywords="printer blog, Xerox printers, RISO printers, office printing solutions, printer maintenance, managed print services"
        image="/images/seo-banner.jpg"
        url="/blog"
      />

      {/* Hero Section */}
      <section className="page-hero compact-hero">
        <AnimatedLabel text="Blog" />
        <h1>Latest Articles & Printing Insights</h1>
        <p>
          Stay updated with office printing solutions, Xerox and RISO product
          guides, maintenance tips, and industry insights from Surya Enterprises.
        </p>
      </section>

      {/* Blog Section */}
      <section className="page-section">
        <SectionHeader
          eyebrow="Latest Posts"
          title="Explore Our Recent Articles"
          text="Helpful resources, buying guides, maintenance tips, and printing solutions for businesses and organizations."
        />

        <div className="card-grid">
          {blogPosts.map((post, index) => (
            <ScrollReveal as="article" className="business-card" index={index} key={post.title}>
              <AnimatedLabel text="Article" />
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}

export default Blog;