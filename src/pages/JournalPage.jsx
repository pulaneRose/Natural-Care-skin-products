import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X, Sparkles } from 'lucide-react';
import ProductImagePlaceholder from '../components/ProductImagePlaceholder';
import { journalArticles } from '../data/journal';

export default function JournalPage() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="section-padding" style={{ background: 'var(--bg-primary)', minHeight: '85vh' }}>
      <div className="container">
        {/* HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>
          <span className="eyebrow">Skincare Education</span>
          <h1 className="title-section" style={{ fontSize: '3rem' }}>The Skincare Journal</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', fontSize: '1.05rem' }}>
            Thoughtful articles, ingredient deep dives, and skincare routines written to empower your skin choices.
          </p>
        </div>

        {/* ARTICLES GRID */}
        <div className="grid-3">
          {journalArticles.map((art) => (
            <div
              key={art.id}
              style={{
                background: 'var(--bg-card)',
                borderRadius: '20px',
                padding: '1.25rem',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {/* Image Placeholder */}
              <div style={{ marginBottom: '1.25rem' }}>
                <ProductImagePlaceholder 
                  name={art.title} 
                  theme={art.theme || 'rose'} 
                  badge={art.category}
                />
              </div>

              {/* Details */}
              <div style={{ padding: '0 0.5rem 0.5rem 0.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  <span>{art.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={12} /> {art.readTime}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '0.6rem', lineHeight: 1.25 }}>
                  {art.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, flexGrow: 1, marginBottom: '1.25rem' }}>
                  {art.shortDescription}
                </p>

                <button
                  onClick={() => setSelectedArticle(art)}
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--accent-sage)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    alignSelf: 'flex-start'
                  }}
                >
                  Read Full Article <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FULL ARTICLE MODAL */}
        {selectedArticle && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 300,
            background: 'rgba(33, 33, 31, 0.5)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.25s ease-out'
          }}>
            <div style={{
              background: 'var(--bg-primary)',
              borderRadius: '24px',
              maxWidth: '750px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '3rem 2.5rem',
              position: 'relative',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <button
                onClick={() => setSelectedArticle(null)}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  color: 'var(--text-primary)'
                }}
              >
                <X size={24} />
              </button>

              <span className="eyebrow">{selectedArticle.category} • {selectedArticle.readTime}</span>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.2 }}>
                {selectedArticle.title}
              </h1>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                Published in {selectedArticle.date} by SkinCare Brand Editorial
              </div>

              <div style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {selectedArticle.content}
              </div>

              <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)', textAlign: 'center' }}>
                <button onClick={() => setSelectedArticle(null)} className="btn btn-secondary">
                  Back to Journal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
