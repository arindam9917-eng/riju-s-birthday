import React from 'react';
import { ShieldCheck, Gem, Sparkles, Award, Globe, Leaf } from 'lucide-react';

export default function StorySection() {
  const HARMONY_PILLARS = [
    {
      icon: <Globe size={28} color="var(--gold-primary)" />,
      title: 'Kimberley Certified Sourcing',
      desc: 'Every diamond in our collection is 100% ethically sourced and conflict-free, adhering strictly to global Kimberley Process guidelines.'
    },
    {
      icon: <Award size={28} color="var(--gold-primary)" />,
      title: 'Place Vendôme Heritage',
      desc: 'Handcrafted by third-generation master goldsmiths in Paris combining centuries-old filigree artistry with high-tech laser precision.'
    },
    {
      icon: <Leaf size={28} color="var(--gold-primary)" />,
      title: '100% Recycled Precious Metals',
      desc: 'Our 18K gold and platinum 950 are forged exclusively from recycled refined sources to protect natural ecosystems.'
    },
    {
      icon: <ShieldCheck size={28} color="var(--gold-primary)" />,
      title: 'Lifetime Guarantee & Care',
      desc: 'Enjoy complimentary annual diamond tightening, polishing, and insurance valuations for every creation bearing the AURA hallmark.'
    }
  ];

  return (
    <section id="story" style={{ padding: '100px 32px', maxWidth: '1400px', margin: '0 auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span className="badge-gold" style={{ marginBottom: '16px' }}>HERITAGE & CRAFTSMANSHIP</span>
        <h2 style={{ fontSize: '2.8rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
          The AURA Atelier Legacy
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '12px auto 0 auto', fontSize: '1rem' }}>
          Uncompromising commitment to rare gemstone authenticity, sustainable luxury, and timeless heirloom design.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        {HARMONY_PILLARS.map((p, i) => (
          <div key={i} className="glass-card" style={{ padding: '32px 24px', textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid var(--border-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto'
            }}>
              {p.icon}
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, fontFamily: 'var(--font-heading)', marginBottom: '10px' }}>
              {p.title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
