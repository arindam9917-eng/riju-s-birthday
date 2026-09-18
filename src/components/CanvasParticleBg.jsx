import React, { useEffect, useRef } from 'react';

export default function CanvasParticleBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle class: Stars and Floating Hearts
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedY = Math.random() * 0.4 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.fadeSpeed = Math.random() * 0.01 + 0.003;
        this.fadeDirection = Math.random() > 0.5 ? 1 : -1;
        this.isHeart = Math.random() < 0.2; // 20% of particles are mini glowing hearts
        this.color = this.isHeart
          ? `hsla(${Math.random() * 40 + 330}, 100%, 75%, `
          : `hsla(${Math.random() * 50 + 40}, 90%, 80%, `;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;

        this.opacity += this.fadeSpeed * this.fadeDirection;
        if (this.opacity >= 0.95) this.fadeDirection = -1;
        if (this.opacity <= 0.1) this.fadeDirection = 1;

        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset();
          this.y = height + 10;
        }
      }

      draw() {
        ctx.save();
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.shadowBlur = this.size * 3;
        ctx.shadowColor = this.isHeart ? '#ff4d8d' : '#f5cb5c';

        if (this.isHeart) {
          ctx.font = `${this.size * 5 + 6}px sans-serif`;
          ctx.fillText('♥', this.x, this.y);
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    const particlesCount = Math.min(Math.floor((width * height) / 10000), 80);
    const particles = Array.from({ length: particlesCount }, () => new Particle());

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}
