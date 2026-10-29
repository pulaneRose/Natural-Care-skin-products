import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Plus, Minus } from 'lucide-react';
import ProductImagePlaceholder from './ProductImagePlaceholder';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems = [], 
  onUpdateQuantity, 
  onRemoveItem,
  onProceedToCheckout,
  onViewCartPage
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal >= 2500 || subtotal === 0 ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 200,
      display: 'flex',
      justifyContent: 'flex-end',
      background: 'rgba(33, 33, 31, 0.4)',
      backdropFilter: 'blur(4px)',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      {/* Overlay Backdrop Click */}
      <div 
        onClick={onClose} 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
      />

      {/* Drawer Box */}
      <div style={{
        position: 'relative',
        zIndex: 210,
        width: '100%',
        maxWidth: '460px',
        height: '100%',
        background: 'var(--bg-primary)',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.75rem'
      }}>
        {/* Drawer Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid var(--border-light)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} color="var(--accent-sage)" />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>Your Shopping Bag</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({cartItems.length})</span>
          </div>
          <button onClick={onClose} aria-label="Close Bag" style={{ color: 'var(--text-primary)' }}>
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: '12px',
          padding: '0.85rem 1rem',
          margin: '1.25rem 0',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)'
        }}>
          {subtotal >= 2500 ? (
            <span style={{ color: 'var(--accent-sage)', fontWeight: 600 }}>🎉 You qualify for Free Complimentary Shipping!</span>
          ) : (
            <span>Add <strong>₹{(2500 - subtotal).toFixed(0)}</strong> more to qualify for Free Shipping.</span>
          )}
        </div>

        {/* Item List */}
        <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingRight: '0.25rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto 0', color: 'var(--text-muted)', padding: '2rem' }}>
              <ShoppingBag size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.3 }} />
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-primary)' }}>Your bag is currently empty</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Discover our pharmacy-formulated skincare catalog.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={`${item.id}-${item.selectedSize}`} 
                style={{
                  display: 'flex',
                  gap: '1rem',
                  paddingBottom: '1.25rem',
                  borderBottom: '1px solid var(--border-light)',
                  alignItems: 'center'
                }}
              >
                {/* Thumbnail */}
                <div style={{ width: '70px', height: '80px', flexShrink: 0, borderRadius: '12px', overflow: 'hidden', background: 'var(--brand-green-light)' }}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <ProductImagePlaceholder name={item.name} theme={item.placeholderTheme || 'sage'} />
                  )}
                </div>

                {/* Details */}
                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem' }}>{item.name}</h4>
                    <button onClick={() => onRemoveItem(item.id, item.selectedSize)} style={{ color: 'var(--text-muted)' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
                    Size: {item.selectedSize || item.sizes?.[0] || '30 ml'}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-medium)', borderRadius: '999px', padding: '0.15rem 0.5rem' }}>
                      <button onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)} style={{ padding: '0.2rem' }}>
                        <Minus size={12} />
                      </button>
                      <span style={{ padding: '0 0.6rem', fontSize: '0.82rem', fontWeight: 600 }}>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)} style={{ padding: '0.2rem' }}>
                        <Plus size={12} />
                      </button>
                    </div>

                    <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cartItems.length > 0 && (
          <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-medium)', marginTop: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button 
                onClick={onViewCartPage} 
                className="btn btn-secondary" 
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                View Full Bag
              </button>
              <button 
                onClick={onProceedToCheckout} 
                className="btn btn-primary" 
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                Checkout <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
