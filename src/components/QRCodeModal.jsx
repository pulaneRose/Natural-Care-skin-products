import React, { useState } from 'react';
import { X, QrCode, Download, Smartphone, Package, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';

export default function QRCodeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Uses current origin if on live domain, otherwise defaults to production Vercel URL
  const prodUrl = typeof window !== 'undefined' && window.location.origin.includes('vercel.app')
    ? window.location.origin
    : 'https://natural-care-skin-products.vercel.app';

  const currentQrImage = '/images/qr-code.png';

  const handleCopy = () => {
    navigator.clipboard.writeText(prodUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 500,
      background: 'rgba(20, 53, 35, 0.7)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      animation: 'fadeIn 0.25s ease-out'
    }}>
      <div style={{
        background: '#FAF9F5',
        borderRadius: '28px',
        maxWidth: '500px',
        width: '100%',
        padding: '2.5rem 2rem',
        position: 'relative',
        boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
        border: '1.5px solid var(--border-light)',
        textAlign: 'center'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Modal"
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'var(--brand-green-light)',
            color: 'var(--brand-green-deep)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Header Pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'var(--brand-green-deep)',
          color: '#FFFFFF',
          padding: '0.35rem 0.9rem',
          borderRadius: '999px',
          fontSize: '0.75rem',
          fontWeight: 700,
          marginBottom: '1rem',
          letterSpacing: '0.04em'
        }}>
          <Sparkles size={13} style={{ color: 'var(--brand-okra)' }} />
          <span>NATURAL CARE • SCAN & SHOP</span>
        </div>

        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', color: 'var(--brand-green-deep)', marginBottom: '0.4rem' }}>
          Scan to Access Store
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          Point your smartphone camera at the QR code below to explore and purchase on mobile instantly.
        </p>

        {/* QR Code Graphic Frame */}
        <div style={{
          background: '#FFFFFF',
          padding: '1.25rem',
          borderRadius: '24px',
          border: '2px solid rgba(20, 53, 35, 0.12)',
          boxShadow: '0 12px 32px rgba(20, 53, 35, 0.08)',
          width: '240px',
          height: '240px',
          margin: '0 auto 1.5rem auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <img 
            src={currentQrImage} 
            alt="Natural Care Store QR Code" 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
          />
        </div>

        {/* URL Box & Copy */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-secondary)',
          borderRadius: '12px',
          padding: '0.6rem 1rem',
          fontSize: '0.82rem',
          marginBottom: '1.5rem',
          border: '1px solid var(--border-light)'
        }}>
          <span style={{ color: 'var(--brand-green-deep)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '320px' }}>
            {prodUrl}
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              onClick={handleCopy}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                background: 'none',
                border: 'none',
                color: copied ? 'var(--brand-green-accent)' : 'var(--text-secondary)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <a
              href={prodUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}
              title="Open website"
            >
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Download Buttons for Packaging */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <a
            href="/images/qr-code.png"
            download="natural-care-okra-mucin-qr.png"
            className="btn btn-primary"
            style={{ fontSize: '0.82rem', padding: '0.65rem 1.25rem', textDecoration: 'none' }}
          >
            <Download size={15} /> Download PNG (Print)
          </a>
          <a
            href="/images/qr-code.svg"
            download="natural-care-okra-mucin-qr.svg"
            className="btn btn-secondary"
            style={{ fontSize: '0.82rem', padding: '0.65rem 1.25rem', textDecoration: 'none', borderColor: 'var(--brand-green)' }}
          >
            <Download size={15} /> Download SVG (Vector)
          </a>
        </div>
      </div>
    </div>
  );
}
