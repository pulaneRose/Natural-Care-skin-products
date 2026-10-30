import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function ShopPage({ 
  onSelectProduct, 
  onAddToCart, 
  onToggleWishlist, 
  wishlistIds = [],
  selectedConcern = null
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedConcernFilter, setSelectedConcernFilter] = useState(selectedConcern || 'All');
  const [selectedSkinType, setSelectedSkinType] = useState('All');
  const [selectedIngredient, setSelectedIngredient] = useState('All');
  const [maxPrice, setMaxPrice] = useState(4000);
  const [visibleCount, setVisibleCount] = useState(8);

  const productTypes = ['All', 'Serum', 'Face Serum', 'Hydrogel', 'Body Scrub', 'Moisturizer', 'Cleanser', 'Toner / Essence', 'Face Oil'];
  const skinConcerns = ['All', 'Hydration', 'Radiance', 'Texture', 'Oil Control', 'Barrier Care', 'Body Relief', 'Exfoliation', 'Daily Essentials'];
  const skinTypes = ['All', 'All Skin Types', 'Dry', 'Sensitive', 'Combination', 'Oily', 'Normal'];
  const ingredientsList = ['All', 'Okra Extract (Okra Mucilage)', 'Natural Okra Mucin', 'Galacturanic Acid', 'Okra Seed Oil', 'Papaya Extract', 'Rice Powder', 'Colloidal Oats', 'Aloe Vera', 'Niacinamide', 'Hyaluronic Acid', 'Vitamin C', 'Ceramides', 'Zinc PCA'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Product Type
      if (selectedType !== 'All' && p.type !== selectedType) {
        return false;
      }
      // Skin Concern
      if (selectedConcernFilter !== 'All' && !p.concerns.includes(selectedConcernFilter)) {
        return false;
      }
      // Skin Type
      if (selectedSkinType !== 'All' && !p.skinTypes.includes(selectedSkinType)) {
        return false;
      }
      // Ingredient
      if (selectedIngredient !== 'All' && !p.keyIngredients.includes(selectedIngredient)) {
        return false;
      }
      // Price
      if (p.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [searchQuery, selectedType, selectedConcernFilter, selectedSkinType, selectedIngredient, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSortBy('featured');
    setSelectedType('All');
    setSelectedConcernFilter('All');
    setSelectedSkinType('All');
    setSelectedIngredient('All');
    setMaxPrice(4000);
  };

  return (
    <div className="section-padding" style={{ background: 'var(--bg-primary)', minHeight: '80vh' }}>
      <div className="container">
        {/* SHOP HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'var(--brand-green-deep)',
            color: '#FFFFFF',
            padding: '0.35rem 0.95rem',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            marginBottom: '1rem',
            letterSpacing: '0.04em'
          }}>
            <span>🌸</span>
            <span>Natural Care • Okra Mucin Collection</span>
          </div>
          <h1 className="title-section" style={{ fontSize: '3rem', color: 'var(--brand-green-deep)' }}>
            The Okra Skincare Catalog
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Our signature <strong>Okra Mucin Face Serum</strong> is available now to order. Explore our upcoming additions in the <strong>Future Collection</strong> below.
          </p>
        </div>

        {/* TOP SEARCH & SORT BAR */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '16px',
          padding: '1.25rem 1.5rem',
          border: '1px solid var(--border-light)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.25rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Search Field */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'var(--bg-secondary)',
            padding: '0.6rem 1.25rem',
            borderRadius: '999px',
            flexGrow: 1,
            maxWidth: '400px'
          }}>
            <Search size={18} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search products or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '0.9rem',
                width: '100%'
              }}
            />
          </div>

          {/* Right Sort Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <SlidersHorizontal size={16} />
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '999px',
                  border: '1px solid var(--border-medium)',
                  background: 'var(--bg-primary)',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                <option value="featured">Featured Formulations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <button
              onClick={resetFilters}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.82rem',
                color: 'var(--accent-sage)',
                fontWeight: 600
              }}
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>

        {/* MAIN LAYOUT: FILTERS SIDEBAR + GRID */}
        <div className="shop-main-grid">
          {/* FILTERS SIDEBAR */}
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '20px',
            padding: '1.75rem',
            border: '1px solid var(--border-light)',
            height: 'fit-content'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
              <Filter size={18} color="var(--accent-sage)" />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem' }}>Filter Products</h3>
            </div>

            {/* Product Type */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.6rem' }}>
                Product Type
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {productTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    style={{
                      textAlign: 'left',
                      fontSize: '0.85rem',
                      padding: '0.35rem 0.6rem',
                      borderRadius: '8px',
                      background: selectedType === t ? 'var(--bg-secondary)' : 'transparent',
                      color: selectedType === t ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontWeight: selectedType === t ? 600 : 400
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Skin Concern */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.6rem' }}>
                Skin Concern
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {skinConcerns.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedConcernFilter(c)}
                    style={{
                      textAlign: 'left',
                      fontSize: '0.85rem',
                      padding: '0.35rem 0.6rem',
                      borderRadius: '8px',
                      background: selectedConcernFilter === c ? 'var(--bg-secondary)' : 'transparent',
                      color: selectedConcernFilter === c ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontWeight: selectedConcernFilter === c ? 600 : 400
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Key Ingredient */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.6rem' }}>
                Key Ingredient
              </label>
              <select
                value={selectedIngredient}
                onChange={(e) => setSelectedIngredient(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-medium)',
                  fontSize: '0.85rem',
                  background: 'var(--bg-primary)'
                }}
              >
                {ingredientsList.map((ing) => (
                  <option key={ing} value={ing}>{ing}</option>
                ))}
              </select>
            </div>

            {/* Max Price Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Max Price</span>
                <span>₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="4000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-sage)' }}
              />
            </div>
          </div>

          {/* PRODUCT GRID */}
          <div>
            <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Showing {filteredProducts.length} product{filteredProducts.length === 1 ? '' : 's'}
            </div>

            {filteredProducts.length === 0 ? (
              <div style={{
                background: 'var(--bg-card)',
                borderRadius: '20px',
                padding: '4rem 2rem',
                textAlign: 'center',
                border: '1px solid var(--border-light)'
              }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  No matching formulations found
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Try resetting your filters or adjusting your search query.
                </p>
                <button onClick={resetFilters} className="btn btn-secondary">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid-3">
                  {filteredProducts.slice(0, visibleCount).map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onSelectProduct={onSelectProduct}
                      onAddToCart={onAddToCart}
                      onToggleWishlist={onToggleWishlist}
                      isWishlisted={wishlistIds.includes(prod.id)}
                    />
                  ))}
                </div>

                {visibleCount < filteredProducts.length && (
                  <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="btn btn-secondary"
                    >
                      Load More Formulations
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .section-padding > .container > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
