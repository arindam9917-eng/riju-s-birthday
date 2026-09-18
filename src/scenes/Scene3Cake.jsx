import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../data/birthdayData';

export default function Scene3Cake({ onNext }) {
  const [candlesBlown, setCandlesBlown] = useState(false);

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);

    // Trigger celebratory confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      onNext();
    }, 2200);
  };

  return (
    <div className="scene-wrapper">
      <h2 className="scene-title">Make A Wish, {birthdayData.recipientName}! 🎂✨</h2>
      <p className="scene-subtitle">
        {candlesBlown
          ? '🎉 Wish sent to the stars! Unlocking floating balloons...'
          : 'Tap the button below or tap the candles to blow them out!'}
      </p>

      <div className="cake-3d-wrapper" onClick={handleBlowCandles}>
        {/* Candles */}
        <div className="candles-row">
          <div className="candle-stick">
            <div className={`flame ${candlesBlown ? 'blown-out' : ''}`}></div>
          </div>
          <div className="candle-stick">
            <div className={`flame ${candlesBlown ? 'blown-out' : ''}`}></div>
          </div>
          <div className="candle-stick">
            <div className={`flame ${candlesBlown ? 'blown-out' : ''}`}></div>
          </div>
        </div>

        {/* Cake Tiers */}
        <div className="cake-tier tier-top"></div>
        <div className="cake-tier tier-middle"></div>
        <div className="cake-tier tier-base"></div>
        <div className="cake-plate"></div>
      </div>

      <button
        className={`btn-primary ${candlesBlown ? 'btn-gold' : ''}`}
        onClick={handleBlowCandles}
      >
        <span>{candlesBlown ? '✨ Wish Granted! Proceeding...' : '💨 Blow Out Candles'}</span>
      </button>
    </div>
  );
}
