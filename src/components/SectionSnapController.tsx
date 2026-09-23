import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Flame, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface SectionSnapControllerProps {
  burgerSectionId?: string;
  pizzaSectionId?: string;
}

export const SectionSnapController: React.FC<SectionSnapControllerProps> = ({
  burgerSectionId = 'exploded-burger',
  pizzaSectionId = 'pizza',
}) => {
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [transitionDirection, setTransitionDirection] = useState<'to-pizza' | 'to-burger'>('to-pizza');
  const [fadeOpacity, setFadeOpacity] = useState<number>(0);

  const isTransitioningRef = useRef<boolean>(false);
  const lastTriggerTimeRef = useRef<number>(0);
  const snapActiveRef = useRef<boolean>(true);

  // Smooth cinematic snap execution
  const executeCinematicSnap = useCallback((direction: 'to-pizza' | 'to-burger') => {
    const now = Date.now();
    if (isTransitioningRef.current || now - lastTriggerTimeRef.current < 1100) {
      return;
    }

    const targetId = direction === 'to-pizza' ? pizzaSectionId : burgerSectionId;
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    isTransitioningRef.current = true;
    lastTriggerTimeRef.current = now;
    setTransitionDirection(direction);
    setIsTransitioning(true);

    // 1. Fade in the cinematic vignette & warm embers
    setFadeOpacity(1);

    // 2. Smoothly scroll to the target section (offsetting for the navbar)
    const navbarOffset = 70;
    const elementRect = targetElement.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const targetScrollTop = Math.max(0, absoluteElementTop - navbarOffset);

    // Give the fade a brief 120ms head-start for that cinematic dissolve effect
    setTimeout(() => {
      window.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth',
      });
    }, 120);

    // 3. Keep the transition glow visible during the smooth scroll glide
    setTimeout(() => {
      // Fade out the overlay
      setFadeOpacity(0);
    }, 650);

    // 4. Release transition lock after scroll settles
    setTimeout(() => {
      setIsTransitioning(false);
      isTransitioningRef.current = false;
    }, 1050);
  }, [burgerSectionId, pizzaSectionId]);

  // Global Wheel and Touch listener for automatic snap-to-section
  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (!snapActiveRef.current || isTransitioningRef.current) return;

      const burgerEl = document.getElementById(burgerSectionId);
      const pizzaEl = document.getElementById(pizzaSectionId);
      if (!burgerEl || !pizzaEl) return;

      const burgerRect = burgerEl.getBoundingClientRect();
      const pizzaRect = pizzaEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Scrolling DOWN from burger towards pizza:
      // When the bottom of the burger section enters the lower portion of viewport and user scrolls down
      if (
        e.deltaY > 25 &&
        burgerRect.top < windowHeight * 0.4 &&
        burgerRect.bottom <= windowHeight + 160 &&
        pizzaRect.top > 80
      ) {
        e.preventDefault();
        executeCinematicSnap('to-pizza');
      }
      // Scrolling UP from pizza back to burger:
      // When near the top of the pizza section and user scrolls up
      else if (
        e.deltaY < -25 &&
        pizzaRect.top >= -80 &&
        pizzaRect.top < windowHeight * 0.4 &&
        burgerRect.bottom < windowHeight
      ) {
        e.preventDefault();
        executeCinematicSnap('to-burger');
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!snapActiveRef.current || isTransitioningRef.current) return;

      const touchCurrentY = e.touches[0].clientY;
      const touchDiff = touchStartY - touchCurrentY; // Positive = swiping UP (scrolling DOWN)

      const burgerEl = document.getElementById(burgerSectionId);
      const pizzaEl = document.getElementById(pizzaSectionId);
      if (!burgerEl || !pizzaEl) return;

      const burgerRect = burgerEl.getBoundingClientRect();
      const pizzaRect = pizzaEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (
        touchDiff > 40 &&
        burgerRect.top < windowHeight * 0.4 &&
        burgerRect.bottom <= windowHeight + 180 &&
        pizzaRect.top > 80
      ) {
        executeCinematicSnap('to-pizza');
      } else if (
        touchDiff < -40 &&
        pizzaRect.top >= -80 &&
        pizzaRect.top < windowHeight * 0.4
      ) {
        executeCinematicSnap('to-burger');
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const handleCustomSnap = (e: Event) => {
      const customEvent = e as CustomEvent<{ target: 'pizza' | 'burger' }>;
      executeCinematicSnap(customEvent.detail?.target === 'burger' ? 'to-burger' : 'to-pizza');
    };
    window.addEventListener('snap-to-section', handleCustomSnap);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('snap-to-section', handleCustomSnap);
    };
  }, [burgerSectionId, pizzaSectionId, executeCinematicSnap]);

  return (
    <>
      {/* ======================================================== */}
      {/* FULLSCREEN CINEMATIC FADE OVERLAY                        */}
      {/* ======================================================== */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9998,
          pointerEvents: 'none',
          opacity: fadeOpacity,
          transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          background:
            transitionDirection === 'to-pizza'
              ? 'radial-gradient(ellipse at center, rgba(230, 126, 34, 0.4) 0%, rgba(20, 14, 10, 0.88) 60%, rgba(8, 6, 5, 0.98) 100%)'
              : 'radial-gradient(ellipse at center, rgba(243, 156, 18, 0.35) 0%, rgba(20, 16, 13, 0.88) 60%, rgba(8, 6, 5, 0.98) 100%)',
          backdropFilter: fadeOpacity > 0 ? 'blur(10px)' : 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Animated Glow Core */}
        <div
          style={{
            position: 'absolute',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(230, 126, 34, 0.5) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'pulseGlow 1.2s infinite ease-in-out',
          }}
        />

        {/* Cinematic Title Card Banner */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            padding: '24px 36px',
            borderRadius: 'var(--radius-xl)',
            background: 'rgba(15, 12, 10, 0.85)',
            border: '1px solid rgba(243, 156, 18, 0.5)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 40px rgba(230, 126, 34, 0.3)',
            transform: fadeOpacity > 0 ? 'scale(1)' : 'scale(0.92)',
            transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 14px',
              borderRadius: '999px',
              background: 'rgba(230, 126, 34, 0.2)',
              border: '1px solid rgba(230, 126, 34, 0.4)',
              color: 'var(--accent-gold)',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            <Sparkles size={13} />
            <span>Cinematic Course Transition</span>
          </div>

          <div
            style={{
              fontSize: '48px',
              marginBottom: '8px',
              filter: 'drop-shadow(0 0 20px rgba(230, 126, 34, 0.8))',
            }}
          >
            {transitionDirection === 'to-pizza' ? '🍕' : '🍔'}
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 3.5vw, 36px)',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '6px',
            }}
          >
            {transitionDirection === 'to-pizza'
              ? 'Entering 900°F Wood-Fired Hearth'
              : 'Returning to Artisan Smashburger'}
          </h3>

          <p
            style={{
              fontSize: '14px',
              color: 'var(--accent-gold-light)',
              maxWidth: '380px',
              margin: '0 auto',
            }}
          >
            {transitionDirection === 'to-pizza'
              ? 'Hand-stretched sourdough, bubbling mozzarella, and blistered crust.'
              : 'Double dry-aged patties, melted cheddar, and flying artisan layers.'}
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* INTERACTIVE BRIDGE CUE: BURGER -> PIZZA                  */}
      {/* (Rendered directly in the DOM flow between the sections) */}
      {/* ======================================================== */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          backgroundColor: '#0a0807',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 20px 24px 20px',
        }}
      >
        <button
          onClick={() => executeCinematicSnap('to-pizza')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 24px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, rgba(230, 126, 34, 0.2) 0%, rgba(20, 16, 13, 0.9) 100%)',
            border: '1px solid rgba(243, 156, 18, 0.45)',
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(230, 126, 34, 0.25)',
            transition: 'all var(--transition-fast)',
          }}
          title="Smoothly snap directly to the 900°F Pizza Experience"
        >
          <Flame size={15} color="var(--accent-gold)" />
          <span>Snap to 900°F Wood-Fired Pizza Experience</span>
          <ChevronDown size={16} color="var(--accent-gold)" />
        </button>
      </div>
    </>
  );
};
