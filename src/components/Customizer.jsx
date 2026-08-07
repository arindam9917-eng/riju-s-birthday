import React, { useState, useEffect, useRef } from 'react';
import { METALS, GEMSTONES } from '../data/products';
import { Sparkles, ShoppingBag, Eye, RefreshCw, CheckCircle2 } from 'lucide-react';

const BASES = [
  { id: 'ring', name: 'Solitaire Ring Setting', basePrice: 1800, icon: '💍' },
  { id: 'pendant', name: 'Royal Halo Pendant', basePrice: 2200, icon: '📿' },
  { id: 'bracelet', name: 'Precious Line Bracelet', basePrice: 3100, icon: '✨' },
];

const SHAPES = [
  { id: 'round', name: 'Round Brilliant' },
  { id: 'cushion', name: 'Cushion Cut' },
  { id: 'emerald', name: 'Emerald Cut' },
  { id: 'oval', name: 'Oval Cut' },
];

export default function Customizer({ onAddToCart, onTryOnCustom, currencySymbol = '$', currencyRate = 1 }) {
  const [selectedBase, setSelectedBase] = useState(BASES[0]);
  const [selectedMetal, setSelectedMetal] = useState(METALS[0]);
  const [selectedStone, setSelectedStone] = useState(GEMSTONES[0]);
  const [selectedShape, setSelectedShape] = useState(SHAPES[0]);
  const [carat, setCarat] = useState(1.5);
  const [engravingText, setEngravingText] = useState('');
  const [engravingFont, setEngravingFont] = useState('serif');

  const canvasRef = useRef(null);

  // Dynamic Price calculation
  const calculatePrice = () => {
    const stoneCost = Math.round(carat * selectedStone.pricePerCarat);
    const metalPremium = selectedMetal.id === 'platinum' ? 800 : 400;
    const engravingFee = engravingText ? 150 : 0;
    return selectedBase.basePrice + stoneCost + metalPremium + engravingFee;
  };

  const totalPrice = Math.round(calculatePrice() * currencyRate);

  // Render 2D Luxury Customizer Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Background radial ambient light
    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, 220);
    bgGrad.addColorStop(0, 'rgba(28, 30, 46, 0.9)');
    bgGrad.addColorStop(1, 'rgba(10, 11, 16, 1)');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2 + (selectedBase.id === 'pendant' ? -20 : 20);

    // Draw Base Band / Setting (Metal Color)
    ctx.lineWidth = 14;
    ctx.strokeStyle = selectedMetal.color;
    ctx.shadowColor = selectedMetal.color;
    ctx.shadowBlur = 15;

    if (selectedBase.id === 'ring') {
      // Ring Band
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80, 0.2 * Math.PI, 0.8 * Math.PI, true);
      ctx.stroke();

      // Prongs
      ctx.shadowBlur = 5;
      ctx.fillStyle = selectedMetal.color;
      ctx.fillRect(centerX - 24, centerY - 95, 6, 25);
      ctx.fillRect(centerX + 18, centerY - 95, 6, 25);
    } else if (selectedBase.id === 'pendant') {
      // Chain
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(centerX - 100, centerY - 120);
      ctx.quadraticCurveTo(centerX, centerY + 20, centerX + 100, centerY - 120);
      ctx.stroke();

      // Pendant Setting Bail
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(centerX, centerY - 30, 20, 0, 2 * Math.PI);
      ctx.stroke();
    } else {
      // Bracelet Arc
      ctx.lineWidth = 16;
      ctx.beginPath();
      ctx.arc(centerX, centerY + 10, 95, 1.1 * Math.PI, 1.9 * Math.PI);
      ctx.stroke();
    }

    // Reset Shadow for Stone
    ctx.shadowBlur = 0;

    // Draw Gemstone (Based on Shape & Stone Color)
    const stoneRadius = 25 + carat * 6;
    const stoneY = selectedBase.id === 'ring' ? centerY - 95 : selectedBase.id === 'pendant' ? centerY - 30 : centerY - 85;

    // Gemstone Glow & Color Gradient
    const stoneGrad = ctx.createRadialGradient(
      centerX - stoneRadius * 0.3,
      stoneY - stoneRadius * 0.3,
      stoneRadius * 0.1,
      centerX,
      stoneY,
      stoneRadius
    );
    stoneGrad.addColorStop(0, '#FFFFFF');
    stoneGrad.addColorStop(0.3, selectedStone.color);
    stoneGrad.addColorStop(1, '#05050A');

    ctx.fillStyle = stoneGrad;
    ctx.shadowColor = selectedStone.color;
    ctx.shadowBlur = 25;

    ctx.beginPath();
    if (selectedShape.id === 'round') {
      ctx.arc(centerX, stoneY, stoneRadius, 0, 2 * Math.PI);
    } else if (selectedShape.id === 'cushion') {
      const r = stoneRadius;
      ctx.roundRect(centerX - r, stoneY - r, r * 2, r * 2, 12);
    } else if (selectedShape.id === 'emerald') {
      const w = stoneRadius * 1.3;
      const h = stoneRadius * 0.9;
      ctx.rect(centerX - w, stoneY - h, w * 2, h * 2);
    } else { // Oval
      ctx.ellipse(centerX, stoneY, stoneRadius * 1.3, stoneRadius * 0.9, 0, 0, 2 * Math.PI);
    }
    ctx.fill();

    // Facet Sparkle Reflections
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(centerX - stoneRadius * 0.5, stoneY);
    ctx.lineTo(centerX + stoneRadius * 0.5, stoneY);
    ctx.moveTo(centerX, stoneY - stoneRadius * 0.5);
    ctx.lineTo(centerX, stoneY + stoneRadius * 0.5);
    ctx.stroke();

    // Draw Engraving Preview Text on Ring Band
    if (engravingText && selectedBase.id === 'ring') {
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = engravingFont === 'serif' ? 'italic 12px Cormorant Garamond' : '11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`“${engravingText}”`, centerX, centerY + 65);
    }

  }, [selectedBase, selectedMetal, selectedStone, selectedShape, carat, engravingText, engravingFont]);

  const handleAddToCart = () => {
    const customProduct = {
      id: `custom-${Date.now()}`,
      name: `Bespoke ${selectedStone.name} ${selectedBase.name}`,
      category: selectedBase.id === 'ring' ? 'Rings' : selectedBase.id === 'pendant' ? 'Necklaces' : 'Bracelets',
      price: calculatePrice(),
      image: canvasRef.current ? canvasRef.current.toDataURL() : '',
      metal: selectedMetal.id,
      stone: selectedStone.id,
      carats: carat,
      engraving: engravingText,
      description: `Bespoke handcrafted creation featuring a ${carat}ct ${selectedShape.name} ${selectedStone.name} set in ${selectedMetal.name}.${engravingText ? ` Custom Engraving: "${engravingText}".` : ''}`,
      isCustom: true
    };
    onAddToCart(customProduct);
  };

  return (
    <section id="customizer" style={{ padding: '100px 32px', maxWidth: '1400px', margin: '0 auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span className="badge-gold" style={{ marginBottom: '16px' }}>BESPOKE ATELIER STUDIO</span>
        <h2 style={{ fontSize: '2.8rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
          Craft Your Bespoke Masterpiece
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0 auto' }}>
          Select your precious metal, center gemstone, cut shape, and carat size to visualize your customized creation in real time.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '50px', alignItems: 'start' }}>
        
        {/* Canvas Visualizer Left */}
        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center', position: 'sticky', top: '100px' }}>
          
          <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-gold)', marginBottom: '20px' }}>
            <canvas
              ref={canvasRef}
              width={500}
              height={400}
              style={{ width: '100%', height: 'auto', display: 'block', background: '#090A10' }}
            />
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: 'rgba(8, 8, 12, 0.75)',
              backdropFilter: 'blur(8px)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-gold)',
              fontSize: '0.75rem',
              color: 'var(--gold-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Sparkles size={12} /> LIVE 2D ATELIER PREVIEW
            </div>
          </div>

          {/* Specs & Dynamic Price Banner */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>TOTAL ESTIMATED VALUE</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                {currencySymbol}{totalPrice.toLocaleString()}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-gold" onClick={handleAddToCart} style={{ fontSize: '0.85rem' }}>
                <ShoppingBag size={16} /> Add to Bag
              </button>
            </div>
          </div>

        </div>

        {/* Customization Controls Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Step 1: Base Piece */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--gold-light)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--gold-gradient)', color: '#08080C', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>1</span>
              Select Setting Type
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {BASES.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBase(b)}
                  style={{
                    padding: '16px 12px',
                    borderRadius: 'var(--radius-md)',
                    background: selectedBase.id === b.id ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255,255,255,0.03)',
                    border: selectedBase.id === b.id ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                    color: '#FFF',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)',
                    textAlign: 'center'
                  }}
                >
                  <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '6px' }}>{b.icon}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block' }}>{b.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Precious Metal */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--gold-light)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--gold-gradient)', color: '#08080C', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>2</span>
              Choose Precious Metal
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {METALS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMetal(m)}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    background: selectedMetal.id === m.id ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255,255,255,0.03)',
                    border: selectedMetal.id === m.id ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                    color: '#FFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: m.color, border: '1px solid rgba(255,255,255,0.5)' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{m.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Center Gemstone */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--gold-light)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--gold-gradient)', color: '#08080C', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>3</span>
              Choose Center Gemstone & Cut
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
              {GEMSTONES.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedStone(g)}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    background: selectedStone.id === g.id ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255,255,255,0.03)',
                    border: selectedStone.id === g.id ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                    color: '#FFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: g.color, boxShadow: `0 0 10px ${g.color}` }} />
                  <div style={{ textAlign: 'left' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block' }}>{g.name}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>+${g.pricePerCarat}/ct</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Shape selection */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              {SHAPES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedShape(s)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: 'var(--radius-sm)',
                    background: selectedShape.id === s.id ? 'var(--gold-primary)' : 'rgba(255,255,255,0.05)',
                    color: selectedShape.id === s.id ? '#08080C' : '#FFF',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {s.name}
                </button>
              ))}
            </div>

            {/* Carat Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Gemstone Carat Size</span>
                <strong style={{ color: 'var(--gold-light)', fontSize: '0.95rem' }}>{carat} Carats</strong>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={carat}
                onChange={(e) => setCarat(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--gold-primary)', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Step 4: Custom Laser Engraving */}
          {selectedBase.id === 'ring' && (
            <div className="glass-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--gold-light)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--gold-gradient)', color: '#08080C', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>4</span>
                Personalized Band Engraving (Optional +$150)
              </h3>
              <input
                type="text"
                maxLength={25}
                placeholder="Enter text (e.g., Forever Yours A&M)"
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 16px',
                  color: '#FFF',
                  fontSize: '0.9rem',
                  outline: 'none',
                  marginBottom: '10px'
                }}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Max 25 characters. Precision micro-laser etched on inner band.</span>
            </div>
          )}

        </div>

      </div>

    </section>
  );
}
