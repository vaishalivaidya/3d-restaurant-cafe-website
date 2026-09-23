import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Utensils, Check, ArrowRight } from 'lucide-react';
import { PinterestBurgerExperience } from './3d/PinterestBurgerExperience';
import { useCart } from '../lib/cartContext';
import { MENU_ITEMS } from '../lib/menu';

interface StepContent {
  stepNum: number;
  kicker: string;
  title: string;
  quote: string;
  highlights: string[];
}

const STEPS_CONTENT: StepContent[] = [
  {
    stepNum: 1,
    kicker: 'STEP 01 · FRESH DAILY',
    title: 'Fresh Farm Ingredients',
    quote: 'Every ingredient is selected for freshness, texture and flavor.',
    highlights: [
      'Organic heirloom beefsteak tomatoes',
      'Crisp hand-cut sweet red onions',
      'Cultured Wisconsin smoked cheddar',
      'Farmhouse brioche baked fresh at dawn',
    ],
  },
  {
    stepNum: 2,
    kicker: 'STEP 02 · SEARED TO PERFECTION',
    title: 'Searing Over Fire & Cast Iron',
    quote: 'High heat creates the caramelized crust and smoky flavor.',
    highlights: [
      '650°F seasoned cast-iron flat-top',
      'Signature lacy Maillard crust',
      '45-day dry-aged Angus proprietary blend',
      'Coarse sea salt & cracked black peppercorn',
    ],
  },
  {
    stepNum: 3,
    kicker: 'STEP 03 · STRUCTURAL HARMONY',
    title: 'Layer-by-Layer Assembly',
    quote: 'Every component is balanced to maintain crunch, heat, and contrast.',
    highlights: [
      'Barrier sauce protects toasted bottom bun',
      'Cold crisp butter greens insulated from heat',
      'Stacked double wagyu smash patties',
      'Golden toasted sesame brioche crown',
    ],
  },
  {
    stepNum: 4,
    kicker: 'STEP 04 · MOLTEN PERFECTION',
    title: 'Final Touch: Melt & Glaze',
    quote: 'Under the cloche, steam melts aged cheddar into every craggy sear mark.',
    highlights: [
      '165°F bone broth dome steam cloche',
      'Aged smoked cheddar molten cascade',
      'Velvety house-churned amber glaze',
      'Infused with aromatic oakwood essence',
    ],
  },
  {
    stepNum: 5,
    kicker: 'STEP 05 · READY FOR SERVICE',
    title: 'Served Hot to Your Table',
    quote: 'Ready for the first bite.',
    highlights: [
      'Delivered within 90 seconds of plating',
      'Harmonious contrast of hot, crisp & pillowy',
      'Paired with rosemary sea-salted frites',
      'Handcrafted to order with obsessive care',
    ],
  },
];

const STEP_TABS = [
  { id: 1, label: '01 Fresh Ingredients' },
  { id: 2, label: '02 Searing' },
  { id: 3, label: '03 Assembly' },
  { id: 4, label: '04 Melt & Glaze' },
  { id: 5, label: '05 Served Hot' },
];

export const BurgerStory: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { addItem, setIsCartOpen } = useCart();
  const sectionRef = useRef<HTMLElement>(null);
  const isUserClicking = useRef<boolean>(false);
  const userClickTimeout = useRef<number | null>(null);

  // Handle Order CTA
  const handleOrderClassic = () => {
    const classicBurger = MENU_ITEMS.find((i) => i.id === 'b-classic-smash') || MENU_ITEMS[0];
    addItem(classicBurger, 1);
    setIsCartOpen(true);
  };

  const handleStepClick = (stepId: number) => {
    isUserClicking.current = true;
    setCurrentStep(stepId);
    if (userClickTimeout.current) clearTimeout(userClickTimeout.current);
    userClickTimeout.current = window.setTimeout(() => {
      isUserClicking.current = false;
    }, 1200);
  };

  // Scroll-driven progression: automatically transition stages as the user scrolls through the section
  useEffect(() => {
    const handleScroll = () => {
      if (isUserClicking.current) return;
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalH = rect.height;

      // Section progress from top of screen to bottom
      const scrolled = windowH - rect.top;
      if (scrolled < 0 || rect.bottom < 0) return;

      const progress = Math.min(1, Math.max(0, scrolled / (totalH + windowH * 0.4)));

      // Map progress smoothly across 5 steps
      let targetStep = 1;
      if (progress < 0.22) targetStep = 1;
      else if (progress < 0.42) targetStep = 2;
      else if (progress < 0.62) targetStep = 3;
      else if (progress < 0.82) targetStep = 4;
      else targetStep = 5;

      setCurrentStep((prev) => (prev !== targetStep ? targetStep : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeContent = STEPS_CONTENT[currentStep - 1];

  return (
    <section
      id="story"
      ref={sectionRef}
      style={{
        paddingTop: '120px',
        paddingBottom: '130px',
        backgroundColor: '#0a0807',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Soft Atmospheric Glow (Zero hard borders or dashboard boxes) */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '55%',
          transform: 'translate(-50%, -50%)',
          width: '750px',
          height: '750px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230, 126, 34, 0.16) 0%, rgba(243, 156, 18, 0.05) 45%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1280px' }}>
        {/* ======================================================== */}
        {/* 1. SECTION HEADER (Elegant Serif Typography & Whitespace)*/}
        {/* ======================================================== */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              fontFamily: 'var(--font-accent)',
              color: 'var(--accent-gold)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            <Sparkles size={14} color="var(--accent-ember)" />
            <span>3D Culinary Storytelling</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 4.8vw, 56px)',
              lineHeight: 1.12,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '18px',
              textWrap: 'balance',
            }}
          >
            From Fresh Ingredients to Your Table
          </h2>

          <p
            style={{
              fontSize: 'clamp(16px, 1.8vw, 19px)',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              textWrap: 'balance',
              margin: '0 auto',
              maxWidth: '620px',
            }}
          >
            Watch every ingredient come together, from the first fresh ingredient to the final bite.
          </p>
        </div>

        {/* ======================================================== */}
        {/* 2. SINGLE STEP NAVIGATION (5 Compact Steps with Glow)    */}
        {/* ======================================================== */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '64px',
          }}
        >
          {STEP_TABS.map((tab) => {
            const isActive = tab.id === currentStep;
            return (
              <button
                key={tab.id}
                onClick={() => handleStepClick(tab.id)}
                style={{
                  padding: '12px 22px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  border: isActive
                    ? '1.5px solid var(--accent-gold)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  background: isActive
                    ? 'rgba(230, 126, 34, 0.18)'
                    : 'rgba(22, 17, 14, 0.6)',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  boxShadow: isActive
                    ? '0 0 25px rgba(243, 156, 18, 0.3), inset 0 0 12px rgba(230, 126, 34, 0.2)'
                    : 'none',
                  backdropFilter: 'blur(10px)',
                  transition: 'all var(--transition-fast)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>{tab.label}</span>
                {isActive && <Check size={14} color="var(--accent-gold)" />}
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* 3. MAIN CINEMATIC EXPERIENCE (NO OUTER DASHBOARD CARD)   */}
        {/* ======================================================== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            alignItems: 'center',
            gap: '50px',
            position: 'relative',
          }}
        >
          {/* LEFT COLUMN: REALISTIC 3D FOOD STAGE (Floating naturally) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(480px, 60vh, 640px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Subtle Warm Amber Halo Directly Behind the 3D Burger */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '540px',
                height: '540px',
                borderRadius: '50%',
                background:
                  currentStep === 2
                    ? 'radial-gradient(circle, rgba(255, 87, 34, 0.32) 0%, rgba(243, 156, 18, 0.12) 45%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(230, 126, 34, 0.25) 0%, rgba(243, 156, 18, 0.08) 45%, transparent 70%)',
                filter: 'blur(70px)',
                pointerEvents: 'none',
                zIndex: 0,
                transition: 'background 0.5s ease',
              }}
            />

            {/* Realistic Pinterest Reference Culinary Experience */}
            <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
              <PinterestBurgerExperience step={currentStep} interactive={true} />
            </div>
          </div>

          {/* RIGHT COLUMN: REFINED EDITORIAL NARRATIVE & HIGHLIGHTS */}
          <div style={{ maxWidth: '540px', zIndex: 2 }}>
            {/* Step Kicker */}
            <div
              style={{
                fontSize: '12px',
                fontFamily: 'var(--font-accent)',
                color: 'var(--accent-gold)',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                marginBottom: '14px',
                fontWeight: 700,
              }}
            >
              {activeContent.kicker}
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 3.8vw, 44px)',
                lineHeight: 1.15,
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '16px',
                textWrap: 'balance',
              }}
            >
              {activeContent.title}
            </h3>

            {/* Short Quote / Description */}
            <p
              style={{
                fontSize: '17px',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                marginBottom: '28px',
                fontStyle: 'italic',
                textWrap: 'balance',
              }}
            >
              “{activeContent.quote}”
            </p>

            {/* 3–4 Compact Highlights (Clean & Scannable, not long paragraphs) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '36px',
              }}
            >
              {activeContent.highlights.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    color: 'var(--text-primary)',
                  }}
                >
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--accent-gold)',
                      boxShadow: '0 0 8px rgba(243, 156, 18, 0.6)',
                      flexShrink: 0,
                    }}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Action Area: Step 5 features Prominent ORDER NOW CTA */}
            {currentStep === 5 ? (
              <div>
                <button
                  onClick={handleOrderClassic}
                  className="btn-primary"
                  style={{
                    padding: '16px 36px',
                    fontSize: '15px',
                    borderRadius: '999px',
                    boxShadow: '0 8px 30px rgba(230, 126, 34, 0.45)',
                  }}
                  aria-label="Order Classic Smash Burger"
                >
                  <Utensils size={18} />
                  <span>ORDER NOW</span>
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => handleStepClick(currentStep + 1)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    borderRadius: '999px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(243, 156, 18, 0.3)',
                    color: 'var(--accent-gold)',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <span>Next: {STEP_TABS[currentStep]?.label.slice(3) || 'Next'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
