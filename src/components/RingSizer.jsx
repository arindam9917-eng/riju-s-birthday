import React, { useState } from 'react';
import { Ruler, Disc, HelpCircle, Check, Info } from 'lucide-react';

export default function RingSizer() {
  const [activeTab, setActiveTab] = useState('coin');
  const [coinDiameterPx, setCoinDiameterPx] = useState(140); // default on-screen px width
  const [placedRingPx, setPlacedRingPx] = useState(110);
  const [fingerMm, setFingerMm] = useState(54);

  // US Quarter real width: 24.26 mm
  const quarterRealMm = 24.26;
  const estimatedPpi = (coinDiameterPx / quarterRealMm) * 25.4;
  const calculatedInnerMm = (placedRingPx / coinDiameterPx) * quarterRealMm;

  // Convert mm to US Ring Size (Approx US 6 = 16.5mm, US 7 = 17.3mm)
  const getUsRingSize = (diameterMm) => {
    const size = (diameterMm - 11.55) / 0.83;
    return Math.max(3, Math.min(13, Math.round(size * 2) / 2));
  };

  const currentRingSize = getUsRingSize(calculatedInnerMm);

  const SIZE_CHART = [
    { us: 4, mm: 14.9, uk: 'H 1/2', eu: 47 },
    { us: 5, mm: 15.7, uk: 'J 1/2', eu: 50 },
    { us: 6, mm: 16.5, uk: 'L 1/2', eu: 52 },
    { us: 7, mm: 17.3, uk: 'N 1/2', eu: 55 },
    { us: 8, mm: 18.1, uk: 'P 1/2', eu: 57 },
    { us: 9, mm: 18.9, uk: 'R 1/2', eu: 60 },
    { us: 10, mm: 19.8, uk: 'T 1/2', eu: 62 },
  ];

  return (
    <section id="sizer" style={{ padding: '100px 32px', maxWidth: '1200px', margin: '0 auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span className="badge-gold" style={{ marginBottom: '16px' }}>PRECISION FITTING GUIDE</span>
        <h2 style={{ fontSize: '2.8rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
          Interactive Ring Size Studio
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0 auto' }}>
          Calibrate your screen with a physical coin to find your exact US, UK, and European ring measurement instantly.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '40px' }}>
        
        {/* Tab Selection */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
          <button
            onClick={() => setActiveTab('coin')}
            className={activeTab === 'coin' ? 'btn-gold' : 'btn-outline-gold'}
            style={{ fontSize: '0.9rem' }}
          >
            <Disc size={18} /> Coin Screen Calibration
          </button>

          <button
            onClick={() => setActiveTab('manual')}
            className={activeTab === 'manual' ? 'btn-gold' : 'btn-outline-gold'}
            style={{ fontSize: '0.9rem' }}
          >
            <Ruler size={18} /> Circumference Calculator
          </button>
        </div>

        {activeTab === 'coin' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
            
            {/* Step 1 & 2 Interactive Screen Circle */}
            <div style={{ textAlign: 'center', background: 'rgba(10, 11, 16, 0.8)', padding: '30px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                STEP 1: PLACE PHYSICAL US QUARTER ON SCREEN & ADJUST SLIDER
              </span>

              {/* Coin Calibration Outer Graphic */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '220px' }}>
                <div style={{
                  width: `${coinDiameterPx}px`,
                  height: `${coinDiameterPx}px`,
                  borderRadius: '50%',
                  border: '2px dashed var(--gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  background: 'rgba(212, 175, 55, 0.05)'
                }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--gold-light)' }}>Quarter Coin</span>

                  {/* Inner Ring Circle */}
                  <div style={{
                    position: 'absolute',
                    width: `${placedRingPx}px`,
                    height: `${placedRingPx}px`,
                    borderRadius: '50%',
                    border: '3px solid #FFF',
                    boxShadow: '0 0 15px rgba(255,255,255,0.4)',
                    pointerEvents: 'none'
                  }} />
                </div>
              </div>

              {/* Sliders */}
              <div style={{ marginTop: '24px', textAlign: 'left' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Adjust Screen Coin Width: ({coinDiameterPx}px)
                </label>
                <input
                  type="range"
                  min="80"
                  max="220"
                  value={coinDiameterPx}
                  onChange={(e) => setCoinDiameterPx(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--gold-primary)', marginBottom: '16px' }}
                />

                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  STEP 2: Align Inner Ring Circle: ({placedRingPx}px)
                </label>
                <input
                  type="range"
                  min="50"
                  max="180"
                  value={placedRingPx}
                  onChange={(e) => setPlacedRingPx(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#FFF' }}
                />
              </div>

            </div>

            {/* Calculated Results */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="glass-card" style={{ padding: '24px', border: '1px solid var(--gold-primary)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>YOUR RECOMMENDED SIZE</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginTop: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '3.5rem', fontWeight: 700, color: 'var(--gold-light)', lineHeight: 1 }}>
                    US {currentRingSize}
                  </span>
                  <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                    ({calculatedInnerMm.toFixed(1)} mm inner diameter)
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="glass-card" style={{ padding: '16px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>UK / AU Size</span>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#FFF' }}>
                    {SIZE_CHART.find(s => s.us === Math.round(currentRingSize))?.uk || 'N 1/2'}
                  </h4>
                </div>

                <div className="glass-card" style={{ padding: '16px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>EU Size</span>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#FFF' }}>
                    {SIZE_CHART.find(s => s.us === Math.round(currentRingSize))?.eu || 54}
                  </h4>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', gap: '10px' }}>
                <Info size={20} color="var(--gold-primary)" style={{ shrink: 0 }} />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Complimentary resizing included with every AURA ring order within 60 days of purchase.
                </p>
              </div>

            </div>

          </div>
        ) : (
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--gold-light)' }}>
              Finger Circumference Input
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Wrap a strip of paper around the base of your ring finger, mark the overlap, and measure the length in millimeters.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '30px' }}>
              <input
                type="number"
                value={fingerMm}
                onChange={(e) => setFingerMm(Number(e.target.value))}
                style={{
                  width: '120px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px',
                  color: '#FFF',
                  fontSize: '1.4rem',
                  textAlign: 'center',
                  fontWeight: 700
                }}
              />
              <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>mm</span>
            </div>

            <div className="glass-card" style={{ padding: '24px', display: 'inline-block', border: '1px solid var(--gold-primary)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>ESTIMATED US RING SIZE</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                US {Math.max(4, Math.min(12, Math.round((fingerMm / Math.PI - 11.55) / 0.83 * 2) / 2))}
              </span>
            </div>
          </div>
        )}

        {/* Global Reference Table */}
        <div style={{ marginTop: '50px', borderTop: '1px solid var(--border-subtle)', paddingTop: '30px' }}>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--gold-light)', marginBottom: '16px', textAlign: 'center' }}>
            International Ring Size Conversion Table
          </h4>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-gold)', color: 'var(--gold-light)' }}>
                  <th style={{ padding: '10px' }}>US Size</th>
                  <th style={{ padding: '10px' }}>Inner Diameter (mm)</th>
                  <th style={{ padding: '10px' }}>UK / Australia</th>
                  <th style={{ padding: '10px' }}>Europe</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART.map((row) => (
                  <tr key={row.us} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px', fontWeight: 600 }}>US {row.us}</td>
                    <td style={{ padding: '10px', color: 'var(--text-muted)' }}>{row.mm} mm</td>
                    <td style={{ padding: '10px' }}>{row.uk}</td>
                    <td style={{ padding: '10px' }}>{row.eu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </section>
  );
}
