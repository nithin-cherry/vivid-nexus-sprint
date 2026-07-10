import "../styles/showcase.css";

const projects = [
  {
    title: "Interior Designer",
    category: "Interior Design",
    image: "/samples/interior.png",
    demo: "https://frontend-templates-j595.vercel.app/",
    Description:
      "A modern interior design website built using React and Vite. Features elegant layouts, intuitive navigation, responsive sections, and engaging visuals. Showcases design services, project galleries, company information, and contact details while delivering a smooth browsing experience across every device."
  },
  {
    title: "ShopEase",
    category: "E-Commerce",
    image: "/samples/ShopEase.jpg",
    demo: "https://shopease-dlks.vercel.app/",
    Description:
      "A modern e-commerce website built using React and Vite. Features responsive layouts, category navigation, search functionality, promotional banners, and intuitive interactions. Showcases products, shopping collections, essential store information, and delivers a smooth shopping experience across every device."
  },
  {
    title: "Forge & Table",
    category: "E-Commerce",
    image: "/samples/Forge.jpg",
    demo: "https://forge-and-table1.vercel.app/",
    Description:
      "A modern furniture showcase website built using React and Vite. Features premium layouts, seamless navigation, responsive sections, and elegant visuals. Showcases furniture collections, craftsmanship, brand information, and contact details while delivering a refined browsing experience across every device."
  },
  {
    title: "CATERY",
    category: "Cafe & Coffee",
    image: "/samples/CATERY.jpg",
    demo: "https://demopage-eyaq.vercel.app",
    Description:
      "A modern cafe website built using React and Vite. Features elegant layouts, responsive sections, menu highlights, and seamless navigation. Showcases signature beverages, café locations, brand story, and contact information while delivering a warm and engaging experience across every device."
  },
  {
    title: "CHRONOLUX",
    category: "Watch",
    image: "/samples/CHRONOLUX.jpg",
    demo: "https://chronolux-pi.vercel.app/",
    Description:
      "A premium luxury watch store website built using React and Tailwind CSS. Features elegant layouts, intuitive navigation, responsive sections, and smooth animations. Showcases high-end watch collections, brand heritage, and customer testimonials while delivering an exquisite browsing experience across every device."
  },
];

export default function Showcase() {
  return (

    <div className="showcase-page">
      <section className="showcase-hero">

        <span className="hero-badge">
          Premium Portfolio
        </span>

        <h1>
          Websites That <span>Convert.</span>
        </h1>

        <p>
          Explore high-performance websites crafted for startups,
          local businesses and growing brands.
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="primary-btn">
            Explore Projects
          </a>

          <a href="/checkout" className="secondary-btn">
            Start Your Project
          </a>
        </div>

      </section>

      <div className="showcase-header">
        <h1>Our Website Portfolio</h1>
        <p>
          Explore sample websites built by Vivid Nexus.
        </p>
      </div>

      <div className="showcase-grid">

        {projects.map((project) => (

          <div className="showcase-card" key={project.title}>

            <img
              src={project.image}
              alt={project.title}
              className="showcase-image"
            />

            <div className="showcase-content">

              <div className="showcase-category">
                {project.category}
              </div>

              <div className="showcase-title">
                {project.title}
              </div>

              <p className="showcase-description">
                {project.Description}
              </p>

              <div className="showcase-features">
                <span className="feature-pill">Responsive</span>
                <span className="feature-pill">SEO</span>
                <span className="feature-pill">Fast</span>
                <span className="feature-pill">Modern UI</span>
              </div>

              <div className="showcase-buttons">

                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="showcase-btn showcase-btn-primary"
                >
                  Live Demo
                </a>



              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
