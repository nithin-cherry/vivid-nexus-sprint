import "./About.css";

function About() {
  const values = [
    {
      title: "Innovation",
      text: "We constantly embrace new technologies to deliver scalable and future-ready digital solutions."
    },
    {
      title: "Quality",
      text: "Every project is crafted with precision, performance, and exceptional user experience in mind."
    },
    {
      title: "Integrity",
      text: "Transparency, trust, and long-term relationships define the way we work with every client."
    }
  ];

  const stats = [
    { number: "50+", label: "Projects Delivered" },
    { number: "20+", label: "Happy Clients" },
    { number: "8+", label: "Technologies" },
    { number: "100%", label: "Commitment" }
  ];

  return (
    <div className="about-page">

      {/* Background Glow */}
      <div className="bg-circle bg-one"></div>
      <div className="bg-circle bg-two"></div>

      {/* Hero */}
      <section className="hero">

        <span className="badge">ABOUT VIVID NEXUS</span>

        <h1>
          Building Digital
          <span> Experiences </span>
          That Inspire
        </h1>

        <p>
          Vivid Nexus is a technology company dedicated to crafting
          modern software solutions, AI-powered applications, and
          digital experiences that empower businesses to innovate,
          scale, and grow.
        </p>

      </section>

      {/* Story */}

      <section className="story">

        <div className="story-left">

          <h2>Who We Are</h2>

          <p>
            Founded with a passion for innovation, Vivid Nexus blends
            creativity with engineering excellence to develop
            reliable, scalable, and visually engaging software
            solutions.
          </p>

          <p>
            From startups to enterprises, we help organizations
            transform ideas into impactful digital products through
            cutting-edge technologies and user-focused design.
          </p>

        </div>

        <div className="story-card">

          <h3>Our Mission</h3>

          <p>
            To simplify technology through elegant design,
            intelligent engineering, and meaningful innovation.
          </p>

        </div>

      </section>

      {/* Vision */}

      <section className="vision">

        <div className="vision-card">

          <h3>Vision</h3>

          <p>
            To become a trusted technology partner enabling businesses
            worldwide through innovative digital transformation.
          </p>

        </div>

        <div className="vision-card">

          <h3>Mission</h3>

          <p>
            Deliver world-class digital products with uncompromising
            quality, creativity, and customer satisfaction.
          </p>

        </div>

      </section>

      {/* Values */}

      <section className="values">

        <h2>Our Core Values</h2>

        <div className="value-grid">

          {values.map((item, index) => (

            <div className="value-card" key={index}>

              <div className="value-icon">
                {index + 1}
              </div>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

            </div>

          ))}

        </div>

      </section>

      {/* Stats */}

      <section className="stats">

        {stats.map((item, index) => (

          <div className="stat-card" key={index}>

            <h2>{item.number}</h2>

            <span>{item.label}</span>

          </div>

        ))}

      </section>

      {/* Why */}

      <section className="why">

        <h2>Why Choose Vivid Nexus?</h2>

        <div className="why-grid">

          <div className="why-card">

            <h3>Innovation First</h3>

            <p>
              We combine creativity with technology to build
              future-ready digital products.
            </p>

          </div>

          <div className="why-card">

            <h3>Client Focused</h3>

            <p>
              Every solution is tailored specifically to your
              business objectives.
            </p>

          </div>

          <div className="why-card">

            <h3>Modern Technologies</h3>

            <p>
              React, AI, Cloud, Mobile and scalable backend systems
              power every solution we deliver.
            </p>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="cta">

        <h2>Let's Build Something Extraordinary</h2>

        <p>
          Whether you're launching a startup or scaling your
          enterprise, Vivid Nexus is here to transform your ideas
          into exceptional digital experiences.
        </p>

        <button>
          Contact Us
        </button>

      </section>

    </div>
  );
}

export default About;