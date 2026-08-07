import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Sparkles, ShieldCheck, Truck, RotateCcw, Check } from 'lucide-react';
import { METALS } from '../data/products';

export default function ProductDetailModal({ 
  product, 
  onClose, 
  onAddToCart, 
  onToggleWishlist, 
  isWishlisted, 
  onTryOn,
  currencySymbol = '$',
  currencyRate = 1
}) {
  const [selectedMetal, setSelectedMetal] = useState(product.metal || 'white-gold');
  const [ringSize, setRingSize] = useState('7');
  const [engraving, setEngraving] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const formattedPrice = Math.round(product.price * currencyRate).toLocaleString();

  const handleAdd = () => {
    onAddToCart({
      ...product,
      selectedMetal,
      ringSize: product.category === 'Rings' ? ringSize : null,
      engraving: engraving || null
    });
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '950px',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '1px solid var(--gold-primary)',
          position: 'relative'
        }}
      >
        <button
          className="btn-icon"
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 20 }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', padding: '32px' }}>
          
          {/* Product Image Frame */}
          <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: '#05050A' }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '100%', minHeight: '400px', objectFit: 'cover', display: 'block' }}
            />

            {(product.category === 'Rings' || product.category === 'Necklaces') && (
              <button
                className="btn-outline-gold"
                onClick={() => {
                  onClose();
                  onTryOn(product);
                }}
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  justifyContent: 'center',
                  background: 'rgba(8,8,12,0.85)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Sparkles size={16} /> Launch Virtual Fitting
              </button>
            )}
          </div>

          {/* Product Details & Purchase Form */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="badge-gold" style={{ fontSize: '0.7rem', marginBottom: '8px' }}>
                {product.category} • {product.carats} CARATS
              </span>

              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, margin: '8px 0 12px 0' }}>
                {product.name}
              </h2>

              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--gold-light)', marginBottom: '20px' }}>
                {currencySymbol}{formattedPrice}
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
                {product.description}
              </p>

              {/* Metal Selection */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--gold-light)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                  Select Precious Metal
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {METALS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMetal(m.id)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        background: selectedMetal === m.id ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.04)',
                        border: selectedMetal === m.id ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                        color: '#FFF',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: m.color }} />
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ring Size Dropdown (If Category == Rings) */}
              {product.category === 'Rings' && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--gold-light)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                    Select Ring Size (US)
                  </label>
                  <select
                    value={ringSize}
                    onChange={(e) => setRingSize(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid var(--border-gold)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px',
                      color: '#FFF',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  >
                    {['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'].map((sz) => (
                      <option key={sz} value={sz} style={{ background: '#10111A' }}>US Size {sz}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Custom Laser Engraving */}
              {product.category === 'Rings' && (
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--gold-light)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                    Micro-Laser Band Engraving (Optional)
                  </label>
                  <input
                    type="text"
                    maxLength={20}
                    placeholder="e.g., Eternal Love"
                    value={engraving}
                    onChange={(e) => setEngraving(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px 14px',
                      color: '#FFF',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                </div>
              )}

              {/* Spec Highlights Bullet List */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--gold-light)', marginBottom: '8px' }}>Craftsmanship Specifications</h4>
                <ul style={{ listStyle: 'none', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {product.details?.map((dt, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--gold-primary)' }}>•</span> {dt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="btn-gold" 
                onClick={handleAdd}
                style={{ flex: 1, justifyContent: 'center', padding: '14px', fontSize: '0.9rem' }}
              >
                {addedSuccess ? <Check size={18} /> : <ShoppingBag size={18} />}
                {addedSuccess ? 'Added to Bag!' : 'Add to Bag'}
              </button>

              <button
                className="btn-icon"
                onClick={() => onToggleWishlist(product)}
                style={{ width: '50px', height: '50px', border: isWishlisted ? '1px solid #E0115F' : '1px solid var(--border-subtle)' }}
              >
                <Heart size={20} color={isWishlisted ? '#E0115F' : '#FFF'} fill={isWishlisted ? '#E0115F' : 'none'} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
