import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft, Tag } from 'lucide-react';
import ProductImagePlaceholder from '../components/ProductImagePlaceholder';

export default function CartPage({ 
  cartItems = [], 
  onUpdateQuantity, 
  onRemoveItem, 
  onProceedToCheckout,
  setActivePage 
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal >= 2500 || subtotal === 0 ? 0 : 150;
  const total = Math.max(0, subtotal - discount + shipping);

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'AURA10') {
      setDiscount(subtotal * 0.1);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "AURA10" for 10% off.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="section-padding" style={{ background: 'var(--bg-primary)', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '500px' }}>
          <ShoppingBag size={56} color="var(--text-muted)" style={{ margin: '0 auto 1.5rem auto' }} />
          <h1 className="title-section" style={{ marginBottom: '0.75rem' }}>Your Bag is Empty</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Discover our pharmacy-formulated skincare catalog and find your next routine essential.
          </p>
          <button onClick={() => setActivePage('shop')} className="btn btn-primary">
            Explore Skincare Catalog <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding" style={{ background: 'var(--bg-primary)', minHeight: '80vh' }}>
      <div className="container">
        <button
          onClick={() => setActivePage('shop')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}
        >
          <ArrowLeft size={16} /> Continue Shopping
        </button>

        <h1 className="title-section" style={{ fontSize: '2.75rem', marginBottom: '2.5rem' }}>Your Shopping Bag</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '3rem', alignItems: 'start' }}>
          {/* CART ITEMS TABLE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}`}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {/* Image */}
                <div style={{ width: '90px', height: '100px', flexShrink: 0, borderRadius: '14px', overflow: 'hidden', background: 'var(--brand-green-light)' }}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <ProductImagePlaceholder name={item.name} theme={item.placeholderTheme || 'sage'} />
                  )}
                </div>

                {/* Details */}
                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>{item.name}</h3>
                    <button onClick={() => onRemoveItem(item.id, item.selectedSize)} style={{ color: 'var(--text-muted)' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    Size: <strong>{item.selectedSize || '30 ml'}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Quantity Control */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--border-medium)', borderRadius: '999px', padding: '0.25rem 0.6rem' }}>
                      <button onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)} style={{ padding: '0.2rem' }}>
                        <Minus size={14} />
                      </button>
                      <span style={{ padding: '0 0.8rem', fontSize: '0.9rem', fontWeight: 600 }}>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)} style={{ padding: '0.2rem' }}>
                        <Plus size={14} />
                      </button>
                    </div>

                    <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ORDER SUMMARY SIDEBAR */}
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '24px',
            padding: '2rem',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Order Summary</h3>

            {/* Promo Code Form */}
            <form onSubmit={applyPromo} style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Promo Code (e.g. AURA10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  style={{
                    flexGrow: 1,
                    padding: '0.6rem 0.9rem',
                    borderRadius: '999px',
                    border: '1px solid var(--border-medium)',
                    fontSize: '0.82rem',
                    background: 'var(--bg-primary)'
                  }}
                />
                <button type="submit" className="btn btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.8rem' }}>
                  Apply
                </button>
              </div>
              {promoError && <div style={{ color: '#D9534F', fontSize: '0.75rem', marginTop: '0.4rem' }}>{promoError}</div>}
              {discount > 0 && <div style={{ color: 'var(--accent-sage)', fontSize: '0.75rem', marginTop: '0.4rem', fontWeight: 600 }}>10% Promo Discount Applied!</div>}
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-sage)' }}>
                  <span>Discount</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem' }}>
              <span>Total</span>
              <span>₹{total.toLocaleString('en-IN')} INR</span>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="btn btn-primary"
              style={{ width: '100%', padding: '1rem' }}
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
