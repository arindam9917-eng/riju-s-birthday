import React, { useEffect, useState } from 'react';
import { birthdayData } from '../data/birthdayData';
import { Sparkles, Heart } from 'lucide-react';

export default function Scene2Intro({ onNext }) {
  const [typedText, setTypedText] = useState('');
  const fullText = birthdayData.introText;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 60);

    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <div className="scene-wrapper">
      <div className="glass-card" style={{ maxWidth: '580px', width: '100%', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            background: 'var(--rose-primary)',
            padding: '10px',
            borderRadius: '50%',
            boxShadow: 'var(--shadow-rose)'
          }}
        >
          <Sparkles size={24} color="#fff" />
        </div>

        <p style={{ color: 'var(--text-gold)', letterSpacing: '3px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px' }}>
          CELEBRATING A VERY SPECIAL PERSON
        </p>

        <h1 className="scene-title">
          Happy Birthday <br />
          <span style={{ color: 'var(--rose-primary)' }}>{birthdayData.recipientName}</span> 🎉
        </h1>

        <p className="scene-subtitle" style={{ minHeight: '50px', fontSize: '1.1rem', margin: '20px auto' }}>
          {typedText}
          <span style={{ animation: 'blink 1s infinite' }}>|</span>
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
          <Heart color="#ff4d8d" fill="#ff4d8d" size={24} />
          <Heart color="#f7d070" fill="#f7d070" size={24} />
          <Heart color="#ff4d8d" fill="#ff4d8d" size={24} />
        </div>

        <button className="btn-primary btn-gold" onClick={onNext}>
          <span>Unwrap Cake & Wishes 🎂</span>
        </button>
      </div>
    </div>
  );
}
