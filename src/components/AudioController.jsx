import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

const AudioController = forwardRef((props, ref) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const startMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log('Audio play gesture required:', err);
        });
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      startMusic();
    }
  };

  useImperativeHandle(ref, () => ({
    startMusic
  }));

  useEffect(() => {
    // Attempt background music trigger on first user click anywhere
    const handleFirstInteraction = () => {
      startMusic();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src={birthdayData.audioSrc} loop preload="auto" />
      <button
        className="audio-controller-btn"
        onClick={toggleMusic}
        aria-label="Toggle Background Music"
        title={isPlaying ? "Mute Music" : "Play Music"}
      >
        {isPlaying ? <Volume2 size={16} color="#ff4d8d" /> : <VolumeX size={16} color="#b8b2cb" />}
        <span>{isPlaying ? 'Music On' : 'Music Off'}</span>
        <div className={`equalizer ${isPlaying ? 'playing' : ''}`}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </button>
    </>
  );
});

export default AudioController;
