import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistDrawer({ 
  isOpen, 
  onClose, 
  wishlistProducts, 
  onRemoveWishlist, 
  onAddToCart,
  currencySymbol = '$',
  currencyRate = 1
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '100vh',
          background: 'rgba(12, 13, 20, 0.96)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid var(--border-gold)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.8)',
          position: 'relative'
        }}
      >
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Heart size={20} color="#E0115F" fill="#E0115F" />
            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
              Saved Creations ({wishlistProducts.length})
            </h3>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {wishlistProducts.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto 0', padding: '40px 20px' }}>
              <Heart size={48} color="#E0115F" style={{ opacity: 0.4, marginBottom: '16px' }} />
              <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Your Wishlist is Empty</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Click the heart icon on any jewelry piece to save it to your personal vault.</p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div key={product.id} className="glass-card" style={{ padding: '16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                <img src={product.image} alt={product.name} style={{ width: '70px', height: '70px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, fontFamily: 'var(--font-heading)', marginBottom: '4px' }}>{product.name}</h4>
                  <span style={{ fontSize: '0.9rem', color: 'var(--gold-light)', fontWeight: 700 }}>
                    {currencySymbol}{Math.round(product.price * currencyRate).toLocaleString()}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button className="btn-gold" onClick={() => onAddToCart(product)} style={{ padding: '6px 10px', fontSize: '0.75rem' }}>
                    <ShoppingBag size={12} /> Bag
                  </button>
                  <button onClick={() => onRemoveWishlist(product.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'center' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
