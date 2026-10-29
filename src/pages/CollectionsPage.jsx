import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { collections } from '../data/collections';
import { products } from '../data/products';

export default function CollectionsPage({ 
  onSelectProduct, 
  onAddToCart, 
  onToggleWishlist, 
  wishlistIds = [] 
}) {
  const [activeCollectionId, setActiveCollectionId] = useState(collections[0].id);

  const activeCollection = collections.find(c => c.id === activeCollectionId) || collections[0];
  const collectionProducts = products.filter(p => activeCollection.productIds.includes(p.id));

  return (
    <div className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>
          <span className="eyebrow">Curated Formulations</span>
          <h1 className="title-section" style={{ fontSize: '3rem' }}>Skincare Collections</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', fontSize: '1.05rem' }}>
            Explore targeted collections formulated to address specific skin goals and routines.
          </p>
        </div>

        {/* COLLECTION TABS */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
          marginBottom: '3.5rem'
        }}>
          {collections.map((col) => (
            <button
              key={col.id}
              onClick={() => setActiveCollectionId(col.id)}
              className={`btn-pill-tag ${activeCollectionId === col.id ? 'active' : ''}`}
              style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem' }}
            >
              {col.title}
            </button>
          ))}
        </div>

        {/* ACTIVE COLLECTION BANNER */}
        <div style={{
          background: `var(--accent-${activeCollection.theme}-light, var(--bg-secondary))`,
          borderRadius: '24px',
          padding: '3rem 2.5rem',
          marginBottom: '3.5rem',
          border: '1px solid var(--border-light)',
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto 3.5rem auto'
        }}>
          <span className="eyebrow">{activeCollection.subtitle}</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', marginBottom: '1rem' }}>
            {activeCollection.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto' }}>
            {activeCollection.description}
          </p>
        </div>

        {/* COLLECTION PRODUCT GRID */}
        <div className="grid-4">
          {collectionProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(prod.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
