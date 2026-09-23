import React, { useState, useRef, useEffect } from 'react';

export interface PinterestBurgerExperienceProps {
  step: number; // 1 to 5
  interactive?: boolean;
  className?: string;
}

export const PinterestBurgerExperience: React.FC<PinterestBurgerExperienceProps> = ({
  step = 1,
  interactive = true,
  className = '',
}) => {
  const [mouseTilt, setMouseTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = -((y - centerY) / centerY) * 5;
    setMouseTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  // Ensure video plays continuously for Step 5
  useEffect(() => {
    if (step === 5 && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [step]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(500px, 64vh, 660px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
        background: 'transparent',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
      }}
    >
      {/* ======================================================== */}
      {/* DYNAMIC AMBIENT BACKLIGHT GLOW (Blends into #0a0807)     */}
      {/* ======================================================== */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '580px',
          height: '580px',
          borderRadius: '50%',
          background:
            step === 2
              ? 'radial-gradient(circle, rgba(255, 87, 34, 0.35) 0%, rgba(243, 156, 18, 0.14) 42%, transparent 70%)'
              : 'radial-gradient(circle, rgba(230, 126, 34, 0.28) 0%, rgba(243, 156, 18, 0.10) 45%, transparent 70%)',
          filter: 'blur(75px)',
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'background 0.6s ease',
        }}
      />

      {/* Floating Convection Steam Accent */}
      <div
        style={{
          position: 'absolute',
          top: step === 4 ? '18%' : '14%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '340px',
          height: '340px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 240, 220, 0.16) 0%, transparent 65%)',
          filter: 'blur(45px)',
          animation: 'steamFloat 4.2s infinite ease-in-out',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* 3D Tilt Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `rotateX(${mouseTilt.x}deg) rotateY(${mouseTilt.y}deg)`,
          transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 2,
        }}
      >
        {/* ======================================================== */}
        {/* STEP 01: FRESH INGREDIENTS SEPARATED (Zero-G Float)     */}
        {/* ======================================================== */}
        {step === 1 && (
          <div
            style={{
              position: 'relative',
              width: '440px',
              height: '540px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* 1. Toasted Brioche Crown */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                width: '320px',
                animation: 'steamFloat 3.8s infinite ease-in-out',
                transition: 'all 0.5s ease',
                filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.7))',
              }}
            >
              <img
                src="/assets/burger_pin/stages/top_bun.png"
                alt="Golden Sesame Brioche Crown"
                referrerPolicy="no-referrer"
                style={{ width: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>

            {/* 2. Red Onion & Heirloom Tomatoes */}
            <div
              style={{
                position: 'absolute',
                top: '135px',
                width: '310px',
                animation: 'steamFloat 4.2s infinite ease-in-out 0.4s',
                transition: 'all 0.5s ease',
                filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.6))',
              }}
            >
              <img
                src="/assets/burger_pin/stages/tomato_onion.png"
                alt="Ripe Tomatoes & Sweet Red Onions"
                referrerPolicy="no-referrer"
                style={{ width: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>

            {/* 3. Molten Cheddar & Seared Wagyu Beef Patty */}
            <div
              style={{
                position: 'absolute',
                top: '240px',
                width: '335px',
                animation: 'steamFloat 3.5s infinite ease-in-out 0.8s',
                transition: 'all 0.5s ease',
                filter: 'drop-shadow(0 18px 25px rgba(0,0,0,0.8))',
              }}
            >
              <img
                src="/assets/burger_pin/stages/patty_cheese.png"
                alt="Aged Cheddar & Charred Beef Patty"
                referrerPolicy="no-referrer"
                style={{ width: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>

            {/* 4. Crisp Ruffled Butter Lettuce */}
            <div
              style={{
                position: 'absolute',
                top: '345px',
                width: '330px',
                animation: 'steamFloat 4.0s infinite ease-in-out 1.2s',
                transition: 'all 0.5s ease',
                filter: 'drop-shadow(0 12px 18px rgba(0,0,0,0.6))',
              }}
            >
              <img
                src="/assets/burger_pin/stages/lettuce.png"
                alt="Crisp Farm Butter Lettuce"
                referrerPolicy="no-referrer"
                style={{ width: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>

            {/* 5. Toasted Brioche Bottom Bun */}
            <div
              style={{
                position: 'absolute',
                top: '430px',
                width: '315px',
                animation: 'steamFloat 3.7s infinite ease-in-out 1.5s',
                transition: 'all 0.5s ease',
                filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.7))',
              }}
            >
              <img
                src="/assets/burger_pin/stages/bottom_bun.png"
                alt="Toasted Base Bun"
                referrerPolicy="no-referrer"
                style={{ width: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 02: SEARING OVER FIRE & CAST IRON                   */}
        {/* ======================================================== */}
        {step === 2 && (
          <div
            style={{
              position: 'relative',
              width: '460px',
              height: '460px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Roaring Cast Iron Searing Plate */}
            <div
              style={{
                position: 'absolute',
                width: '380px',
                height: '380px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #251810 0%, #17110e 55%, #0f0c0a 80%)',
                border: '4px solid #3d2a1d',
                boxShadow: '0 0 60px rgba(255, 87, 34, 0.4), inset 0 0 45px rgba(255, 110, 0, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Hot grill lines */}
              <div
                style={{
                  position: 'absolute',
                  inset: '20px',
                  borderRadius: '50%',
                  border: '2px dashed rgba(255, 87, 34, 0.4)',
                  animation: 'pulseGlow 2.5s infinite',
                }}
              />
            </div>

            {/* Rising Sizzle Smoke & Convection */}
            <div
              style={{
                position: 'absolute',
                top: '20%',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 230, 200, 0.22) 0%, transparent 70%)',
                filter: 'blur(35px)',
                animation: 'steamFloat 3s infinite ease-in-out',
                pointerEvents: 'none',
              }}
            />

            {/* Sizzling Seared Wagyu Patty from Pinterest Burger */}
            <div
              style={{
                position: 'relative',
                zIndex: 3,
                width: '360px',
                filter: 'drop-shadow(0 20px 30px rgba(255, 60, 0, 0.35))',
              }}
            >
              <img
                src="/assets/burger_pin/stages/seared_patty.png"
                alt="Searing Angus Patty on Cast Iron"
                referrerPolicy="no-referrer"
                style={{ width: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>

            {/* Floating Fire Embers */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: `${4 + (i % 3)}px`,
                  height: `${4 + (i % 3)}px`,
                  borderRadius: '50%',
                  background: '#ff7700',
                  boxShadow: '0 0 10px #ff3d00',
                  left: `${35 + i * 8}%`,
                  bottom: `${40 + (i % 4) * 10}%`,
                  animation: `steamFloat ${2.2 + i * 0.4}s infinite ease-in-out ${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 03: LAYER-BY-LAYER ASSEMBLY                         */}
        {/* ======================================================== */}
        {step === 3 && (
          <div
            style={{
              position: 'relative',
              width: '420px',
              height: '520px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Top Bun (Hovering into place) */}
            <div
              style={{
                position: 'absolute',
                top: '60px',
                width: '320px',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.65))',
              }}
            >
              <img
                src="/assets/burger_pin/stages/top_bun.png"
                alt="Top Bun Docking"
                referrerPolicy="no-referrer"
                style={{ width: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Melted Cheese & Seared Patty */}
            <div
              style={{
                position: 'absolute',
                top: '180px',
                width: '335px',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
                filter: 'drop-shadow(0 16px 22px rgba(0,0,0,0.75))',
              }}
            >
              <img
                src="/assets/burger_pin/stages/patty_cheese.png"
                alt="Patty and Cheddar"
                referrerPolicy="no-referrer"
                style={{ width: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Tomato & Onion */}
            <div
              style={{
                position: 'absolute',
                top: '260px',
                width: '315px',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
                filter: 'drop-shadow(0 12px 18px rgba(0,0,0,0.6))',
              }}
            >
              <img
                src="/assets/burger_pin/stages/tomato_onion.png"
                alt="Tomato and Onion"
                referrerPolicy="no-referrer"
                style={{ width: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Lettuce */}
            <div
              style={{
                position: 'absolute',
                top: '325px',
                width: '330px',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
                filter: 'drop-shadow(0 10px 16px rgba(0,0,0,0.55))',
              }}
            >
              <img
                src="/assets/burger_pin/stages/lettuce.png"
                alt="Crisp Lettuce"
                referrerPolicy="no-referrer"
                style={{ width: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Bottom Bun */}
            <div
              style={{
                position: 'absolute',
                top: '390px',
                width: '315px',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
                filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.7))',
              }}
            >
              <img
                src="/assets/burger_pin/stages/bottom_bun.png"
                alt="Bottom Brioche Bun"
                referrerPolicy="no-referrer"
                style={{ width: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 04: MELT & GLAZE (Macro Food Commercial Close-up)   */}
        {/* ======================================================== */}
        {step === 4 && (
          <div
            style={{
              position: 'relative',
              width: '480px',
              height: '480px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'visible',
            }}
          >
            {/* Macro Cheese Melt Layer (Scaled Up for Cinema Close-Up) */}
            <div
              style={{
                position: 'relative',
                width: '420px',
                transform: 'scale(1.22)',
                filter: 'brightness(1.15) contrast(1.12) saturate(1.25) drop-shadow(0 25px 35px rgba(0,0,0,0.85))',
                transition: 'transform 0.4s ease',
              }}
            >
              <img
                src="/assets/burger_pin/stages/cheese_melt.png"
                alt="Molten Sharp Cheddar and Glaze"
                referrerPolicy="no-referrer"
                style={{ width: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>

            {/* Aromatic Steam billows over cheese */}
            <div
              style={{
                position: 'absolute',
                top: '15%',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 235, 205, 0.22) 0%, transparent 68%)',
                filter: 'blur(35px)',
                animation: 'steamFloat 3.8s infinite ease-in-out',
                pointerEvents: 'none',
              }}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 05: COMPLETE BURGER MATCHING PINTEREST REFERENCE     */}
        {/* ======================================================== */}
        {step === 5 && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '560px',
              height: 'clamp(480px, 60vh, 600px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* The Living Cinematic Pinterest Burger Video */}
            <video
              ref={videoRef}
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
                filter: 'brightness(1.16) contrast(1.12) saturate(1.22)',
                background: 'transparent',
                WebkitMaskImage: 'radial-gradient(ellipse 70% 78% at 50% 50%, black 30%, rgba(0,0,0,0.85) 54%, rgba(0,0,0,0.2) 70%, transparent 82%)',
                maskImage: 'radial-gradient(ellipse 70% 78% at 50% 50%, black 30%, rgba(0,0,0,0.85) 54%, rgba(0,0,0,0.2) 70%, transparent 82%)',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
