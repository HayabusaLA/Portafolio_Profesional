import React, { useEffect, useRef, useState } from 'react';
import '../styles/Education.css';
import itesmImage from '../assets/itesm.png';
import utecImage from '../assets/utec.png';

const EDUCATION = [
  {
    image: itesmImage,
    year: "Agosto 2021 – 2025 (esperado)",
    institution: "Instituto Tecnológico y de Estudios Superiores de Monterrey (ITESM)",
    title: "Ingeniería en Tecnologías Computacionales",
    description:
      "Enfoque en desarrollo de software, estructuras de datos y diseño de interfaces, complementado con bases sólidas en matemáticas, física y economía.",
  },
  {
    image: utecImage,
    year: "Julio 2024 – Diciembre 2024",
    institution: "Universidad de Ingeniería y Tecnología (UTEC)",
    title: "Intercambio",
    description:
      "Ciencia de datos y machine learning, utilizando herramientas en la nube para fortalecer habilidades técnicas y analíticas.",
  },
];

function Education() {
  const [visible, setVisible] = useState(new Set());
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);

  // Mantener refs sincronizados con el tamaño del array
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, EDUCATION.length);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            const idx = cardsRef.current.indexOf(entry.target);
            if (idx === -1) return;
            if (entry.isIntersecting) next.add(idx);
            else next.delete(idx);
          });
          return next;
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
    );

    cardsRef.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="education-container" ref={sectionRef} id="educacion">
      <h2 className="education-title-section">Educación</h2>

      {EDUCATION.map((edu, i) => (
        <article
          key={i}
          ref={(el) => (cardsRef.current[i] = el)}
          className={`education-card ${visible.has(i) ? 'visible' : ''} ${i % 2 ? 'is-even' : 'is-odd'}`}
        >
          {/* Lado izquierdo con imagen y overlay */}
          <div className="education-card-left" aria-hidden="true">
            <div
              className="education-bg"
              style={{ backgroundImage: `url(${edu.image})` }}
            />
            <div className="education-overlay" />
            <div className="education-meta">
              <p className="education-year">{edu.year}</p>
              <p className="education-institution">
                <strong>{edu.institution}</strong>
              </p>
            </div>
          </div>

          {/* Lado derecho con contenido */}
          <div className="education-card-right">
            <p className="education-title">{edu.title}</p>
            <p className="education-description">{edu.description}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

export default Education;