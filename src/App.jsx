import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import AuthModal from './components/AuthModal';
import QRCodeModal from './components/QRCodeModal';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CollectionsPage from './pages/CollectionsPage';
import IngredientsPage from './pages/IngredientsPage';
import AboutPage from './pages/AboutPage';
import JournalPage from './pages/JournalPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/AdminPage';

import { products } from './data/products';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [selectedConcern, setSelectedConcern] = useState(null);
  
  // User Authentication State (Persisted in localStorage)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('skincare_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'

  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState([
    { ...products[0], selectedSize: '10 ml', quantity: 1 }
  ]);
  const [wishlistIds, setWishlistIds] = useState(['prod-001', 'prod-003']);
  
  // UI Drawers & Toasts
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
  };

  const handleOpenAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogin = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setCurrentUser(data.user);
      localStorage.setItem('skincare_user', JSON.stringify(data.user));
      showToast(`Welcome back, ${data.user.name.split(' ')[0]}!`);
    } catch (err) {
      // Fallback if local backend server is offline
      const mockUser = { id: `usr-${Date.now()}`, name: email.split('@')[0], email };
      setCurrentUser(mockUser);
      localStorage.setItem('skincare_user', JSON.stringify(mockUser));
      showToast(`Welcome back, ${mockUser.name}!`);
    }
  };

  const handleSignup = async (name, email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setCurrentUser(data.user);
      localStorage.setItem('skincare_user', JSON.stringify(data.user));
      showToast(`Account created! Welcome to SkinCare Brand, ${data.user.name.split(' ')[0]}.`);
    } catch (err) {
      // Fallback if backend server is offline
      const mockUser = { id: `usr-${Date.now()}`, name, email };
      setCurrentUser(mockUser);
      localStorage.setItem('skincare_user', JSON.stringify(mockUser));
      showToast(`Account created! Welcome, ${name.split(' ')[0]}.`);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('skincare_user');
    showToast('Logged out successfully.', 'info');
  };

  // Select a product to view in Product Detail Page
  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    setActivePage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to Bag Handler
  const handleAddToCart = (prod, size = null, qty = 1) => {
    if (prod.isFutureCollection || prod.isPurchasable === false) {
      showToast(`${prod.name} is part of our upcoming Future Collection and cannot be added to cart.`, 'info');
      return;
    }
    const chosenSize = size || prod.sizes?.[0] || '10 ml';
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(item => item.id === prod.id && item.selectedSize === chosenSize);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += qty;
        return updated;
      }
      return [...prev, { ...prod, selectedSize: chosenSize, quantity: qty }];
    });
    showToast(`Added ${prod.name} (${chosenSize}) to your bag.`);
    setIsCartDrawerOpen(true);
  };

  // Update quantity in cart
  const handleUpdateQuantity = (prodId, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(prodId, size);
      return;
    }
    setCartItems((prev) => 
      prev.map(item => (item.id === prodId && item.selectedSize === size) ? { ...item, quantity: newQty } : item)
    );
  };

  // Remove item from cart
  const handleRemoveCartItem = (prodId, size) => {
    setCartItems((prev) => prev.filter(item => !(item.id === prodId && item.selectedSize === size)));
    showToast('Item removed from your bag.', 'info');
  };

  // Toggle wishlist
  const handleToggleWishlist = (prod) => {
    setWishlistIds((prev) => {
      if (prev.includes(prod.id)) {
        showToast(`Removed ${prod.name} from wishlist.`, 'info');
        return prev.filter(id => id !== prod.id);
      } else {
        showToast(`Saved ${prod.name} to wishlist.`);
        return [...prev, prod.id];
      }
    });
  };

  // Total items in cart
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartDrawerOpen(true)}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenQr={() => setIsQrModalOpen(true)}
        currentUser={currentUser}
        onOpenAuthModal={handleOpenAuthModal}
        onLogout={handleLogout}
      />

      {/* Page Routing */}
      <main style={{ flexGrow: 1 }}>
        {activePage === 'home' && (
          <HomePage
            setActivePage={setActivePage}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onSubscribeNewsletter={(email) => showToast(`Subscribed ${email} to SkinCare Brand updates.`)}
            setSelectedConcern={setSelectedConcern}
          />
        )}

        {(activePage === 'shop' || activePage === 'bestsellers') && (
          <ShopPage
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            selectedConcern={selectedConcern}
          />
        )}

        {activePage === 'detail' && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setActivePage('shop')}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onProceedToCheckout={() => setActivePage('checkout')}
          />
        )}

        {activePage === 'collections' && (
          <CollectionsPage
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
        )}

        {activePage === 'ingredients' && (
          <IngredientsPage
            onSelectProduct={handleSelectProduct}
          />
        )}

        {activePage === 'about' && (
          <AboutPage />
        )}

        {activePage === 'journal' && (
          <JournalPage />
        )}

        {activePage === 'contact' && (
          <ContactPage
            onShowToast={showToast}
          />
        )}

        {activePage === 'cart' && (
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveCartItem}
            onProceedToCheckout={() => setActivePage('checkout')}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage
            cartItems={cartItems}
            onClearCart={() => setCartItems([])}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'admin' && (
          <AdminPage
            onShowToast={showToast}
            setActivePage={setActivePage}
            onSelectProduct={handleSelectProduct}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActivePage={setActivePage}
        onOpenQr={() => setIsQrModalOpen(true)}
        onSubscribeNewsletter={(email) => showToast(`Subscribed ${email} to SkinCare Brand updates.`)}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartDrawerOpen(false);
          setActivePage('checkout');
        }}
        onViewCartPage={() => {
          setIsCartDrawerOpen(false);
          setActivePage('cart');
        }}
      />

      {/* Quick Search Overlay Modal */}
      {searchModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 350,
          background: 'rgba(33, 33, 31, 0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '6rem'
        }}>
          <div style={{
            background: 'var(--bg-primary)',
            borderRadius: '24px',
            maxWidth: '650px',
            width: '90%',
            height: 'fit-content',
            padding: '2rem',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>Search SkinCare Brand</h3>
              <button onClick={() => setSearchModalOpen(false)}>✕</button>
            </div>
            <input
              type="text"
              placeholder="Search products, ceramides, niacinamide..."
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.9rem 1.25rem',
                borderRadius: '999px',
                border: '1px solid var(--border-medium)',
                fontSize: '1rem',
                marginBottom: '1.5rem'
              }}
            />
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Popular Searches:</span>
              {['Radiance Serum', 'Hyaluronic Acid', 'Niacinamide', 'Ceramides'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchModalOpen(false);
                    setActivePage('shop');
                  }}
                  className="btn-pill-tag"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Authentication Log In / Sign Up Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />

      {/* QR Code Scan Modal */}
      <QRCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
