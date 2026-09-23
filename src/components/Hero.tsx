import React, { useState, useRef } from 'react';
import { ArrowDown, Flame, Utensils, Sparkles } from 'lucide-react';
import { RESTAURANT_DATA } from '../lib/restaurant';
import { useCart } from '../lib/cartContext';

export const Hero: React.FC = () => {
  const { setIsCartOpen } = useCart();
  const [mouseTilt, setMouseTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const burgerStageRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!burgerStageRef.current) return;
    const rect = burgerStageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D floating tilt (-4deg to +4deg)
    const rotateY = ((x - centerX) / centerX) * 4;
    const rotateX = -((y - centerY) / centerY) * 4;
    setMouseTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px',
        paddingBottom: '60px',
        overflow: 'hidden',
        backgroundColor: '#0a0807',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '8%',
          width: '750px',
          height: '750px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230, 126, 34, 0.16) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(243, 156, 18, 0.08) 0%, transparent 70%)',
          filter: 'blur(110px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ width: '100%', maxWidth: '1280px', position: 'relative', zIndex: 1 }}>
        {/* ======================================================== */}
        {/* TWO-COLUMN LAYOUT: TEXT ON LEFT, BURGER VISUAL ON RIGHT  */}
        {/* ======================================================== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            alignItems: 'center',
            gap: '30px',
          }}
        >
          {/* ======================================================== */}
          {/* LEFT COLUMN: HERO EDITORIAL COPY & STATS                 */}
          {/* ======================================================== */}
          <div style={{ zIndex: 2, maxWidth: '580px' }}>
            {/* Quiet Kicker */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                fontFamily: 'var(--font-accent)',
                color: 'var(--accent-gold)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              <Flame size={15} color="var(--accent-ember)" />
              <span>Artisanal Hearth & Smokehouse</span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(38px, 5.2vw, 64px)',
                lineHeight: 1.08,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                marginBottom: '20px',
                textWrap: 'balance',
              }}
            >
              {RESTAURANT_DATA.tagline}
            </h1>

            {/* Subheading */}
            <p
              style={{
                fontSize: 'clamp(16px, 1.8vw, 19px)',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                marginBottom: '32px',
                maxWidth: '480px',
                textWrap: 'balance',
              }}
            >
              {RESTAURANT_DATA.subheading}
            </p>

            {/* CTA Buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
                marginBottom: '48px',
              }}
            >
              <a href="#menu" className="btn-primary" aria-label="Explore restaurant menu">
                <Utensils size={17} />
                <span>Explore Menu</span>
              </a>

              <button
                onClick={() => setIsCartOpen(true)}
                className="btn-secondary"
                aria-label="Order food online"
              >
                <Sparkles size={17} color="var(--accent-gold)" />
                <span>Order Now</span>
              </button>
            </div>

            {/* Quantitative Trust Markers */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                paddingTop: '24px',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              {RESTAURANT_DATA.stats.slice(0, 3).map((stat, idx) => (
                <div key={idx}>
                  <div
                    className="tabular-nums"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '24px',
                      fontWeight: 700,
                      color: 'var(--accent-gold-light)',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                      marginTop: '4px',
                      lineHeight: 1.3,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: 100% SEAMLESS FLOATING BURGER              */}
          {/* ======================================================== */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              perspective: '1200px',
            }}
          >
            {/* Hearth Ember Radial Glow Directly Behind the Burger */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '680px',
                height: '680px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(230, 126, 34, 0.30) 0%, rgba(243, 156, 18, 0.10) 40%, rgba(10, 8, 7, 0) 70%)',
                filter: 'blur(70px)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {/* Rising Delicate Steam Shimmer Accent */}
            <div
              style={{
                position: 'absolute',
                top: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 240, 220, 0.15) 0%, transparent 65%)',
                filter: 'blur(45px)',
                animation: 'steamFloat 4.5s infinite ease-in-out',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            />

            {/* Borderless, Cardless Floating Burger Stage */}
            <div
              ref={burgerStageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                maxWidth: '680px',
                height: 'clamp(540px, 72vh, 720px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                transform: `rotateX(${mouseTilt.x}deg) rotateY(${mouseTilt.y}deg)`,
                transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Seamless Video: Zero Box / Border. True black crushed to 0,0,0 + screen blend + feathered ellipse */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  boxShadow: 'none',
                  WebkitMaskImage: 'radial-gradient(ellipse 65% 75% at 50% 50%, black 25%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.2) 68%, transparent 80%)',
                  maskImage: 'radial-gradient(ellipse 65% 75% at 50% 50%, black 25%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.2) 68%, transparent 80%)',
                }}
              >
                <video
                  ref={heroVideoRef}
                  src="/assets/burger_pin/burger_seamless.mp4"
                  poster="/assets/burger_pin/burger_seamless_poster.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    mixBlendMode: 'screen',
                    filter: 'brightness(1.18) contrast(1.12) saturate(1.22)',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Cue */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '36px',
          }}
        >
          <a
            href="#story"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-muted)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color var(--transition-fast)',
            }}
            aria-label="Scroll to Craft Story"
          >
            <span>The Craft Story</span>
            <ArrowDown size={14} color="var(--accent-gold)" />
          </a>
        </div>
      </div>
    </section>
  );
};
