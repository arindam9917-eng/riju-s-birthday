import React, { useState } from 'react';
import { birthdayData } from '../data/birthdayData';

export default function Scene1HeartReveal({ onNext, onStartMusic }) {
  const [ripples, setRipples] = useState([]);

  const handleHeartClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX ? e.clientX - rect.left : rect.width / 2;
    const y = e.clientY ? e.clientY - rect.top : rect.height / 2;

    setRipples((prev) => [...prev, { id: Date.now(), x, y }]);

    if (onStartMusic) onStartMusic();

    setTimeout(() => {
      onNext();
    }, 600);
  };

  return (
    <div className="scene-wrapper">
      <div style={{ marginTop: '20px' }}>
        <p className="scene-subtitle" style={{ letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
          {birthdayData.birthdayDate} • SPECIAL EXPERIENCE
        </p>
        <h1 className="scene-title">Touch The Heart ❤️</h1>
        <p className="scene-subtitle">
          An interactive birthday surprise created with love for {birthdayData.recipientName}.
        </p>
      </div>

      <div className="heart-container" onClick={handleHeartClick}>
        <div className="heart-glow-ring"></div>
        <svg className="pulsing-heart" viewBox="0 0 32 32">
          <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,16,21.6,16,21.6s16-12.2,16-21.6C32,3.8,28.2,0,23.6,0z" />
        </svg>
        {ripples.map((r) => (
          <span
            key={r.id}
            className="tap-ripple"
            style={{ top: `${r.y}px`, left: `${r.x}px` }}
          />
        ))}
      </div>

      <button className="btn-primary" onClick={handleHeartClick}>
        <span>Open Birthday Gift ✨</span>
      </button>
    </div>
  );
}
