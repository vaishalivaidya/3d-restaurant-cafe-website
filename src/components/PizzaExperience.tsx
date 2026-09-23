import React, { useState } from 'react';
import { Flame, Sparkles, Plus, Check, ArrowRight } from 'lucide-react';
import { useCart } from '../lib/cartContext';
import { MENU_ITEMS } from '../lib/menu';

interface PizzaShowcaseItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  menuId: string;
  badge?: string;
  isVeg: boolean;
}

const PIZZA_OPTIONS: PizzaShowcaseItem[] = [
  {
    id: 'margherita',
    name: 'Margherita',
    tagline: 'Classic Neapolitan perfection',
    description:
      'San Marzano D.O.P. tomatoes, hand-torn fiore di latte mozzarella, fresh sweet basil leaves, and first cold-pressed extra virgin olive oil.',
    price: 17.0,
    image: '/assets/pizza/margherita_card.jpg',
    menuId: 'p-margherita',
    badge: 'Traditional D.O.P.',
    isVeg: true,
  },
  {
    id: 'pepperoni',
    name: 'Pepperoni',
    tagline: 'Cupped & charred with hot honey',
    description:
      'Artisanal cupping pepperoni cured with smoked paprika, whole milk mozzarella, charred leopard cornicione, and a fiery wildflower honey drizzle.',
    price: 19.5,
    image: '/assets/pizza/pepperoni_card.jpg',
    menuId: 'p-pepperoni',
    badge: 'Guest Favorite',
    isVeg: false,
  },
  {
    id: 'paneer-tikka',
    name: 'Paneer Tikka',
    tagline: 'Charred spices & fresh herbs',
    description:
      'Tandoori-spiced artisanal paneer cubes, blistered red peppers, fresh garden coriander, pickled onion pearls, and a cool mint crema swirl.',
    price: 18.75,
    image: '/assets/pizza/paneer_tikka_card.jpg',
    menuId: 'p-spicy-paneer',
    badge: 'Chef Special',
    isVeg: true,
  },
];

export const PizzaExperience: React.FC = () => {
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const { addItem, setIsCartOpen } = useCart();

  const handleQuickAdd = (item: PizzaShowcaseItem) => {
    const foundItem = MENU_ITEMS.find((m) => m.id === item.menuId);
    if (foundItem) {
      addItem(foundItem, 1);
    } else {
      addItem(
        {
          id: item.menuId,
          name: item.name,
          category: 'PIZZA',
          description: item.description,
          price: item.price,
          isVeg: item.isVeg,
          isSignature: true,
          prepTimeMinutes: 12,
          calories: 720,
          ingredients: ['72-hr Fermented Dough', 'San Marzano Sauce', 'Fresh Mozzarella'],
          image: item.image,
        },
        1
      );
    }
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const handleExplorePizzaMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="pizza"
      style={{
        paddingTop: '130px',
        paddingBottom: '140px',
        backgroundColor: '#090706',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Background Cinematic Atmosphere */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230, 81, 0, 0.12) 0%, rgba(243, 156, 18, 0.05) 45%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1240px' }}>
        {/* ======================================================== */}
        {/* SECTION HEADER                                           */}
        {/* ======================================================== */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              fontFamily: 'var(--font-accent)',
              color: 'var(--accent-gold)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            <Flame size={15} color="var(--accent-ember)" />
            <span>Wood-Fired Alchemy</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 5vw, 64px)',
              lineHeight: 1.1,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              marginBottom: '20px',
            }}
          >
            Handcrafted Pizza
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(18px, 2.2vw, 22px)',
              lineHeight: 1.5,
              color: 'var(--accent-gold)',
              maxWidth: '680px',
              margin: '0 auto 12px auto',
              textWrap: 'balance',
            }}
          >
            “Real ingredients. Traditional technique. Perfectly blistered, wood-fired crust.”
          </p>

          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Baked in our 900°F live-fire red oak hearth. 72-hour naturally fermented mother dough creates a crisp, airy crumb with aromatic leopard spotting.
          </p>
        </div>

        {/* ======================================================== */}
        {/* LARGE CINEMATIC MAIN PIZZA VISUAL                        */}
        {/* ======================================================== */}
        <div
          onMouseEnter={() => setIsHeroHovered(true)}
          onMouseLeave={() => setIsHeroHovered(false)}
          style={{
            position: 'relative',
            height: 'clamp(400px, 52vh, 540px)',
            borderRadius: '24px',
            overflow: 'hidden',
            marginBottom: '48px',
            backgroundColor: '#120d0a',
            border: isHeroHovered
              ? '1px solid rgba(243, 156, 18, 0.45)'
              : '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: isHeroHovered
              ? '0 24px 60px rgba(0, 0, 0, 0.75), 0 0 45px rgba(230, 81, 0, 0.25)'
              : '0 12px 35px rgba(0, 0, 0, 0.5)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: 'pointer',
          }}
          onClick={handleExplorePizzaMenu}
        >
          {/* Main Realistic Pizza Photograph */}
          <img
            src="/assets/pizza/hero_woodfired_pizza.jpg"
            alt="Wood-Fired Neapolitan Pizza in Live-Fire Hearth"
            referrerPolicy="no-referrer"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 45%',
              display: 'block',
              transform: isHeroHovered ? 'scale(1.05)' : 'scale(1.0)',
              filter: isHeroHovered
                ? 'brightness(1.08) contrast(1.06) saturate(1.15)'
                : 'brightness(0.92) contrast(1.02)',
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease',
            }}
          />

          {/* Cinematic Vignette Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(8, 6, 5, 0.95) 0%, rgba(8, 6, 5, 0.5) 40%, rgba(8, 6, 5, 0.2) 70%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Hearth Steam / Heat Shimmer Accent */}
          <div
            style={{
              position: 'absolute',
              top: '25%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 230, 200, 0.16) 0%, transparent 65%)',
              filter: 'blur(50px)',
              animation: 'steamFloat 4s infinite ease-in-out',
              pointerEvents: 'none',
            }}
          />

          {/* Top Left Craft Tag */}
          <div
            style={{
              position: 'absolute',
              top: '28px',
              left: '32px',
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
                background: 'rgba(12, 9, 7, 0.85)',
                backdropFilter: 'blur(8px)',
                padding: '6px 14px',
                borderRadius: '999px',
                border: '1px solid rgba(243, 156, 18, 0.35)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Flame size={13} color="var(--accent-ember)" />
              <span>900°F Red Oak Hearth</span>
            </span>
            <span
              style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.85)',
                letterSpacing: '0.08em',
                fontWeight: 600,
                background: 'rgba(12, 9, 7, 0.65)',
                backdropFilter: 'blur(8px)',
                padding: '6px 14px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              72-Hr Cold Fermentation
            </span>
          </div>

          {/* Bottom Content & Direct Action */}
          <div
            style={{
              position: 'absolute',
              bottom: '36px',
              left: '36px',
              right: '36px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '24px',
              flexWrap: 'wrap',
              zIndex: 2,
            }}
          >
            <div style={{ maxWidth: '640px' }}>
              <div
                style={{
                  fontSize: '13px',
                  fontFamily: 'var(--font-accent)',
                  color: 'var(--accent-gold)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                Signature Hearth Creation
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 3.6vw, 42px)',
                  lineHeight: 1.15,
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '10px',
                  letterSpacing: '-0.01em',
                }}
              >
                Charred Artisanal Neapolitan
              </h3>
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.55,
                  color: 'var(--text-secondary)',
                  margin: 0,
                  textWrap: 'balance',
                }}
              >
                San Marzano D.O.P. reduction, melting buffalo mozzarella, torn sweet basil, and a blistered airy cornicione kissed by live red-oak flames.
              </p>
            </div>

            {/* Explore Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleExplorePizzaMenu();
              }}
              className="btn-primary"
              style={{
                padding: '14px 30px',
                fontSize: '14px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 24px rgba(230, 81, 0, 0.4)',
                flexShrink: 0,
              }}
            >
              <span>Explore Pizza Menu</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3 SMALLER PIZZA OPTIONS (Cards)                          */}
        {/* ======================================================== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            marginBottom: '48px',
          }}
        >
          {PIZZA_OPTIONS.map((item) => (
            <PizzaOptionCard
              key={item.id}
              item={item}
              isAdded={!!addedIds[item.id]}
              onAdd={() => handleQuickAdd(item)}
            />
          ))}
        </div>

        {/* Bottom Centered "Explore Pizza Menu" Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleExplorePizzaMenu}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 36px',
              borderRadius: '999px',
              background: 'transparent',
              color: 'var(--accent-gold)',
              border: '1px solid rgba(243, 156, 18, 0.4)',
              fontSize: '14px',
              fontFamily: 'var(--font-accent)',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(243, 156, 18, 0.1)';
              e.currentTarget.style.borderColor = 'var(--accent-gold)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(243, 156, 18, 0.4)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Explore Full Pizza Menu</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};

// ========================================================
// INDIVIDUAL PIZZA OPTION CARD COMPONENT
// ========================================================
interface PizzaOptionCardProps {
  item: PizzaShowcaseItem;
  isAdded: boolean;
  onAdd: () => void;
}

const PizzaOptionCard: React.FC<PizzaOptionCardProps> = ({ item, isAdded, onAdd }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '18px',
        overflow: 'hidden',
        backgroundColor: '#130f0c',
        border: isHovered
          ? '1px solid rgba(243, 156, 18, 0.45)'
          : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: isHovered
          ? '0 16px 40px rgba(0, 0, 0, 0.65), 0 0 30px rgba(230, 81, 0, 0.18)'
          : '0 8px 24px rgba(0, 0, 0, 0.45)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
      }}
    >
      {/* Card Image Area with Realistic Food Photography */}
      <div
        style={{
          position: 'relative',
          height: '240px',
          overflow: 'hidden',
          backgroundColor: '#18120e',
        }}
      >
        <img
          src={item.image}
          alt={item.name}
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
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease',
          }}
        />

        {/* Gradient Vignette for Readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(19, 15, 12, 0.95) 0%, rgba(19, 15, 12, 0.25) 45%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Badge */}
        {item.badge && (
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              background: 'rgba(15, 11, 9, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: '4px 10px',
              borderRadius: '999px',
              border: '1px solid rgba(243, 156, 18, 0.35)',
              fontSize: '11px',
              fontWeight: 700,
              fontFamily: 'var(--font-accent)',
              letterSpacing: '0.08em',
              color: 'var(--accent-gold)',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              zIndex: 2,
            }}
          >
            <Sparkles size={11} color="var(--accent-ember)" />
            <span>{item.badge}</span>
          </div>
        )}

        {/* Dietary Marker */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(15, 11, 9, 0.85)',
            backdropFilter: 'blur(8px)',
            padding: '4px 8px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            zIndex: 2,
          }}
        >
          <span className={`diet-indicator ${item.isVeg ? 'veg' : 'non-veg'}`} />
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>
            {item.isVeg ? 'Veg' : 'Meat'}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: '6px',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2,
            }}
          >
            {item.name}
          </h3>
          <span
            className="tabular-nums"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--accent-gold)',
            }}
          >
            ${item.price.toFixed(2)}
          </span>
        </div>

        <div
          style={{
            fontSize: '12px',
            color: 'var(--accent-gold)',
            fontFamily: 'var(--font-accent)',
            letterSpacing: '0.06em',
            marginBottom: '10px',
            textTransform: 'uppercase',
          }}
        >
          {item.tagline}
        </div>

        <p
          style={{
            fontSize: '13px',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            marginBottom: '20px',
            flex: 1,
          }}
        >
          {item.description}
        </p>

        {/* Add to Order Button */}
        <button
          onClick={onAdd}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 18px',
            borderRadius: 'var(--radius-md)',
            background: isAdded ? '#27ae60' : 'rgba(255, 255, 255, 0.05)',
            color: isAdded ? '#ffffff' : 'var(--text-primary)',
            border: isAdded ? '1px solid #27ae60' : '1px solid var(--border-medium)',
            fontSize: '13px',
            fontWeight: 600,
            transition: 'all var(--transition-fast)',
            cursor: 'pointer',
          }}
        >
          {isAdded ? (
            <>
              <Check size={16} />
              <span>Added to Order</span>
            </>
          ) : (
            <>
              <Plus size={16} color="var(--accent-gold)" />
              <span>Order This Pizza</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
