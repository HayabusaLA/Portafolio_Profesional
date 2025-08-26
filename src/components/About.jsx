import React, { useEffect, useRef, useState } from 'react';
import '../styles/About.css';
import udvLogo from '../assets/udv-logo.png'; // ⬅️ agrega tu logo/foto aquí

const About = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const aboutRef = useRef(null);
  const animTO = useRef(null);

  useEffect(() => {
    const el = aboutRef.current;
    if (!el) return;

    const getFadeables = () => el.querySelectorAll('.fade-element');
    const total = () => getFadeables().length;

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          if (animTO.current) clearTimeout(animTO.current);
          return;
        }
        setVisibleCount(0);
        if (animTO.current) clearTimeout(animTO.current);

        let i = 0;
        const cascade = () => {
          i++;
          setVisibleCount(i);
          if (i < total()) animTO.current = setTimeout(cascade, 160);
        };
        cascade();
      });
    };

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.12 });
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animTO.current) clearTimeout(animTO.current);
    };
  }, []);

  let idx = 0;
  const show = () => `fade-element ${visibleCount >= ++idx ? 'visible' : ''}`;

  return (
    <section id="about" ref={aboutRef} className="portfolio-container">
      {/* Sección Sobre mí */}
      <h1 className={`section-title ${show()}`}>Sobre mí</h1>

      <div className="about-section">
        <div className={`about-description card hoverable ${show()}`}>
          <p className="lead">
            ¡Hola! Soy Luis Gomez — Desarrollador Full-stack, Diseñador de Videojuegos y Analista de datos.
            He trabajado en proyectos académicos y personales que van desde simuladores hasta bases de datos
            y plataformas web. Me gusta liderar, resolver problemas bajo presión y entregar con excelencia,
            creatividad y compromiso.
          </p>
          <ul className="skills-list" style={{marginTop: 12}}>
            <li className="skill">React</li>
            <li className="skill">Node/Express</li>
            <li className="skill">MySQL / SQL Server</li>
            <li className="skill">Unity (Quest)</li>
            <li className="skill">Análisis de datos</li>
          </ul>
        </div>

        <div className={`about-info card ${show()}`}>
          <h2 className="info-title">Información básica</h2>
          <div className="info-item"><strong>EDAD:</strong> 22</div>
          <div className="info-item"><strong>EMAIL:</strong> luis604@outlook.com</div>
          <div className="info-item"><strong>DIRECCIÓN:</strong> Estado de México, Cuautitlán Izcalli, 54769</div>
          <div className="info-item"><strong>IDIOMAS:</strong> Español (nativo), Inglés (Intermedio)</div>
        </div>
      </div>

      {/* === Nueva sección: Trabajando actualmente en === */}
      <h1 className={`section-title ${show()}`}>Trabajando actualmente en</h1>

      <div className={`current-work-section ${show()}`}>
        <article className="work-card card">
          {/* Logo / foto de la empresa */}
          <header className="work-header">
            <div className="work-logo">
              <img src={udvLogo} alt="Universidad Da Vinci — logo" loading="lazy" />
            </div>
            <div className="work-headings">
              <h3>Universidad Da Vinci</h3>
              <p className="work-role">Becario de Office Manager / TI</p>
            </div>
          </header>

          <div className="work-meta">
            <span className="status-pill">Puesto actual</span>
            <ul className="tags">
              <li className="tag">Soporte en TI</li>
              <li className="tag">Administración de recursos</li>
              <li className="tag tag--cyan">Desarrollo de software</li>
            </ul>
          </div>

          <p className="muted">
            Encargado de brindar soporte técnico, administrar recursos y desarrollar software
            para mejorar la eficiencia operativa.
          </p>

          <div className="progress" aria-label="Progreso del rol">
            {/* Usa porcentaje (ej. 100%) para que el ancho sea correcto */}
            <span style={{ '--value': '100%' }} />
          </div>
        </article>
      </div>
    </section>
  );
};

export default About;