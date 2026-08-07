import React, { useState, useEffect } from 'react';
import { Gem, ShoppingBag, Heart, Search, Sparkles, Calendar, Menu, X, Globe } from 'lucide-react';

export default function Navbar({ 
  cartCount, 
  wishlistCount, 
  onOpenCart, 
  onOpenWishlist, 
  onOpenBooking, 
  activeSection, 
  setActiveSection,
  currency,
  setCurrency,
  searchQuery,
  setSearchQuery
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'catalog', label: 'High Collection' },
    { id: 'customizer', label: 'Custom Studio' },
    { id: 'tryon', label: 'Virtual Try-On' },
    { id: 'sizer', label: 'Ring Sizer' },
    { id: 'story', label: 'Heritage & Craft' },
  ];

  return (
    <header 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        transition: 'all 0.3s ease',
        background: isScrolled ? 'rgba(8, 8, 12, 0.92)' : 'rgba(8, 8, 12, 0.4)',
        backdropFilter: 'blur(20px)',
        borderBottom: isScrolled ? '1px solid rgba(212, 175, 55, 0.25)' : '1px solid rgba(255, 255, 255, 0.05)',
        padding: isScrolled ? '14px 24px' : '20px 32px'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Logo */}
        <div 
          onClick={() => setActiveSection('catalog')} 
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'var(--gold-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)'
          }}>
            <Gem size={22} color="#08080C" />
          </div>
          <div>
            <span style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: '1.6rem', 
              fontWeight: 700, 
              letterSpacing: '0.18em', 
              background: 'var(--gold-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              AURA
            </span>
            <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
              Fine Jewelry & Atelier
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                const elem = document.getElementById(item.id);
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                background: 'none',
                border: 'none',
                color: activeSection === item.id ? 'var(--gold-light)' : 'var(--text-main)',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: activeSection === item.id ? 600 : 400,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                position: 'relative',
                padding: '6px 0'
              }}
            >
              {item.label}
              {activeSection === item.id && (
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--gold-gradient)',
                  borderRadius: '2px'
                }} />
              )}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
          {/* Currency Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)' }}>
            <Globe size={14} color="var(--gold-light)" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-main)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-sans)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="USD" style={{ background: '#10111A' }}>$ USD</option>
              <option value="EUR" style={{ background: '#10111A' }}>€ EUR</option>
              <option value="GBP" style={{ background: '#10111A' }}>£ GBP</option>
            </select>
          </div>

          {/* Search Toggle */}
          <button 
            className="btn-icon" 
            onClick={() => setSearchOpen(!searchOpen)} 
            title="Search collection"
          >
            <Search size={18} />
          </button>

          {/* Wishlist Icon */}
          <button 
            className="btn-icon" 
            onClick={onOpenWishlist}
            style={{ position: 'relative' }}
            title="View Wishlist"
          >
            <Heart size={18} color={wishlistCount > 0 ? '#E0115F' : 'currentColor'} fill={wishlistCount > 0 ? '#E0115F' : 'none'} />
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'var(--gold-gradient)',
                color: '#08080C',
                fontSize: '0.7rem',
                fontWeight: 700,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button 
            className="btn-icon" 
            onClick={onOpenCart}
            style={{ position: 'relative' }}
            title="View Shopping Bag"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'var(--gold-gradient)',
                color: '#08080C',
                fontSize: '0.7rem',
                fontWeight: 700,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* VIP Consultation CTA */}
          <button className="btn-gold desktop-cta" onClick={onOpenBooking} style={{ fontSize: '0.8rem', padding: '10px 20px' }}>
            <Calendar size={15} />
            Atelier Booking
          </button>

          {/* Mobile Menu Toggle */}
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: 'none', background: 'none', border: 'none', color: '#FFF' }}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Expandable Search Drawer */}
      {searchOpen && (
        <div style={{ maxWidth: '600px', margin: '16px auto 0 auto', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Search diamonds, emeralds, necklaces..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-full)',
              padding: '10px 20px',
              color: '#FFF',
              fontSize: '0.9rem',
              outline: 'none'
            }}
            autoFocus
          />
          {searchQuery && (
            <button className="btn-icon" onClick={() => setSearchQuery('')}>
              <X size={16} />
            </button>
          )}
        </div>
      )}
    </header>
  );
}
