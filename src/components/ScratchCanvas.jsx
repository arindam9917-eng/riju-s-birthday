import React, { useEffect, useRef, useState } from 'react';

export default function ScratchCanvas({ onScratchComplete }) {
  const canvasRef = useRef(null);
  const [isCleared, setIsCleared] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = (canvas.width = canvas.parentElement.offsetWidth || 260);
    const height = (canvas.height = canvas.parentElement.offsetHeight || 180);

    // Draw Silver Foil layer
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#d6d6d6');
    gradient.addColorStop(0.3, '#f3f3f3');
    gradient.addColorStop(0.5, '#aaaaaa');
    gradient.addColorStop(0.8, '#e0e0e0');
    gradient.addColorStop(1, '#999999');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Text on scratch foil
    ctx.fillStyle = '#444444';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch Here! ✨', width / 2, height / 2);

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const scratch = (pos) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
      ctx.fill();

      checkProgress();
    };

    const checkProgress = () => {
      if (isCleared) return;
      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      let clearCount = 0;

      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) clearCount++;
      }

      const percentage = (clearCount / (pixels.length / 16)) * 100;
      if (percentage > 40) {
        setIsCleared(true);
        if (onScratchComplete) onScratchComplete();
      }
    };

    const startDrawing = (e) => {
      isDrawing.current = true;
      scratch(getPos(e));
    };

    const draw = (e) => {
      if (!isDrawing.current) return;
      scratch(getPos(e));
    };

    const stopDrawing = () => {
      isDrawing.current = false;
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [isCleared, onScratchComplete]);

  if (isCleared) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '16px',
        zIndex: 5,
        cursor: 'pointer'
      }}
    />
  );
}
