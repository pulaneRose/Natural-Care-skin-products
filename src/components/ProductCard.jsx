import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Sparkles, Clock } from 'lucide-react';
import ProductImagePlaceholder from './ProductImagePlaceholder';

export default function ProductCard({ 
  product, 
  onSelectProduct, 
  onAddToCart, 
  onToggleWishlist, 
  isWishlisted = false 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isPurchasable = product.isPurchasable !== false && !product.isFutureCollection;

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'var(--bg-card)',
        borderRadius: '20px',
        padding: '1rem',
        border: isHovered 
          ? (isPurchasable ? '1px solid var(--brand-green-accent)' : '1px solid #C5A059') 
          : '1px solid var(--border-light)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all var(--transition-normal)',
        boxShadow: isHovered ? '0 12px 30px rgba(20, 53, 35, 0.12)' : 'var(--shadow-sm)',
        transform: isHovered ? 'translateY(-4px)' : 'none'
      }}
    >
      {/* Top Left Badge */}
      {product.isFutureCollection ? (
        <div 
          style={{
            position: 'absolute',
            top: '1.4rem',
            left: '1.4rem',
            zIndex: 10,
            background: 'linear-gradient(135deg, #B58D3D 0%, #8A651E 100%)',
            color: '#FFFFFF',
            borderRadius: '999px',
            padding: '0.28rem 0.75rem',
            fontSize: '0.66rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            boxShadow: '0 4px 12px rgba(138, 101, 30, 0.35)'
          }}
        >
          <Clock size={11} />
          <span>Future Collection</span>
        </div>
      ) : product.isMainProduct ? (
        <div 
          style={{
            position: 'absolute',
            top: '1.4rem',
            left: '1.4rem',
            zIndex: 10,
            background: 'var(--brand-green-deep)',
            color: '#FFFFFF',
            borderRadius: '999px',
            padding: '0.28rem 0.75rem',
            fontSize: '0.66rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            boxShadow: '0 4px 12px rgba(20, 53, 35, 0.25)'
          }}
        >
          <span>⭐</span>
          <span>Main Serum</span>
        </div>
      ) : (
        <div 
          style={{
            position: 'absolute',
            top: '1.4rem',
            left: '1.4rem',
            zIndex: 10,
            background: 'var(--brand-green-deep)',
            color: '#FFFFFF',
            borderRadius: '999px',
            padding: '0.28rem 0.75rem',
            fontSize: '0.66rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            boxShadow: '0 4px 12px rgba(20, 53, 35, 0.25)'
          }}
        >
          <span>🌿</span>
          <span>In Stock</span>
        </div>
      )}

      {/* Wishlist Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product);
        }}
        aria-label="Add to Wishlist"
        style={{
          position: 'absolute',
          top: '1.4rem',
          right: '1.4rem',
          zIndex: 10,
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(6px)',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--border-light)',
          color: isWishlisted ? '#D9534F' : 'var(--text-secondary)',
          transition: 'all var(--transition-fast)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
        }}
      >
        <Heart size={18} fill={isWishlisted ? '#D9534F' : 'none'} />
      </button>

      {/* Image Container with Click Handler */}
      <div 
        onClick={() => onSelectProduct(product)}
        style={{ 
          cursor: 'pointer', 
          marginBottom: '1rem', 
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          aspectRatio: '1 / 1.1',
          background: product.isMainProduct ? '#FFFFFF' : 'var(--brand-green-subtle)',
          border: product.isMainProduct ? '1px solid rgba(20,53,35,0.08)' : 'none'
        }}
      >
        {product.image && !imgError ? (
          <img 
            src={product.image} 
            alt={product.name}
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: product.isMainProduct ? 'contain' : 'cover',
              padding: product.isMainProduct ? '0.75rem' : '0',
              transition: 'transform var(--transition-normal)',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
        ) : (
          <ProductImagePlaceholder 
            name={product.name} 
            theme={product.placeholderTheme || 'sage'} 
          />
        )}

        {/* Quick Add / Future Collection Overlay Button */}
        {isPurchasable ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '50%',
              transform: `translateX(-50%) translateY(${isHovered ? '0' : '10px'})`,
              opacity: isHovered ? 1 : 0,
              background: 'var(--brand-green-deep)',
              color: '#FFFFFF',
              padding: '0.65rem 1.4rem',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 8px 20px rgba(20, 53, 35, 0.35)',
              transition: 'all var(--transition-fast)',
              width: '85%',
              justifyContent: 'center',
              pointerEvents: isHovered ? 'auto' : 'none'
            }}
          >
            <ShoppingBag size={15} /> Add to Bag
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '50%',
              transform: `translateX(-50%) translateY(${isHovered ? '0' : '10px'})`,
              opacity: isHovered ? 1 : 0,
              background: '#242424',
              color: '#E5C07B',
              border: '1px solid #C5A059',
              padding: '0.65rem 1.2rem',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
              transition: 'all var(--transition-fast)',
              width: '85%',
              justifyContent: 'center',
              pointerEvents: isHovered ? 'auto' : 'none'
            }}
          >
            <Clock size={13} /> View Future Collection
          </button>
        )}
      </div>

      {/* Product Details */}
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: isPurchasable ? 'var(--brand-green-accent)' : '#9E7D3B', fontWeight: 700 }}>
            {product.brand || 'Natural Care'} • {product.type}
          </span>
          {isPurchasable && product.price ? (
            <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--brand-green-deep)' }}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          ) : (
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#8A651E', background: '#F5EDDC', padding: '0.15rem 0.55rem', borderRadius: '999px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Coming Soon
            </span>
          )}
        </div>

        <h3 
          onClick={() => onSelectProduct(product)}
          style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '1.25rem', 
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: '0.2rem',
            lineHeight: 1.25,
            color: 'var(--brand-green-deep)'
          }}
        >
          {product.name}
        </h3>

        {product.subtitle && (
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--brand-okra)', marginBottom: '0.4rem', letterSpacing: '0.02em' }}>
            {product.subtitle}
          </div>
        )}

        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.shortDescription}
        </p>

        {/* Major Ingredient & Key Ingredients Visual Showcase */}
        <div style={{ 
          background: isPurchasable ? 'var(--brand-green-light)' : '#FAF8F2', 
          borderRadius: '12px', 
          padding: '0.65rem 0.75rem', 
          marginBottom: '0.85rem',
          border: isPurchasable ? '1px solid rgba(31, 74, 50, 0.12)' : '1px solid rgba(197, 160, 89, 0.25)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--brand-green-deep)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Key Actives
            </span>
            <span style={{ fontSize: '0.66rem', fontWeight: 700, color: isPurchasable ? 'var(--brand-okra)' : '#8A651E', background: isPurchasable ? 'var(--brand-okra-light)' : '#F5EDDC', padding: '0.1rem 0.45rem', borderRadius: '999px' }}>
              {isPurchasable ? (product.majorIngredient?.badge || '🌿 In Stock') : 'Future Collection'}
            </span>
          </div>

          {/* Ingredient Thumbnails with Avatars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
            {product.ingredientImages && product.ingredientImages.map((ing, idx) => (
              <div 
                key={idx}
                title={`${ing.name} • ${ing.role}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  background: ing.isMajor ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                  border: ing.isMajor ? '1.5px solid var(--brand-okra)' : '1px solid rgba(20,53,35,0.1)',
                  borderRadius: '999px',
                  padding: '0.15rem 0.45rem 0.15rem 0.2rem',
                  fontSize: '0.7rem',
                  fontWeight: ing.isMajor ? 700 : 500,
                  color: ing.isMajor ? 'var(--brand-green-deep)' : 'var(--text-secondary)'
                }}
              >
                <img 
                  src={ing.image} 
                  alt={ing.name} 
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <span>{ing.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rating & Action Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--border-light)', marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', color: '#D4A373' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill="#D4A373" stroke="none" />
              ))}
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>({product.reviewCount})</span>
          </div>

          {isPurchasable ? (
            <button
              onClick={() => onAddToCart(product)}
              style={{
                padding: '0.4rem 0.95rem',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                border: '1.5px solid var(--brand-green-deep)',
                color: 'var(--brand-green-deep)',
                background: 'transparent',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--brand-green-deep)';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--brand-green-deep)';
              }}
            >
              + Bag
            </button>
          ) : (
            <button
              onClick={() => onSelectProduct(product)}
              style={{
                padding: '0.35rem 0.8rem',
                borderRadius: '999px',
                fontSize: '0.72rem',
                fontWeight: 700,
                border: '1px solid #C5A059',
                color: '#8A651E',
                background: '#FAF5EA',
                letterSpacing: '0.02em',
                cursor: 'pointer'
              }}
            >
              Future Collection
            </button>
          )}
        </div>
      </div>
    </div>
  );
}