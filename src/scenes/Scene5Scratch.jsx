import React, { useState } from 'react';
import ScratchCanvas from '../components/ScratchCanvas';
import { birthdayData } from '../data/birthdayData';
import { CheckCircle2, Lock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Scene5Scratch({ onNext }) {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleScratchStart = (id) => {
    if (selectedCardId === null) {
      setSelectedCardId(id);
    }
  };

  const handleScratchComplete = (id) => {
    setSelectedCardId(id);
    setIsRevealed(true);

    // Confetti burst on voucher win
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleReset = () => {
    setSelectedCardId(null);
    setIsRevealed(false);
    setResetKey((prev) => prev + 1);
  };

  const wonVoucher = birthdayData.scratchVouchers.find((v) => v.id === selectedCardId);

  return (
    <div className="scene-wrapper" style={{ margin: '0 auto', textAlign: 'center' }}>
      <h2 className="scene-title">Scratch & Win 🎁</h2>
      <p className="scene-subtitle">
        Pick and scratch <strong>ONE</strong> card only! Once you scratch your chosen card, the other cards will be locked!
      </p>

      {/* Selected Status Notice */}
      {selectedCardId !== null && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: 'rgba(245, 203, 92, 0.15)',
            border: '1px solid var(--gold-primary)',
            padding: '8px 22px',
            borderRadius: '30px',
            color: 'var(--text-gold)',
            fontSize: '0.95rem',
            fontWeight: 600,
            marginBottom: '20px',
            animation: 'sceneFadeIn 0.4s ease-out'
          }}
        >
          <Sparkles size={18} color="var(--gold-primary)" />
          <span>
            {isRevealed && wonVoucher
              ? `🎉 Lucky Choice! You won: ${wonVoucher.title}!`
              : '🔒 1 Card Chosen! Other cards are locked!'}
          </span>
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          width: '100%',
          maxWidth: '750px',
          margin: '0 auto 30px auto'
        }}
      >
        {birthdayData.scratchVouchers.map((voucher) => {
          const isThisCardSelected = selectedCardId === voucher.id;
          const isOtherCardLocked = selectedCardId !== null && !isThisCardSelected;

          return (
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
                overflow: 'hidden',
                border: isThisCardSelected ? '2px solid var(--gold-primary)' : undefined,
                boxShadow: isThisCardSelected ? '0 0 25px rgba(245, 203, 92, 0.4)' : undefined,
                transition: 'all 0.3s ease'
              }}
            >
              {/* Prize Behind Foil */}
              <div style={{ zIndex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '2.8rem', marginBottom: '8px' }}>{voucher.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-gold)', fontSize: '1.2rem', marginBottom: '6px' }}>
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
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: 600
                  }}
                >
                  <CheckCircle2 size={13} />
                  {voucher.badge}
                </div>
              </div>

              {/* Scratch Foil Cover */}
              <ScratchCanvas
                onScratchStart={() => handleScratchStart(voucher.id)}
                onScratchComplete={() => handleScratchComplete(voucher.id)}
                disabled={isOtherCardLocked}
              />

              {/* Locked Overlay for Other Cards */}
              {isOtherCardLocked && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(11, 7, 20, 0.82)',
                    backdropFilter: 'blur(6px)',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '16px',
                    padding: '16px',
                    animation: 'sceneFadeIn 0.3s ease-out'
                  }}
                >
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      padding: '10px',
                      borderRadius: '50%',
                      marginBottom: '8px'
                    }}
                  >
                    <Lock size={24} color="#f5cb5c" />
                  </div>
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>
                    🔒 Locked
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    1 card limit reached
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <button className="btn-primary btn-gold" onClick={onNext}>
          <span>Open Sealed Letter 💌</span>
        </button>
      </div>
    </div>
  );
}
