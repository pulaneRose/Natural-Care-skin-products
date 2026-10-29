import React, { useState } from 'react';
import { Lock, CheckCircle2, ShieldCheck, ArrowLeft, CreditCard } from 'lucide-react';
import ProductImagePlaceholder from '../components/ProductImagePlaceholder';

export default function CheckoutPage({ 
  cartItems = [], 
  onClearCart,
  setActivePage
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'India',
    postalCode: '',
    paymentMethod: 'card'
  });

  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal >= 2500 || subtotal === 0 ? 0 : 150;
  const total = subtotal + shipping;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const generatedId = `AB-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderComplete(true);
    onClearCart();
  };

  return (
    <div className="section-padding" style={{ background: 'var(--bg-primary)', minHeight: '85vh' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <button
          onClick={() => setActivePage('cart')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}
        >
          <ArrowLeft size={16} /> Return to Cart
        </button>

        <h1 className="title-section" style={{ fontSize: '2.5rem', marginBottom: '2.5rem' }}>Secure Checkout</h1>

        {/* CHECKOUT FORM & SIDEBAR */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3.5rem', alignItems: 'start' }}>
          {/* FORM */}
          <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Contact Info */}
            <div style={{ background: 'var(--bg-card)', borderRadius: '20px', padding: '2rem', border: '1px solid var(--border-light)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '1.25rem' }}>1. Contact Information</h3>
              <div className="grid-2">
                <div>
                  <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>First Name *</label>
                  <input type="text" required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-primary)', fontSize: '0.88rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Last Name *</label>
                  <input type="text" required value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-primary)', fontSize: '0.88rem' }} />
                </div>
              </div>
              <div style={{ marginTop: '1rem' }} className="grid-2">
                <div>
                  <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Email Address *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-primary)', fontSize: '0.88rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Phone Number</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-primary)', fontSize: '0.88rem' }} />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div style={{ background: 'var(--bg-card)', borderRadius: '20px', padding: '2rem', border: '1px solid var(--border-light)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '1.25rem' }}>2. Shipping Address</h3>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Street Address *</label>
                <input type="text" required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-primary)', fontSize: '0.88rem' }} />
              </div>
              <div className="grid-3">
                <div>
                  <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>City *</label>
                  <input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-primary)', fontSize: '0.88rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Postal Code *</label>
                  <input type="text" required value={formData.postalCode} onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-primary)', fontSize: '0.88rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Country</label>
                  <select value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-primary)', fontSize: '0.88rem' }}>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Placeholder */}
            <div style={{ background: 'var(--bg-card)', borderRadius: '20px', padding: '2rem', border: '1px solid var(--border-light)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '1.25rem' }}>3. Payment Information</h3>
              <div style={{ background: 'var(--bg-secondary)', padding: '1.rem 1.25rem', borderRadius: '12px', marginBottom: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                ✦ Pre-launch preview mode. No real charges will be processed.
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <button type="button" onClick={() => setFormData({ ...formData, paymentMethod: 'card' })} style={{ flexGrow: 1, padding: '0.75rem', borderRadius: '12px', border: formData.paymentMethod === 'card' ? '2px solid var(--text-primary)' : '1px solid var(--border-medium)', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>
                  <CreditCard size={16} /> Credit / Debit Card (UPI / NetBanking Mock)
                </button>
                <button type="button" onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })} style={{ flexGrow: 1, padding: '0.75rem', borderRadius: '12px', border: formData.paymentMethod === 'upi' ? '2px solid var(--text-primary)' : '1px solid var(--border-medium)', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>
                  UPI / GPay Mock
                </button>
              </div>

              {formData.paymentMethod === 'card' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input type="text" placeholder="Card Number (4111 2222 3333 4444)" defaultValue="4111 •••• •••• 4444" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-primary)', fontSize: '0.88rem' }} />
                  <div className="grid-2">
                    <input type="text" placeholder="MM / YY" defaultValue="12/28" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-primary)', fontSize: '0.88rem' }} />
                    <input type="text" placeholder="CVC" defaultValue="123" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-primary)', fontSize: '0.88rem' }} />
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '1.1rem', fontSize: '1rem' }}>
              <Lock size={18} /> Place Order (₹{total.toLocaleString('en-IN')})
            </button>
          </form>

          {/* ORDER SUMMARY SIDEBAR */}
          <div style={{ background: 'var(--bg-card)', borderRadius: '24px', padding: '2rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '1.25rem' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', maxHeight: '300px', overflowY: 'auto' }}>
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <div style={{ width: '50px', height: '55px', flexShrink: 0, borderRadius: '10px', overflow: 'hidden', background: 'var(--brand-green-light)' }}>
                    {item.image ? (
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <ProductImagePlaceholder name={item.name} theme={item.placeholderTheme || 'sage'} />
                    )}
                  </div>
                  <div style={{ flexGrow: 1, fontSize: '0.85rem' }}>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Qty: {item.quantity} • {item.selectedSize}</div>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', paddingTop: '0.5rem', borderTop: '1px solid var(--border-light)' }}>
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')} INR</span>
              </div>
            </div>
          </div>
        </div>

        {/* ORDER CONFIRMATION MODAL */}
        {orderComplete && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 400,
            background: 'rgba(33, 33, 31, 0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            <div style={{
              background: 'var(--bg-primary)',
              borderRadius: '24px',
              maxWidth: '560px',
              width: '100%',
              padding: '3rem 2.5rem',
              textAlign: 'center',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--accent-sage-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <CheckCircle2 size={36} color="var(--accent-sage)" />
              </div>
              <span className="eyebrow">Order Placed Successfully</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', marginBottom: '0.5rem' }}>
                Thank you for your order!
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Order Reference Number: <strong>{orderId}</strong>
              </p>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                We have received your order details. A confirmation receipt and tracking updates will be sent to <strong>{formData.email || 'your email'}</strong> once formulations are prepared.
              </p>
              <button
                onClick={() => {
                  setOrderComplete(false);
                  setActivePage('home');
                }}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.9rem' }}
              >
                Return to Homepage
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
