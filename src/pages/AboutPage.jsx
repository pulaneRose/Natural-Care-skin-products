import React from 'react';
import { Camera, FlaskConical, Users, ShieldCheck, HeartHandshake, Leaf } from 'lucide-react';

export default function AboutPage() {
  const photographyPlaceholders = [
    { title: "Founder & Formulators", badge: "Team Photography Coming Soon", icon: Users, theme: "rose" },
    { title: "Pharmacy Formulation Lab", badge: "Lab Photography Coming Soon", icon: FlaskConical, theme: "sage" },
    { title: "Botanical Sourcing Studio", badge: "Brand Photography Coming Soon", icon: Camera, theme: "beige" }
  ];

  return (
    <div className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* HERO */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem auto' }}>
          <span className="eyebrow">Our Origins</span>
          <h1 className="title-section" style={{ fontSize: '3.25rem' }}>
            Okra skincare formulated <br />
            <span style={{ fontStyle: 'italic', fontWeight: 300 }}>with intention and transparency.</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '1.25rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
            SkinCare Brand brings together Okra mucilage botanical science and pharmacy formulation expertise to create clean, thoughtful products for your everyday routine.
          </p>
        </div>

        {/* PHOTOGRAPHY SHOWCASE GRID */}
        <div className="grid-3" style={{ marginBottom: '5rem' }}>
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ width: '100%', height: '240px', overflow: 'hidden' }}>
              <img src="/images/products/okra-radiance-serum.jpg" alt="Pharmacy Lab Formulation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1.5rem' }}>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-green-accent)', fontWeight: 700 }}>Pillar 01</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--brand-green-deep)', margin: '0.3rem 0' }}>Pharmacy Formulation Lab</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Precision chemistry paired with cold-pressed Okra mucilage extraction.</p>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '2px solid var(--brand-okra)',
            boxShadow: '0 8px 24px rgba(74, 122, 54, 0.15)'
          }}>
            <div style={{ width: '100%', height: '240px', overflow: 'hidden' }}>
              <img src="/images/ingredients/ingredient-okra.jpg" alt="Botanical Okra Sourcing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1.5rem' }}>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-okra)', fontWeight: 700 }}>Major Hero Ingredient</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--brand-green-deep)', margin: '0.3rem 0' }}>Botanical Okra Sourcing</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>High-purity fresh Okra pods harvested for their rich water-binding mucilage.</p>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ width: '100%', height: '240px', overflow: 'hidden' }}>
              <img src="/images/products/okra-night-elixir.jpg" alt="Botanical Lipid Blending" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1.5rem' }}>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-green-accent)', fontWeight: 700 }}>Pillar 03</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--brand-green-deep)', margin: '0.3rem 0' }}>Lipid & Oil Extraction</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Cold-pressed Okra seed lipid blending for restorative overnight care.</p>
            </div>
          </div>
        </div>

        {/* SECTION: OUR STORY */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          marginBottom: '5rem'
        }}>
          <div>
            <span className="eyebrow">Pillar One</span>
            <h2 className="title-section" style={{ marginBottom: '1.25rem' }}>Our Story</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem', fontSize: '0.98rem' }}>
              SkinCare Brand was conceived out of a desire for unpretentious, highly effective skincare. In an industry often dominated by complex claims and endless multi-step routines, we set out to build a streamlined collection grounded in clarity and quality.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.98rem' }}>
              By partnering directly with licensed pharmacy experts, our formulations focus on skin-identical lipids, humectants, and stabilized botanical antioxidants designed to work in synergy with your skin.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: '24px',
            padding: '3rem',
            border: '1px solid var(--border-light)'
          }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>
              "Simplicity is the highest form of sophistication in formulation."
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Every product in our upcoming lineup is developed with purpose, removing unnecessary scents and aggressive agents in favor of skin-supporting purity.
            </p>
          </div>
        </div>

        {/* SECTION: PHILOSOPHY & FORMULATION APPROACH */}
        <div className="grid-3" style={{ marginBottom: '5rem' }}>
          <div style={{ background: 'var(--bg-card)', padding: '2.5rem 2rem', borderRadius: '20px', border: '1px solid var(--border-light)' }}>
            <span className="eyebrow">Our Philosophy</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '1rem' }}>
              Less, But Better
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              We believe a routine shouldn't overwhelm your skin. Each product delivers multi-benefit functionality to streamline your morning and evening rituals.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '2.5rem 2rem', borderRadius: '20px', border: '1px solid var(--border-light)' }}>
            <span className="eyebrow">Approach to Formulation</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '1rem' }}>
              Pharmacy Collaboration
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Formulations are crafted in partnership with licensed pharmaceutical specialists to ensure stability, skin compatibility, and gentle performance.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '2.5rem 2rem', borderRadius: '20px', border: '1px solid var(--border-light)' }}>
            <span className="eyebrow">Ingredient Selection</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '1rem' }}>
              Clean Sourcing
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              We select biocompatible ingredients—such as plant ceramides, Niacinamide, and Hyaluronic Acid—that support your skin's natural moisture barrier.
            </p>
          </div>
        </div>

        {/* SECTION: QUALITY & CARE */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: '24px',
          padding: '3.5rem 2.5rem',
          textAlign: 'center',
          border: '1px solid var(--border-light)',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <span className="eyebrow">Our Promise</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1rem' }}>
            Quality & Care
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '750px', margin: '0 auto' }}>
            As our products progress through formulation development, we remain committed to total transparency. Detailed batch tracking, ingredient breakdowns, and usage guidance will accompany every launch.
          </p>
        </div>
      </div>
    </div>
  );
}
