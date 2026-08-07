import React from 'react';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { METALS } from '../data/products';

export default function ProductCard({ 
  product, 
  onQuickView, 
  onAddToCart, 
  onToggleWishlist, 
  isWishlisted,
  onTryOn,
  currencySymbol = '$',
  currencyRate = 1
}) {
  const formattedPrice = Math.round(product.price * currencyRate).toLocaleString();

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}>
      
      {/* Product Image Frame */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '100%', overflow: 'hidden', background: '#07070A' }}>
        
        {/* Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {product.isBestseller && (
            <span className="badge-gold" style={{ fontSize: '0.65rem' }}>BESTSELLER</span>
          )}
          {product.isNew && (
            <span style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFF', fontSize: '0.65rem', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>
              NEW ATELIER
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 10,
            background: isWishlisted ? 'rgba(224, 17, 95, 0.2)' : 'rgba(8, 8, 12, 0.6)',
            backdropFilter: 'blur(10px)',
            border: isWishlisted ? '1px solid #E0115F' : '1px solid var(--border-subtle)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)'
          }}
        >
          <Heart size={18} color={isWishlisted ? '#E0115F' : '#FFF'} fill={isWishlisted ? '#E0115F' : 'none'} />
        </button>

        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            cursor: 'pointer'
          }}
          onClick={() => onQuickView(product)}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />

        {/* Hover Quick Action Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          right: '12px',
          display: 'flex',
          gap: '8px',
          zIndex: 10
        }}>
          <button
            onClick={() => onQuickView(product)}
            style={{
              flex: 1,
              background: 'rgba(12, 13, 20, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border-gold)',
              color: 'var(--gold-light)',
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Eye size={14} /> Quick View
          </button>
          
          {(product.category === 'Rings' || product.category === 'Necklaces') && (
            <button
              onClick={() => onTryOn(product)}
              style={{
                background: 'rgba(212, 175, 55, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--gold-primary)',
                color: '#FFF',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
              title="Try On Virtually"
            >
              <Sparkles size={14} color="var(--gold-primary)" /> Try On
            </button>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {product.category}
            </span>

            {/* Metal Swatches */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {METALS.map((m) => (
                <span
                  key={m.id}
                  title={m.name}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: m.color,
                    border: product.metal === m.id ? '1px solid #FFF' : '1px solid rgba(0,0,0,0.5)',
                    opacity: product.metal === m.id ? 1 : 0.6
                  }}
                />
              ))}
            </div>
          </div>

          <h3 
            onClick={() => onQuickView(product)}
            style={{ 
              fontSize: '1.1rem', 
              fontWeight: 600, 
              marginBottom: '10px',
              fontFamily: 'var(--font-heading)',
              cursor: 'pointer',
              lineHeight: 1.3
            }}
          >
            {product.name}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill="var(--gold-primary)" color="var(--gold-primary)" />
              ))}
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {product.rating} ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Footer Price & Add Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Starting at</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--gold-light)' }}>
              {currencySymbol}{formattedPrice}
            </span>
          </div>

          <button 
            className="btn-gold" 
            onClick={() => onAddToCart(product)}
            style={{ padding: '8px 16px', fontSize: '0.8rem' }}
          >
            <ShoppingBag size={14} /> Add
          </button>
        </div>

      </div>

    </div>
  );
}
