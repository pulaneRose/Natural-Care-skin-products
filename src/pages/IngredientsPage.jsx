import React, { useState } from 'react';
import { Search, X, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ingredients } from '../data/ingredients';
import { products } from '../data/products';

export default function IngredientsPage({ onSelectProduct }) {
  const [search, setSearch] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const filtered = ingredients.filter(ing => 
    ing.name.toLowerCase().includes(search.toLowerCase()) ||
    ing.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
    ing.function.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="section-padding" style={{ background: 'var(--bg-primary)', minHeight: '85vh' }}>
      <div className="container">
        {/* HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'var(--brand-green-deep)',
            color: '#FFFFFF',
            padding: '0.35rem 0.85rem',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            <span>🌿</span>
            <span>Natural Botanical Actives</span>
          </div>
          <h1 className="title-section" style={{ fontSize: '3rem', color: 'var(--brand-green-deep)', marginBottom: '0.75rem' }}>
            What's inside our skincare
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Discover the high-purity botanical actives behind our formulations, anchored by our major hero active: <strong style={{ color: 'var(--brand-okra)' }}>Okra Mucilage</strong>.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div style={{
          maxWidth: '520px',
          margin: '0 auto 3.5rem auto',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'var(--bg-card)',
            padding: '0.85rem 1.4rem',
            borderRadius: '999px',
            border: '1.5px solid var(--border-medium)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Search size={18} color="var(--brand-green)" />
            <input
              type="text"
              placeholder="Search ingredient (Okra, Ceramides, Niacinamide...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '0.95rem', color: 'var(--text-primary)' }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ color: 'var(--text-muted)' }}>
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* INGREDIENTS GRID WITH IMAGES */}
        <div className="grid-3" style={{ gap: '2rem' }}>
          {filtered.map((ing) => (
            <div
              key={ing.id}
              style={{
                background: 'var(--bg-card)',
                borderRadius: '24px',
                padding: '1.75rem',
                border: ing.id === 'ing-okra-extract' ? '2px solid var(--brand-okra)' : '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: ing.id === 'ing-okra-extract' ? '0 12px 30px rgba(74, 122, 54, 0.15)' : 'var(--shadow-sm)',
                transition: 'all var(--transition-normal)',
                position: 'relative'
              }}
            >
              {ing.id === 'ing-okra-extract' && (
                <div style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  background: 'var(--brand-okra)',
                  color: '#FFF',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '0.25rem 0.65rem',
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Major Hero
                </div>
              )}

              {/* Ingredient Image */}
              <div style={{
                width: '100%',
                aspectRatio: '1 / 0.85',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '1.25rem',
                border: '1px solid var(--border-light)',
                background: 'var(--brand-green-subtle)'
              }}>
                <img 
                  src={ing.image} 
                  alt={ing.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-green-accent)', fontWeight: 700, marginBottom: '0.4rem' }}>
                {ing.type}
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.6rem', color: 'var(--brand-green-deep)', fontWeight: 600 }}>
                {ing.name}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, flexGrow: 1, marginBottom: '1.5rem' }}>
                {ing.shortDescription}
              </p>
              
              <button
                onClick={() => setSelectedIngredient(ing)}
                className="btn btn-secondary"
                style={{ 
                  width: '100%', 
                  fontSize: '0.85rem', 
                  padding: '0.75rem',
                  borderColor: 'var(--brand-green)',
                  color: 'var(--brand-green-deep)',
                  fontWeight: 600
                }}
              >
                Explore Active Details <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* INGREDIENT DETAIL MODAL */}
        {selectedIngredient && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 300,
            background: 'rgba(20, 53, 35, 0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.25s ease-out'
          }}>
            <div style={{
              background: 'var(--bg-primary)',
              borderRadius: '28px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2.5rem',
              position: 'relative',
              boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
              border: '1.5px solid var(--brand-green-light)'
            }}>
              {/* Close Button */}
              <button
                onClick={() => setSelectedIngredient(null)}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  color: 'var(--brand-green-deep)',
                  background: 'var(--brand-green-light)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                <img 
                  src={selectedIngredient.image} 
                  alt={selectedIngredient.name} 
                  style={{ 
                    width: '90px', 
                    height: '90px', 
                    borderRadius: '20px', 
                    objectFit: 'cover', 
                    border: '2px solid var(--brand-green-accent)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.1)' 
                  }} 
                />
                <div>
                  <span className="eyebrow" style={{ color: 'var(--brand-green-accent)', fontWeight: 700 }}>
                    {selectedIngredient.type}
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', color: 'var(--brand-green-deep)', fontWeight: 600 }}>
                    {selectedIngredient.name}
                  </h2>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-green-deep)', fontWeight: 700, marginBottom: '0.4rem' }}>
                    What It Is
                  </h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {selectedIngredient.description}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-green-deep)', fontWeight: 700, marginBottom: '0.4rem' }}>
                    Key Skin Benefits
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {selectedIngredient.benefits.map((b, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle2 size={16} color="var(--brand-green-accent)" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-green-deep)', fontWeight: 700, marginBottom: '0.4rem' }}>
                    Role In Our Formulation
                  </h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {selectedIngredient.roleInFormulation}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-green-deep)', fontWeight: 700, marginBottom: '0.6rem' }}>
                    Products Containing {selectedIngredient.name}
                  </h4>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {selectedIngredient.productsContaining.map((pId) => {
                      const prod = products.find(p => p.id === pId);
                      if (!prod) return null;
                      return (
                        <button
                          key={pId}
                          onClick={() => {
                            setSelectedIngredient(null);
                            onSelectProduct(prod);
                          }}
                          className="btn-pill-tag"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', cursor: 'pointer' }}
                        >
                          <Sparkles size={12} color="var(--brand-green-accent)" />
                          <span>{prod.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}