import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="simple-footer">
      {/* Social */}
      <div className="footer-socials" aria-label="Redes sociales">
        <a href="https://github.com/HayabusaLA" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <i className="fa-brands fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/luis-adrián-abarca-gómez-337222287" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <i className="fa-brands fa-linkedin"></i>
        </a>
        <a href="mailto:luis604@outlook.com" aria-label="Email">
          <i className="fa-solid fa-envelope"></i>
        </a>
      </div>

      {/* Links con iconos */}
      <ul className="footer-links" aria-label="Navegación del sitio">
        <li>
          <a href="#about">
            <i className="fa-solid fa-user"></i>
            <span>Sobre mí</span>
          </a>
        </li>
        <li>
          <a href="#projects">
            <i className="fa-solid fa-diagram-project"></i>
            <span>Proyectos</span>
          </a>
        </li>
        <li>
          <a href="#contact">
            <i className="fa-solid fa-paper-plane"></i>
            <span>Contacto</span>
          </a>
        </li>
      </ul>

      {/* Copyright */}
      <div className="footer-copy">
        © {new Date().getFullYear()} Luis Adrián | Todos los derechos reservados
      </div>
    </footer>
  );
};

export default Footer;