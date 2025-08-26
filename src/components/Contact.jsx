import React, { useState } from 'react';
import '../styles/global.css';
import '../styles/Contact.css';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const EMAIL = 'luis604@outlook.com';

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback: abre mailto si no hay permisos de clipboard
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section className="section contact-section" id="contacto">
      <h1 className="section-title">Contacto</h1>

      <div className="contact-card">
        {copied && (
          <div className="contact-toast" role="status" aria-live="polite">
            ¡Correo copiado!
          </div>
        )}

        <p className="contact-description">
          ¿Te interesa colaborar conmigo? ¡No dudes en escribirme!
        </p>

        <div className="contact-info" role="list">
          {/* Email */}
          <a
            role="listitem"
            className="contact-item"
            href={`mailto:${EMAIL}`}
            aria-label={`Enviar correo a ${EMAIL}`}
          >
            <FaEnvelope className="contact-icon" aria-hidden="true" />
            <span className="contact-text">{EMAIL}</span>
            <button
              type="button"
              className="copy-btn"
              onClick={(e) => {
                e.preventDefault(); // evitar abrir mailto
                copyEmail();
              }}
              aria-label="Copiar correo al portapapeles"
            >
              Copiar
            </button>
          </a>

          {/* GitHub */}
          <a
            role="listitem"
            className="contact-item"
            href="https://github.com/HayabusaLA"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir GitHub de Luis en una nueva pestaña"
          >
            <FaGithub className="contact-icon" aria-hidden="true" />
            <span className="contact-text">GitHub</span>
          </a>

          {/* LinkedIn */}
          <a
            role="listitem"
            className="contact-item"
            href="https://www.linkedin.com/in/luis-adrián-abarca-gómez-337222287"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir LinkedIn de Luis en una nueva pestaña"
          >
            <FaLinkedin className="contact-icon" aria-hidden="true" />
            <span className="contact-text">LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;