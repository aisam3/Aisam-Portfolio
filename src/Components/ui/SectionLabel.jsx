import React from "react";

const SectionLabel = ({ index, title, aside }) => (
  <div className="section-label">
    <span className="section-label__index">({index})</span>
    <span className="section-label__title">{title}</span>
    <span className="section-label__rule" />
    {aside && <span className="section-label__aside">{aside}</span>}
  </div>
);

export default SectionLabel;
