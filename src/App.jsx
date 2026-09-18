import React, { useState, useRef } from 'react';
import CanvasParticleBg from './components/CanvasParticleBg';
import AudioController from './components/AudioController';

import Scene1HeartReveal from './scenes/Scene1HeartReveal';
import Scene2Intro from './scenes/Scene2Intro';
import Scene3Cake from './scenes/Scene3Cake';
import Scene4Balloons from './scenes/Scene4Balloons';
import Scene5Scratch from './scenes/Scene5Scratch';
import Scene6EnvelopeLetter from './scenes/Scene6EnvelopeLetter';
import Scene7Celebration from './scenes/Scene7Celebration';

import './styles/main.css';
import './styles/animations.css';

export default function App() {
  const [currentScene, setCurrentScene] = useState(1);
  const audioControllerRef = useRef(null);

  const nextScene = () => {
    setCurrentScene((prev) => Math.min(prev + 1, 7));
  };

  const handleStartMusic = () => {
    if (audioControllerRef.current) {
      audioControllerRef.current.startMusic();
    }
  };

  const restartExperience = () => {
    setCurrentScene(1);
  };

  return (
    <div className="app-container">
      {/* 60fps Starfield & Glowing Heart Particles */}
      <CanvasParticleBg />

      {/* Floating Audio Controller */}
      <AudioController ref={audioControllerRef} />

      {/* Active Scene Rendering */}
      {currentScene === 1 && (
        <Scene1HeartReveal onNext={nextScene} onStartMusic={handleStartMusic} />
      )}
      {currentScene === 2 && <Scene2Intro onNext={nextScene} />}
      {currentScene === 3 && <Scene3Cake onNext={nextScene} />}
      {currentScene === 4 && <Scene4Balloons onNext={nextScene} />}
      {currentScene === 5 && <Scene5Scratch onNext={nextScene} />}
      {currentScene === 6 && <Scene6EnvelopeLetter onNext={nextScene} />}
      {currentScene === 7 && <Scene7Celebration onRestart={restartExperience} />}

      {/* Scene Navigation Dots Indicator */}
      <div className="scene-progress">
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <div
            key={num}
            className={`dot ${currentScene === num ? 'active' : ''}`}
            onClick={() => setCurrentScene(num)}
            title={`Jump to Scene ${num}`}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
    </div>
  );
}
