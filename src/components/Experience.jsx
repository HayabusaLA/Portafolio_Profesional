import React, { useEffect, useRef, useState } from 'react';
import '../styles/global.css';
import '../styles/Experience.css';

// Importa tus imágenes (puedes mantener require si prefieres)
import titorImg from '../assets/titor.png';
import doccareImg from '../assets/doccare.png';
import aptImg from '../assets/apt.png';

const EXPERIENCES = [
  {
    date: "Febrero 2023 - Julio 2023",
    title: "Crack the Code - Proyecto Titor",
    position: "Desarrollador de Videojuegos en Unity",
    description:
      "Fungí como diseñador y programador principal en ‘Titor’, videojuego educativo para enseñar programación a niños. Con Unity y C#, implementé mecánicas, niveles y optimizaciones.",
    background: titorImg,
    link: "https://drive.google.com/drive/folders/1uVoFOYE9LF64rnEOdm9Ud0Npc86N9qDF?usp=sharing"
  },
  {
    date: "Febrero 2024 - Julio 2024",
    title: "Freelance Developer - DocCare Tracker",
    position: "Desarrollador Móvil",
    description:
      "Apoyé el desarrollo de una app móvil para gestión de citas y seguimiento de pacientes. Con React Native, implementé features clave y mejoras de rendimiento.",
    background: doccareImg,
    link: "https://example.com/doccare-tracker"
  },
  {
    date: "Febrero 2023 - Julio 2024",
    title: "Aprendizaje para todos - Enseñanza a nivel medio superior",
    position: "Tutor particular de nivel escolar intermedio",
    description:
      "Impartí clases de matemáticas y física a estudiantes de secundaria y preparatoria, mejorando su comprensión y rendimiento académico.",
    background: aptImg,
    link: "https://drive.google.com/drive/folders/1oEo_oOBE-U5TaosEufqLdP96gQzwOvDt?usp=sharing"
  }
];

const Experience = () => {
  const [visible, setVisible] = useState(new Set());
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);

  // Mantener el array de refs con longitud del data
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, EXPERIENCES.length);
  }, []);

  useEffect(() => {
    const opts = { threshold: 0.12, rootMargin: '0px 0px -80px 0px' };
    const onIntersect = (entries) => {
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
    };

    const io = new IntersectionObserver(onIntersect, opts);
    cardsRef.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section experience-wrapper" ref={sectionRef} id="experiencia">
      <h1 className="section-title">Experiencia Profesional</h1>

      <div className="experience-section">
        {EXPERIENCES.map((exp, i) => (
          <article
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className={`experience-card ${visible.has(i) ? 'visible' : ''}`}
          >
            <div
              className="experience-bg"
              style={{ backgroundImage: `url(${exp.background})` }}
              aria-hidden="true"
            />
            <div className="experience-overlay" aria-hidden="true" />

            <div className="experience-date">{exp.date}</div>

            <div className="experience-content">
              <h3 className="experience-title">{exp.title}</h3>
              <p className="experience-position">{exp.position}</p>
              <p className="experience-description">{exp.description}</p>

              <a
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="experience-link"
              >
                Ver proyecto
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;