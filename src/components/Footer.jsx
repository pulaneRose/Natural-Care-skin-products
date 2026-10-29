import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Footer({ setActivePage, onOpenQr, onSubscribeNewsletter }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      onSubscribeNewsletter(email);
      setEmail('');
    }
  };

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-medium)',
      paddingTop: '4.5rem',
      paddingBottom: '2.5rem',
      marginTop: '4rem',
      color: 'var(--text-primary)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          {/* Brand Philosophy */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '1.4rem', color: '#B58D3D' }}>🌸</span>
              <span style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: '1.75rem', 
                fontWeight: 700, 
                color: 'var(--brand-green-deep)',
                lineHeight: 1
              }}>
                NATURAL CARE
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Home of the signature <strong>Okra Mucin Face Serum</strong> (Hydrate • Soothe • Smoothen). Formulated with pure plant-based Okra mucilage for healthy, radiant, glowing skin.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--brand-green-accent)', fontWeight: 700 }}>
              <ShieldCheck size={16} />
              <span>Plant Based • Cruelty Free • Paraben Free • Silicone Free</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: '1.2rem', fontWeight: 600 }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <li><button onClick={() => setActivePage('shop')} style={{ color: 'var(--text-secondary)' }}>Shop All Skincare</button></li>
              <li><button onClick={() => setActivePage('collections')} style={{ color: 'var(--text-secondary)' }}>Collections</button></li>
              <li><button onClick={() => setActivePage('ingredients')} style={{ color: 'var(--text-secondary)' }}>Ingredient Library</button></li>
              <li><button onClick={() => setActivePage('about')} style={{ color: 'var(--text-secondary)' }}>Our Brand Story</button></li>
              <li><button onClick={() => setActivePage('journal')} style={{ color: 'var(--text-secondary)' }}>Skincare Journal</button></li>
              <li><button onClick={() => setActivePage('contact')} style={{ color: 'var(--text-secondary)' }}>Contact & FAQ</button></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: '1.2rem', fontWeight: 600 }}>
              Customer Care
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li>Shipping & Delivery Information</li>
              <li>Returns & Exchange Policy</li>
              <li>Product Safety & Patch Testing</li>
              <li>Formulation Progress Updates</li>
              <li>Privacy Policy & Terms</li>
              <li>
                <button
                  onClick={onOpenQr}
                  style={{
                    color: 'var(--brand-green-deep)',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  📱 Scan QR Code (Mobile & Print)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    color: 'var(--accent-sage)',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  🔐 Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: '1.2rem', fontWeight: 600 }}>
              Join Our Community
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
              Subscribe for early access to product launches, ingredient breakdowns, and skincare insights.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flexGrow: 1,
                  padding: '0.75rem 1rem',
                  borderRadius: '999px',
                  border: '1px solid var(--border-medium)',
                  fontSize: '0.85rem',
                  background: 'var(--bg-primary)'
                }}
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                style={{
                  background: 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                  borderRadius: '50%',
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          textAlign: 'center',
          fontSize: '0.78rem',
          color: 'var(--text-muted)'
        }}>
          <p style={{ maxWidth: '800px', lineHeight: 1.5 }}>
            <strong>Disclaimer:</strong> SkinCare Brand products are developed in partnership with licensed pharmaceutical formulators. Information provided on this website is for educational and product preview purposes. No medical claims are intended.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span>© 2026 SkinCare Brand. All rights reserved.</span>
            <span>Made with Care & Transparency</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
