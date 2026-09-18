import React, { useState } from 'react';
import ScratchCanvas from '../components/ScratchCanvas';
import { birthdayData } from '../data/birthdayData';
import { CheckCircle2 } from 'lucide-react';

export default function Scene5Scratch({ onNext }) {
  const [unlockedCards, setUnlockedCards] = useState({});

  const handleScratchComplete = (id) => {
    setUnlockedCards((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="scene-wrapper">
      <h2 className="scene-title">Scratch & Win Vouchers 🎁</h2>
      <p className="scene-subtitle">
        Use your finger or mouse to scratch off the silver foil and reveal your luxury birthday treat vouchers!
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          width: '100%',
          maxWidth: '750px',
          marginBottom: '30px'
        }}
      >
        {birthdayData.scratchVouchers.map((voucher) => (
          <div
            key={voucher.id}
            className="glass-card"
            style={{
              position: 'relative',
              padding: '24px',
              minHeight: '180px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden'
            }}
          >
            {/* Prize Behind Foil */}
            <div style={{ zIndex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{voucher.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-gold)', fontSize: '1.15rem', marginBottom: '6px' }}>
                {voucher.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.4', marginBottom: '10px' }}>
                {voucher.desc}
              </p>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(6, 214, 160, 0.2)',
                  color: '#06D6A0',
                  border: '1px solid #06D6A0',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}
              >
                <CheckCircle2 size={12} />
                {voucher.badge}
              </div>
            </div>

            {/* Scratch Foil Cover */}
            <ScratchCanvas onScratchComplete={() => handleScratchComplete(voucher.id)} />
          </div>
        ))}
      </div>

      <button className="btn-primary btn-gold" onClick={onNext}>
        <span>Open Sealed Letter 💌</span>
      </button>
    </div>
  );
}
