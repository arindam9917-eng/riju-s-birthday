import React, { useState } from 'react';
import { birthdayData } from '../data/birthdayData';
import { X, Sparkles, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Scene4Balloons({ onNext }) {
  const [poppedIds, setPoppedIds] = useState([]);
  const [activeReason, setActiveReason] = useState(null);

  // Synthesize soft pop sound with Web Audio API
  const playPopSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.6, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      // Fallback
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

    // Mini confetti burst on pop
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.5 }
    });
  };

  const allPopped = poppedIds.length === birthdayData.reasons.length;
  const poppedReasons = birthdayData.reasons.filter((r) => poppedIds.includes(r.id));
  const unpoppedReasons = birthdayData.reasons.filter((r) => !poppedIds.includes(r.id));

  return (
    <div className="scene-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto', width: '100%' }}>
      <h2 className="scene-title" style={{ textAlign: 'center' }}>Pop The Balloons! 🎈</h2>
      <p className="scene-subtitle" style={{ textAlign: 'center', margin: '0 auto 20px auto' }}>
        Tap each floating balloon to reveal a secret wish & reason why {birthdayData.recipientName} is so special!
      </p>

      {/* Unpopped Floating Balloons Container (Centered) */}
      {unpoppedReasons.length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            width: '100%',
            maxWidth: '560px',
            margin: '10px auto 25px auto',
            minHeight: '140px'
          }}
        >
          {unpoppedReasons.map((reason, index) => (
            <div
              key={reason.id}
              className="balloon-item"
              style={{
                background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${reason.color} 70%)`,
                animationDelay: `${index * 0.3}s`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => handlePopBalloon(reason)}
              title="Tap to pop!"
            >
              <span style={{ fontSize: '1.4rem' }}>{reason.icon}</span>
            </div>
          ))}
        </div>
      )}

      {/* Progress Badge (Centered) */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          background: 'rgba(255, 77, 141, 0.15)',
          border: '1px solid var(--border-glass)',
          padding: '6px 18px',
          borderRadius: '30px',
          color: 'var(--text-gold)',
          fontSize: '0.9rem',
          fontWeight: 600,
          margin: '0 auto 20px auto'
        }}
      >
        <Sparkles size={16} color="var(--rose-primary)" />
        <span>
          {allPopped ? '🎉 All 6 Wishes Revealed!' : `Popped ${poppedIds.length} of ${birthdayData.reasons.length} Balloons`}
        </span>
      </div>

      {/* Revealed Wish Cards in Middle Portion (Centered) */}
      {poppedReasons.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            width: '100%',
            maxWidth: '560px',
            margin: '10px auto 25px auto'
          }}
        >
          {poppedReasons.map((reason) => (
            <div
              key={reason.id}
              className="glass-card"
              style={{
                width: '100%',
                padding: '20px 24px',
                textAlign: 'center',
                borderLeft: `4px solid ${reason.color}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                animation: 'sceneFadeIn 0.5s ease-out forwards',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onClick={() => setActiveReason(reason)}
            >
              <div style={{ fontSize: '2.2rem', marginBottom: '8px' }}>{reason.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-gold)', fontSize: '1.2rem', marginBottom: '6px' }}>
                {reason.title}
              </h3>
              <p style={{ color: 'var(--text-cream)', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
                {reason.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Action Button (Centered) */}
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '10px' }}>
        <button className="btn-primary" onClick={onNext}>
          <span>{allPopped ? 'Unlock Scratch Surprises 🎁' : 'Continue to Surprises →'}</span>
        </button>
      </div>

      {/* Active Modal Popup (Centered) */}
      {activeReason && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(11, 7, 20, 0.88)',
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
            style={{
              maxWidth: '440px',
              width: '100%',
              textAlign: 'center',
              position: 'relative',
              padding: '32px 24px',
              margin: '0 auto',
              border: `1px solid ${activeReason.color}`
            }}
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

            <div style={{ fontSize: '3.2rem', marginBottom: '12px' }}>{activeReason.icon}</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-gold)', fontSize: '1.4rem', marginBottom: '12px' }}>
              {activeReason.title}
            </h3>
            <p style={{ color: 'var(--text-cream)', lineHeight: '1.7', fontSize: '1.05rem', margin: '0 0 20px 0' }}>
              {activeReason.text}
            </p>

            <button
              className="btn-primary"
              style={{ padding: '10px 28px', fontSize: '0.9rem', margin: '0 auto' }}
              onClick={() => setActiveReason(null)}
            >
              {allPopped ? 'Awesome! ✨' : 'Pop More Balloons 🎈'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
