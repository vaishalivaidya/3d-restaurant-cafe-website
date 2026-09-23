import React, { useState, useEffect } from 'react';
import { ArrowDown, Flame, Utensils, Sparkles } from 'lucide-react';
import { Burger3D } from './3d/Burger3D';
import { RESTAURANT_DATA } from '../lib/restaurant';
import { useCart } from '../lib/cartContext';

export const Hero: React.FC = () => {
  const { setIsCartOpen } = useCart();
  const [scrollExplode, setScrollExplode] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      // As user scrolls through the hero (0 to 600px), calculate 0 -> 0.75 exploded separation
      const progress = Math.min(1, Math.max(0, scrollY / (heroHeight * 0.75)));
      setScrollExplode(progress * 0.75);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '40px',
        paddingBottom: '60px',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '40px',
          }}
        >
          {/* Left Column: Hero Editorial Copy */}
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

            {/* Quantitative Trust Markers (Skill Guideline: Tabular & Attributable) */}
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
                      fontSize: '22px',
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

          {/* Right Column: 3D Interactive Burger Showcase */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(420px, 55vh, 620px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Ambient Ember Backlight Glow */}
            <div
              style={{
                position: 'absolute',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(230, 126, 34, 0.22) 0%, transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
              }}
            />

            {/* 3D Burger Canvas */}
            <Burger3D
              mode="hero"
              explodedOffset={scrollExplode}
              interactive={true}
              className="hero-burger-canvas"
            />

            {/* Interactive Hint Indicator */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                background: 'rgba(20, 16, 13, 0.75)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--border-subtle)',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                color: 'var(--text-muted)',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>Move mouse to inspect · Scroll to explode</span>
            </div>
          </div>
        </div>

        {/* Scroll Down Cue */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
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
              fontSize: '12px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'color var(--transition-fast)',
            }}
          >
            <span>The Craft Story</span>
            <ArrowDown size={14} color="var(--accent-gold)" />
          </a>
        </div>
      </div>
    </section>
  );
};
