import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface ExperienceCardItem {
  id: string;
  title: string;
  category: string;
  description: string;
  highlight: string;
  image: string;
}

const EXPERIENCE_ITEMS: ExperienceCardItem[] = [
  {
    id: 'burger',
    title: 'Lacy Edged Smash Burger',
    category: 'Craft Burger',
    description: 'Crisp caramelized patty crust, molten cheddar, and toasted buttery brioche.',
    highlight: 'Dry-Aged Angus Blend',
    image: '/assets/menu/b_classic_smash.jpg',
  },
  {
    id: 'pizza',
    title: 'Wood-Fired Neapolitan Pizza',
    category: 'Hearth Creation',
    description: 'San Marzano tomato, bubbling mozzarella, and a beautifully charred crust.',
    highlight: '900°F Red Oak Oven',
    image: '/assets/pizza/hero_woodfired_pizza.jpg',
  },
  {
    id: 'brownie',
    title: 'Valrhona Skillet Brownie',
    category: 'Sweet Finale',
    description: 'Molten dark chocolate fudge, toasted hazelnuts, and vanilla gelato.',
    highlight: '70% Valrhona Dark',
    image: '/assets/menu/d_brownie.jpg',
  },
  {
    id: 'dining',
    title: 'The Dining Experience',
    category: 'Atmosphere',
    description: 'Open-flame cooking, warm hospitality, and an intimate atmosphere.',
    highlight: 'Open-Flame Theatre',
    image: '/assets/experience/dining_kitchen_experience.jpg',
  },
];

export const Gallery: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = Math.min(scrollRef.current.clientWidth * 0.85, 380);
    const offset = direction === 'left' ? -scrollAmount : scrollAmount;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section
      id="gallery"
      style={{
        paddingTop: '110px',
        paddingBottom: '120px',
        backgroundColor: '#0a0807',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Background Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230, 126, 34, 0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ marginBottom: '44px', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                fontFamily: 'var(--font-accent)',
                color: 'var(--accent-gold)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}
            >
              <Sparkles size={14} color="var(--accent-ember)" />
              <span>Visual Journey</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 4.4vw, 54px)',
                lineHeight: 1.15,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                marginBottom: '14px',
              }}
            >
              The Restaurant Experience
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(17px, 2vw, 20px)',
                lineHeight: 1.5,
                color: 'var(--accent-gold)',
                maxWidth: '620px',
                textWrap: 'balance',
              }}
            >
              “A glimpse into our open-flame kitchen theatre, intimate dining rooms, and culinary creations.”
            </p>
          </div>

          {/* Navigation Scroll Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: canScrollLeft ? 'rgba(25, 20, 16, 0.9)' : 'rgba(20, 16, 14, 0.4)',
                border: canScrollLeft
                  ? '1px solid rgba(243, 156, 18, 0.35)'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                color: canScrollLeft ? '#ffffff' : 'rgba(255, 255, 255, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canScrollLeft ? 'pointer' : 'default',
                transition: 'all var(--transition-fast)',
              }}
              aria-label="Scroll gallery left"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: canScrollRight ? 'rgba(25, 20, 16, 0.9)' : 'rgba(20, 16, 14, 0.4)',
                border: canScrollRight
                  ? '1px solid rgba(243, 156, 18, 0.35)'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                color: canScrollRight ? '#ffffff' : 'rgba(255, 255, 255, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canScrollRight ? 'pointer' : 'default',
                transition: 'all var(--transition-fast)',
              }}
              aria-label="Scroll gallery right"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        style={{
          display: 'flex',
          gap: '28px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingLeft: 'max(24px, calc((100vw - 1240px) / 2))',
          paddingRight: 'max(24px, calc((100vw - 1240px) / 2))',
          paddingBottom: '24px',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {EXPERIENCE_ITEMS.map((item) => (
          <ExperienceCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

// ========================================================
// INDIVIDUAL EXPERIENCE CARD COMPONENT
// ========================================================
interface ExperienceCardProps {
  item: ExperienceCardItem;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flex: '0 0 clamp(290px, 80vw, 360px)',
        scrollSnapAlign: 'start',
        backgroundColor: '#130f0d',
        border: isHovered
          ? '1px solid rgba(243, 156, 18, 0.48)'
          : '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: isHovered
          ? '0 18px 40px rgba(0, 0, 0, 0.7), 0 0 30px rgba(230, 126, 34, 0.22)'
          : '0 8px 24px rgba(0, 0, 0, 0.45)',
        display: 'flex',
        flexDirection: 'column',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
      }}
    >
      {/* Upper Portion: Realistic Food Photography with Dark Vignette */}
      <div
        style={{
          position: 'relative',
          height: '240px',
          backgroundColor: '#17120e',
          overflow: 'hidden',
        }}
      >
        <img
          src={item.image}
          alt={item.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            transform: isHovered ? 'scale(1.08)' : 'scale(1.0)',
            filter: isHovered
              ? 'brightness(1.06) contrast(1.05) saturate(1.1)'
              : 'brightness(0.92) contrast(1.0)',
            transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), filter 0.45s ease',
          }}
        />

        {/* Gradient Vignette at Bottom of Image for Smooth Visual Blend */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(19, 15, 13, 0.98) 0%, rgba(19, 15, 13, 0.35) 45%, rgba(19, 15, 13, 0.1) 70%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Top Left Category Badge */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            background: 'rgba(14, 11, 9, 0.82)',
            backdropFilter: 'blur(8px)',
            padding: '5px 12px',
            borderRadius: '999px',
            fontSize: '11px',
            color: 'var(--accent-gold)',
            fontFamily: 'var(--font-accent)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            border: '1px solid rgba(243, 156, 18, 0.3)',
            zIndex: 2,
          }}
        >
          {item.category}
        </div>

        {/* Bottom Right Highlight Marker */}
        <div
          style={{
            position: 'absolute',
            bottom: '14px',
            right: '16px',
            background: 'rgba(230, 126, 34, 0.22)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(243, 156, 18, 0.4)',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '11px',
            color: '#ffffff',
            fontWeight: 600,
            fontFamily: 'var(--font-accent)',
            letterSpacing: '0.04em',
            zIndex: 2,
          }}
        >
          {item.highlight}
        </div>
      </div>

      {/* Card Content Body */}
      <div
        style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          flex: '1',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            fontWeight: 700,
            color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.95)',
            textShadow: isHovered ? '0 0 16px rgba(243, 156, 18, 0.35)' : 'none',
            lineHeight: 1.25,
            transition: 'color 0.3s ease, text-shadow 0.3s ease',
          }}
        >
          {item.title}
        </h3>

        <p
          style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            margin: 0,
            flex: '1',
          }}
        >
          {item.description}
        </p>

        {/* Subtle Visual Accent Line */}
        <div
          style={{
            height: '2px',
            width: isHovered ? '48px' : '24px',
            background: isHovered ? 'var(--accent-gold)' : 'rgba(243, 156, 18, 0.3)',
            borderRadius: '2px',
            marginTop: '8px',
            transition: 'all 0.35s ease',
          }}
        />
      </div>
    </div>
  );
};
