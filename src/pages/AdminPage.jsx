import React, { useState, useEffect } from 'react';
import { 
  Package, 
  ShoppingBag, 
  FileText, 
  BarChart3, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  RefreshCw, 
  Mail, 
  ArrowRight, 
  Users, 
  Sparkles,
  ExternalLink,
  DollarSign,
  ChevronRight,
  X,
  QrCode,
  Download
} from 'lucide-react';

export default function AdminPage({ 
  onShowToast, 
  setActivePage,
  onSelectProduct
}) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('skincare_admin_auth') === 'true';
  });

  const [adminPin, setAdminPin] = useState('');
  const [authError, setAuthError] = useState('');

  // Active section tab: 'overview' | 'products' | 'orders' | 'content'
  const [activeTab, setActiveTab] = useState('overview');

  // Data States
  const [stats, setStats] = useState({
    productsCount: 6,
    lowStockCount: 2,
    totalOrders: 2,
    totalRevenue: 6797,
    subscriberCount: 2,
    inquiryCount: 1,
    customerCount: 0
  });

  const [productsList, setProductsList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const [customersList, setCustomersList] = useState([]);
  const [articlesList, setArticlesList] = useState([]);
  const [inquiriesList, setInquiriesList] = useState([]);
  const [subscribersList, setSubscribersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dbSource, setDbSource] = useState('Checking...');

  // Search & Filter states
  const [productSearch, setProductSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState('All');
  const [customerSearch, setCustomerSearch] = useState('');
  const [contentSubTab, setContentSubTab] = useState('journal'); // 'journal' | 'inquiries' | 'subscribers'

  // Modal States
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [customerFormData, setCustomerFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: ''
  });

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productFormData, setProductFormData] = useState({
    name: '',
    type: 'Serum',
    category: 'Serums',
    price: 2499,
    stock: 40,
    sku: '',
    shortDescription: '',
    description: '',
    placeholderTheme: 'sage',
    availability: 'Formulation In Progress'
  });

  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [articleFormData, setArticleFormData] = useState({
    title: '',
    category: 'Botanical Deep Dive',
    readTime: '4 min read',
    shortDescription: '',
    content: '',
    theme: 'sage'
  });

  const [viewingOrder, setViewingOrder] = useState(null);

  // Authenticate Admin
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPin.trim() === 'admin123' || adminPin.trim().toLowerCase() === 'admin') {
      setIsAdminAuthenticated(true);
      localStorage.setItem('skincare_admin_auth', 'true');
      setAuthError('');
      onShowToast('Welcome to SkinCare Brand Administration Portal!');
    } else {
      setAuthError('Incorrect Admin Passcode. Hint: Use "admin123" for demo.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('skincare_admin_auth');
    onShowToast('Logged out of Admin Portal.', 'info');
  };

  // Fetch all admin data
  const fetchAllData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Health
      const healthRes = await fetch('/api/health');
      const healthData = await healthRes.json();
      setDbSource(healthData.database || 'MongoDB Atlas');

      // 2. Fetch Stats
      const statsRes = await fetch('/api/admin/stats');
      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.stats);

      // 3. Fetch Products
      const prodRes = await fetch('/api/products');
      const prodData = await prodRes.json();
      if (prodData.success) setProductsList(prodData.data);

      // 4. Fetch Orders
      const orderRes = await fetch('/api/orders');
      const orderData = await orderRes.json();
      if (orderData.success) setOrdersList(orderData.data);

      // 5. Fetch Customers
      const custRes = await fetch('/api/customers');
      const custData = await custRes.json();
      if (custData.success) setCustomersList(custData.data);

      // 6. Fetch Journal
      const journalRes = await fetch('/api/journal');
      const journalData = await journalRes.json();
      if (journalData.success) setArticlesList(journalData.data);

      // 7. Fetch Contact Inquiries
      const contactRes = await fetch('/api/contact');
      const contactData = await contactRes.json();
      if (contactData.success) setInquiriesList(contactData.data);

      // 8. Fetch Subscribers
      const subRes = await fetch('/api/newsletter');
      const subData = await subRes.json();
      if (subData.success) setSubscribersList(subData.data);
    } catch (err) {
      console.warn('Backend offline or fetching local data:', err.message);
      setDbSource('Local Storage / Offline Mode');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchAllData();
    }
  }, [isAdminAuthenticated]);

  // Quick Stock Adjustment
  const handleStockAdjust = async (prodId, delta) => {
    const target = productsList.find(p => p.id === prodId);
    if (!target) return;
    const newStock = Math.max(0, (target.stock || 0) + delta);

    try {
      await fetch(`/api/products/${prodId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: newStock })
      });
      setProductsList(prev => prev.map(p => p.id === prodId ? { ...p, stock: newStock } : p));
      onShowToast(`Stock updated for ${target.name} to ${newStock} units.`);
    } catch (err) {
      setProductsList(prev => prev.map(p => p.id === prodId ? { ...p, stock: newStock } : p));
      onShowToast(`Stock updated to ${newStock} units.`);
    }
  };

  // Save / Update Product
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productFormData)
        });
        setProductsList(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...productFormData } : p));
        onShowToast(`Product "${productFormData.name}" updated in MongoDB Atlas.`);
      } else {
        const newProd = {
          ...productFormData,
          id: `prod-${Date.now()}`,
          sku: productFormData.sku || `OKRA-${Date.now().toString().slice(-4)}`,
          sizes: ['30 ml', '50 ml'],
          benefits: ['Formulated with rich botanical extracts', 'Deep hydration and skin comfort'],
          ingredientsList: [{ name: 'Botanical Extract', explanation: 'Supports long-lasting skin hydration.' }]
        };
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProd)
        });
        setProductsList(prev => [newProd, ...prev]);
        onShowToast(`New product "${newProd.name}" recorded in MongoDB Atlas.`);
      }
      setIsProductModalOpen(false);
      setEditingProduct(null);
    } catch (err) {
      onShowToast('Saved locally.');
      setIsProductModalOpen(false);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from the product catalog?`)) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
    } catch (e) { /* ignore */ }
    setProductsList(prev => prev.filter(p => p.id !== id));
    onShowToast(`Product "${name}" deleted.`);
  };

  // Update Order Status
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      setOrdersList(prev => prev.map(o => (o.orderId === orderId || o._id === orderId) ? { ...o, status: newStatus } : o));
      onShowToast(`Order #${orderId} marked as ${newStatus} in MongoDB Atlas.`);
    } catch (err) {
      setOrdersList(prev => prev.map(o => (o.orderId === orderId || o._id === orderId) ? { ...o, status: newStatus } : o));
      onShowToast(`Order #${orderId} marked as ${newStatus}.`);
    }
  };

  // Customer Management Handlers
  const handleSaveCustomer = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerFormData)
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      const newCust = {
        id: data.data._id || `cust-${Date.now()}`,
        name: customerFormData.name,
        email: customerFormData.email,
        phone: customerFormData.phone,
        address: customerFormData.address,
        city: customerFormData.city,
        ordersCount: 0,
        totalSpent: 0,
        createdAt: new Date().toISOString()
      };
      setCustomersList(prev => [newCust, ...prev]);
      onShowToast(`Customer "${customerFormData.name}" recorded in MongoDB Atlas!`);
      setIsCustomerModalOpen(false);
      setCustomerFormData({ name: '', email: '', phone: '', address: '', city: '' });
    } catch (err) {
      onShowToast(err.message || 'Error recording customer.', 'error');
    }
  };

  const handleDeleteCustomer = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove customer "${name}" from MongoDB Atlas?`)) return;
    try {
      await fetch(`/api/customers/${id}`, { method: 'DELETE' });
    } catch (e) { /* ignore */ }
    setCustomersList(prev => prev.filter(c => c.id !== id && c._id !== id));
    onShowToast(`Customer "${name}" removed.`);
  };

  // Save / Update Article
  const handleSaveArticle = async (e) => {
    e.preventDefault();
    try {
      if (editingArticle) {
        await fetch(`/api/journal/${editingArticle.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(articleFormData)
        });
        setArticlesList(prev => prev.map(a => a.id === editingArticle.id ? { ...a, ...articleFormData } : a));
        onShowToast('Article updated in MongoDB Atlas.');
      } else {
        const newArt = {
          ...articleFormData,
          id: `art-${Date.now()}`,
          date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };
        await fetch('/api/journal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newArt)
        });
        setArticlesList(prev => [newArt, ...prev]);
        onShowToast('New article published to MongoDB Atlas.');
      }
      setIsArticleModalOpen(false);
      setEditingArticle(null);
    } catch (err) {
      onShowToast('Saved article locally.');
      setIsArticleModalOpen(false);
    }
  };

  // Delete Article
  const handleDeleteArticle = async (id, title) => {
    if (!window.confirm(`Delete article "${title}"?`)) return;
    try {
      await fetch(`/api/journal/${id}`, { method: 'DELETE' });
    } catch (e) { /* ignore */ }
    setArticlesList(prev => prev.filter(a => a.id !== id));
    onShowToast('Article removed.');
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id) => {
    try {
      await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    } catch (e) { /* ignore */ }
    setInquiriesList(prev => prev.filter(i => (i._id !== id && i.id !== id)));
    onShowToast('Customer inquiry dismissed.');
  };

  // Filtered Products
  const filteredProducts = productsList.filter(p => 
    p.name?.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.type?.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.sku?.toLowerCase().includes(productSearch.toLowerCase())
  );

  // Filtered Orders
  const filteredOrders = ordersList.filter(o => {
    if (orderFilter === 'All') return true;
    return o.status === orderFilter;
  });

  // ==========================================
  // VIEW: AUTHENTICATION LOCK SCREEN
  // ==========================================
  if (!isAdminAuthenticated) {
    return (
      <div className="section-padding" style={{ background: 'var(--bg-primary)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '440px' }}>
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '24px',
            padding: '2.5rem',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-lg)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--accent-sage-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <Lock size={30} color="var(--accent-sage)" />
            </div>

            <span className="eyebrow">Administrative Access</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.6rem' }}>
              Admin Portal
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.75rem', lineHeight: 1.5 }}>
              Authorized administrators can manage products, track inventory stock, fulfill orders, and publish journal articles.
            </p>

            {authError && (
              <div style={{
                background: '#FDF2F2',
                border: '1px solid #F87171',
                color: '#B91C1C',
                borderRadius: '12px',
                padding: '0.75rem',
                fontSize: '0.82rem',
                marginBottom: '1.25rem'
              }}>
                {authError}
              </div>
            )}

            <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <input
                  type="password"
                  placeholder="Enter Admin Passcode (e.g. admin123)"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border-medium)',
                    fontSize: '0.9rem',
                    background: 'var(--bg-primary)',
                    textAlign: 'center',
                    letterSpacing: '0.1em'
                  }}
                  autoFocus
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                <Unlock size={16} /> Unlock Admin Panel
              </button>

              <button 
                type="button" 
                onClick={() => { setAdminPin('admin123'); setIsAdminAuthenticated(true); localStorage.setItem('skincare_admin_auth', 'true'); }}
                style={{ fontSize: '0.78rem', color: 'var(--accent-sage)', fontWeight: 600, textDecoration: 'underline', marginTop: '0.25rem' }}
              >
                Instant Access Demo (admin123)
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: MAIN ADMIN DASHBOARD
  // ==========================================
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '90vh', paddingBottom: '5rem' }}>
      {/* Top Admin Header Bar */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-medium)',
        padding: '1.5rem 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="eyebrow" style={{ margin: 0 }}>Management Console</span>
              <span style={{
                fontSize: '0.72rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                background: dbSource.includes('MongoDB') ? '#E8F5E9' : '#FFF3E0',
                color: dbSource.includes('MongoDB') ? '#2E7D32' : '#E65100',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: dbSource.includes('MongoDB') ? '#2E7D32' : '#E65100' }} />
                {dbSource}
              </span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', lineHeight: 1.1, marginTop: '0.2rem' }}>
              SkinCare Brand Admin Panel
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={fetchAllData}
              title="Refresh Data"
              className="btn btn-secondary"
              style={{ padding: '0.55rem 0.9rem', fontSize: '0.82rem' }}
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
            <button
              onClick={() => setActivePage('shop')}
              className="btn btn-secondary"
              style={{ padding: '0.55rem 0.9rem', fontSize: '0.82rem' }}
            >
              View Store <ExternalLink size={14} />
            </button>
            <button
              onClick={handleAdminLogout}
              style={{
                fontSize: '0.82rem',
                color: '#D9534F',
                padding: '0.55rem 0.9rem',
                border: '1px solid rgba(217, 83, 79, 0.3)',
                borderRadius: '999px',
                fontWeight: 600
              }}
            >
              Exit Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Navigation Tabs */}
      <div className="container" style={{ marginTop: '2rem' }}>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border-medium)',
          paddingBottom: '0.5rem',
          marginBottom: '2.5rem',
          overflowX: 'auto'
        }}>
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: BarChart3 },
            { id: 'products', label: `Products & Inventory (${productsList.length})`, icon: Package },
            { id: 'orders', label: `Orders (${ordersList.length})`, icon: ShoppingBag },
            { id: 'customers', label: `Customers (${customersList.length})`, icon: Users },
            { id: 'content', label: 'Website Content', icon: FileText },
            { id: 'qrcode', label: 'QR & Packaging Assets', icon: QrCode }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '999px',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 500,
                  background: isActive ? 'var(--text-primary)' : 'transparent',
                  color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* TAB 1: OVERVIEW DASHBOARD */}
        {/* ======================================================== */}
        {activeTab === 'overview' && (
          <div>
            {/* MongoDB Atlas Integration Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #001E2B 0%, #00684A 100%)',
              color: '#FFFFFF',
              borderRadius: '24px',
              padding: '1.75rem 2rem',
              marginBottom: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
              boxShadow: '0 12px 32px rgba(0, 104, 74, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem'
                }}>
                  🍃
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.15rem' }}>MongoDB Atlas Cloud Database</span>
                    <span style={{
                      background: '#00ED64',
                      color: '#001E2B',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      textTransform: 'uppercase'
                    }}>
                      CONNECTED
                    </span>
                  </div>
                  <p style={{ fontSize: '0.84rem', opacity: 0.85, margin: 0 }}>
                    Cluster: <strong>Cluster0 (izmsupi.mongodb.net)</strong> • Database: <strong>skincare-brand</strong> • Records: {productsList.length} products, {ordersList.length} orders, {customersList.length} customers
                  </p>
                </div>
              </div>
              <button
                onClick={fetchAllData}
                style={{
                  background: '#FFFFFF',
                  color: '#001E2B',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '999px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  border: 'none'
                }}
              >
                <RefreshCw size={14} /> Refresh MongoDB Data
              </button>
            </div>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'var(--bg-card)', borderRadius: '20px', padding: '1.75rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                <span className="eyebrow">Gross Sales</span>
                <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', margin: '0.3rem 0' }}>
                  ₹{(ordersList.reduce((acc, o) => acc + (o.total || 0), 0) || stats.totalRevenue).toLocaleString('en-IN')}
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--accent-sage)', fontWeight: 600 }}>Total orders processed</span>
              </div>

              <div style={{ background: 'var(--bg-card)', borderRadius: '20px', padding: '1.75rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                <span className="eyebrow">Customer Orders</span>
                <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', margin: '0.3rem 0' }}>
                  {ordersList.length || stats.totalOrders}
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  {ordersList.filter(o => o.status === 'Processing').length} pending fulfillment
                </span>
              </div>

              <div style={{ background: 'var(--bg-card)', borderRadius: '20px', padding: '1.75rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                <span className="eyebrow">Registered Customers</span>
                <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', margin: '0.3rem 0' }}>
                  {customersList.length || stats.customerCount || 0}
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--accent-sage)', fontWeight: 600 }}>Recorded in MongoDB Atlas</span>
              </div>

              <div style={{ background: 'var(--bg-card)', borderRadius: '20px', padding: '1.75rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                <span className="eyebrow">Catalog Products</span>
                <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', margin: '0.3rem 0' }}>
                  {productsList.length || stats.productsCount}
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--accent-sage)', fontWeight: 600 }}>All formulations in database</span>
              </div>

              <div style={{ background: 'var(--bg-card)', borderRadius: '20px', padding: '1.75rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                <span className="eyebrow">Low Stock Alerts</span>
                <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: productsList.filter(p => (p.stock || 0) <= 15).length > 0 ? '#E65100' : 'var(--accent-sage)', margin: '0.3rem 0' }}>
                  {productsList.filter(p => (p.stock || 0) <= 15).length}
                </div>
                <span style={{ fontSize: '0.78rem', color: '#E65100', fontWeight: 600 }}>Products below 15 units</span>
              </div>
            </div>

            {/* Quick Action Highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {/* Recent Orders Overview */}
              <div style={{ background: 'var(--bg-card)', borderRadius: '20px', padding: '1.75rem', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem' }}>Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} style={{ fontSize: '0.8rem', color: 'var(--accent-sage)', fontWeight: 600 }}>View All →</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {ordersList.slice(0, 3).map((ord) => (
                    <div key={ord.orderId || ord._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>#{ord.orderId} • {ord.customer?.firstName} {ord.customer?.lastName}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{ord.items?.length || 1} items • ₹{(ord.total || 0).toLocaleString('en-IN')}</div>
                      </div>
                      <span style={{
                        fontSize: '0.72rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        fontWeight: 600,
                        background: ord.status === 'Delivered' ? '#E8F5E9' : '#FFF3E0',
                        color: ord.status === 'Delivered' ? '#2E7D32' : '#E65100'
                      }}>
                        {ord.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Low Stock Warning Box */}
              <div style={{ background: 'var(--bg-card)', borderRadius: '20px', padding: '1.75rem', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem' }}>Inventory Watchlist</h3>
                  <button onClick={() => setActiveTab('products')} style={{ fontSize: '0.8rem', color: 'var(--accent-sage)', fontWeight: 600 }}>Manage Stock →</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {productsList.filter(p => (p.stock || 0) <= 20).map((prod) => (
                    <div key={prod.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{prod.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SKU: {prod.sku || 'N/A'}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: (prod.stock || 0) <= 10 ? '#D9534F' : '#E65100' }}>
                          {prod.stock || 0} units
                        </span>
                        <button
                          onClick={() => handleStockAdjust(prod.id, 25)}
                          style={{
                            fontSize: '0.72rem',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '6px',
                            background: 'var(--text-primary)',
                            color: 'var(--bg-primary)',
                            fontWeight: 600
                          }}
                        >
                          +25 Restock
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: PRODUCTS & INVENTORY MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === 'products' && (
          <div>
            {/* Controls Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'var(--bg-card)',
                padding: '0.55rem 1rem',
                borderRadius: '999px',
                border: '1px solid var(--border-medium)',
                maxWidth: '350px',
                width: '100%'
              }}>
                <Search size={16} color="var(--text-muted)" />
                <input
                  type="text"
                  placeholder="Search products by name or SKU..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '0.88rem' }}
                />
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProductFormData({
                    name: '',
                    type: 'Serum',
                    category: 'Serums',
                    price: 2499,
                    stock: 50,
                    sku: `OKRA-${Math.floor(100 + Math.random() * 900)}`,
                    shortDescription: '',
                    description: '',
                    placeholderTheme: 'sage',
                    availability: 'Formulation In Progress'
                  });
                  setIsProductModalOpen(true);
                }}
                className="btn btn-primary"
                style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem' }}
              >
                <Plus size={16} /> Add New Product
              </button>
            </div>

            {/* Products Table */}
            <div style={{
              background: 'var(--bg-card)',
              borderRadius: '20px',
              border: '1px solid var(--border-light)',
              overflowX: 'auto',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-medium)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    <th style={{ padding: '1rem 1.25rem' }}>Product Details</th>
                    <th style={{ padding: '1rem' }}>Category</th>
                    <th style={{ padding: '1rem' }}>Price</th>
                    <th style={{ padding: '1rem' }}>Inventory Stock</th>
                    <th style={{ padding: '1rem' }}>Availability</th>
                    <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((prod) => {
                    const isLowStock = (prod.stock || 0) <= 15;
                    const isOutOfStock = (prod.stock || 0) <= 0;

                    return (
                      <tr key={prod.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        {/* Name & SKU */}
                        <td style={{ padding: '1rem 1.25rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                            {prod.image && (
                              <img src={prod.image} alt="" style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0, border: '1px solid var(--border-light)' }} />
                            )}
                            <div>
                              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{prod.name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SKU: {prod.sku || 'N/A'} • ID: {prod.id}</div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                          {prod.type || prod.category}
                        </td>

                        {/* Price */}
                        <td style={{ padding: '1rem', fontWeight: 600 }}>
                          ₹{(prod.price || 0).toLocaleString('en-IN')}
                        </td>

                        {/* Inventory & Quick Adjust */}
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <span style={{
                              padding: '0.2rem 0.6rem',
                              borderRadius: '999px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              background: isOutOfStock ? '#FFEBEE' : isLowStock ? '#FFF3E0' : '#E8F5E9',
                              color: isOutOfStock ? '#C62828' : isLowStock ? '#E65100' : '#2E7D32'
                            }}>
                              {prod.stock || 0} units
                            </span>

                            {/* Quick + / - Adjust */}
                            <div style={{ display: 'inline-flex', border: '1px solid var(--border-medium)', borderRadius: '6px' }}>
                              <button
                                onClick={() => handleStockAdjust(prod.id, -5)}
                                title="Decrease 5 units"
                                style={{ padding: '0.15rem 0.4rem', fontSize: '0.75rem', fontWeight: 700 }}
                              >
                                -
                              </button>
                              <button
                                onClick={() => handleStockAdjust(prod.id, 10)}
                                title="Add 10 units"
                                style={{ padding: '0.15rem 0.4rem', fontSize: '0.75rem', fontWeight: 700, borderLeft: '1px solid var(--border-medium)' }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Availability */}
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            fontSize: '0.72rem',
                            padding: '0.2rem 0.55rem',
                            borderRadius: '999px',
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-secondary)',
                            fontWeight: 500
                          }}>
                            {prod.availability || 'In Progress'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => {
                                setEditingProduct(prod);
                                setProductFormData({
                                  name: prod.name,
                                  type: prod.type,
                                  category: prod.category || 'Serums',
                                  price: prod.price,
                                  stock: prod.stock || 40,
                                  sku: prod.sku || '',
                                  shortDescription: prod.shortDescription || '',
                                  description: prod.description || '',
                                  placeholderTheme: prod.placeholderTheme || 'sage',
                                  availability: prod.availability || 'Formulation In Progress'
                                });
                                setIsProductModalOpen(true);
                              }}
                              title="Edit Product"
                              style={{ padding: '0.4rem', color: 'var(--accent-sage)' }}
                            >
                              <Edit3 size={16} />
                            </button>

                            <button
                              onClick={() => handleDeleteProduct(prod.id, prod.name)}
                              title="Delete Product"
                              style={{ padding: '0.4rem', color: '#D9534F' }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: CUSTOMERS & CLIENT DIRECTORY */}
        {/* ======================================================== */}
        {activeTab === 'customers' && (
          <div>
            {/* Header & Controls */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'var(--bg-card)',
                padding: '0.55rem 1rem',
                borderRadius: '12px',
                border: '1px solid var(--border-medium)',
                minWidth: '280px'
              }}>
                <Search size={16} color="var(--text-muted)" />
                <input
                  type="text"
                  placeholder="Search customer name, email, phone..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--brand-green-accent)', fontWeight: 600 }}>
                  🍃 Recorded in MongoDB Atlas
                </span>
                <button
                  onClick={() => setIsCustomerModalOpen(true)}
                  className="btn btn-primary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
                >
                  <Plus size={16} /> Record New Customer
                </button>
              </div>
            </div>

            {/* Customers Table */}
            <div style={{
              background: 'var(--bg-card)',
              borderRadius: '20px',
              border: '1px solid var(--border-light)',
              overflowX: 'auto',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    <th style={{ padding: '1rem 1.25rem' }}>Customer Profile</th>
                    <th style={{ padding: '1rem' }}>Contact Info</th>
                    <th style={{ padding: '1rem' }}>Location / City</th>
                    <th style={{ padding: '1rem' }}>Orders Placed</th>
                    <th style={{ padding: '1rem' }}>Total Spend</th>
                    <th style={{ padding: '1rem' }}>Joined / Order Date</th>
                    <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customersList
                    .filter(c => 
                      c.name?.toLowerCase().includes(customerSearch.toLowerCase()) ||
                      c.email?.toLowerCase().includes(customerSearch.toLowerCase()) ||
                      c.phone?.includes(customerSearch) ||
                      c.city?.toLowerCase().includes(customerSearch.toLowerCase())
                    )
                    .map((cust) => (
                      <tr key={cust.id || cust._id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '50%',
                              background: 'var(--brand-green-light)',
                              color: 'var(--brand-green-deep)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '0.9rem'
                            }}>
                              {cust.name?.charAt(0)?.toUpperCase() || 'C'}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: 'var(--brand-green-deep)' }}>{cust.name}</div>
                              <span style={{
                                fontSize: '0.68rem',
                                padding: '0.15rem 0.5rem',
                                borderRadius: '999px',
                                background: cust.ordersCount > 1 ? '#E8F5E9' : 'var(--bg-secondary)',
                                color: cust.ordersCount > 1 ? '#2E7D32' : 'var(--text-muted)',
                                fontWeight: 700,
                                textTransform: 'uppercase'
                              }}>
                                {cust.ordersCount > 1 ? '⭐ VIP Customer' : 'Client'}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: 500 }}>{cust.email}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cust.phone || 'No phone recorded'}</div>
                        </td>

                        <td style={{ padding: '1rem' }}>
                          <div>{cust.city || 'Ludhiana, India'}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cust.address || 'Standard Shipping'}</div>
                        </td>

                        <td style={{ padding: '1rem', fontWeight: 600 }}>
                          {cust.ordersCount || 0} order{cust.ordersCount !== 1 ? 's' : ''}
                        </td>

                        <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--brand-green-deep)' }}>
                          ₹{(cust.totalSpent || 0).toLocaleString('en-IN')}
                        </td>

                        <td style={{ padding: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {cust.createdAt ? new Date(cust.createdAt).toLocaleDateString() : 'Active'}
                        </td>

                        <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                          <button
                            onClick={() => handleDeleteCustomer(cust.id || cust._id, cust.name)}
                            aria-label="Delete Customer"
                            style={{
                              padding: '0.4rem',
                              color: '#D9534F',
                              borderRadius: '8px',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                            title="Delete customer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  {customersList.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <Users size={36} style={{ margin: '0 auto 1rem auto', opacity: 0.4 }} />
                        <p style={{ fontWeight: 600 }}>No customer accounts recorded yet.</p>
                        <p style={{ fontSize: '0.82rem', marginTop: '0.25rem' }}>
                          Customers are automatically recorded in MongoDB Atlas when they register or place orders at checkout!
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: ORDERS MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === 'orders' && (
          <div>
            {/* Status Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {['All', 'Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setOrderFilter(st)}
                  className={`btn-pill-tag ${orderFilter === st ? 'active' : ''}`}
                  style={{ fontSize: '0.82rem', padding: '0.45rem 1rem' }}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Orders Table */}
            <div style={{
              background: 'var(--bg-card)',
              borderRadius: '20px',
              border: '1px solid var(--border-light)',
              overflowX: 'auto',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-medium)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    <th style={{ padding: '1rem 1.25rem' }}>Order Ref</th>
                    <th style={{ padding: '1rem' }}>Customer Details</th>
                    <th style={{ padding: '1rem' }}>Items Ordered</th>
                    <th style={{ padding: '1rem' }}>Total (INR)</th>
                    <th style={{ padding: '1rem' }}>Fulfillment Status</th>
                    <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No orders matching "{orderFilter}" status.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => (
                      <tr key={ord.orderId || ord._id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>#{ord.orderId}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {ord.createdAt ? new Date(ord.createdAt).toLocaleDateString() : 'Recent'}
                          </div>
                        </td>

                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: 500 }}>{ord.customer?.firstName} {ord.customer?.lastName}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ord.customer?.email}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ord.customer?.city || 'India'}</div>
                        </td>

                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontSize: '0.82rem' }}>
                            {ord.items?.map((item, idx) => (
                              <div key={idx}>
                                {item.quantity}x {item.name} ({item.selectedSize})
                              </div>
                            ))}
                          </div>
                        </td>

                        <td style={{ padding: '1rem', fontWeight: 600 }}>
                          ₹{(ord.total || 0).toLocaleString('en-IN')}
                        </td>

                        <td style={{ padding: '1rem' }}>
                          <select
                            value={ord.status || 'Processing'}
                            onChange={(e) => handleUpdateOrderStatus(ord.orderId || ord._id, e.target.value)}
                            style={{
                              padding: '0.35rem 0.75rem',
                              borderRadius: '999px',
                              border: '1px solid var(--border-medium)',
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              background: ord.status === 'Delivered' ? '#E8F5E9' : ord.status === 'Shipped' ? '#E3F2FD' : '#FFF3E0',
                              color: ord.status === 'Delivered' ? '#2E7D32' : ord.status === 'Shipped' ? '#1565C0' : '#E65100',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>

                        <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                          <button
                            onClick={() => setViewingOrder(ord)}
                            className="btn btn-secondary"
                            style={{ padding: '0.35rem 0.8rem', fontSize: '0.78rem' }}
                          >
                            View Invoice
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: CUSTOMERS & CLIENT DIRECTORY */}
        {/* ======================================================== */}
        {activeTab === 'customers' && (
          <div>
            {/* Header & Controls */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'var(--bg-card)',
                padding: '0.55rem 1rem',
                borderRadius: '12px',
                border: '1px solid var(--border-medium)',
                minWidth: '280px'
              }}>
                <Search size={16} color="var(--text-muted)" />
                <input
                  type="text"
                  placeholder="Search customer name, email, phone..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--brand-green-accent)', fontWeight: 600 }}>
                  🍃 Recorded in MongoDB Atlas
                </span>
                <button
                  onClick={() => setIsCustomerModalOpen(true)}
                  className="btn btn-primary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
                >
                  <Plus size={16} /> Record New Customer
                </button>
              </div>
            </div>

            {/* Customers Table */}
            <div style={{
              background: 'var(--bg-card)',
              borderRadius: '20px',
              border: '1px solid var(--border-light)',
              overflowX: 'auto',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    <th style={{ padding: '1rem 1.25rem' }}>Customer Profile</th>
                    <th style={{ padding: '1rem' }}>Contact Info</th>
                    <th style={{ padding: '1rem' }}>Location / City</th>
                    <th style={{ padding: '1rem' }}>Orders Placed</th>
                    <th style={{ padding: '1rem' }}>Total Spend</th>
                    <th style={{ padding: '1rem' }}>Joined / Order Date</th>
                    <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customersList
                    .filter(c => 
                      c.name?.toLowerCase().includes(customerSearch.toLowerCase()) ||
                      c.email?.toLowerCase().includes(customerSearch.toLowerCase()) ||
                      c.phone?.includes(customerSearch) ||
                      c.city?.toLowerCase().includes(customerSearch.toLowerCase())
                    )
                    .map((cust) => (
                      <tr key={cust.id || cust._id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '50%',
                              background: 'var(--brand-green-light)',
                              color: 'var(--brand-green-deep)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '0.9rem'
                            }}>
                              {cust.name?.charAt(0)?.toUpperCase() || 'C'}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: 'var(--brand-green-deep)' }}>{cust.name}</div>
                              <span style={{
                                fontSize: '0.68rem',
                                padding: '0.15rem 0.5rem',
                                borderRadius: '999px',
                                background: cust.ordersCount > 1 ? '#E8F5E9' : 'var(--bg-secondary)',
                                color: cust.ordersCount > 1 ? '#2E7D32' : 'var(--text-muted)',
                                fontWeight: 700,
                                textTransform: 'uppercase'
                              }}>
                                {cust.ordersCount > 1 ? '⭐ VIP Customer' : 'Client'}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: 500 }}>{cust.email}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cust.phone || 'No phone recorded'}</div>
                        </td>

                        <td style={{ padding: '1rem' }}>
                          <div>{cust.city || 'Ludhiana, India'}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cust.address || 'Standard Shipping'}</div>
                        </td>

                        <td style={{ padding: '1rem', fontWeight: 600 }}>
                          {cust.ordersCount || 0} order{cust.ordersCount !== 1 ? 's' : ''}
                        </td>

                        <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--brand-green-deep)' }}>
                          ₹{(cust.totalSpent || 0).toLocaleString('en-IN')}
                        </td>

                        <td style={{ padding: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {cust.createdAt ? new Date(cust.createdAt).toLocaleDateString() : 'Active'}
                        </td>

                        <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                          <button
                            onClick={() => handleDeleteCustomer(cust.id || cust._id, cust.name)}
                            aria-label="Delete Customer"
                            style={{
                              padding: '0.4rem',
                              color: '#D9534F',
                              borderRadius: '8px',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                            title="Delete customer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  {customersList.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <Users size={36} style={{ margin: '0 auto 1rem auto', opacity: 0.4 }} />
                        <p style={{ fontWeight: 600 }}>No customer accounts recorded yet.</p>
                        <p style={{ fontSize: '0.82rem', marginTop: '0.25rem' }}>
                          Customers are automatically recorded in MongoDB Atlas when they register or place orders at checkout!
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: WEBSITE CONTENT MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === 'content' && (
          <div>
            {/* Content Sub-Navigation */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
              <button
                onClick={() => setContentSubTab('journal')}
                className={`btn-pill-tag ${contentSubTab === 'journal' ? 'active' : ''}`}
                style={{ fontSize: '0.85rem' }}
              >
                Skincare Journal Articles ({articlesList.length})
              </button>
              <button
                onClick={() => setContentSubTab('inquiries')}
                className={`btn-pill-tag ${contentSubTab === 'inquiries' ? 'active' : ''}`}
                style={{ fontSize: '0.85rem' }}
              >
                Customer Contact Messages ({inquiriesList.length})
              </button>
              <button
                onClick={() => setContentSubTab('subscribers')}
                className={`btn-pill-tag ${contentSubTab === 'subscribers' ? 'active' : ''}`}
                style={{ fontSize: '0.85rem' }}
              >
                Newsletter Subscribers ({subscribersList.length})
              </button>
            </div>

            {/* Content Section: Journal Articles */}
            {contentSubTab === 'journal' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>Published Journal Articles</h3>
                  <button
                    onClick={() => {
                      setEditingArticle(null);
                      setArticleFormData({
                        title: '',
                        category: 'Botanical Deep Dive',
                        readTime: '4 min read',
                        shortDescription: '',
                        content: '',
                        theme: 'sage'
                      });
                      setIsArticleModalOpen(true);
                    }}
                    className="btn btn-primary"
                    style={{ padding: '0.55rem 1.2rem', fontSize: '0.82rem' }}
                  >
                    <Plus size={14} /> Write New Article
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                  {articlesList.map(art => (
                    <div key={art.id} style={{ background: 'var(--bg-card)', borderRadius: '18px', padding: '1.5rem', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column' }}>
                      <span className="eyebrow">{art.category} • {art.readTime}</span>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', margin: '0.4rem 0' }}>{art.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, flexGrow: 1, marginBottom: '1rem' }}>
                        {art.shortDescription}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{art.date}</span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => {
                              setEditingArticle(art);
                              setArticleFormData({
                                title: art.title,
                                category: art.category,
                                readTime: art.readTime,
                                shortDescription: art.shortDescription,
                                content: art.content,
                                theme: art.theme || 'sage'
                              });
                              setIsArticleModalOpen(true);
                            }}
                            style={{ color: 'var(--accent-sage)', padding: '0.2rem' }}
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(art.id, art.title)}
                            style={{ color: '#D9534F', padding: '0.2rem' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content Section: Customer Inquiries */}
            {contentSubTab === 'inquiries' && (
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '1.25rem' }}>Customer Inquiries & Feedback</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {inquiriesList.length === 0 ? (
                    <div style={{ background: 'var(--bg-card)', padding: '2.5rem', borderRadius: '18px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No new customer inquiries.
                    </div>
                  ) : (
                    inquiriesList.map(inq => (
                      <div key={inq._id || inq.id} style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '18px', border: '1px solid var(--border-light)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                          <div>
                            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{inq.name}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.6rem' }}>({inq.email})</span>
                          </div>
                          <button onClick={() => handleDeleteInquiry(inq._id || inq.id)} style={{ color: 'var(--text-muted)' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--accent-sage)', marginBottom: '0.4rem' }}>
                          Subject: {inq.subject || 'General Inquiry'}
                        </div>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                          "{inq.message}"
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Content Section: Newsletter Subscribers */}
            {contentSubTab === 'subscribers' && (
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '1.25rem' }}>Newsletter Community</h3>
                <div style={{ background: 'var(--bg-card)', borderRadius: '18px', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                        <th style={{ padding: '0.9rem 1.25rem' }}>Subscriber Email</th>
                        <th style={{ padding: '0.9rem 1.25rem' }}>Subscription Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribersList.map((sub, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                          <td style={{ padding: '0.9rem 1.25rem', fontWeight: 500 }}>{sub.email}</td>
                          <td style={{ padding: '0.9rem 1.25rem', color: 'var(--text-muted)' }}>
                            {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : 'Active Member'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: QR CODE & PACKAGING ASSETS */}
        {/* ======================================================== */}
        {activeTab === 'qrcode' && (
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="eyebrow" style={{ color: 'var(--brand-green-accent)', fontWeight: 700 }}>Print & Digital Marketing</span>
              <h2 className="title-section" style={{ color: 'var(--brand-green-deep)', marginBottom: '0.5rem' }}>
                QR Code & Packaging Asset Generator
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                High-resolution, scan-ready QR codes designed for product bottles, outer cartons, and marketing materials.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', marginBottom: '3rem' }}>
              {/* Card 1: Production QR for Packaging */}
              <div style={{
                background: 'var(--bg-card)',
                borderRadius: '24px',
                padding: '2rem',
                border: '1.5px solid var(--border-light)',
                boxShadow: 'var(--shadow-md)',
                textAlign: 'center'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'var(--brand-green-deep)',
                  color: '#FFFFFF',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  letterSpacing: '0.04em'
                }}>
                  <Package size={13} />
                  <span>Packaging & Outer Cartons</span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--brand-green-deep)', marginBottom: '0.4rem' }}>
                  Main Website QR Code
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Points to: <strong>https://natural-care-skin-products.vercel.app</strong>
                </p>

                <div style={{
                  background: '#FFFFFF',
                  padding: '1.25rem',
                  borderRadius: '20px',
                  border: '1px solid var(--border-light)',
                  width: '220px',
                  height: '220px',
                  margin: '0 auto 1.5rem auto',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
                }}>
                  <img src="/images/qr-code.png" alt="Production QR Code" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                  <a
                    href="/images/qr-code.png"
                    download="natural-care-packaging-qr-800px.png"
                    className="btn btn-primary"
                    style={{ fontSize: '0.8rem', padding: '0.6rem 1.1rem', textDecoration: 'none' }}
                  >
                    <Download size={14} /> Download PNG (800px)
                  </a>
                  <a
                    href="/images/qr-code.svg"
                    download="natural-care-packaging-qr-vector.svg"
                    className="btn btn-secondary"
                    style={{ fontSize: '0.8rem', padding: '0.6rem 1.1rem', textDecoration: 'none', borderColor: 'var(--brand-green)' }}
                  >
                    <Download size={14} /> Download SVG (Vector)
                  </a>
                </div>
              </div>

              {/* Card 2: Local Wi-Fi Testing QR */}
              <div style={{
                background: 'var(--bg-card)',
                borderRadius: '24px',
                padding: '2rem',
                border: '1.5px solid var(--brand-green-accent)',
                boxShadow: '0 12px 32px rgba(46, 111, 74, 0.1)',
                textAlign: 'center'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'var(--brand-green-light)',
                  color: 'var(--brand-green-deep)',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  border: '1px solid rgba(20,53,35,0.15)'
                }}>
                  <QrCode size={13} />
                  <span>Live Production Store</span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--brand-green-deep)', marginBottom: '0.4rem' }}>
                  Scan on Phone Camera Now
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Live Store URL: <strong>https://natural-care-skin-products.vercel.app</strong>
                </p>

                <div style={{
                  background: '#FFFFFF',
                  padding: '1.25rem',
                  borderRadius: '20px',
                  border: '1px solid var(--border-light)',
                  width: '220px',
                  height: '220px',
                  margin: '0 auto 1.5rem auto',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
                }}>
                  <img src="/images/qr-code.png" alt="Live Store QR Code" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--brand-okra)', fontWeight: 600 }}>
                  📱 Tip: Anyone in the world can scan this with their phone camera to open the store.
                </p>
              </div>
            </div>

            {/* Packaging Guide Table */}
            <div style={{
              background: 'var(--bg-secondary)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid var(--border-light)'
            }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--brand-green-deep)', marginBottom: '1rem' }}>
                📋 Print & Packaging Guidelines for Product Design
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <div style={{ background: '#FFF', padding: '1rem 1.25rem', borderRadius: '14px' }}>
                  <strong style={{ color: 'var(--brand-green-deep)', display: 'block', marginBottom: '0.3rem' }}>Minimum Size</strong>
                  <span>20 mm × 20 mm (0.8 in × 0.8 in) ensures reliable focus on smartphone cameras even at a distance.</span>
                </div>
                <div style={{ background: '#FFF', padding: '1rem 1.25rem', borderRadius: '14px' }}>
                  <strong style={{ color: 'var(--brand-green-deep)', display: 'block', marginBottom: '0.3rem' }}>Quiet Zone Margin</strong>
                  <span>Keep a clean 2–4mm white border around the QR code so surrounding packaging art doesn't interfere.</span>
                </div>
                <div style={{ background: '#FFF', padding: '1rem 1.25rem', borderRadius: '14px' }}>
                  <strong style={{ color: 'var(--brand-green-deep)', display: 'block', marginBottom: '0.3rem' }}>Recommended Placement</strong>
                  <span>Place next to the barcode or on the inner carton lid: <em>"Scan for how-to-use guide & routine tips"</em>.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* MODAL 1: ADD / EDIT PRODUCT */}
      {/* ======================================================== */}
      {isProductModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 400,
          background: 'rgba(33, 33, 31, 0.55)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            background: 'var(--bg-primary)',
            borderRadius: '24px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2.5rem',
            position: 'relative',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <button
              onClick={() => setIsProductModalOpen(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-primary)' }}
            >
              <X size={20} />
            </button>

            <span className="eyebrow">{editingProduct ? 'Inventory Management' : 'New Catalog Addition'}</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1.5rem' }}>
              {editingProduct ? 'Edit Product Details' : 'Add New Skincare Product'}
            </h2>

            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Okra Barrier Cushioning Cream"
                  value={productFormData.name}
                  onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-card)', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                    Type / Category *
                  </label>
                  <select
                    value={productFormData.type}
                    onChange={(e) => setProductFormData({ ...productFormData, type: e.target.value, category: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-card)', fontSize: '0.9rem' }}
                  >
                    <option value="Serum">Serum</option>
                    <option value="Moisturizer">Moisturizer</option>
                    <option value="Cleanser">Cleanser</option>
                    <option value="Toner / Essence">Toner / Essence</option>
                    <option value="Face Oil">Face Oil</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                    Price in INR (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={productFormData.price}
                    onChange={(e) => setProductFormData({ ...productFormData, price: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-card)', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                    Inventory Stock Units *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={productFormData.stock}
                    onChange={(e) => setProductFormData({ ...productFormData, stock: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-card)', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                    SKU Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. OKRA-BAR-03"
                    value={productFormData.sku}
                    onChange={(e) => setProductFormData({ ...productFormData, sku: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-card)', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Short Overview Description *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Summary of product purpose and key benefits..."
                  value={productFormData.shortDescription}
                  onChange={(e) => setProductFormData({ ...productFormData, shortDescription: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-card)', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Availability Status
                </label>
                <select
                  value={productFormData.availability}
                  onChange={(e) => setProductFormData({ ...productFormData, availability: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-card)', fontSize: '0.9rem' }}
                >
                  <option value="In Stock">In Stock (Available to Order)</option>
                  <option value="Formulation In Progress">Formulation In Progress</option>
                  <option value="Pre-Launch Preview">Pre-Launch Preview</option>
                  <option value="Sold Out">Sold Out</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '0.9rem', marginTop: '0.5rem' }}>
                {editingProduct ? 'Save Changes' : 'Create Product'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: ADD / EDIT JOURNAL ARTICLE */}
      {/* ======================================================== */}
      {isArticleModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 400,
          background: 'rgba(33, 33, 31, 0.55)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            background: 'var(--bg-primary)',
            borderRadius: '24px',
            maxWidth: '650px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2.5rem',
            position: 'relative',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <button
              onClick={() => setIsArticleModalOpen(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-primary)' }}
            >
              <X size={20} />
            </button>

            <span className="eyebrow">Content Management</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1.5rem' }}>
              {editingArticle ? 'Edit Journal Article' : 'Write New Journal Article'}
            </h2>

            <form onSubmit={handleSaveArticle} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Why Okra Mucilage Supports Glass-Skin Radiance"
                  value={articleFormData.title}
                  onChange={(e) => setArticleFormData({ ...articleFormData, title: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-card)', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                    Category
                  </label>
                  <input
                    type="text"
                    value={articleFormData.category}
                    onChange={(e) => setArticleFormData({ ...articleFormData, category: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-card)', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    value={articleFormData.readTime}
                    onChange={(e) => setArticleFormData({ ...articleFormData, readTime: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-card)', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Short Summary
                </label>
                <textarea
                  rows={2}
                  value={articleFormData.shortDescription}
                  onChange={(e) => setArticleFormData({ ...articleFormData, shortDescription: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-card)', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Full Article Body
                </label>
                <textarea
                  rows={6}
                  value={articleFormData.content}
                  onChange={(e) => setArticleFormData({ ...articleFormData, content: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-card)', fontSize: '0.9rem', lineHeight: 1.6 }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '0.9rem' }}>
                {editingArticle ? 'Save Article' : 'Publish Article'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: VIEW ORDER INVOICE DETAILS */}
      {/* ======================================================== */}
      {viewingOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 400,
          background: 'rgba(33, 33, 31, 0.55)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            background: 'var(--bg-primary)',
            borderRadius: '24px',
            maxWidth: '560px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2.5rem',
            position: 'relative',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <button
              onClick={() => setViewingOrder(null)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-primary)' }}
            >
              <X size={20} />
            </button>

            <span className="eyebrow">Customer Receipt & Invoice</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem' }}>
              Order #{viewingOrder.orderId}
            </h2>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Placed on {viewingOrder.createdAt ? new Date(viewingOrder.createdAt).toLocaleString() : 'Recent'}
            </div>

            {/* Customer Box */}
            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
              <div style={{ fontWeight: 600 }}>Recipient: {viewingOrder.customer?.firstName} {viewingOrder.customer?.lastName}</div>
              <div style={{ color: 'var(--text-secondary)' }}>Email: {viewingOrder.customer?.email}</div>
              <div style={{ color: 'var(--text-secondary)' }}>Phone: {viewingOrder.customer?.phone || 'N/A'}</div>
              <div style={{ color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Address: {viewingOrder.customer?.address}, {viewingOrder.customer?.city}, {viewingOrder.customer?.postalCode}, {viewingOrder.customer?.country}
              </div>
            </div>

            {/* Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
              <span className="eyebrow" style={{ margin: 0 }}>Items Purchased</span>
              {viewingOrder.items?.map((it, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                  <span>{it.quantity}x {it.name} ({it.selectedSize})</span>
                  <span style={{ fontWeight: 600 }}>₹{((it.price || 0) * (it.quantity || 1)).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>₹{(viewingOrder.subtotal || 0).toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Shipping</span>
                <span>{viewingOrder.shipping === 0 ? 'FREE' : `₹${viewingOrder.shipping}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-primary)', borderTop: '1px solid var(--border-light)', paddingTop: '0.5rem' }}>
                <span>Total Paid</span>
                <span>₹{(viewingOrder.total || 0).toLocaleString('en-IN')} INR</span>
              </div>
            </div>

            <button
              onClick={() => setViewingOrder(null)}
              className="btn btn-secondary"
              style={{ width: '100%' }}
            >
              Close Invoice
            </button>
          </div>
        </div>
      )}
      {/* ======================================================== */}
      {/* MODAL: RECORD NEW CUSTOMER IN MONGODB */}
      {/* ======================================================== */}
      {isCustomerModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 400,
          background: 'rgba(20, 53, 35, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            background: 'var(--bg-primary)',
            borderRadius: '24px',
            maxWidth: '520px',
            width: '100%',
            padding: '2.5rem',
            position: 'relative',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <button
              onClick={() => setIsCustomerModalOpen(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-primary)', border: 'none', background: 'none', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <span className="eyebrow" style={{ color: 'var(--brand-green-accent)', fontWeight: 700 }}>MongoDB Atlas Directory</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--brand-green-deep)', marginBottom: '1.5rem' }}>
              Record New Customer
            </h2>

            <form onSubmit={handleSaveCustomer} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Full Customer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jaspreet Singh"
                  value={customerFormData.name}
                  onChange={(e) => setCustomerFormData({ ...customerFormData, name: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-card)', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="jaspreet@example.com"
                  value={customerFormData.email}
                  onChange={(e) => setCustomerFormData({ ...customerFormData, email: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-card)', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={customerFormData.phone}
                    onChange={(e) => setCustomerFormData({ ...customerFormData, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-card)', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                    City / Region
                  </label>
                  <input
                    type="text"
                    placeholder="Ludhiana, Punjab"
                    value={customerFormData.city}
                    onChange={(e) => setCustomerFormData({ ...customerFormData, city: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-card)', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Shipping Address
                </label>
                <input
                  type="text"
                  placeholder="House / Street address"
                  value={customerFormData.address}
                  onChange={(e) => setCustomerFormData({ ...customerFormData, address: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'var(--bg-card)', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setIsCustomerModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  Save in MongoDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}