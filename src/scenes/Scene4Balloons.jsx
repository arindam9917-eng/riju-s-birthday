import React, { useState } from 'react';
import { birthdayData } from '../data/birthdayData';
import { X } from 'lucide-react';

export default function Scene4Balloons({ onNext }) {
  const [poppedIds, setPoppedIds] = useState([]);
  const [activeReason, setActiveReason] = useState(null);

  // Simple Web Audio API pop sound synthesized live
  const playPopSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      // Audio fallback
    }
  };

  const handlePopBalloon = (reason) => {
    if (poppedIds.includes(reason.id)) {
      setActiveReason(reason);
      return;
    }

    playPopSound();
    setPoppedIds((prev) => [...prev, reason.id]);
    setActiveReason(reason);
  };

  const allPopped = poppedIds.length === birthdayData.reasons.length;

  return (
    <div className="scene-wrapper">
      <h2 className="scene-title">Pop The Balloons! 🎈</h2>
      <p className="scene-subtitle">
        Tap each floating balloon to reveal a secret reason why {birthdayData.recipientName} is so special!
      </p>

      <div className="balloons-area">
        {birthdayData.reasons.map((reason, index) => {
          const isPopped = poppedIds.includes(reason.id);
          return (
            <div
              key={reason.id}
              className={`balloon-item ${isPopped ? 'balloon-popped' : ''}`}
              style={{
                background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${reason.color} 70%)`,
                animationDelay: `${index * 0.4}s`
              }}
              onClick={() => handlePopBalloon(reason)}
              title="Tap to pop!"
            >
              <span
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '1.4rem'
                }}
              >
                {reason.icon}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '10px' }}>
        <p style={{ color: 'var(--text-gold)', fontSize: '0.9rem', marginBottom: '12px' }}>
          Popped {poppedIds.length} of {birthdayData.reasons.length} Balloons
        </p>
        <button className="btn-primary" onClick={onNext}>
          <span>{allPopped ? 'Unlock Scratch Surprises 🎁' : 'Continue to Surprises →'}</span>
        </button>
      </div>

      {/* Reason Modal Card */}
      {activeReason && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(11, 7, 20, 0.85)',
            backdropFilter: 'blur(12px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setActiveReason(null)}
        >
          <div
            className="glass-card"
            style={{ maxWidth: '420px', width: '100%', position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
              onClick={() => setActiveReason(null)}
            >
              <X size={20} />
            </button>

            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{activeReason.icon}</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-gold)', fontSize: '1.4rem', marginBottom: '12px' }}>
              {activeReason.title}
            </h3>
            <p style={{ color: 'var(--text-cream)', lineHeight: '1.6', fontSize: '1.05rem' }}>
              {activeReason.text}
            </p>

            <button className="btn-primary" style={{ marginTop: '20px', padding: '10px 24px', fontSize: '0.9rem' }} onClick={() => setActiveReason(null)}>
              Close & Pop More 🎈
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
