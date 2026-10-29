import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import Accordion from '../components/Accordion';

export default function ContactPage({ onShowToast }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onShowToast('Thank you! Your message has been sent to our customer care team.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  const faqItems = [
    {
      title: 'When will the full product line be available for purchase?',
      content: 'Our formulations are currently undergoing final pharmaceutical quality checks. Subscribers to our newsletter will receive exclusive early launch access.'
    },
    {
      title: 'What is your shipping & delivery timeframe?',
      content: 'Standard complimentary delivery takes 3–5 business days once your order is processed. Expedited 2-day climate-controlled shipping is also available at checkout.'
    },
    {
      title: 'What is your return & satisfaction guarantee?',
      content: 'We offer a 30-day return policy. If a product does not suit your skin, simply contact our care team for a hassle-free return or exchange.'
    },
    {
      title: 'Are your products scented or fragrance-free?',
      content: 'All Aura Botanica formulas are free from artificial fragrance, synthetic dyes, and volatile essential oils to minimize skin irritation potential.'
    },
    {
      title: 'How can I inquire about ingredient specifics?',
      content: 'You can explore our online Ingredient Library or send a direct inquiry to our formulation care team using the form on this page.'
    }
  ];

  return (
    <div className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
          <span className="eyebrow">Customer Support</span>
          <h1 className="title-section" style={{ fontSize: '3rem' }}>Get in Touch</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', fontSize: '1.05rem' }}>
            Have questions about our upcoming formulations or ingredient sourcing? We'd love to hear from you.
          </p>
        </div>

        {/* LAYOUT: FORM + CONTACT INFO */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start',
          marginBottom: '6rem'
        }}>
          {/* CONTACT FORM */}
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '24px',
            padding: '2.5rem',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginBottom: '1.5rem' }}>
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border-medium)',
                    fontSize: '0.9rem',
                    background: 'var(--bg-primary)'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="eleanor@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border-medium)',
                    fontSize: '0.9rem',
                    background: 'var(--bg-primary)'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Ingredient Inquiry, Order Support, etc."
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border-medium)',
                    fontSize: '0.9rem',
                    background: 'var(--bg-primary)'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="How can our formulation team assist you today?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border-medium)',
                    fontSize: '0.9rem',
                    background: 'var(--bg-primary)',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.9rem' }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={16} />
              </button>
            </form>
          </div>

          {/* CONTACT INFO CARDS */}
          <div>
            <span className="eyebrow">Direct Contact</span>
            <h2 className="title-section" style={{ marginBottom: '1.5rem' }}>
              We're here to help.
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              Our skincare support team is available Monday through Friday, 9 AM – 5 PM EST.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', background: 'var(--bg-secondary)', padding: '1.25rem 1.5rem', borderRadius: '16px' }}>
                <Mail size={24} color="var(--accent-sage)" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Email Care Team</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>masenkanepulane@gmail.com</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', background: 'var(--bg-secondary)', padding: '1.25rem 1.5rem', borderRadius: '16px' }}>
                <Phone size={24} color="var(--accent-sage)" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Phone Assistance</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>+91 9815729600</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', background: 'var(--bg-secondary)', padding: '1.25rem 1.5rem', borderRadius: '16px' }}>
                <MapPin size={24} color="var(--accent-sage)" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Formulation Headquarters</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>New Agar Nagar, Street No. 4, Ludhiana, Punjab, India</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ ACCORDION */}
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="eyebrow">Common Questions</span>
            <h2 className="title-section">Frequently Asked Questions</h2>
          </div>
          <Accordion items={faqItems} />
        </div>
      </div>
    </div>
  );
}
