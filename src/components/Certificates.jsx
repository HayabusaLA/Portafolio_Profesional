import React, { useEffect, useRef, useState } from 'react';
import '../styles/Certificates.css';

import dataCertPDF from '../assets/DataCertificado.pdf';
import ecoCertPDF from '../assets/EconomiaCertificado.pdf';
import apiCertIMG from '../assets/PostamanAPI.png';

const certificates = [
  { title: 'Certificado de Data Analytics (PowerBI)', issuer: 'Otorgado por UTEC en 2024', src: dataCertPDF },
  { title: 'Certificado de Educación Financiera', issuer: 'Otorgado por la Secretaría de Hacienda', src: ecoCertPDF },
  { title: 'Certificado de API Fundamentals', issuer: 'Otorgado por Postman Academy', src: apiCertIMG }, // imagen
];

const isPDF = (url) => /\.pdf($|\?)/i.test(String(url));

const Certificates = () => {
  const [selected, setSelected] = useState(null);
  const closeBtnRef = useRef(null);
  const lastFocusRef = useRef(null);

  const openModal = (cert) => {
    lastFocusRef.current = document.activeElement;
    setSelected(cert);
  };
  const closeModal = () => {
    setSelected(null);
    lastFocusRef.current?.focus?.();
  };

  // Cerrar con Escape + bloquear scroll
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selected]);

  return (
    <section className="certificates-section">
      <h1 className="section-title">Certificados</h1>

      <div className="certificates-container">
        {certificates.map((cert, i) => (
          <article className="certificate-card" key={i}>
            <div className="preview-wrap" aria-hidden="true">
              {isPDF(cert.src) ? (
                <iframe
                  className="certificate-preview"
                  title={`${cert.title} (preview)`}
                  src={cert.src}
                  loading="lazy"
                />
              ) : (
                <img
                  className="certificate-preview-img"
                  src={cert.src}
                  alt={`${cert.title} – vista previa`}
                  loading="lazy"
                />
              )}

              {/* Overlay solo para dispositivos con hover */}
              <div className="preview-overlay">
                <button
                  className="action-btn action-btn--primary"
                  onClick={() => openModal(cert)}
                  aria-label={`Ver ${cert.title}`}
                >
                  Ver certificado
                </button>
              </div>
            </div>

            <h3 className="certificate-title">{cert.title}</h3>
            <p className="certificate-issuer">{cert.issuer}</p>

            {/* Acción fija solo en móviles (sin hover) */}
            <div className="card-actions">
              <button
                className="action-btn action-btn--primary"
                onClick={() => openModal(cert)}
                aria-label={`Ver ${cert.title}`}
              >
                Ver certificado
              </button>
            </div>
          </article>
        ))}
      </div>

      {selected && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              ref={closeBtnRef}
              className="close-button"
              aria-label="Cerrar"
              onClick={closeModal}
            >
              &times;
            </button>

            <header className="modal-header">
              <h3 id="modal-title" className="modal-title">{selected.title}</h3>
              <p className="modal-sub">{selected.issuer}</p>
            </header>

            <div className="modal-body">
              {isPDF(selected.src) ? (
                <iframe className="modal-pdf" title={selected.title} src={selected.src} />
              ) : (
                <img className="modal-img" src={selected.src} alt={selected.title} />
              )}
            </div>

            <div className="modal-actions">
              <a className="button" href={selected.src} target="_blank" rel="noopener noreferrer">
                Abrir en pestaña nueva
              </a>
              <a className="button button--accent" href={selected.src} download>
                Descargar
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;