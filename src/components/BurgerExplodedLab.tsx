import React, { useState, useEffect, useRef } from 'react';
import {
  Layers,
  RotateCw,
  Wind,
  Flame,
  Activity,
  Thermometer,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Utensils,
  Award,
} from 'lucide-react';
import { Burger3D, CameraPreset } from './3d/Burger3D';
import { Pizza3D } from './3d/Pizza3D';
import { useCart } from '../lib/cartContext';
import { MENU_ITEMS, MenuItem } from '../lib/menu';

interface SlideDish {
  id: string;
  name: string;
  tagline: string;
  category: string;
  badge: string;
  price: number;
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  temperature: string;
  description: string;
  highlights: string[];
  menuItemId: string;
}

const SLIDE_DISHES: SlideDish[] = [
  {
    id: 'burger',
    name: 'The Grand Artisan Smash',
    tagline: 'Signature Double Wagyu & Flying Layers',
    category: 'Flame-Seared Smashburgers',
    badge: 'CHEF SIGNATURE',
    price: 18.50,
    calories: 790,
    protein: '48g',
    carbs: '42g',
    fat: '36g',
    temperature: '450°F Cast-Iron Plancha',
    description:
      'Double dry-aged smash patties seared until ultra-crisp and lacy-edged, draped in molten 18-month Wisconsin vintage cheddar, crisp ruffled hydroponic lettuce, sweet vine-ripened heirloom tomatoes, and slow-whisked secret amber sauce on golden tallow-toasted brioche.',
    highlights: [
      'Toasted Brioche Crown & Sesame',
      'Crisp Ruffled Hydroponic Lettuce',
      'Sun-Ripened Heirloom Tomato',
      'Molten Aged Sharp Cheddar',
      'Double Smashed Wagyu Patties',
      'House Secret Amber Emulsion',
      'Buttery Brioche Heel',
    ],
    menuItemId: 'b-double-cheese',
  },
  {
    id: 'pizza',
    name: 'Wood-Fired Neapolitan Pizza',
    tagline: '72-Hour Sourdough & San Marzano D.O.P.',
    category: 'Wood-Fired Hearth',
    badge: '900°F VOLCANIC HEARTH',
    price: 19.50,
    calories: 840,
    protein: '38g',
    carbs: '68g',
    fat: '28g',
    temperature: '900°F White Oak Fire',
    description:
      'Hand-stretched 72-hour cold-fermented mother dough baked in our authentic volcanic stone oven in just 75 seconds. Adorned with crushed San Marzano D.O.P. reduction, creamy fiore di latte mozzarella, artisanal cupping pepperoni, Genovese sweet basil, and a hot wildflower honey drizzle.',
    highlights: [
      '72-Hr Cold Fermented Sourdough',
      'Volcanic San Marzano D.O.P. Sauce',
      'Hand-Torn Fior Di Latte Mozzarella',
      'Natural-Casing Cup & Char Pepperoni',
      'Sweet Genovese Basil Leaves',
      'Hot Wildflower Honey Drizzle',
      'Blistered Leopard-Spotted Cornicione',
    ],
    menuItemId: 'p-pepperoni',
  },
  {
    id: 'steak',
    name: '45-Day Dry-Aged Prime Ribeye',
    tagline: 'White Oak Wood-Fired Prime Cut',
    category: 'Wood-Smoked Butcher Cuts',
    badge: 'HIMALAYAN SALT AGED',
    price: 64.00,
    calories: 950,
    protein: '62g',
    carbs: '2g',
    fat: '58g',
    temperature: '750°F Binchotan Charcoal',
    description:
      'Thick-cut 18oz bone-in prime ribeye aged for 45 days in our climate-controlled Himalayan pink salt room. Charred over Japanese binchotan charcoal and white oak logs, continually basted with whipped bone marrow herb butter, wild rosemary smoke, and finished with flaky Maldon sea salt.',
    highlights: [
      '18oz Bone-In Prime Black Angus',
      '45-Day Himalayan Salt Cave Aging',
      'Japanese Binchotan Charcoal Sear',
      'Whipped Bone Marrow & Confit Butter',
      'Fresh Garden Thyme & Smoked Rosemary',
      'Flaky Hand-Harvested Maldon Sea Salt',
    ],
    menuItemId: 'b-classic-smash',
  },
  {
    id: 'pasta',
    name: 'Handcrafted Truffle Fettuccine',
    tagline: '40-Egg Yolk Bronze-Cut Ribbons',
    category: 'Bronze-Cut Pastas',
    badge: 'BLACK WINTER TRUFFLE',
    price: 17.50,
    calories: 680,
    protein: '24g',
    carbs: '65g',
    fat: '26g',
    temperature: 'Fresh From Sauté Pan',
    description:
      'Handcrafted daily using organic pasture-raised egg yolks and imported Italian Tipo 00 semolina. Tossed tableside in an emulsion of 24-month aged Parmigiano-Reggiano, churned mountain butter, freshly cracked Madagascar black peppercorns, and topped with shaved black winter truffles.',
    highlights: [
      'Extruded Through Artisanal Bronze Dies',
      '40-Egg Yolk Rich Emulsion Dough',
      '24-Month Aged Parmigiano-Reggiano',
      'Sweet Cultured Mountain Butter',
      'Fresh Shaved Norcia Black Truffles',
      'Cracked Tellicherry Peppercorn',
    ],
    menuItemId: 'pa-alfredo',
  },
];

const PIZZA_STAGES = [
  { stage: 1, label: '01 Dough Ball', desc: '72-Hour cold fermentation' },
  { stage: 2, label: '02 Hand Stretch', desc: 'Preserving airy rim pockets' },
  { stage: 3, label: '03 San Marzano', desc: 'Crushed volcanic sauce swirl' },
  { stage: 4, label: '04 Fior Di Latte', desc: 'Hand-torn fresh mozzarella' },
  { stage: 5, label: '05 Pepperoni & Basil', desc: 'Artisanal cup & char' },
  { stage: 6, label: '06 900°F Hearth', desc: 'White oak wood oven entry' },
  { stage: 7, label: '07 Volcanic Melt', desc: 'Rapid bubbling & rise' },
  { stage: 8, label: '08 Oven Emergence', desc: 'Blistered crust crackle' },
  { stage: 9, label: '09 Precision Slice', desc: 'Elastic cheese pull stretch' },
];

export const BurgerExplodedLab: React.FC = () => {
  const { addItem, setIsCartOpen } = useCart();

  // Slide state: 0 = Burger, 1 = Pizza, 2 = Steak, 3 = Pasta
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [burgerSubView, setBurgerSubView] = useState<'cinematic' | '3d'>('cinematic');
  const [pizzaStage, setPizzaStage] = useState<number>(7);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Touch swipe support
  const touchStartXRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentDish = SLIDE_DISHES[activeSlide];

  // Auto toast timer
  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => setToastMessage(null), 3500);
    return () => clearTimeout(t);
  }, [toastMessage]);

  // Synchronize video playback when active slide changes
  useEffect(() => {
    if (activeSlide === 0 && videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [activeSlide, isVideoPlaying]);

  // Keyboard navigation (ArrowLeft & ArrowRight to slide)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevSlide();
      } else if (e.code === 'Space' && activeSlide === 0) {
        e.preventDefault();
        toggleVideoPlayback();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide, isVideoPlaying]);

  const goToNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % SLIDE_DISHES.length);
  };

  const goToPrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + SLIDE_DISHES.length) % SLIDE_DISHES.length);
  };

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    }
    touchStartXRef.current = null;
  };

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const handleOrderCurrentDish = () => {
    const item =
      MENU_ITEMS.find((i) => i.id === currentDish.menuItemId) ||
      MENU_ITEMS[0];

    addItem(item, 1);
    setToastMessage(`${currentDish.name} ($${currentDish.price.toFixed(2)}) added to your dining bag!`);
  };

  return (
    <section
      id="exploded-burger"
      style={{
        paddingTop: '90px',
        paddingBottom: '110px',
        backgroundColor: '#0a0807',
        position: 'relative',
        borderTop: '1px solid var(--border-subtle)',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1100px',
          height: '750px',
          background: 'radial-gradient(circle, rgba(230, 126, 34, 0.16) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1280px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 28px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              background: 'rgba(230, 126, 34, 0.14)',
              border: '1px solid rgba(230, 126, 34, 0.35)',
              color: 'var(--accent-gold)',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '12px',
            }}
          >
            <Sparkles size={14} />
            <span>Interactive Culinary Theatre · Slide To Explore</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(32px, 4.2vw, 46px)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              marginBottom: '10px',
              textWrap: 'balance',
            }}
          >
            Mastery in Every Layer & Hearth
          </h2>

          <p
            style={{
              fontSize: 'clamp(14px, 1.5vw, 17px)',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              textWrap: 'balance',
            }}
          >
            Slide through our signature gastronomic creations. From flying artisan double-wagyu smashburgers to
            900°F wood-fired Neapolitan pizzas and dry-aged cuts.
          </p>
        </div>

        {/* ======================================================== */}
        {/* DISH SLIDER CATEGORY TABS (SLIDE SELECTORS)              */}
        {/* ======================================================== */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '22px',
          }}
        >
          {SLIDE_DISHES.map((dish, idx) => {
            const isActive = activeSlide === idx;
            return (
              <button
                key={dish.id}
                onClick={() => setActiveSlide(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 700,
                  background: isActive
                    ? 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)'
                    : 'rgba(24, 19, 15, 0.8)',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  border: isActive ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 6px 20px rgba(230, 126, 34, 0.4)' : 'none',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <span>
                  {dish.id === 'burger' && '🍔'}
                  {dish.id === 'pizza' && '🍕'}
                  {dish.id === 'steak' && '🥩'}
                  {dish.id === 'pasta' && '🍝'}
                </span>
                <span>{dish.name}</span>
                {isActive && (
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#ffffff',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* MAIN BIG SCREEN CINEMATIC STAGE                          */}
        {/* ======================================================== */}
        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(540px, 70vh, 720px)',
            background: 'linear-gradient(180deg, #14100c 0%, #090706 100%)',
            border: '1px solid rgba(243, 156, 18, 0.35)',
            borderRadius: '28px',
            boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.95), 0 0 45px rgba(230, 126, 34, 0.15)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Ambient Warm Backlight Glow */}
          <div
            style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(230, 126, 34, 0.28) 0%, transparent 70%)',
              filter: 'blur(70px)',
              pointerEvents: 'none',
            }}
          />

          {/* ======================================================== */}
          {/* SLIDE 0: THE GRAND ARTISAN FLYING SMASHBURGER            */}
          {/* ======================================================== */}
          {activeSlide === 0 && (
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {burgerSubView === 'cinematic' ? (
                /* Big Screen Flying Burger Video Showcase */
                <video
                  ref={videoRef}
                  src="/assets/burger_pin/burger_animation.mp4"
                  poster="/assets/burger_pin/burger_poster.jpg"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  onClick={toggleVideoPlayback}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    zIndex: 2,
                    cursor: 'pointer',
                  }}
                />
              ) : (
                /* 3D Interactive WebGL Burger Canvas */
                <Burger3D
                  mode="exploded-lab"
                  explodedOffset={0.65}
                  interactive={true}
                  className="exploded-burger-viewport"
                />
              )}

              {/* Mode Toggle (Cinematic Flying Video vs 3D Orbit) */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  display: 'flex',
                  gap: '8px',
                  zIndex: 20,
                }}
              >
                <button
                  onClick={() => setBurgerSubView('cinematic')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    background: burgerSubView === 'cinematic' ? 'var(--accent-ember)' : 'rgba(20, 16, 13, 0.85)',
                    color: burgerSubView === 'cinematic' ? '#ffffff' : 'var(--text-secondary)',
                    border: burgerSubView === 'cinematic' ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  Cinematic Motion
                </button>
                <button
                  onClick={() => setBurgerSubView('3d')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    background: burgerSubView === '3d' ? 'var(--accent-ember)' : 'rgba(20, 16, 13, 0.85)',
                    color: burgerSubView === '3d' ? '#ffffff' : 'var(--text-secondary)',
                    border: burgerSubView === '3d' ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  3D Orbit Lab
                </button>
              </div>

              {/* Subtle Audio & Playback Controls (NO PROGRESS LINE!) */}
              {burgerSubView === 'cinematic' && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '24px',
                    right: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    zIndex: 20,
                  }}
                >
                  <button
                    onClick={toggleVideoPlayback}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'rgba(20, 16, 13, 0.85)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                    title={isVideoPlaying ? 'Pause' : 'Play'}
                  >
                    {isVideoPlaying ? <Pause size={17} /> : <Play size={17} style={{ marginLeft: '2px' }} />}
                  </button>

                  <button
                    onClick={toggleMute}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'rgba(20, 16, 13, 0.85)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                    title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                  >
                    {!isMuted ? <Volume2 size={17} color="var(--accent-gold)" /> : <VolumeX size={17} />}
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'rgba(20, 16, 13, 0.85)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                    title="Fullscreen Theatre"
                  >
                    <Maximize2 size={17} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* SLIDE 1: 900°F WOOD-FIRED NEAPOLITAN PIZZA (INTERACTIVE) */}
          {/* ======================================================== */}
          {activeSlide === 1 && (
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* 3D Interactive Pizza Model */}
              <Pizza3D currentStage={pizzaStage} interactive={true} />

              {/* Pizza Stage Selector Floating Dock */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '22px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(18, 14, 11, 0.92)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(243, 156, 18, 0.35)',
                  padding: '8px 14px',
                  borderRadius: '999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  maxWidth: '92%',
                  overflowX: 'auto',
                  zIndex: 20,
                  boxShadow: '0 12px 30px rgba(0,0,0,0.8)',
                }}
              >
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    color: 'var(--accent-gold)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginRight: '6px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Oven Stages:
                </span>
                {PIZZA_STAGES.map((s) => (
                  <button
                    key={s.stage}
                    onClick={() => setPizzaStage(s.stage)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: pizzaStage === s.stage ? 'var(--accent-ember)' : 'rgba(255,255,255,0.06)',
                      color: pizzaStage === s.stage ? '#ffffff' : 'var(--text-secondary)',
                      border: pizzaStage === s.stage ? '1px solid var(--accent-gold)' : '1px solid transparent',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SLIDE 2: 45-DAY DRY-AGED PRIME RIBEYE                    */}
          {/* ======================================================== */}
          {activeSlide === 2 && (
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
                textAlign: 'center',
              }}
            >
              {/* Grand Visual Plate Spotlight */}
              <div
                style={{
                  width: '280px',
                  height: '280px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #3d2417 0%, #150f0c 80%)',
                  border: '2px solid rgba(243, 156, 18, 0.4)',
                  boxShadow: '0 0 60px rgba(230, 126, 34, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '90px',
                  marginBottom: '24px',
                  position: 'relative',
                }}
              >
                🥩
                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    background: '#e74c3c',
                    color: '#ffffff',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                  }}
                >
                  45-DAY DRY AGED
                </div>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--accent-gold)',
                  fontSize: '13px',
                  fontWeight: 700,
                  marginBottom: '8px',
                }}
              >
                <Flame size={16} color="var(--accent-ember)" />
                <span>Wood-Fired Over Japanese Binchotan Charcoal</span>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SLIDE 3: HANDCRAFTED TRUFFLE FETTUCCINE                  */}
          {/* ======================================================== */}
          {activeSlide === 3 && (
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
                textAlign: 'center',
              }}
            >
              {/* Grand Visual Plate Spotlight */}
              <div
                style={{
                  width: '280px',
                  height: '280px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #3d2c17 0%, #15110c 80%)',
                  border: '2px solid rgba(241, 196, 15, 0.4)',
                  boxShadow: '0 0 60px rgba(241, 196, 15, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '90px',
                  marginBottom: '24px',
                  position: 'relative',
                }}
              >
                🍝
                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    background: '#f1c40f',
                    color: '#000000',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                  }}
                >
                  HANDMADE PASTA
                </div>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--accent-gold)',
                  fontSize: '13px',
                  fontWeight: 700,
                  marginBottom: '8px',
                }}
              >
                <Award size={16} color="var(--accent-gold)" />
                <span>Bronze-Extruded 40-Egg Yolk Dough with Black Truffle</span>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* FLOATING TOP-LEFT: DISH IDENTITY BADGE                   */}
          {/* ======================================================== */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: 'rgba(18, 14, 11, 0.88)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(243, 156, 18, 0.3)',
              borderRadius: 'var(--radius-lg)',
              padding: '12px 18px',
              zIndex: 20,
              maxWidth: '320px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                  background: 'rgba(243, 156, 18, 0.18)',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  border: '1px solid rgba(243, 156, 18, 0.3)',
                }}
              >
                {currentDish.badge}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {currentDish.category}
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                color: '#ffffff',
                marginBottom: '2px',
                lineHeight: 1.2,
              }}
            >
              {currentDish.name}
            </h3>

            <div style={{ fontSize: '11px', color: 'var(--accent-gold-light)', fontWeight: 600 }}>
              {currentDish.tagline}
            </div>
          </div>

          {/* ======================================================== */}
          {/* FLOATING BOTTOM-LEFT: NUTRITION & ARTISAN PROFILE HUD    */}
          {/* ======================================================== */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              background: 'rgba(18, 14, 11, 0.88)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(243, 156, 18, 0.25)',
              borderRadius: 'var(--radius-lg)',
              padding: '12px 16px',
              zIndex: 20,
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
            className="hidden sm:flex"
          >
            <div>
              <span style={{ fontSize: '9px', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                Energy
              </span>
              <span className="tabular-nums" style={{ fontSize: '13px', fontWeight: 800, color: 'var(--accent-gold)' }}>
                {currentDish.calories} kcal
              </span>
            </div>

            <div style={{ width: '1px', height: '24px', background: 'rgba(255, 255, 255, 0.1)' }} />

            <div>
              <span style={{ fontSize: '9px', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                Protein
              </span>
              <span className="tabular-nums" style={{ fontSize: '13px', fontWeight: 800, color: '#2ecc71' }}>
                {currentDish.protein}
              </span>
            </div>

            <div style={{ width: '1px', height: '24px', background: 'rgba(255, 255, 255, 0.1)' }} />

            <div>
              <span style={{ fontSize: '9px', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                Cooking Heat
              </span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#e74c3c', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Flame size={12} /> {currentDish.temperature.split(' ')[0]}
              </span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* FLOATING SLIDE NAVIGATION ARROWS (‹ and ›)               */}
          {/* ======================================================== */}
          <button
            onClick={goToPrevSlide}
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(18, 14, 11, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(243, 156, 18, 0.4)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 30,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.7)',
              transition: 'all var(--transition-fast)',
            }}
            aria-label="Previous Culinary Creation"
            title="Previous Dish (Left Arrow)"
          >
            <ChevronLeft size={24} color="var(--accent-gold)" />
          </button>

          <button
            onClick={goToNextSlide}
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(18, 14, 11, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(243, 156, 18, 0.4)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 30,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.7)',
              transition: 'all var(--transition-fast)',
            }}
            aria-label="Next Culinary Creation"
            title="Next Dish (Right Arrow)"
          >
            <ChevronRight size={24} color="var(--accent-gold)" />
          </button>

          {/* Slide Indicator Dots & Counter (Bottom Center) */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: activeSlide === 1 ? 'none' : 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(18, 14, 11, 0.75)',
              backdropFilter: 'blur(10px)',
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1px solid var(--border-subtle)',
              zIndex: 20,
            }}
          >
            {SLIDE_DISHES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                style={{
                  width: activeSlide === idx ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '999px',
                  background: activeSlide === idx ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.25s ease',
                }}
                aria-label={`Jump to slide ${idx + 1}`}
              />
            ))}
            <span
              className="tabular-nums"
              style={{
                fontSize: '10px',
                color: 'var(--text-muted)',
                marginLeft: '4px',
                fontFamily: 'var(--font-accent)',
                fontWeight: 600,
              }}
            >
              0{activeSlide + 1} / 0{SLIDE_DISHES.length}
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* BOTTOM ARTISAN HIGHLIGHTS & ADD TO ORDER DOCK            */}
        {/* ======================================================== */}
        <div
          style={{
            marginTop: '18px',
            background: 'rgba(18, 14, 11, 0.85)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          {/* Left: Ingredients & Highlights Pills */}
          <div style={{ flex: '1 1 500px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-accent)',
                  fontWeight: 700,
                  color: 'var(--accent-gold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Artisan Ingredients & Method:
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {currentDish.highlights.map((h, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '999px',
                    padding: '4px 12px',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Price & Add to Dining Bag Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>
                Chef's Serving
              </span>
              <span
                className="tabular-nums"
                style={{
                  fontSize: '26px',
                  fontWeight: 800,
                  color: '#ffffff',
                  fontFamily: 'var(--font-display)',
                }}
              >
                ${currentDish.price.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleOrderCurrentDish}
              className="btn-primary"
              style={{ padding: '14px 28px', fontSize: '14px', borderRadius: '999px' }}
            >
              <ShoppingBag size={17} />
              <span>Add to Dining Bag</span>
            </button>
          </div>
        </div>

        {/* Toast confirmation */}
        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              bottom: '30px',
              right: '30px',
              zIndex: 999,
              background: 'rgba(20, 16, 13, 0.95)',
              backdropFilter: 'blur(16px)',
              border: '1px solid #2ecc71',
              borderRadius: 'var(--radius-md)',
              padding: '14px 20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: '#ffffff',
              fontSize: '13px',
              animation: 'fadeIn 0.3s ease-out',
            }}
          >
            <CheckCircle2 size={18} color="#2ecc71" />
            <span>{toastMessage}</span>
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                marginLeft: '8px',
                color: 'var(--accent-gold)',
                textDecoration: 'underline',
                fontSize: '12px',
                fontWeight: 600,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              View Cart
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
