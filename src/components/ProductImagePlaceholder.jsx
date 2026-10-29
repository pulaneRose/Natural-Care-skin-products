import React from 'react';
import { Sparkles } from 'lucide-react';

export default function ProductImagePlaceholder({ 
  name = "Product Formulation", 
  theme = "rose", 
  size = "normal", 
  badge = "Formulation Phase" 
}) {
  const isLarge = size === 'large';
  
  return (
    <div className={`placeholder-container ${theme} ${isLarge ? 'large-placeholder' : ''}`}>
      <div className="placeholder-badge">
        {badge}
      </div>
      
      <div className="placeholder-shape" style={{ width: isLarge ? '140px' : '100px', height: isLarge ? '140px' : '100px' }}>
        <Sparkles size={isLarge ? 32 : 24} color="#69776A" opacity={0.7} />
      </div>
      
      <div className="placeholder-text" style={{ fontSize: isLarge ? '1.4rem' : '1rem' }}>
        {name}
      </div>
      <div className="placeholder-subtext">
        Image Coming Soon • Pharmacy Formulated
      </div>
    </div>
  );
}
