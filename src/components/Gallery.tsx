import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  emoji: string;
  description: string;
  highlight: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'dining',
    title: 'The Hearthside Dining Room',
    category: 'Atmosphere',
    emoji: '🕯️',
    description: 'Reclaimed timber, exposed Roman brickwork, and soft amber candleglow create an intimate dining enclave.',
    highlight: 'Warm Ambient Glow',
  },
  {
    id: 'kitchen',
    title: 'The Open Hearth & Wood Oven',
    category: 'Kitchen',
    emoji: '🔥',
    description: 'Watch the theatrical dance of fire, smoke, and skillet searing from our chef’s counter seats.',
    highlight: '900°F Live Fire',
  },
  {
    id: 'chef',
    title: 'Culinary Artistry in Motion',
    category: 'Craftsmanship',
    emoji: '👨‍🍳',
    description: 'Precision plating and seasonal garnishes executed with Michelin-honed discipline.',
    highlight: 'Handcrafted Daily',
  },
  {
    id: 'burger',
    title: 'Lacy Edged Smash Burger',
    category: 'Signature Dish',
    emoji: '🍔',
    description: 'Crisp caramelized patty crust, molten cheddar, and toasted buttery brioche.',
    highlight: '45-Day Dry Aged',
  },
  {
    id: 'pizza',
    title: 'Wood-Fired Neapolitan Pizza',
    category: 'Signature Dish',
    emoji: '🍕',
    description: 'San Marzano D.O.P. reduction and bubbling mozzarella on a charred leopard-spotted crust.',
    highlight: '72-Hr Sourdough',
  },
  {
    id: 'dessert',
    title: 'Valrhona Skillet Brownie',
    category: 'Sweet Finale',
    emoji: '🍫',
    description: 'Molten dark chocolate fudge, toasted hazelnuts, and Tahitian vanilla bean gelato.',
    highlight: 'Warm From Oven',
  },
  {
    id: 'coffee',
    title: 'Slow-Drip Coffee & Spirits',
    category: 'Beverage Craft',
    emoji: '☕',
    description: 'Single-origin Ethiopian cold brews and smoked botanical craft cocktails.',
    highlight: 'House-Smoked Ice',
  },
  {
    id: 'guests',
    title: 'Celebrations & Gatherings',
    category: 'Community',
    emoji: '🥂',
    description: 'Unforgettable evenings shared over bountiful feasts and spirited conversation.',
    highlight: 'Unforgettable Moments',
  },
];

export const Gallery: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const offset = direction === 'left' ? -360 : 360;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section
      id="gallery"
      style={{
        paddingTop: '100px',
        paddingBottom: '110px',
        backgroundColor: 'var(--bg-canvas)',
        position: 'relative',
        borderTop: '1px solid var(--border-subtle)',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ marginBottom: '36px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div>
            <span className="section-kicker">Visual Journey</span>
            <h2 className="section-title" style={{ marginBottom: '8px' }}>
              The Restaurant Experience
            </h2>
            <p className="section-subtitle" style={{ maxWidth: '540px' }}>
              A glimpse into our open-flame kitchen theatre, intimate dining rooms, and culinary creations.
            </p>
          </div>

          {/* Navigation Scroll Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => scroll('left')}
              className="btn-secondary"
              style={{ width: '44px', height: '44px', padding: 0 }}
              aria-label="Scroll gallery left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="btn-secondary"
              style={{ width: '44px', height: '44px', padding: 0 }}
              aria-label="Scroll gallery right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: '24px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingLeft: 'max(24px, calc((100vw - var(--container-max)) / 2))',
          paddingRight: 'max(24px, calc((100vw - var(--container-max)) / 2))',
          paddingBottom: '20px',
          scrollbarWidth: 'none',
        }}
      >
        {GALLERY_ITEMS.map((item) => (
          <div
            key={item.id}
            style={{
              flex: '0 0 320px',
              scrollSnapAlign: 'start',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-subtle)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform var(--transition-normal), border-color var(--transition-normal)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-gold)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            {/* Visual Header */}
            <div
              style={{
                height: '200px',
                background: 'radial-gradient(circle at center, #2c1e15 0%, #14100c 90%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <span style={{ fontSize: '72px', filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.5))' }}>
                {item.emoji}
              </span>

              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(15, 12, 10, 0.82)',
                  backdropFilter: 'blur(6px)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  color: 'var(--accent-gold)',
                  fontFamily: 'var(--font-accent)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {item.category}
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(230, 126, 34, 0.25)',
                  border: '1px solid var(--border-gold)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  color: '#fff',
                }}
              >
                {item.highlight}
              </div>
            </div>

            {/* Content Body */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px', flex: '1' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--text-primary)' }}>
                {item.title}
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
