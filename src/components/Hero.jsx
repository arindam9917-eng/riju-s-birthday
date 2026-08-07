import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Award, Gem, Eye } from 'lucide-react';
import heroRing from '../assets/diamond_solitaire_ring_1784644337248.jpg';

export default function Hero({ onExploreClick, onCustomizerClick, onTryOnClick }) {
  return (
    <section 
      style={{
        minHeight: '100vh',
        paddingTop: '130px',
        paddingBottom: '80px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        background: 'radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.08) 0%, rgba(8, 8, 12, 0.98) 70%)',
        overflow: 'hidden'
      }}
    >
      {/* Decorative ambient lighting elements */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none',
        filter: 'blur(60px)'
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px', width: '100%', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'center' }}>
          
          {/* Hero Content Left */}
          <div>
            <div className="badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <Sparkles size={14} color="var(--gold-primary)" />
              HAUTE JOAILLERIE & BESPOKE CREATIONS
            </div>

            <h1 style={{ 
              fontSize: '3.8rem', 
              lineHeight: 1.1, 
              fontWeight: 700, 
              marginBottom: '24px',
              fontFamily: 'var(--font-heading)'
            }}>
              Timeless Brilliance, <br />
              <span className="gold-text">Crafted for Royalty.</span>
            </h1>

            <p style={{ 
              fontSize: '1.15rem', 
              color: 'var(--text-muted)', 
              maxWidth: '560px', 
              marginBottom: '40px',
              lineHeight: 1.7
            }}>
              Explore masterfully handcrafted GIA-certified solitaire diamonds, Colombian emeralds, and bespoke fine jewelry designed to endure for generations.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '50px' }}>
              <button className="btn-gold" onClick={onExploreClick} style={{ padding: '16px 36px', fontSize: '0.95rem' }}>
                Explore High Collection
                <ArrowRight size={18} />
              </button>
              
              <button className="btn-outline-gold" onClick={onCustomizerClick} style={{ padding: '16px 32px', fontSize: '0.95rem' }}>
                <Sparkles size={18} />
                Design Bespoke Piece
              </button>

              <button className="btn-outline-gold" onClick={onTryOnClick} style={{ padding: '16px 24px', fontSize: '0.95rem', borderColor: 'rgba(255,255,255,0.2)' }}>
                <Eye size={18} />
                Virtual Try-On
              </button>
            </div>

            {/* Trust Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', borderTop: '1px solid var(--border-subtle)', paddingTop: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ShieldCheck size={24} color="var(--gold-primary)" />
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>GIA Certified</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>100% Conflict-Free</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Award size={24} color="var(--gold-primary)" />
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>Master Artisans</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Handcrafted in Paris</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Gem size={24} color="var(--gold-primary)" />
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>Lifetime Care</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Complimentary Service</p>
                </div>
              </div>
            </div>

          </div>

          {/* Hero Image Right */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div className="animate-float" style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
              
              {/* Outer Glowing Ring */}
              <div style={{
                position: 'absolute',
                inset: '-20px',
                borderRadius: '50%',
                background: 'var(--gold-gradient)',
                opacity: 0.2,
                filter: 'blur(30px)',
                zIndex: 1
              }} />

              {/* Main Ring Image Frame */}
              <div style={{
                position: 'relative',
                zIndex: 2,
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border-gold)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
              }}>
                <img 
                  src={heroRing} 
                  alt="Solitaire Diamond Engagement Ring" 
                  style={{ width: '100%', height: 'auto', display: 'block', transform: 'scale(1.02)' }}
                />

                {/* Floating Overlay Card */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  background: 'rgba(12, 13, 20, 0.85)',
                  backdropFilter: 'blur(16px)',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      FEATURED MASTERPIECE
                    </span>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Eternal Solitaire Ring</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>1.5 ct GIA Round Brilliant</p>
                  </div>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                    $4,850
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
