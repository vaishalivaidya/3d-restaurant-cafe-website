import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, Utensils, Maximize2 } from 'lucide-react';
import { useCart } from '../lib/cartContext';
import { MENU_ITEMS } from '../lib/menu';

export interface GalleryFoodItem {
  id: string;
  number: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  aspect: 'wide' | 'tall' | 'standard' | 'large-feature';
  menuItemId?: string;
  price?: number;
}

const GALLERY_ITEMS: GalleryFoodItem[] = [
  {
    id: 'chicken-fries',
    number: '01',
    name: 'Crispy Chicken & Fries',
    category: 'Artisanal Fryery',
    tagline: 'Double-dredged buttermilk tenders with loaded herb frites',
    description:
      'Golden, craggy buttermilk-brined chicken tenders dusted with smoked paprika, accompanied by hand-cut Idaho russet fries tossed in aged cheddar melt, fresh garden chives, and our fiery chili oil & house dipping sauces on dark slate.',
    image: '/assets/gallery/01_crispy_chicken_fries.jpg',
    aspect: 'large-feature',
    menuItemId: 's-truffle-frites',
    price: 18,
  },
  {
    id: 'gourmet-sushi',
    number: '03',
    name: 'Gourmet Sushi Roll',
    category: 'Chef Special Maki',
    tagline: 'Crispy tempura core, unagi reduction & fiery masago crown',
    description:
      'Handcrafted roll with tempura prawn, avocado, and cucumber, drizzled with 12-year barrel-aged unagi glaze and house spicy sriracha emulsion, finished with crunchy shallot flakes and orange masago roe.',
    image: '/assets/gallery/03_gourmet_sushi_roll.jpg',
    aspect: 'standard',
    price: 22,
  },
  {
    id: 'signature-wings',
    number: '02',
    name: 'Signature Chicken Wings',
    category: 'Open Hearth Glaze',
    tagline: 'Smoked oak embers, honey-bourbon glaze & toasted sesame',
    description:
      'Slow-smoked jumbo chicken wings crisped over red oak coals, tossed in our sticky honey-bourbon glaze with toasted white sesame seeds and delicate scallion ribbons.',
    image: '/assets/gallery/02_signature_wings.jpg',
    aspect: 'standard',
    price: 16,
  },
  {
    id: 'salmon-sushi',
    number: '04',
    name: 'Premium Salmon Sushi',
    category: 'Artisanal Raw Bar',
    tagline: 'Glistening Atlantic salmon, toasted sesame & micro greens',
    description:
      'Sustainably sourced Atlantic salmon draped over seasoned Koshihikari sushi rice, lightly brushed with nikiri shoyu, sprinkled with black and white sesame, topped with crisp scallions and wasabi pearls.',
    image: '/assets/gallery/04_premium_salmon_sushi.jpg',
    aspect: 'wide',
    price: 24,
  },
  {
    id: 'loaded-burger',
    number: '05',
    name: 'Loaded Smash Burger',
    category: 'Proprietary Wagyu Blend',
    tagline: 'Double Wagyu smash, molten cheddar cascade & brioche',
    description:
      'Our iconic signature double smash patties with lacy caramelized Maillard edges, blanketed in molten Wisconsin sharp cheddar, heirloom beefsteak tomato, crisp butter greens, and house amber glaze on toasted sesame brioche.',
    image: '/assets/gallery/05_loaded_burger.jpg',
    aspect: 'tall',
    menuItemId: 'b-classic-smash',
    price: 19,
  },
  {
    id: 'wood-fired-pizza',
    number: '06',
    name: 'Wood-Fired Pizza',
    category: 'Neapolitan Sourdough',
    tagline: 'San Marzano D.O.P., buffalo mozzarella & fresh basil',
    description:
      '72-hour fermented sourdough baked in our 900°F live-fire hearth, yielding blistered leopard spotting, sweet San Marzano tomato reduction, melting buffalo mozzarella, and aromatic hand-torn Italian sweet basil.',
    image: '/assets/gallery/06_wood_fired_pizza.jpg',
    aspect: 'tall',
    menuItemId: 'p-margherita-doc',
    price: 21,
  },
  {
    id: 'creamy-pasta',
    number: '07',
    name: 'Creamy Truffle Pasta',
    category: 'Handmade Pasta',
    tagline: 'Fresh tagliatelle, aged parmigiano & black truffle cream',
    description:
      'Daily extruded egg tagliatelle tossed in velvety 24-month Parmigiano-Reggiano emulsion, infused with Umbrian black winter truffles, cracked Tellicherry peppercorn, and fresh chives.',
    image: '/assets/gallery/07_creamy_pasta.jpg',
    aspect: 'standard',
    price: 26,
  },
  {
    id: 'signature-dessert',
    number: '08',
    name: 'Signature Dark Chocolate Dessert',
    category: 'Sweet Finale',
    tagline: 'Warm molten Valrhona fudge, cocoa dust & wild berries',
    description:
      'Decadent warm 70% Valrhona dark chocolate cake with a molten liquid core, dusted with Dutch process cocoa, accompanied by macerated wild blackberries and Madagascar vanilla bean cream.',
    image: '/assets/gallery/08_signature_dessert.jpg',
    aspect: 'standard',
    menuItemId: 'd-lava-cake',
    price: 14,
  },
];

export const CinematicFoodGallery: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { addItem, setIsCartOpen } = useCart();

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null));
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null
    );
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  const handleOrder = (item: GalleryFoodItem) => {
    const foundMenu = item.menuItemId ? MENU_ITEMS.find((m) => m.id === item.menuItemId) : null;
    if (foundMenu) {
      addItem(foundMenu, 1);
    } else {
      // Add custom item adhering to MenuItem type
      addItem(
        {
          id: `gallery-${item.id}`,
          name: item.name,
          category: 'BURGERS',
          price: item.price || 20,
          description: item.tagline,
          isVeg: false,
          isSignature: true,
          prepTimeMinutes: 15,
          calories: 620,
          ingredients: ['Fresh Seasonal Ingredients', 'House-churned Sauce'],
          image: item.image,
        },
        1
      );
    }
    setIsCartOpen(true);
  };

  const currentLightboxItem = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <section
      id="food-gallery"
      style={{
        paddingTop: '130px',
        paddingBottom: '140px',
        backgroundColor: '#0a0807',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Cinematic Atmosphere */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230, 126, 34, 0.08) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(243, 156, 18, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1280px' }}>
        {/* ======================================================== */}
        {/* SECTION HEADER (Large Editorial Typography)              */}
        {/* ======================================================== */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 64px auto' }}>
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
              marginBottom: '16px',
            }}
          >
            <Sparkles size={14} color="var(--accent-ember)" />
            <span>Curated Culinary Portfolio</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(38px, 4.8vw, 60px)',
              lineHeight: 1.1,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '20px',
              textWrap: 'balance',
            }}
          >
            Made to Tempt Every Sense
          </h2>

          <p
            style={{
              fontSize: 'clamp(16px, 1.8vw, 19px)',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              textWrap: 'balance',
              margin: '0 auto',
              maxWidth: '640px',
            }}
          >
            Explore our signature creations, crafted with fresh ingredients and served with unforgettable flavor.
          </p>
        </div>

        {/* ======================================================== */}
        {/* ASYMMETRIC EDITORIAL FOOD GALLERY                        */}
        {/* ======================================================== */}

        {/* ROW 1: LARGE HERO FEATURE (01 Crispy Chicken & Fries) */}
        <div style={{ marginBottom: '32px' }}>
          <GalleryCard
            item={GALLERY_ITEMS[0]}
            onClick={() => openLightbox(0)}
            height="clamp(380px, 48vh, 520px)"
          />
        </div>

        {/* ROW 2: ASYMMETRIC PAIR (03 Gourmet Sushi Roll & 02 Signature Chicken Wings) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            marginBottom: '32px',
          }}
        >
          <GalleryCard
            item={GALLERY_ITEMS[1]}
            onClick={() => openLightbox(1)}
            height="clamp(340px, 42vh, 440px)"
          />
          <GalleryCard
            item={GALLERY_ITEMS[2]}
            onClick={() => openLightbox(2)}
            height="clamp(340px, 42vh, 440px)"
          />
        </div>

        {/* ROW 3: WIDE PANORAMIC FEATURE (04 Premium Salmon Sushi) */}
        <div style={{ marginBottom: '32px' }}>
          <GalleryCard
            item={GALLERY_ITEMS[3]}
            onClick={() => openLightbox(3)}
            height="clamp(340px, 44vh, 460px)"
          />
        </div>

        {/* ROW 4: BALANCED PAIR (05 Loaded Burger & 06 Wood-Fired Pizza) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            marginBottom: '32px',
          }}
        >
          <GalleryCard
            item={GALLERY_ITEMS[4]}
            onClick={() => openLightbox(4)}
            height="clamp(360px, 45vh, 480px)"
          />
          <GalleryCard
            item={GALLERY_ITEMS[5]}
            onClick={() => openLightbox(5)}
            height="clamp(360px, 45vh, 480px)"
          />
        </div>

        {/* ROW 5: FINAL ARTISAN PAIR (07 Creamy Pasta & 08 Signature Dessert) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          <GalleryCard
            item={GALLERY_ITEMS[6]}
            onClick={() => openLightbox(6)}
            height="clamp(340px, 42vh, 440px)"
          />
          <GalleryCard
            item={GALLERY_ITEMS[7]}
            onClick={() => openLightbox(7)}
            height="clamp(340px, 42vh, 440px)"
          />
        </div>
      </div>

      {/* ======================================================== */}
      {/* FULL-SCREEN CINEMATIC LIGHTBOX                           */}
      {/* ======================================================== */}
      {currentLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentLightboxItem.name}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(5, 4, 3, 0.94)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn 0.25s ease-out',
          }}
          onClick={closeLightbox}
        >
          {/* Controls Bar */}
          <div
            style={{
              position: 'absolute',
              top: '24px',
              left: '28px',
              right: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 10,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Counter */}
            <div
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '14px',
                color: 'var(--accent-gold)',
                letterSpacing: '0.15em',
                background: 'rgba(20, 16, 14, 0.8)',
                padding: '8px 16px',
                borderRadius: '999px',
                border: '1px solid rgba(243, 156, 18, 0.25)',
              }}
            >
              <span>{currentLightboxItem.number}</span>
              <span style={{ opacity: 0.5, margin: '0 6px' }}>/</span>
              <span>08</span>
            </div>

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              style={{
                background: 'rgba(20, 16, 14, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>
          </div>

          {/* Previous Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            style={{
              position: 'absolute',
              left: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(20, 16, 14, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'all var(--transition-fast)',
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            style={{
              position: 'absolute',
              right: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(20, 16, 14, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'all var(--transition-fast)',
            }}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Lightbox Content Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '1060px',
              width: '100%',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                maxHeight: '66vh',
                maxWidth: '100%',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(230, 126, 34, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <img
                src={currentLightboxItem.image}
                alt={currentLightboxItem.name}
                referrerPolicy="no-referrer"
                style={{
                  maxHeight: '66vh',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>

            {/* Information & Action */}
            <div style={{ maxWidth: '680px' }}>
              <div
                style={{
                  fontSize: '12px',
                  fontFamily: 'var(--font-accent)',
                  color: 'var(--accent-gold)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                {currentLightboxItem.number} · {currentLightboxItem.category}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(26px, 3.2vw, 36px)',
                  color: '#ffffff',
                  marginBottom: '10px',
                  fontWeight: 700,
                }}
              >
                {currentLightboxItem.name}
              </h3>

              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  marginBottom: '20px',
                  textWrap: 'balance',
                }}
              >
                {currentLightboxItem.description}
              </p>

              <button
                onClick={() => handleOrder(currentLightboxItem)}
                className="btn-primary"
                style={{
                  padding: '12px 28px',
                  fontSize: '14px',
                  borderRadius: '999px',
                }}
              >
                <Utensils size={16} />
                <span>Order This Creation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// ========================================================
// INDIVIDUAL ASYMMETRIC GALLERY CARD COMPONENT
// ========================================================
interface GalleryCardProps {
  item: GalleryFoodItem;
  height: string;
  onClick: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, height, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        height,
        borderRadius: '18px',
        overflow: 'hidden',
        cursor: 'pointer',
        border: isHovered
          ? '1px solid rgba(243, 156, 18, 0.45)'
          : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: isHovered
          ? '0 16px 45px rgba(0, 0, 0, 0.65), 0 0 35px rgba(230, 126, 34, 0.22)'
          : '0 8px 24px rgba(0, 0, 0, 0.45)',
        backgroundColor: '#120f0d',
        transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Background Food Photography */}
      <img
        src={item.image}
        alt={item.name}
        referrerPolicy="no-referrer"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          transform: isHovered ? 'scale(1.06)' : 'scale(1.0)',
          filter: isHovered
            ? 'brightness(1.08) contrast(1.06) saturate(1.12)'
            : 'brightness(0.88) contrast(1.02)',
          transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.45s ease',
          display: 'block',
        }}
      />

      {/* Cinematic Gradient Vignette (Dark at bottom for typography readability) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(7, 5, 4, 0.95) 0%, rgba(7, 5, 4, 0.65) 35%, rgba(7, 5, 4, 0.1) 65%, transparent 100%)',
          pointerEvents: 'none',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Top Number & Category Badge */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: '12px',
            fontWeight: 700,
            color: 'var(--accent-gold)',
            background: 'rgba(10, 8, 7, 0.75)',
            backdropFilter: 'blur(8px)',
            padding: '4px 10px',
            borderRadius: '999px',
            border: '1px solid rgba(243, 156, 18, 0.3)',
            letterSpacing: '0.08em',
          }}
        >
          {item.number}
        </span>
        <span
          style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.85)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: 600,
            background: 'rgba(10, 8, 7, 0.55)',
            backdropFilter: 'blur(8px)',
            padding: '4px 10px',
            borderRadius: '999px',
          }}
        >
          {item.category}
        </span>
      </div>

      {/* Top Right Maximize Icon on Hover */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: 'rgba(10, 8, 7, 0.75)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: isHovered ? 'var(--accent-gold)' : '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isHovered ? 'scale(1.08)' : 'scale(0.92)',
          opacity: isHovered ? 1 : 0.6,
          transition: 'all 0.3s ease',
          zIndex: 2,
        }}
      >
        <Maximize2 size={16} />
      </div>

      {/* Bottom Editorial Content */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '26px',
          right: '26px',
          zIndex: 2,
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 2.5vw, 30px)',
            lineHeight: 1.15,
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '8px',
            letterSpacing: '-0.01em',
          }}
        >
          {item.name}
        </h3>

        <p
          style={{
            fontSize: '14px',
            lineHeight: 1.5,
            color: 'var(--text-secondary)',
            maxWidth: '560px',
            marginBottom: isHovered ? '12px' : '0',
            opacity: isHovered ? 1 : 0.85,
            transition: 'all 0.3s ease',
          }}
        >
          {item.tagline}
        </p>

        {/* View in Lightbox Hint */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            fontFamily: 'var(--font-accent)',
            color: 'var(--accent-gold)',
            letterSpacing: '0.08em',
            fontWeight: 600,
            opacity: isHovered ? 1 : 0,
            maxHeight: isHovered ? '24px' : '0px',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
          }}
        >
          <span>Click to view photography</span>
          <span>&rarr;</span>
        </div>
      </div>
    </div>
  );
};
