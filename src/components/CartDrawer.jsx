import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Gift, CheckCircle2, Sparkles } from 'lucide-react';
import { PROMO_CODES } from '../data/products';
import confetti from 'canvas-confetti';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onClearCart,
  currencySymbol = '$',
  currencyRate = 1
}) {
  const [promoInput, setPromoInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [giftWrap, setGiftWrap] = useState(true);
  
  const [checkoutStep, setCheckoutStep] = useState(null); // null, 'shipping', 'payment', 'success'
  const [shippingData, setShippingData] = useState({ name: '', email: '', address: '', city: '', country: 'United States' });

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = rawSubtotal * appliedDiscount;
  const giftWrapFee = giftWrap ? 25 : 0;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + giftWrapFee);

  const formattedSubtotal = Math.round(rawSubtotal * currencyRate).toLocaleString();
  const formattedDiscount = Math.round(discountAmount * currencyRate).toLocaleString();
  const formattedTotal = Math.round(finalTotal * currencyRate).toLocaleString();

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedDiscount(PROMO_CODES[code]);
      setPromoError('');
    } else {
      setPromoError('Invalid promotion code');
    }
  };

  const handleCompleteOrder = () => {
    setCheckoutStep('success');
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F4E090', '#FFFFFF', '#00A86B']
    });
    setTimeout(() => {
      onClearCart();
    }, 4000);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      
      {/* Sliding Drawer Container */}
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '480px',
          height: '100vh',
          background: 'rgba(12, 13, 20, 0.96)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid var(--border-gold)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.8)',
          animation: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative'
        }}
      >

        {/* Drawer Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="var(--gold-primary)" />
            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
              Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto 0', padding: '40px 20px' }}>
              <ShoppingBag size={48} color="var(--gold-primary)" style={{ opacity: 0.5, marginBottom: '16px' }} />
              <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Your Bag is Empty</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Explore our High Collection to add handcrafted masterpieces.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={item.id} 
                className="glass-card" 
                style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}
              >
                {/* Thumbnail */}
                <div style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: '#05050A', flexShrink: 0 }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Details */}
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, fontFamily: 'var(--font-heading)', lineHeight: 1.3, marginBottom: '4px' }}>
                    {item.name}
                  </h4>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '8px' }}>
                    {item.ringSize && <span>Size: US {item.ringSize}</span>}
                    {item.engraving && <span style={{ color: 'var(--gold-light)' }}>Engraving: “{item.engraving}”</span>}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, color: 'var(--gold-light)', fontSize: '0.95rem' }}>
                      {currencySymbol}{Math.round(item.price * currencyRate * item.quantity).toLocaleString()}
                    </span>

                    {/* Quantity Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-full)', padding: '2px 8px' }}>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', padding: '2px 6px' }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', padding: '2px 6px' }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove */}
                <button onClick={() => onRemoveItem(item.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Summary */}
        {cartItems.length > 0 && (
          <div style={{ padding: '24px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(8, 8, 12, 0.9)' }}>
            
            {/* Promo Code Input */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Promo Code (e.g. AURA10)"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 12px',
                  color: '#FFF',
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              />
              <button className="btn-outline-gold" onClick={handleApplyPromo} style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                Apply
              </button>
            </div>
            {promoError && <span style={{ color: '#E0115F', fontSize: '0.75rem', display: 'block', marginBottom: '12px' }}>{promoError}</span>}

            {/* Gift Wrap Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', fontSize: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <Gift size={16} color="var(--gold-primary)" /> Signature Atelier Gift Box (+$25)
              </label>
              <input type="checkbox" checked={giftWrap} onChange={(e) => setGiftWrap(e.target.checked)} style={{ accentColor: 'var(--gold-primary)' }} />
            </div>

            {/* Price Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span>{currencySymbol}{formattedSubtotal}</span>
              </div>
              {appliedDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#00A86B' }}>
                  <span>Promotion ({appliedDiscount * 100}% OFF)</span>
                  <span>-{currencySymbol}{formattedDiscount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Insured Express Shipping</span>
                <span style={{ color: '#00A86B' }}>COMPLIMENTARY</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, borderTop: '1px solid var(--border-gold)', paddingTop: '10px', marginTop: '6px' }}>
                <span>Total</span>
                <span style={{ color: 'var(--gold-light)' }}>{currencySymbol}{formattedTotal}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button 
              className="btn-gold" 
              onClick={() => setCheckoutStep('shipping')}
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '0.95rem' }}
            >
              Proceed to Secure Checkout <ArrowRight size={18} />
            </button>

          </div>
        )}

      </div>

      {/* Multi-Step Checkout Modal Overlay */}
      {checkoutStep && (
        <div className="modal-overlay" onClick={() => setCheckoutStep(null)} style={{ zIndex: 1100 }}>
          <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px', width: '100%', padding: '32px', border: '1px solid var(--gold-primary)' }}>
            
            {checkoutStep === 'shipping' && (
              <div>
                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Atelier Insured Delivery</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>Enter your shipping destination for white-glove armored delivery.</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  <input type="text" placeholder="Full Name" value={shippingData.name} onChange={(e) => setShippingData({...shippingData, name: e.target.value})} style={{ padding: '12px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: '#FFF' }} />
                  <input type="email" placeholder="Email Address" value={shippingData.email} onChange={(e) => setShippingData({...shippingData, email: e.target.value})} style={{ padding: '12px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: '#FFF' }} />
                  <input type="text" placeholder="Delivery Address" value={shippingData.address} onChange={(e) => setShippingData({...shippingData, address: e.target.value})} style={{ padding: '12px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: '#FFF' }} />
                </div>

                <button className="btn-gold" onClick={() => setCheckoutStep('payment')} style={{ width: '100%', justifyContent: 'center' }}>
                  Continue to Payment
                </button>
              </div>
            )}

            {checkoutStep === 'payment' && (
              <div>
                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Payment Authorization</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>Encrypted 256-bit SSL transaction.</p>

                <div className="glass-card" style={{ padding: '16px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input type="text" placeholder="Cardholder Name" style={{ padding: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: '#FFF' }} />
                  <input type="text" placeholder="Card Number (4532 •••• •••• 8890)" style={{ padding: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: '#FFF' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input type="text" placeholder="MM/YY" style={{ padding: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: '#FFF' }} />
                    <input type="text" placeholder="CVC" style={{ padding: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: '#FFF' }} />
                  </div>
                </div>

                <button className="btn-gold" onClick={handleCompleteOrder} style={{ width: '100%', justifyContent: 'center' }}>
                  Authorize Order of {currencySymbol}{formattedTotal}
                </button>
              </div>
            )}

            {checkoutStep === 'success' && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 size={64} color="#00A86B" style={{ marginBottom: '16px' }} />
                <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', marginBottom: '8px', color: 'var(--gold-light)' }}>
                  Order Confirmed!
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                  Thank you for your creation order. Your GIA certificate & private concierge tracking code will be emailed shortly.
                </p>
                <button className="btn-gold" onClick={() => { setCheckoutStep(null); onClose(); }}>
                  Return to Atelier
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
