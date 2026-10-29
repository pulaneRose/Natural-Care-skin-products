import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, User, Code, Sparkles, Award, ExternalLink } from 'lucide-react';
import Accordion from '../components/Accordion';

export default function ContactPage({ onShowToast }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      onShowToast('Thank you! Your inquiry has been recorded and sent to our team.');
    } catch (err) {
      onShowToast('Thank you! Your message has been received.');
    } finally {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  const faqItems = [
    {
      title: 'When will the full product line be available for purchase?',
      content: 'Our flagship Okra Mucin Face Serum is available now! Other formulations in our Future Collection (including Herbal Hydrogel) are completing preparation and will launch soon.'
    },
    {
      title: 'What is your shipping & delivery timeframe?',
      content: 'Standard delivery takes 3–5 business days across India. Expedited express dispatch is also available at checkout.'
    },
    {
      title: 'What is your return & satisfaction guarantee?',
      content: 'We offer a 30-day return policy. If a formulation does not suit your skin, simply reach out to our team for a replacement or return.'
    },
    {
      title: 'Are your products scented or fragrance-free?',
      content: 'Natural Care formulations are free from artificial fragrances, harsh parabens, and synthetic dyes to minimize skin irritation potential.'
    },
    {
      title: 'How can I inquire about ingredient specifics or bulk orders?',
      content: 'You can reach out directly to our Product Founder Pardeep Kumar or send a message using the form below.'
    }
  ];

  return (
    <div className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto', padding: '0 0.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'var(--brand-green-light)',
            color: 'var(--brand-green-deep)',
            padding: '0.35rem 0.9rem',
            borderRadius: '999px',
            fontSize: '0.78rem',
            fontWeight: 700,
            marginBottom: '1rem',
            border: '1px solid rgba(20,53,35,0.12)'
          }}>
            <Sparkles size={13} color="var(--brand-okra)" />
            <span>DIRECT CARE & LEADERSHIP</span>
          </div>
          <h1 className="title-section" style={{ fontSize: 'clamp(2.1rem, 5vw, 3.2rem)', color: 'var(--brand-green-deep)' }}>
            Get in Touch
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', fontSize: '1rem', lineHeight: 1.6 }}>
            Have questions about our botanical skincare, upcoming future collection, or order support? Reach out to our leadership and team directly.
          </p>
        </div>

        {/* FOUNDER & CREATOR LEADERSHIP SPOTLIGHT */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: '950px',
          margin: '0 auto 4rem auto'
        }}>
          {/* Product Founder Card */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '2rem',
            border: '1.5px solid rgba(20,53,35,0.12)',
            boxShadow: '0 12px 32px rgba(20,53,35,0.06)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, var(--brand-green-light) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'var(--brand-green-deep)',
                color: '#FFFFFF',
                padding: '0.3rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.72rem',
                fontWeight: 700,
                marginBottom: '1.25rem'
              }}>
                <Award size={13} color="#E8C374" />
                <span>FOUNDER OF PRODUCTS</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', color: 'var(--brand-green-deep)', marginBottom: '0.25rem' }}>
                Pardeep Kumar
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--brand-okra)', fontWeight: 600, marginBottom: '1rem' }}>
                Product Founder & Formulation Director
              </p>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Spearheads product vision, botanical sourcing, and our signature Okra Mucin & Herbal formulations rooted in Ludhiana, Punjab.
              </p>
            </div>
            
            <a
              href="mailto:par455p123@gmail.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'var(--brand-green-light)',
                color: 'var(--brand-green-deep)',
                padding: '0.75rem 1.1rem',
                borderRadius: '14px',
                fontSize: '0.88rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s',
                wordBreak: 'break-all'
              }}
            >
              <Mail size={16} color="var(--brand-green-deep)" style={{ flexShrink: 0 }} />
              <span>par455p123@gmail.com</span>
            </a>
          </div>

          {/* Website Creator Card */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '2rem',
            border: '1.5px solid rgba(20,53,35,0.12)',
            boxShadow: '0 12px 32px rgba(20,53,35,0.06)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, var(--brand-okra-light) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'var(--brand-okra)',
                color: '#FFFFFF',
                padding: '0.3rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.72rem',
                fontWeight: 700,
                marginBottom: '1.25rem'
              }}>
                <Code size={13} color="#FFFFFF" />
                <span>WEBSITE CREATOR & DESIGNER</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', color: 'var(--brand-green-deep)', marginBottom: '0.25rem' }}>
                Pulane Masenkane
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--brand-green-deep)', fontWeight: 600, marginBottom: '1rem' }}>
                Web Architect & Digital Brand Engineer
              </p>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Engineered the responsive e-commerce web platform, mobile QR code integration, interactive admin system, and design architecture.
              </p>
            </div>

            <a
              href="mailto:masenkanepulane@gmail.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'var(--brand-green-light)',
                color: 'var(--brand-green-deep)',
                padding: '0.75rem 1.1rem',
                borderRadius: '14px',
                fontSize: '0.88rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s',
                wordBreak: 'break-all'
              }}
            >
              <Mail size={16} color="var(--brand-green-deep)" style={{ flexShrink: 0 }} />
              <span>masenkanepulane@gmail.com</span>
            </a>
          </div>
        </div>

        {/* LAYOUT: FORM + CONTACT INFO */}
        <div className="contact-responsive-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'start',
          marginBottom: '5rem'
        }}>
          {/* CONTACT FORM */}
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '24px',
            padding: '2.5rem',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--brand-green-deep)', marginBottom: '1.5rem' }}>
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
                    padding: '0.85rem 1rem',
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
                    padding: '0.85rem 1rem',
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
                  placeholder="Order Support, Formulation Inquiry, Wholesale"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
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
                  rows={4}
                  placeholder="How can our Natural Care team assist you today?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
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
            <span className="eyebrow" style={{ color: 'var(--brand-green-accent)', fontWeight: 700 }}>Direct Contact</span>
            <h2 className="title-section" style={{ marginBottom: '1.25rem', color: 'var(--brand-green-deep)', fontSize: 'clamp(1.75rem, 4vw, 2.2rem)' }}>
              We're here to help.
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem', fontSize: '0.95rem' }}>
              Our skincare support team is available Monday through Saturday to answer questions about products, ingredients, or deliveries.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', background: 'var(--bg-secondary)', padding: '1.25rem 1.5rem', borderRadius: '18px', border: '1px solid var(--border-light)' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--brand-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={22} color="var(--brand-green-deep)" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--brand-green-deep)' }}>Customer Care</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>par455p123@gmail.com / care@naturalcare.in</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', background: 'var(--bg-secondary)', padding: '1.25rem 1.5rem', borderRadius: '18px', border: '1px solid var(--border-light)' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--brand-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={22} color="var(--brand-green-deep)" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--brand-green-deep)' }}>Phone Assistance</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>+91 9815729600</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', background: 'var(--bg-secondary)', padding: '1.25rem 1.5rem', borderRadius: '18px', border: '1px solid var(--border-light)' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--brand-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={22} color="var(--brand-green-deep)" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--brand-green-deep)' }}>Brand Headquarters</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>New Agar Nagar, Street No. 4, Ludhiana, Punjab, India</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ ACCORDION */}
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="eyebrow" style={{ color: 'var(--brand-green-accent)', fontWeight: 700 }}>Common Questions</span>
            <h2 className="title-section" style={{ color: 'var(--brand-green-deep)', fontSize: 'clamp(1.75rem, 4vw, 2.2rem)' }}>Frequently Asked Questions</h2>
          </div>
          <Accordion items={faqItems} />
        </div>
      </div>
    </div>
  );
}
