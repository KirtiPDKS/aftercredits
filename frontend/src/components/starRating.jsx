import { useState } from "react";

export function StarRating({ value, onChange, readOnly }) {
  const [hover, setHover] = useState(null);
  const current = hover !== null ? hover : value;

  const getType = (star) => {
    if (current >= star) return 'full';
    if (current >= star - 0.5) return 'half';
    return 'empty';
  };

  const renderStar = (type) => {
    if (type === 'full') return <span style={{ color: '#ffc107' }}>★</span>;
    if (type === 'empty') return <span style={{ color: '#ccc' }}>★</span>;
    return (
      <span style={{ position: 'relative', display: 'inline-block', color: '#ccc' }}>
        ★
        <span style={{ position: 'absolute', left: 0, top: 0, overflow: 'hidden', width: '50%', color: '#ffc107' }}>★</span>
      </span>
    )
  };

  return (
    <div className="d-flex" style={{ fontSize: readOnly ? '1.3rem' : '2rem', lineHeight: 1 }}>      {[1, 2, 3, 4, 5].map((star) => (
      <span key={star} style={{ position: 'relative', cursor: 'pointer' }}
        onMouseLeave={() => setHover(null)}>
        {!readOnly && (
          <>
            <span style={{ position: 'absolute', left: 0, top: 0, width: '50%', height: '100%', zIndex: 1 }}
              onMouseEnter={() => setHover(star - 0.5)}
              onClick={() => onChange(star - 0.5)} />
            <span style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', zIndex: 1 }}
              onMouseEnter={() => setHover(star)}
              onClick={() => onChange(star)} />
          </>
        )}
        {renderStar(getType(star))}
      </span>
    ))}
    </div>
  );
}

