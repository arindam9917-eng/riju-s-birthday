import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../data/birthdayData';
import { Sparkles, Heart, RotateCcw } from 'lucide-react';

export default function Scene7Celebration({ onRestart }) {
  useEffect(() => {
    // Multi-stage Explosive Confetti Cannon
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Confetti from two sides
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const triggerExtraConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="scene-wrapper">
      <div className="glass-card" style={{ maxWidth: '640px', width: '100%', padding: '40px 24px' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '10px' }}>👑 🎉 ✨</div>

        <h1
          className="scene-title"
          style={{
            fontSize: 'clamp(2.4rem, 7vw, 4rem)',
            background: 'linear-gradient(135deg, #fff 0%, #ff4d8d 40%, #f7d070 80%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px'
          }}
        >
          HAPPY BIRTHDAY <br />
          {birthdayData.recipientName}!
        </h1>

        <p className="scene-subtitle" style={{ fontSize: '1.2rem', color: 'var(--text-cream)', margin: '20px auto' }}>
          {birthdayData.finalMessage}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', margin: '24px 0' }}>
          <Heart color="#ff4d8d" fill="#ff4d8d" size={28} />
          <Sparkles color="#f7d070" size={28} />
          <Heart color="#ff4d8d" fill="#ff4d8d" size={28} />
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={triggerExtraConfetti}>
            <span>🎉 Pop More Confetti!</span>
          </button>
          <button className="btn-primary btn-gold" onClick={onRestart}>
            <RotateCcw size={18} />
            <span>Replay Experience</span>
          </button>
        </div>
      </div>
    </div>
  );
}
