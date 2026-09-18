import React, { useState } from 'react';
import { birthdayData } from '../data/birthdayData';

export default function Scene6EnvelopeLetter({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
  };

  return (
    <div className="scene-wrapper">
      {!isOpen ? (
        <>
          <h2 className="scene-title">The Sealed Letter 💌</h2>
          <p className="scene-subtitle">
            Tap the golden wax seal & silk bow to untie the ribbon and open your personal birthday letter!
          </p>

          <div className="envelope-3d-container">
            <div className="envelope-body"></div>
            <div className={`envelope-flap ${isOpen ? 'open' : ''}`}></div>

            <div className={`ribbon-bow-wrap ${isOpen ? 'untied' : ''}`} onClick={handleOpenEnvelope}>
              <div className="wax-seal">
                <span>✨</span>
              </div>
            </div>
          </div>

          <button className="btn-primary btn-gold" onClick={handleOpenEnvelope}>
            <span>Untie Ribbon & Read Letter 🎀</span>
          </button>
        </>
      ) : (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Parchment Long Letter */}
          <div className="parchment-letter">
            <p className="letter-salutation">{birthdayData.letter.salutation}</p>
            <h3 className="letter-heading">{birthdayData.letter.heading}</h3>

            {birthdayData.letter.paragraphs.map((para, index) => (
              <p key={index} className="letter-paragraph">
                {para}
              </p>
            ))}

            <div style={{ margin: '24px 0 16px 0', borderTop: '1px dashed #d1b48c', paddingTop: '16px' }}>
              {birthdayData.letter.wishes.map((wish, i) => (
                <p key={i} style={{ color: '#8c1d40', fontWeight: 'bold', fontSize: '1.2rem', margin: '4px 0' }}>
                  {wish}
                </p>
              ))}
            </div>

            <div className="letter-signature">
              {birthdayData.letter.signature}
            </div>
          </div>

          <button className="btn-primary" style={{ marginTop: '30px' }} onClick={onNext}>
            <span>Grand Final Celebration 🎉 →</span>
          </button>
        </div>
      )}
    </div>
  );
}
