export default function GlobalSchema() {
  const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.dandesacademy.com/#website",
      "url": "https://www.dandesacademy.com/",
      "name": "Dandes Academy",
      "inLanguage": "en-IN",
      "publisher": { "@id": "https://www.dandesacademy.com/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.dandesacademy.com/blog/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": ["Organization", "EducationalOrganization"],
      "@id": "https://www.dandesacademy.com/#organization",
      "name": "Dandes Academy",
      "url": "https://www.dandesacademy.com/",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://www.dandesacademy.com/#logo",
        "url": "https://www.dandesacademy.com/images/DandesAcademy.jpg"
      },
      "image": { "@id": "https://www.dandesacademy.com/#logo" },
      "description": "Industry-focused training in AI/ML designed for real-world applications. Build strong foundations, work on hands-on projects, and become industry-ready.",
      "founder": { "@id": "https://www.dandesacademy.com/#founder" },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bangalore",
        "addressRegion": "Karnataka",
        "addressCountry": "IN"
      },
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "City", "name": "Bengaluru" }
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "admissions",
          "email": "hello@dandesacademy.com",
          "telephone": "+91-7090366699",
          "availableLanguage": ["English"],
          "areaServed": "IN"
        },
        {
          "@type": "ContactPoint",
          "contactType": "whatsapp",
          "telephone": "+91-7090366699",
          "url": "https://wa.me/917090366699",
          "availableLanguage": ["English"],
          "areaServed": "IN"
        }
      ],
      "sameAs": [
        "https://www.linkedin.com/in/srinivasdande/",
        "https://www.youtube.com/@DandesAcademy",
        "https://www.facebook.com/DandesAcademy",
        "https://www.instagram.com/DandesAcademy"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://www.dandesacademy.com/#founder",
      "name": "Srinivas Dande",
      "jobTitle": "Founder & Lead Instructor",
      "worksFor": { "@id": "https://www.dandesacademy.com/#organization" },
      "description": "Founder & Lead Instructor at Dandes Academy with 20+ years of experience in product development, system architecture, and technical training.",
      "knowsAbout": ["AI", "Machine Learning", "System Design", "Data Structures and Algorithms"],
      "affiliation": { "@type": "Organization", "name": "Sun Microsystems" },
      "sameAs": ["https://www.linkedin.com/in/srinivasdande/"]
    }
  ]
};

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}