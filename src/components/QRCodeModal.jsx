import React, { useState } from 'react';
import { X, QrCode, Download, Smartphone, Package, Copy, Check, ExternalLink } from 'lucide-react';

export default function QRCodeModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('local'); // 'local' | 'production'
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const localUrl = 'http://192.168.1.5:3000';
  const prodUrl = 'https://naturalcare-okramucin.com';

  const currentUrl = activeTab === 'local' ? localUrl : prodUrl;
  const currentQrImage = activeTab === 'local' ? '/images/qr-code-local.png' : '/images/qr-code.png';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
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
        maxWidth: '520px',
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

        {/* Header */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'var(--brand-green-deep)',
          color: '#FFFFFF',
          padding: '0.35rem 0.85rem',
          borderRadius: '999px',
          fontSize: '0.75rem',
          fontWeight: 700,
          marginBottom: '1rem'
        }}>
          <QrCode size={14} />
          <span>Scan & Experience</span>
        </div>

        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--brand-green-deep)', marginBottom: '0.5rem' }}>
          Scan to Access Store
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          Open your smartphone camera and point it at the code to access our Okra Skincare store instantly on your mobile screen.
        </p>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-secondary)',
          padding: '0.3rem',
          borderRadius: '999px',
          marginBottom: '1.5rem',
          border: '1px solid var(--border-light)'
        }}>
          <button
            onClick={() => setActiveTab('local')}
            style={{
              flex: 1,
              padding: '0.6rem 0.8rem',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'local' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'local' ? 'var(--brand-green-deep)' : 'var(--text-muted)',
              boxShadow: activeTab === 'local' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <Smartphone size={15} />
            <span>Scan on Phone Now</span>
          </button>
          <button
            onClick={() => setActiveTab('production')}
            style={{
              flex: 1,
              padding: '0.6rem 0.8rem',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'production' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'production' ? 'var(--brand-green-deep)' : 'var(--text-muted)',
              boxShadow: activeTab === 'production' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <Package size={15} />
            <span>Packaging & Print</span>
          </button>
        </div>

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
            alt="Website QR Code" 
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
          <span style={{ color: 'var(--brand-green-deep)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '340px' }}>
            {currentUrl}
          </span>
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
