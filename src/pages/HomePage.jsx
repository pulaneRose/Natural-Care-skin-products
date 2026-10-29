import React from 'react';
import { ArrowRight, Sparkles, Droplets, ShieldCheck, Heart, Leaf } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { ingredients } from '../data/ingredients';

export default function HomePage({ 
  setActivePage, 
  onSelectProduct, 
  onAddToCart, 
  onToggleWishlist, 
  wishlistIds = [],
  onSubscribeNewsletter,
  setSelectedConcern
}) {
  const featuredProducts = products.slice(0, 4);
  const spotlightIngredients = ingredients.slice(0, 4);

  const concerns = [
    { title: "Hydration", icon: Droplets, desc: "Deep moisture replenishment for dry & thirsty skin.", theme: "sage" },
    { title: "Radiance", icon: Sparkles, desc: "Vitamin-infused formulas for natural luminosity.", theme: "rose" },
    { title: "Barrier Care", icon: ShieldCheck, desc: "Ceramides and lipids to comfort delicate skin barriers.", theme: "beige" },
    { title: "Texture", icon: Leaf, desc: "Gentle conditioning for smooth skin feel.", theme: "lavender" },
    { title: "Oil Control", icon: ShieldCheck, desc: "Clarifying minerals to balance excess surface shine.", theme: "sage" },
    { title: "Daily Essentials", icon: Heart, desc: "Core cleanser & serum foundation for daily routines.", theme: "rose" }
  ];

  const whyUsFeatures = [
    { title: "Thoughtfully Formulated", desc: "Crafted in partnership with licensed pharmacy formulators focusing on high-purity, skin-friendly components." },
    { title: "Major Hero Ingredient: Okra", desc: "Every formulation is built upon concentrated cold-pressed Okra mucilage polysaccharides for natural glass-skin hydration." },
    { title: "Clean Green Standards", desc: "Produced in small precision batches to ensure optimal quality, stability, and formulation freshness." },
    { title: "Designed for Everyday Skincare", desc: "Lightweight, non-greasy textures designed to fit effortlessly into your morning and evening rituals." }
  ];

  const handleConcernClick = (concernTitle) => {
    setSelectedConcern(concernTitle);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section style={{
        background: 'linear-gradient(180deg, var(--brand-green-light) 0%, var(--bg-primary) 100%)',
        padding: '4.5rem 0 6rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container hero-grid-layout">
          {/* Hero Content */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'var(--brand-green-deep)',
              color: '#FFFFFF',
              padding: '0.35rem 0.95rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>
              <span>🌸</span>
              <span>Natural Care • Okra Mucin Series</span>
            </div>

            <h1 className="title-hero" style={{ marginBottom: '0.85rem', color: 'var(--brand-green-deep)', lineHeight: 1.15 }}>
              Okra Mucin <br />
              <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--brand-green-accent)' }}>
                Face Serum
              </span>
            </h1>

            <div style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              color: 'var(--brand-okra)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>
              Hydrate • Soothe • Smoothen
            </div>

            <p className="subtitle-hero" style={{ marginBottom: '2.5rem', color: 'var(--text-secondary)' }}>
              With Natural Okra Mucin for healthy, glowing skin. High-potency botanical polysaccharides cushion and repair the skin barrier, delivering deep hydration and silky smoothness with zero stickiness.
            </p>

            <div className="hero-cta-buttons" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => {
                  onSelectProduct(products[0]);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn btn-primary"
                style={{ background: 'var(--brand-green-deep)', borderColor: 'var(--brand-green-deep)', color: '#FFF' }}
              >
                Shop Okra Mucin Serum (₹1,299) <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => setActivePage('shop')}
                className="btn btn-secondary"
                style={{ borderColor: 'var(--brand-green)', color: 'var(--brand-green-deep)', fontWeight: 600 }}
              >
                Explore Future Collection
              </button>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div style={{ position: 'relative' }}>
            <div 
              onClick={() => {
                onSelectProduct(products[0]);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                background: 'var(--bg-card)',
                borderRadius: '28px',
                padding: '1.25rem',
                boxShadow: '0 20px 48px rgba(20, 53, 35, 0.14)',
                border: '1px solid var(--border-light)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '2rem',
                left: '2rem',
                zIndex: 10,
                background: 'rgba(20,53,35,0.92)',
                color: '#FFF',
                backdropFilter: 'blur(8px)',
                padding: '0.35rem 0.95rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.04em'
              }}>
                ⭐ Flagship Product • Net Vol. 10 mL
              </div>

              <img 
                src="/images/products/okra-mucin-serum-editorial.jpg" 
                alt="Okra Mucin Face Serum with Fresh Okra and Okra Blossom"
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1.15',
                  objectFit: 'cover',
                  borderRadius: '20px'
                }}
              />

              {/* Major Ingredient Badge Overlay */}
              <div style={{
                position: 'absolute',
                bottom: '2rem',
                right: '2rem',
                background: 'rgba(255, 255, 255, 0.96)',
                backdropFilter: 'blur(10px)',
                padding: '0.65rem 1.1rem',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                border: '1px solid rgba(20,53,35,0.12)'
              }}>
                <img 
                  src="/images/products/okra-mucin-serum-main.png" 
                  alt="Okra Mucin Bottle" 
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'contain', background: '#F4F7F4', border: '1.5px solid var(--brand-okra)' }}
                />
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--brand-okra)', textTransform: 'uppercase' }}>Available Now</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--brand-green-deep)' }}>Okra Mucin Serum</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem auto' }}>
            <span className="eyebrow" style={{ color: 'var(--brand-green-accent)', fontWeight: 700 }}>Botanical Formulations</span>
            <h2 className="title-section" style={{ color: 'var(--brand-green-deep)' }}>Skincare made for your routine</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
              Explore our core formulations designed to hydrate, balance, and nourish your skin daily with cold-pressed Okra extracts.
            </p>
          </div>

          <div className="grid-4">
            {featuredProducts.map((prod) => (
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

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <button 
              onClick={() => setActivePage('shop')} 
              className="btn btn-secondary"
              style={{ borderColor: 'var(--brand-green)', color: 'var(--brand-green-deep)', fontWeight: 600 }}
            >
              View Full Okra Product Catalog <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* SHOP BY CONCERN */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            <span className="eyebrow" style={{ color: 'var(--brand-green-accent)', fontWeight: 700 }}>Tailored Solutions</span>
            <h2 className="title-section" style={{ color: 'var(--brand-green-deep)' }}>Shop by Skin Concern</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Select your skin's daily priority to discover targeted Okra-powered formulas.
            </p>
          </div>

          <div className="grid-3">
            {concerns.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => handleConcernClick(item.title)}
                  style={{
                    background: 'var(--bg-card)',
                    borderRadius: '20px',
                    padding: '2rem',
                    cursor: 'pointer',
                    border: '1px solid var(--border-light)',
                    transition: 'all var(--transition-normal)'
                  }}
                  className="card-hover-effect"
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--brand-green-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem'
                  }}>
                    <IconComp size={22} color="var(--brand-green-accent)" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--brand-green-deep)' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--brand-green-accent)', marginTop: '1rem', display: 'inline-block' }}>
                    Explore Collection →
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INGREDIENT SPOTLIGHT WITH IMAGES */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem auto' }}>
            <span className="eyebrow" style={{ color: 'var(--brand-green-accent)', fontWeight: 700 }}>Transparent Formulations</span>
            <h2 className="title-section" style={{ color: 'var(--brand-green-deep)' }}>Ingredient Spotlight</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Discover the high-purity botanical actives that power our skincare, led by our major hero ingredient: Okra.
            </p>
          </div>

          <div className="grid-4">
            {spotlightIngredients.map((ing) => (
              <div key={ing.id} style={{
                background: 'var(--bg-card)',
                borderRadius: '20px',
                padding: '1.5rem',
                border: ing.id === 'ing-okra-extract' ? '2px solid var(--brand-okra)' : '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow: ing.id === 'ing-okra-extract' ? '0 10px 24px rgba(74, 122, 54, 0.15)' : 'var(--shadow-sm)'
              }}>
                {ing.id === 'ing-okra-extract' && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'var(--brand-okra)',
                    color: '#FFF',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '999px',
                    textTransform: 'uppercase'
                  }}>
                    Major Hero
                  </div>
                )}

                <div style={{
                  width: '100%',
                  aspectRatio: '1/1',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: '1rem',
                  border: '1px solid var(--border-light)'
                }}>
                  <img src={ing.image} alt={ing.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-green-accent)', fontWeight: 700, marginBottom: '0.3rem' }}>
                  {ing.type}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--brand-green-deep)' }}>
                  {ing.name}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45, flexGrow: 1, marginBottom: '1.25rem' }}>
                  {ing.shortDescription}
                </p>
                <button
                  onClick={() => setActivePage('ingredients')}
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--brand-green-deep)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    alignSelf: 'flex-start',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Learn More <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STORY BRIEF */}
      <section className="section-padding" style={{ background: 'var(--brand-green-light)' }}>
        <div className="container hero-grid-layout">
          <div>
            <span className="eyebrow" style={{ color: 'var(--brand-green-accent)', fontWeight: 700 }}>Our Botanical Philosophy</span>
            <h2 className="title-section" style={{ marginBottom: '1.25rem', color: 'var(--brand-green-deep)' }}>
              Okra skincare with intention.
            </h2>
            <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              SkinCare Brand was created to harness the natural moisture reservoir of Okra mucilage combined with pharmaceutical precision. We eliminate unneeded fillers to focus entirely on biocompatible Okra polysaccharides, ceramides, and vitamins that respect your skin's natural balance.
            </p>
            <button 
              onClick={() => setActivePage('about')}
              className="btn btn-primary"
              style={{ background: 'var(--brand-green-deep)', borderColor: 'var(--brand-green-deep)', color: '#FFF' }}
            >
              Learn About Our Brand Story <ArrowRight size={16} />
            </button>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '24px',
            padding: '2rem',
            textAlign: 'center',
            border: '1.5px solid var(--brand-okra)',
            boxShadow: '0 12px 32px rgba(20,53,35,0.08)'
          }}>
            <img 
              src="/images/ingredients/ingredient-okra.jpg" 
              alt="Fresh Okra Macro" 
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover',
                margin: '0 auto 1.5rem auto',
                border: '3px solid var(--brand-okra)'
              }}
            />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '0.75rem', fontStyle: 'italic', color: 'var(--brand-green-deep)' }}>
              "Purity, clarity, and Okra botanical vitality in every formulation."
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--brand-okra)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>
              🌿 100% Okra Polysaccharide Standard
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}