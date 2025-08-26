import React from "react";
import "../styles/Projects.css";
import SG from "../assets/SG.jpg";
import CR from "../assets/CR.jpeg";

const projects = [
  {
    title: "Proyecto CyberRunner: Unity",
    description:
      "CyberRunner es un videojuego de plataformas 2D inspirado en Metroid, Castlevania y Contra. El jugador controla a Yuuko, una rebelde que luchará por sobrevivir en un mundo cibernético dominado por corporaciones y tecnología.",
    image: CR,
    link: "https://example.com/proyecto1",
  },
  {
    title: "Proyecto SG: Unity",
    description:
      "Project SG es un videojuego de plataformas 2D inspirado en Bloodstained. El jugador controla a Rena y Diana en una aventura medieval oscura para superar niveles y enemigos y así salvar su legado.",
    image: SG,
    link: "https://example.com/proyecto2",
  },
];

const Projects = () => {
  return (
    <section className="projects-section" id="proyectos">
      <h2 className="projects-title">Proyectos activos en desarrollo</h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <article key={index} className="project-card">
            <div className="image-wrapper">
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
                loading="lazy"
              />
            </div>
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                Ver Proyecto
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;