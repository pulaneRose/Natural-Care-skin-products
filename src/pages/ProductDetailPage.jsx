import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Truck, RotateCcw, ShieldAlert, Sparkles, Plus, Minus, ArrowLeft, CheckCircle2, Clock, Bell, Leaf, Droplets } from 'lucide-react';
import ProductImagePlaceholder from '../components/ProductImagePlaceholder';
import Accordion from '../components/Accordion';

export default function ProductDetailPage({ 
  product, 
  onBack, 
  onAddToCart, 
  onToggleWishlist, 
  isWishlisted = false,
  onProceedToCheckout
}) {
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '10 ml');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [mainImageError, setMainImageError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product?.image || null);
  const [notified, setNotified] = useState(false);

  if (!product) return null;

  const currentDisplayImage = selectedImage || product.image;
  const isPurchasable = product.isPurchasable !== false && !product.isFutureCollection;

  const handleBuyNow = () => {
    if (!isPurchasable) return;
    onAddToCart(product, selectedSize, quantity);
    onProceedToCheckout();
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'ingredients', label: 'Ingredients & Actives' },
    { id: 'howToUse', label: 'How To Use' },
    { id: 'benefits', label: 'Key Benefits' },
    { id: 'faq', label: 'FAQ' }
  ];

  const shippingAccordion = [
    {
      title: 'Shipping Details',
      content: 'Complimentary shipping across India on orders over ₹2,500. Standard delivery takes 3–5 business days in climate-controlled protective packaging.'
    },
    {
      title: '30-Day Happiness Guarantee',
      content: 'If an Okra formulation does not suit your skin, return gently used items within 30 days for a full refund or exchange.'
    },
    {
      title: 'Pharmacy Purity Standards',
      content: 'Crafted according to strict clean beauty pharmacy guidelines. Plant-based, cruelty-free, and formulated without parabens or silicones.'
    },
    {
      title: 'Storage & Freshness',
      content: 'Store in a cool, dry place away from direct sunlight to preserve active Okra mucilage polysaccharides and botanical nutrients.'
    }
  ];

  // Images to show in gallery
  const galleryImages = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.image];

  return (
    <div className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Back Link */}
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.88rem',
            color: 'var(--brand-green)',
            marginBottom: '2rem',
            fontWeight: 600,
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={16} /> Back to Catalog
        </button>

        {/* Future Collection Notice if applicable */}
        {!isPurchasable && (
          <div style={{
            background: 'linear-gradient(135deg, #FFF9ED 0%, #F5ECDC 100%)',
            border: '1.5px solid #C5A059',
            borderRadius: '16px',
            padding: '1rem 1.5rem',
            marginBottom: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Clock size={20} color="#8A651E" />
              <div>
                <strong style={{ color: '#8A651E', fontSize: '0.92rem' }}>Future Collection Preview:</strong>
                <span style={{ fontSize: '0.85rem', color: '#5A523F', marginLeft: '0.4rem' }}>
                  This product is part of our upcoming collection. It exists on our platform for preview purposes and cannot be added to the cart yet.
                </span>
              </div>
            </div>
            <span style={{
              background: '#8A651E',
              color: '#FFF',
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              Coming Soon
            </span>
          </div>
        )}

        {/* TOP SECTION: IMAGE + DETAILS */}
        <div className="pdp-main-grid">
          {/* LEFT: Product Photography Gallery */}
          <div>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '1.5rem',
              border: isPurchasable ? '1px solid var(--border-light)' : '1.5px solid rgba(197, 160, 89, 0.4)',
              boxShadow: '0 16px 40px rgba(20, 53, 35, 0.08)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '440px'
            }}>
              {/* Top Left Badge */}
              {isPurchasable ? (
                <div style={{
                  position: 'absolute',
                  top: '1.5rem',
                  left: '1.5rem',
                  zIndex: 10,
                  background: 'var(--brand-green-deep)',
                  color: '#FFFFFF',
                  borderRadius: '999px',
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.18)'
                }}>
                  <span>🌿</span>
                  <span>Signature Okra Mucin Serum</span>
                </div>
              ) : (
                <div style={{
                  position: 'absolute',
                  top: '1.5rem',
                  left: '1.5rem',
                  zIndex: 10,
                  background: 'linear-gradient(135deg, #B58D3D 0%, #8A651E 100%)',
                  color: '#FFFFFF',
                  borderRadius: '999px',
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 12px rgba(138, 101, 30, 0.3)'
                }}>
                  <Clock size={12} />
                  <span>Future Collection</span>
                </div>
              )}

              {currentDisplayImage && !mainImageError ? (
                <img 
                  src={currentDisplayImage} 
                  alt={product.name}
                  onError={() => setMainImageError(true)}
                  style={{
                    maxHeight: '450px',
                    width: '100%',
                    objectFit: 'contain',
                    borderRadius: '16px'
                  }}
                />
              ) : (
                <ProductImagePlaceholder 
                  name={product.name} 
                  theme={product.placeholderTheme || 'sage'} 
                  size="large" 
                  badge={product.availability}
                />
              )}
            </div>

            {/* Gallery Thumbnail Selector */}
            <div style={{
              marginTop: '1.25rem',
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {galleryImages.map((imgUrl, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  style={{ 
                    width: '74px', 
                    height: '74px', 
                    borderRadius: '14px', 
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: selectedImage === imgUrl ? '2px solid var(--brand-green-deep)' : '1px solid var(--border-medium)',
                    background: '#FFFFFF',
                    padding: '3px',
                    opacity: selectedImage === imgUrl ? 1 : 0.65,
                    transition: 'all var(--transition-fast)',
                    boxShadow: selectedImage === imgUrl ? '0 4px 12px rgba(20,53,35,0.15)' : 'none'
                  }}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Info & Actions */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="eyebrow" style={{ color: isPurchasable ? 'var(--brand-green-accent)' : '#8A651E', fontWeight: 700 }}>
                  {product.brand || 'Natural Care'} • {product.type} • SKU: {product.sku}
                </span>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '0.25rem', color: 'var(--brand-green-deep)', fontWeight: 600 }}>
                  {product.name}
                </h1>
                {product.subtitle && (
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--brand-okra)', marginBottom: '0.75rem' }}>
                    {product.subtitle}
                  </div>
                )}
              </div>

              <button
                onClick={() => onToggleWishlist(product)}
                aria-label="Wishlist"
                style={{
                  background: 'var(--brand-green-light)',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isWishlisted ? '#D9534F' : 'var(--brand-green-deep)',
                  border: '1px solid rgba(20,53,35,0.1)',
                  cursor: 'pointer'
                }}
              >
                <Heart size={20} fill={isWishlisted ? '#D9534F' : 'none'} />
              </button>
            </div>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', color: '#D4A373' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#D4A373" stroke="none" />
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {product.rating} ({product.reviewCount} customer reviews)
              </span>
              <span style={{ 
                marginLeft: '0.5rem', 
                background: isPurchasable ? 'var(--brand-green-light)' : '#FFF6E0', 
                color: isPurchasable ? 'var(--brand-green-deep)' : '#8A651E', 
                padding: '0.15rem 0.65rem', 
                borderRadius: '999px', 
                fontSize: '0.72rem', 
                fontWeight: 700 
              }}>
                {isPurchasable ? 'In Stock • Ready to Ship' : 'Future Collection'}
              </span>
            </div>

            {/* Price in INR / Future Collection Status */}
            {isPurchasable && product.price ? (
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--brand-green-deep)', marginBottom: '1.25rem' }}>
                ₹{product.price.toLocaleString('en-IN')} <span style={{ fontSize: '0.95rem', fontWeight: 400, color: 'var(--text-muted)' }}>INR (Inclusive of all taxes)</span>
              </div>
            ) : (
              <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#8A651E', background: '#F5EDDC', border: '1px solid #E5C07B', padding: '0.35rem 0.8rem', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Coming Soon
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Price to be announced upon release
                </span>
              </div>
            )}

            {/* Short Description */}
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              {product.shortDescription}
            </p>

            {/* KEY BENEFITS HIGHLIGHT (From uploaded product bottle!) */}
            <div style={{
              background: 'linear-gradient(135deg, var(--brand-green-light) 0%, #FFFFFF 100%)',
              border: '1.5px solid rgba(46, 111, 74, 0.25)',
              borderRadius: '18px',
              padding: '1.25rem',
              marginBottom: '1.75rem'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--brand-green-deep)', marginBottom: '0.75rem' }}>
                ✨ Key Benefits (Natural Okra Mucin)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(product.keyBenefitsDetailed || [
                  { title: "Deep Hydration", desc: "Locks in moisture for soft, supple skin" },
                  { title: "Soothes & Calms", desc: "Helps reduce redness and irritation" },
                  { title: "Improves Smoothness", desc: "Makes skin feel smoother and more refined" },
                  { title: "Nourishes Skin", desc: "Rich in natural okra mucin and antioxidants" },
                  { title: "Lightweight & Non-Sticky", desc: "Quickly absorbs with a fresh feel" }
                ]).map((kb, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.85rem' }}>
                    <CheckCircle2 size={16} color="var(--brand-green-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ color: 'var(--brand-green-deep)' }}>{kb.title}:</strong> <span style={{ color: 'var(--text-secondary)' }}>{kb.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Formulation Standards Badges */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                marginTop: '1rem',
                paddingTop: '0.85rem',
                borderTop: '1px solid rgba(20,53,35,0.1)'
              }}>
                {["Plant Based", "Cruelty Free", "Paraben Free", "Silicone Free"].map((std, i) => (
                  <span key={i} style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    background: '#FFFFFF',
                    border: '1px solid rgba(20,53,35,0.15)',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '999px',
                    color: 'var(--brand-green-deep)'
                  }}>
                    ✓ {std}
                  </span>
                ))}
              </div>
            </div>

            {/* PURCHASABLE VS FUTURE COLLECTION ACTION AREA */}
            {isPurchasable ? (
              <>
                {/* Size Selector */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--brand-green-deep)', display: 'block', marginBottom: '0.6rem' }}>
                    Select Size
                  </label>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        style={{
                          padding: '0.6rem 1.25rem',
                          borderRadius: '999px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          border: selectedSize === sz ? '2px solid var(--brand-green-deep)' : '1px solid var(--border-medium)',
                          background: selectedSize === sz ? 'var(--brand-green-light)' : 'transparent',
                          color: 'var(--brand-green-deep)',
                          cursor: 'pointer'
                        }}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--brand-green-deep)', display: 'block', marginBottom: '0.6rem' }}>
                    Quantity
                  </label>
                  <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--border-medium)', borderRadius: '999px', padding: '0.3rem 0.8rem' }}>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '0.3rem', cursor: 'pointer' }}>
                      <Minus size={14} />
                    </button>
                    <span style={{ padding: '0 1rem', fontSize: '0.95rem', fontWeight: 600 }}>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '0.3rem', cursor: 'pointer' }}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Action CTAs */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                  <button
                    onClick={() => onAddToCart(product, selectedSize, quantity)}
                    className="btn btn-secondary"
                    style={{ 
                      width: '100%', 
                      padding: '1rem',
                      borderColor: 'var(--brand-green)',
                      color: 'var(--brand-green-deep)',
                      fontWeight: 700
                    }}
                  >
                    <ShoppingBag size={18} /> Add to Bag
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="btn btn-primary"
                    style={{ 
                      width: '100%', 
                      padding: '1rem',
                      background: 'var(--brand-green-deep)',
                      color: '#FFFFFF',
                      fontWeight: 700
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </>
            ) : (
              /* FUTURE COLLECTION GATE: Cannot add to cart */
              <div style={{
                background: '#FFF9ED',
                border: '1.5px solid #C5A059',
                borderRadius: '20px',
                padding: '1.75rem',
                marginBottom: '2.5rem',
                textAlign: 'center'
              }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: '#8A651E', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  <Clock size={16} /> Future Collection Item
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#143523', marginBottom: '0.5rem' }}>
                  Available in upcoming release
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  This product is currently in formulation and packaging preparation. Customers cannot add it to the cart at this time.
                </p>

                {notified ? (
                  <div style={{
                    background: '#E8F5E9',
                    color: '#2E7D32',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <CheckCircle2 size={16} /> You're on the priority notification list!
                  </div>
                ) : (
                  <button
                    onClick={() => setNotified(true)}
                    style={{
                      background: 'var(--brand-green-deep)',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '0.85rem 2rem',
                      borderRadius: '999px',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 6px 18px rgba(20,53,35,0.25)'
                    }}
                  >
                    <Bell size={16} /> Notify Me When Available
                  </button>
                )}
              </div>
            )}

            {/* Trust Points */}
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-light)'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={15} color="var(--brand-green-accent)" /> 100% Natural Okra Mucin
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Truck size={15} color="var(--brand-green-accent)" /> Free Shipping Above ₹2,500
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <RotateCcw size={15} color="var(--brand-green-accent)" /> 30-Day Easy Returns
              </span>
            </div>
          </div>
        </div>

        {/* TABS SECTION */}
        <div style={{ marginBottom: '5rem' }}>
          {/* Tab Headers */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            borderBottom: '2px solid var(--brand-green-light)',
            marginBottom: '2rem',
            overflowX: 'auto'
          }}>
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  padding: '0.75rem 0',
                  color: activeTab === t.id ? 'var(--brand-green-deep)' : 'var(--text-muted)',
                  borderBottom: activeTab === t.id ? '3px solid var(--brand-green-accent)' : 'none',
                  fontWeight: activeTab === t.id ? 700 : 400,
                  cursor: 'pointer'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '24px',
            padding: '2.5rem',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {activeTab === 'description' && (
              <div style={{ maxWidth: '850px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--brand-green-deep)', marginBottom: '1rem', fontWeight: 600 }}>
                  Formulation Overview
                </h3>
                <p style={{ marginBottom: '1.25rem', fontSize: '1rem' }}>{product.description}</p>
                <div style={{
                  background: 'var(--brand-green-subtle)',
                  padding: '1.25rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(20,53,35,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <img src="/images/ingredients/ingredient-okra.jpg" alt="Okra" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <strong style={{ color: 'var(--brand-green-deep)', display: 'block', fontSize: '0.95rem' }}>The Natural Okra Mucin Advantage:</strong>
                    <span style={{ fontSize: '0.85rem' }}>Extracted using gentle methods to preserve natural polysaccharides, vitamins, and bio-compatible nutrients for glass-skin hydration without pore-clogging heaviness.</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--brand-green-deep)', marginBottom: '1.5rem', fontWeight: 600 }}>
                  Ingredients & Botanical Actives
                </h3>

                {/* Major Ingredient Banner */}
                <div style={{
                  background: 'var(--brand-green-light)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  border: '1.5px solid var(--brand-okra)',
                  flexWrap: 'wrap'
                }}>
                  <img 
                    src={product.majorIngredient?.image || "/images/ingredients/ingredient-okra.jpg"} 
                    alt={product.majorIngredient?.name || "Major Ingredient"} 
                    style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #FFF', flexShrink: 0 }} 
                  />
                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--brand-okra)' }}>
                      {product.majorIngredient?.tag || "Major Hero Ingredient"}
                    </span>
                    <h4 style={{ fontSize: '1.25rem', color: 'var(--brand-green-deep)', marginBottom: '0.3rem' }}>
                      {product.majorIngredient?.name || "Natural Okra Mucin (Abelmoschus Esculentus)"}
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {product.majorIngredient?.role || "Pure natural plant mucilage rich in water-binding polysaccharides that deeply hydrate, soothe irritation, and promote a radiant, glass-like complexion."}
                    </p>
                  </div>
                </div>

                {/* Ingredients Grid */}
                <div className="grid-2" style={{ gap: '1.5rem' }}>
                  {product.ingredientsList.map((ing, idx) => {
                    const matchedImage = product.ingredientImages?.find(i => ing.name.toLowerCase().includes(i.name.toLowerCase().split(' ')[0]))?.image 
                      || (ing.name.toLowerCase().includes('okra') ? '/images/ingredients/ingredient-okra.jpg' : null);

                    return (
                      <div key={idx} style={{
                        background: 'var(--bg-secondary)',
                        borderRadius: '16px',
                        padding: '1.25rem',
                        border: '1px solid var(--border-light)',
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center'
                      }}>
                        {matchedImage && (
                          <img 
                            src={matchedImage} 
                            alt={ing.name} 
                            style={{ 
                              width: '54px', 
                              height: '54px', 
                              borderRadius: '50%', 
                              objectFit: 'cover',
                              border: '1px solid rgba(20,53,35,0.15)',
                              flexShrink: 0
                            }} 
                          />
                        )}
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--brand-green-deep)', marginBottom: '0.2rem' }}>
                            {ing.name}
                          </div>
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                            {ing.explanation}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'howToUse' && (
              <div style={{ maxWidth: '850px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--brand-green-deep)', marginBottom: '1rem', fontWeight: 600 }}>
                  Application Instructions
                </h3>
                <p style={{ fontSize: '1rem', marginBottom: '1.5rem', whiteSpace: 'pre-line' }}>{product.howToUse}</p>
                {product.caution && (
                  <div style={{ marginTop: '1rem', marginBottom: '1.25rem', background: '#FFF7ED', border: '1px solid #FED7AA', padding: '1rem 1.25rem', borderRadius: '14px', fontSize: '0.84rem', color: '#9A3412', lineHeight: 1.5 }}>
                    <strong>⚠️ Caution:</strong> {product.caution}
                  </div>
                )}
                {product.marketedBy && (
                  <div style={{ marginBottom: '1.25rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <strong>Marketed By:</strong> {product.marketedBy}
                  </div>
                )}
                <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem 1.5rem', borderRadius: '16px', fontSize: '0.88rem' }}>
                  <strong style={{ color: 'var(--brand-green-deep)' }}>Expert Tip:</strong> Warm 2–3 drops between fingertips and gently press into slightly damp skin. Pat gently until completely absorbed.
                </div>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div style={{ maxWidth: '850px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--brand-green-deep)', marginBottom: '1rem', fontWeight: 600 }}>
                  Clinical & Functional Benefits
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  {product.benefits.map((b, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <CheckCircle2 size={18} color="var(--brand-green-accent)" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'faq' && (
              <div style={{ maxWidth: '850px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--brand-green-deep)', marginBottom: '1.5rem', fontWeight: 600 }}>
                  Frequently Asked Questions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {product.faq.map((item, idx) => (
                    <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '1.25rem 1.5rem', borderRadius: '16px' }}>
                      <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--brand-green-deep)', marginBottom: '0.4rem' }}>
                        Q: {item.q}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        A: {item.a}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* EXPANDABLE ACCORDIONS FOR SHIPPING & SAFETY */}
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span className="eyebrow" style={{ textAlign: 'center', display: 'block', color: 'var(--brand-green-accent)', fontWeight: 700 }}>Customer Care</span>
          <h2 className="title-section" style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--brand-green-deep)' }}>
            Product Care & Policies
          </h2>
          <Accordion items={shippingAccordion} />
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .section-padding > .container > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}