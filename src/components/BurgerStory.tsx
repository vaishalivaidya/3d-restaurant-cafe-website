import React, { useState } from 'react';
import { Flame, Sparkles, Check, ChevronRight, ChevronLeft, Play, Pause } from 'lucide-react';
import { Burger3D } from './3d/Burger3D';
import { useCart } from '../lib/cartContext';
import { MENU_ITEMS } from '../lib/menu';

interface StepData {
  number: number;
  title: string;
  subtitle: string;
  tempOrTime: string;
  description: string;
  details: string[];
}

const BURGER_STEPS: StepData[] = [
  {
    number: 1,
    title: 'Fresh Farm Ingredients',
    subtitle: 'Harvested daily, non-GMO & organic',
    tempOrTime: '38°F Chilled Cellar',
    description: 'Crisp heirloom butter lettuce, ripe beefsteak tomatoes, sweet red onions, artisan cheddar, and brioche baked at dawn. Every component is inspected for peak flavor.',
    details: ['Organic heirloom tomatoes', 'Hand-cut red onion rings', 'Cultured Wisconsin cheddar', 'Freshly baked brioche'],
  },
  {
    number: 2,
    title: 'Searing Over Fire & Cast Iron',
    subtitle: 'Intense Maillard caramelization',
    tempOrTime: '650°F Searing Plate',
    description: 'Our proprietary 45-day dry-aged Angus blend is smashed wafer-thin onto a roaring cast iron flat-top. The intense heat locks in savory juices and builds a signature crispy, lacy crust.',
    details: ['Signature lacy crisp crust', 'Aromatic oakwood smoke', 'Rendering natural beef tallow', 'Coarse sea salt & pepper crust'],
  },
  {
    number: 3,
    title: 'Layer-by-Layer Assembly',
    subtitle: 'Engineered structural harmony',
    tempOrTime: 'Balanced Temperature Matrix',
    description: 'Each layer is strategically positioned to maintain crunch and contrast: butter-toasted base bun, velvety house amber sauce, cold crisp lettuce, juicy tomato, and sizzling beef.',
    details: ['Barrier sauce protects bun', 'Cold greens below hot patty', 'Double patty stacking', 'Gold toasted sesame top'],
  },
  {
    number: 4,
    title: 'Final Touch: Melt & Glaze',
    subtitle: 'Steam-domed to decadent perfection',
    tempOrTime: '165°F Melting Point',
    description: 'Under a stainless steel melting cloche, a splash of bone broth generates instant aromatic steam, wrapping aged smoked cheddar in a molten veil that drips into every crack of the patty.',
    details: ['Molten cheddar cascade', 'Bourbon honey drizzle', 'Warm toasted crown placement', 'Fresh cracked pepper garnish'],
  },
  {
    number: 5,
    title: 'Served Hot to Your Table',
    subtitle: 'Peak texture within 90 seconds',
    tempOrTime: 'Immediate Table Service',
    description: 'The completed masterpiece is plated immediately. The contrast of piping hot beef, molten cheese, cool crisp greens, and warm pillowy brioche delivers the quintessential gourmet bite.',
    details: ['Unrivaled texture contrast', 'Served with sea-salted frites', 'Signature dipping sauce on side', 'Made fresh to order'],
  },
];

export const BurgerStory: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const { addItem } = useCart();

  // Step cycling timer when playing
  React.useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev % 5) + 1);
    }, 4200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeStepData = BURGER_STEPS[currentStep - 1];

  const handleOrderClassic = () => {
    const classicBurger = MENU_ITEMS.find((i) => i.id === 'b-classic-smash') || MENU_ITEMS[0];
    addItem(classicBurger, 1);
  };

  return (
    <section
      id="story"
      style={{
        paddingTop: '100px',
        paddingBottom: '110px',
        backgroundColor: 'var(--bg-canvas)',
        position: 'relative',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-kicker">3D Culinary Storytelling</span>
          <h2 className="section-title">From Fresh Ingredients to Your Table</h2>
          <p className="section-subtitle">
            Experience the culinary science and elemental craftsmanship that transforms raw, pristine provisions
            into our award-winning smash burger.
          </p>
        </div>

        {/* Step Progress Controller */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: '40px',
            overflowX: 'auto',
            paddingBottom: '8px',
          }}
        >
          {BURGER_STEPS.map((s) => {
            const isActive = s.number === currentStep;
            return (
              <button
                key={s.number}
                onClick={() => {
                  setCurrentStep(s.number);
                  setIsPlaying(false);
                }}
                style={{
                  flex: '1',
                  minWidth: '160px',
                  padding: '14px 16px',
                  background: isActive ? 'var(--bg-surface-elevated)' : 'rgba(255,255,255,0.03)',
                  border: isActive ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)',
                  boxShadow: isActive ? '0 4px 20px rgba(243, 156, 18, 0.15)' : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '6px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-accent)',
                      color: isActive ? 'var(--accent-gold)' : 'var(--text-muted)',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                    }}
                  >
                    STEP 0{s.number}
                  </span>
                  {isActive && <Check size={14} color="var(--accent-gold)" />}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {s.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Story Visualizer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '40px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: ' clamp(24px, 4vw, 48px)',
            boxShadow: 'var(--shadow-medium)',
          }}
        >
          {/* 3D Visual Stage */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(380px, 45vh, 520px)',
              background: 'radial-gradient(circle at center, #241a12 0%, #110e0c 80%)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* 3D Scene running in story mode with current step */}
            <Burger3D mode="story" step={currentStep} interactive={true} />

            {/* Stage Tag Overlay */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(15, 12, 10, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--border-subtle)',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Flame size={14} color="var(--accent-ember)" />
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                {activeStepData.tempOrTime}
              </span>
            </div>

            {/* Play/Pause Sequence Bar */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(15, 12, 10, 0.82)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--border-subtle)',
                padding: '8px 16px',
                borderRadius: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--accent-gold)',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                  aria-label={isPlaying ? 'Pause animation sequence' : 'Play animation sequence'}
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  <span>{isPlaying ? 'Pause' : 'Auto Play Story'}</span>
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => {
                    setCurrentStep((prev) => (prev > 1 ? prev - 1 : 5));
                    setIsPlaying(false);
                  }}
                  className="btn-ghost"
                  style={{ padding: '4px 8px' }}
                  aria-label="Previous step"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="tabular-nums" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {currentStep} / 5
                </span>
                <button
                  onClick={() => {
                    setCurrentStep((prev) => (prev < 5 ? prev + 1 : 1));
                    setIsPlaying(false);
                  }}
                  className="btn-ghost"
                  style={{ padding: '4px 8px' }}
                  aria-label="Next step"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Step Narrative & Culinary Science */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                fontSize: '12px',
                fontFamily: 'var(--font-accent)',
                color: 'var(--accent-gold)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Step 0{activeStepData.number} · {activeStepData.subtitle}
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(26px, 3vw, 36px)',
                lineHeight: 1.2,
                color: 'var(--text-primary)',
              }}
            >
              {activeStepData.title}
            </h3>

            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
              }}
            >
              {activeStepData.description}
            </p>

            {/* Ingredient & Technique Highlights */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                margin: '8px 0',
              }}
            >
              {activeStepData.details.map((detail, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <div
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-gold)',
                    }}
                  />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button onClick={handleOrderClassic} className="btn-primary">
                <Sparkles size={16} />
                <span>Taste the Classic Smash ($15.50)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
