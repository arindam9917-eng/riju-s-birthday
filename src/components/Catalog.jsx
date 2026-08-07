import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES, METALS, GEMSTONES } from '../data/products';
import { SlidersHorizontal, ArrowUpDown, Filter, Sparkles } from 'lucide-react';

export default function Catalog({ 
  products, 
  onQuickView, 
  onAddToCart, 
  onToggleWishlist, 
  wishlistIds, 
  onTryOn,
  currencySymbol,
  currencyRate,
  searchQuery,
  setSearchQuery
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMetal, setSelectedMetal] = useState('all');
  const [selectedStone, setSelectedStone] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(20000);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
        if (selectedMetal !== 'all' && p.metal !== selectedMetal) return false;
        if (selectedStone !== 'all' && p.stone !== selectedStone) return false;
        if (p.price > maxPrice) return false;
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured
      });
  }, [products, selectedCategory, selectedMetal, selectedStone, maxPrice, sortBy, searchQuery]);

  return (
    <section id="catalog" style={{ padding: '100px 32px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span className="badge-gold" style={{ marginBottom: '16px' }}>FINE JEWELRY & HIGH HORLOGERIE</span>
        <h2 style={{ fontSize: '2.8rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
          The Haute Collection
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0 auto', fontSize: '1rem' }}>
          Discover rare diamonds, vibrant Colombian emeralds, and royal sapphires set in 18K solid gold and platinum.
        </p>
      </div>

      {/* Category Pills Bar */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '10px 24px',
              borderRadius: 'var(--radius-full)',
              background: selectedCategory === cat ? 'var(--gold-gradient)' : 'rgba(255, 255, 255, 0.04)',
              color: selectedCategory === cat ? '#08080C' : 'var(--text-main)',
              border: selectedCategory === cat ? 'none' : '1px solid var(--border-subtle)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              fontWeight: selectedCategory === cat ? 700 : 500,
              cursor: 'pointer',
              transition: 'var(--transition-smooth)',
              boxShadow: selectedCategory === cat ? '0 4px 15px rgba(212, 175, 55, 0.3)' : 'none'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Controls Bar: Filter Toggle & Sorting */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(20, 21, 31, 0.6)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--border-subtle)',
        padding: '16px 24px',
        borderRadius: 'var(--radius-md)',
        marginBottom: '32px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            className="btn-outline-gold"
            onClick={() => setFiltersOpen(!filtersOpen)}
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
          >
            <SlidersHorizontal size={16} /> Filters {filtersOpen ? '▲' : '▼'}
          </button>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Showing <strong style={{ color: '#FFF' }}>{filteredProducts.length}</strong> creations
          </span>
        </div>

        {/* Sort Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ArrowUpDown size={16} color="var(--gold-light)" />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-sm)',
              color: '#FFF',
              padding: '6px 14px',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="featured" style={{ background: '#10111A' }}>Featured Creations</option>
            <option value="price-asc" style={{ background: '#10111A' }}>Price: Low to High</option>
            <option value="price-desc" style={{ background: '#10111A' }}>Price: High to Low</option>
            <option value="rating" style={{ background: '#10111A' }}>Highest Rating</option>
          </select>
        </div>
      </div>

      {/* Filter Panel */}
      {filtersOpen && (
        <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          
          {/* Metal Filter */}
          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '12px', color: 'var(--gold-light)' }}>Metal Type</h4>
            <select
              value={selectedMetal}
              onChange={(e) => setSelectedMetal(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--border-subtle)',
                color: '#FFF',
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                outline: 'none'
              }}
            >
              <option value="all" style={{ background: '#10111A' }}>All Precious Metals</option>
              {METALS.map((m) => (
                <option key={m.id} value={m.id} style={{ background: '#10111A' }}>{m.name}</option>
              ))}
            </select>
          </div>

          {/* Gemstone Filter */}
          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '12px', color: 'var(--gold-light)' }}>Gemstone</h4>
            <select
              value={selectedStone}
              onChange={(e) => setSelectedStone(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--border-subtle)',
                color: '#FFF',
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                outline: 'none'
              }}
            >
              <option value="all" style={{ background: '#10111A' }}>All Gemstones</option>
              {GEMSTONES.map((g) => (
                <option key={g.id} value={g.id} style={{ background: '#10111A' }}>{g.name}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--gold-light)' }}>Max Price</h4>
              <span style={{ fontSize: '0.85rem', color: '#FFF' }}>{currencySymbol}{(maxPrice * currencyRate).toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="2000"
              max="20000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--gold-primary)', cursor: 'pointer' }}
            />
          </div>

        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)' }}>
          <Sparkles size={40} color="var(--gold-primary)" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>No Creations Found</h3>
          <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
              onTryOn={onTryOn}
              currencySymbol={currencySymbol}
              currencyRate={currencyRate}
            />
          ))}
        </div>
      )}

    </section>
  );
}
