import React, { useState } from 'react';
import { X, Sliders, Move, RotateCw, ZoomIn, Camera, Check } from 'lucide-react';
import handBg from '../assets/hand_try_on_bg_1784644438010.jpg';

export default function TryOnModal({ product, onClose }) {
  const [scale, setScale] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [filterMode, setFilterMode] = useState('luxury');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const filterStyles = {
    luxury: 'sepia(0.25) contrast(1.1) brightness(0.95)',
    studio: 'contrast(1.05) brightness(1.02)',
    obsidian: 'contrast(1.2) brightness(0.85) saturate(0.9)',
  };

  const handleCapture = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid var(--gold-primary)'
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span className="badge-gold" style={{ fontSize: '0.65rem' }}>VIRTUAL ATELIER TRY-ON</span>
            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
              Virtual Fitting: {product ? product.name : 'Custom Piece'}
            </h3>
          </div>

          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Studio Viewport */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', flex: 1, minHeight: '420px' }}>
          
          {/* Main Overlay Viewport */}
          <div style={{
            position: 'relative',
            background: '#050508',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Hand Background Image */}
            <img
              src={handBg}
              alt="Virtual Hand Model"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: filterStyles[filterMode],
                transition: 'filter 0.3s ease'
              }}
            />

            {/* Jewelry Overlay */}
            {product && (
              <div style={{
                position: 'absolute',
                top: `calc(50% + ${posY}px)`,
                left: `calc(50% + ${posX}px)`,
                transform: `translate(-50%, -50%) scale(${scale / 100}) rotate(${rotation}deg)`,
                transition: 'transform 0.05s linear',
                cursor: 'grab',
                pointerEvents: 'none',
                filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.8))'
              }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '180px',
                    height: '180px',
                    objectFit: 'contain'
                  }}
                />
              </div>
            )}

            {/* Snapshot Toast */}
            {savedSuccess && (
              <div style={{
                position: 'absolute',
                bottom: '20px',
                background: 'rgba(4, 46, 39, 0.9)',
                border: '1px solid #00A86B',
                color: '#FFF',
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backdropFilter: 'blur(10px)'
              }}>
                <Check size={16} color="#00A86B" /> Fitting Snapshot Saved to Clipboard!
              </div>
            )}
          </div>

          {/* Fitting Controls Panel */}
          <div style={{ padding: '20px', background: 'rgba(12, 13, 20, 0.95)', borderLeft: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--gold-light)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                Adjust Fitting
              </h4>

              {/* Scale Control */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.8rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
                    <ZoomIn size={14} /> Scale
                  </span>
                  <span>{scale}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="160"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--gold-primary)' }}
                />
              </div>

              {/* Rotation Control */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.8rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
                    <RotateCw size={14} /> Angle
                  </span>
                  <span>{rotation}°</span>
                </div>
                <input
                  type="range"
                  min="-60"
                  max="60"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--gold-primary)' }}
                />
              </div>

              {/* Position X */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.8rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
                    <Move size={14} /> Position X
                  </span>
                  <span>{posX}px</span>
                </div>
                <input
                  type="range"
                  min="-150"
                  max="150"
                  value={posX}
                  onChange={(e) => setPosX(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--gold-primary)' }}
                />
              </div>

              {/* Position Y */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.8rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
                    <Move size={14} /> Position Y
                  </span>
                  <span>{posY}px</span>
                </div>
                <input
                  type="range"
                  min="-150"
                  max="150"
                  value={posY}
                  onChange={(e) => setPosY(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--gold-primary)' }}
                />
              </div>

              {/* Lighting Ambient */}
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Studio Lighting Filter</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                  {['luxury', 'studio', 'obsidian'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setFilterMode(m)}
                      style={{
                        padding: '6px',
                        fontSize: '0.7rem',
                        textTransform: 'capitalize',
                        borderRadius: 'var(--radius-sm)',
                        background: filterMode === m ? 'var(--gold-primary)' : 'rgba(255,255,255,0.05)',
                        color: filterMode === m ? '#08080C' : '#FFF',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Save Snapshot CTA */}
            <button className="btn-gold" onClick={handleCapture} style={{ width: '100%', justifyContent: 'center', marginTop: '16px', fontSize: '0.85rem' }}>
              <Camera size={16} /> Save Fitting Photo
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
