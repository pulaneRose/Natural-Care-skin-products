import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div style={{ borderTop: '1px solid var(--border-medium)' }}>
      {items.map((item, idx) => (
        <div key={idx} style={{ borderBottom: '1px solid var(--border-medium)' }}>
          <button
            onClick={() => toggle(idx)}
            style={{
              width: '100%',
              padding: '1.25rem 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'left',
              fontSize: '1.05rem',
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              color: 'var(--text-primary)'
            }}
          >
            <span>{item.title}</span>
            <ChevronDown 
              size={18} 
              style={{
                transform: openIndex === idx ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform var(--transition-fast)'
              }}
            />
          </button>
          {openIndex === idx && (
            <div style={{ paddingBottom: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
