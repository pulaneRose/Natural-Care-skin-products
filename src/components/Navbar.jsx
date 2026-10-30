import React, { useState } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X, Sparkles, QrCode } from 'lucide-react';

export default function Navbar({ 
  activePage, 
  setActivePage, 
  cartCount = 0, 
  wishlistCount = 0, 
  onOpenCart,
  onOpenSearch,
  onOpenQr,
  currentUser = null,
  onOpenAuthModal,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Shop', page: 'shop' },
    { name: 'Collections', page: 'collections' },
    { name: 'Best Sellers', page: 'bestsellers' },
    { name: 'About Us', page: 'about' },
    { name: 'Ingredients', page: 'ingredients' },
    { name: 'Journal', page: 'journal' },
    { name: 'Contact', page: 'contact' }
  ];

  const handleNavClick = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--glass-bg)',
      backdropFilter: 'var(--glass-blur)',
      borderBottom: '1px solid var(--border-light)',
      transition: 'all var(--transition-fast)'
    }}>
      {/* Main Navbar */}
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px'
      }}>
        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          style={{ display: 'none', color: 'var(--text-primary)' }}
          className="mobile-hamburger-btn"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand Logo matching the product bottle */}
        <div 
          onClick={() => handleNavClick('home')}
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span style={{ fontSize: '1.3rem', color: '#B58D3D' }}>🌸</span>
            <span style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '1.65rem', 
              fontWeight: 700, 
              letterSpacing: '0.04em',
              color: 'var(--brand-green-deep)',
              lineHeight: 1
            }}>
              NATURAL CARE
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: '2rem' }}>
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => handleNavClick(link.page)}
              style={{
                fontSize: '0.88rem',
                fontWeight: activePage === link.page ? 600 : 400,
                color: activePage === link.page ? 'var(--text-primary)' : 'var(--text-secondary)',
                position: 'relative',
                padding: '0.4rem 0',
                transition: 'color var(--transition-fast)'
              }}
            >
              {link.name}
              {activePage === link.page && (
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'var(--accent-sage)',
                  borderRadius: '2px'
                }} />
              )}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* QR Code Quick Scan Button */}
          <button
            onClick={onOpenQr}
            title="Scan to open on your phone camera"
            aria-label="Scan QR Code"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--brand-green-deep)',
              background: 'var(--brand-green-light)',
              padding: '0.4rem 0.75rem',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 700,
              border: '1px solid rgba(20,53,35,0.12)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <QrCode size={16} color="var(--brand-green-deep)" />
            <span className="hide-mobile">Scan QR</span>
          </button>

          <button 
            onClick={onOpenSearch} 
            aria-label="Search" 
            style={{ color: 'var(--text-primary)', transition: 'transform var(--transition-fast)' }}
          >
            <Search size={20} />
          </button>

          {/* Account Button / Dropdown */}
          <div style={{ position: 'relative' }} className="hide-mobile">
            {currentUser ? (
              <div>
                <button 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)} 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    background: 'var(--bg-secondary)',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '999px'
                  }}
                >
                  <User size={16} color="var(--accent-sage)" />
                  <span>Hi, {currentUser.name.split(' ')[0]}</span>
                </button>

                {userDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '2.5rem',
                    right: 0,
                    background: 'var(--bg-card)',
                    borderRadius: '16px',
                    padding: '1rem',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--border-light)',
                    minWidth: '180px',
                    zIndex: 150
                  }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.2rem' }}>{currentUser.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>{currentUser.email}</div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setActivePage('admin');
                      }}
                      style={{
                        fontSize: '0.82rem',
                        color: 'var(--text-primary)',
                        fontWeight: 600,
                        width: '100%',
                        textAlign: 'left',
                        marginBottom: '0.6rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      ⚙️ Admin Panel
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      style={{
                        fontSize: '0.82rem',
                        color: '#D9534F',
                        fontWeight: 600,
                        width: '100%',
                        textAlign: 'left'
                      }}
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => onOpenAuthModal('login')} 
                aria-label="Log In / Sign Up" 
                style={{ color: 'var(--text-primary)', transition: 'transform var(--transition-fast)' }}
              >
                <User size={20} />
              </button>
            )}
          </div>

          <button 
            onClick={() => handleNavClick('shop')} 
            aria-label="Wishlist" 
            style={{ color: 'var(--text-primary)', position: 'relative', display: 'flex', alignItems: 'center' }}
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-8px',
                background: 'var(--accent-rose)',
                color: 'var(--text-primary)',
                fontSize: '0.65rem',
                fontWeight: 700,
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {wishlistCount}
              </span>
            )}
          </button>

          <button 
            onClick={onOpenCart} 
            aria-label="Shopping Bag" 
            style={{
              color: '#FFFFFF',
              background: 'var(--brand-green-deep)',
              padding: '0.45rem 1rem',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'all var(--transition-fast)',
              boxShadow: '0 4px 12px rgba(20,53,35,0.2)'
            }}
          >
            <ShoppingBag size={16} />
            <span>Bag</span>
            {cartCount > 0 && (
              <span style={{
                background: 'var(--brand-okra)',
                color: '#FFF',
                borderRadius: '999px',
                padding: '0.1rem 0.45rem',
                fontSize: '0.7rem',
                fontWeight: 700
              }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          background: 'var(--bg-primary)',
          borderTop: '1px solid var(--border-light)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => handleNavClick(link.page)}
              style={{
                fontSize: '1.1rem',
                textAlign: 'left',
                padding: '0.5rem 0',
                color: activePage === link.page ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: activePage === link.page ? 600 : 400,
                borderBottom: '1px solid var(--border-light)'
              }}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('admin')}
            style={{
              fontSize: '1.05rem',
              textAlign: 'left',
              padding: '0.5rem 0',
              color: 'var(--accent-sage)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            ⚙️ Admin Panel
          </button>
        </div>
      )}

      {/* Mobile Responsive Style Injection */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger-btn { display: flex !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
