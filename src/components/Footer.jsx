import React, { useState } from 'react';
import { Gem, Mail, Phone, MapPin, Send, Check } from 'lucide-react';

export default function Footer({ onOpenBooking }) {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer style={{ background: '#050508', borderTop: '1px solid var(--border-gold)', paddingTop: '80px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr', gap: '40px', marginBottom: '60px' }}>
          
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--gold-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Gem size={20} color="#08080C" />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '0.15em', background: 'var(--gold-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                AURA
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '320px', marginBottom: '20px' }}>
              Haute Joaillerie & bespoke gemstone creations. Crafting timeless elegance for discerning collectors worldwide.
            </p>
            <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', color: 'var(--gold-light)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> Paris • NY • Tokyo • Dubai</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--gold-light)', marginBottom: '20px', letterSpacing: '0.08em' }}>THE COLLECTIONS</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <li><a href="#catalog" style={{ color: 'inherit', textDecoration: 'none' }}>Solitaire Engagement Rings</a></li>
              <li><a href="#catalog" style={{ color: 'inherit', textDecoration: 'none' }}>Colombian Emerald Halos</a></li>
              <li><a href="#catalog" style={{ color: 'inherit', textDecoration: 'none' }}>Ceylon Sapphire Drops</a></li>
              <li><a href="#catalog" style={{ color: 'inherit', textDecoration: 'none' }}>Swiss High Horlogerie</a></li>
            </ul>
          </div>

          {/* Atelier Services */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--gold-light)', marginBottom: '20px', letterSpacing: '0.08em' }}>ATELIER SERVICES</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <li><button onClick={onOpenBooking} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, fontSize: 'inherit' }}>VIP Salon Consultation</button></li>
              <li><a href="#customizer" style={{ color: 'inherit', textDecoration: 'none' }}>Bespoke Customizer Studio</a></li>
              <li><a href="#sizer" style={{ color: 'inherit', textDecoration: 'none' }}>Ring Size Calibration</a></li>
              <li><a href="#story" style={{ color: 'inherit', textDecoration: 'none' }}>GIA Certification Guarantee</a></li>
            </ul>
          </div>

          {/* Newsletter Gazette */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--gold-light)', marginBottom: '20px', letterSpacing: '0.08em' }}>THE ATELIER GAZETTE</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Receive private invitations to confidential high jewelry previews and private salon viewings.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: 'var(--radius-full)',
                  padding: '10px 16px',
                  color: '#FFF',
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              />
              <button type="submit" className="btn-gold" style={{ padding: '10px 16px' }}>
                {subscribed ? <Check size={16} /> : <Send size={16} />}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>© 2026 AURA Fine Jewelry & Haute Horlogerie SA. All Rights Reserved.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Terms of High Joaillerie</span>
            <span>GIA Authenticity Check</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
