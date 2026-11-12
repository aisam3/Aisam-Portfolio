import React from "react";
import Magnetic from "./Magnetic";

/** Circular badge with text spinning around a center icon. Renders a link or a button. */
const RotatingBadge = ({ text, icon, href, download, onClick, label, className = "" }) => {
  const chars = Array.from(`${text} • ${text} • `);
  const step = 360 / chars.length;

  const inner = (
    <>
      <span className="badge-ring" aria-hidden="true">
        {chars.map((c, i) => (
          <span key={i} style={{ transform: `rotate(${i * step}deg)` }}>
            {c}
          </span>
        ))}
      </span>
      <span className="badge-icon">{icon}</span>
    </>
  );

  return (
    <Magnetic strength={0.4}>
      {href ? (
        <a
          href={href}
          download={download}
          className={`rotating-badge ${className}`}
          aria-label={label || text}
          data-cursor="hover"
        >
          {inner}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className={`rotating-badge ${className}`}
          aria-label={label || text}
          data-cursor="hover"
        >
          {inner}
        </button>
      )}
    </Magnetic>
  );
};

export default RotatingBadge;
