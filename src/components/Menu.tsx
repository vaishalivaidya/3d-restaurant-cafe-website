import React, { useState, useMemo } from 'react';
import { Plus, Search, Filter, Sparkles, Check } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, MenuCategory, MenuItem } from '../lib/menu';
import { useCart } from '../lib/cartContext';

// Helper to provide distinctive visual graphics for menu items
const getItemIcon = (category: MenuCategory) => {
  switch (category) {
    case 'BURGERS': return '🍔';
    case 'PIZZA': return '🍕';
    case 'PASTA': return '🍝';
    case 'SIDES': return '🍟';
    case 'DESSERTS': return '🍰';
    case 'DRINKS': return '🍹';
  }
};

export const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('BURGERS');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const { addItem } = useCart();

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesDiet =
        dietFilter === 'all' ? true : dietFilter === 'veg' ? item.isVeg : !item.isVeg;
      return matchesCategory && matchesSearch && matchesDiet;
    });
  }, [activeCategory, searchQuery, dietFilter]);

  const handleAddToCart = (item: MenuItem) => {
    addItem(item, 1);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1400);
  };

  return (
    <section
      id="menu"
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
          <span className="section-kicker">Curated Culinary Offerings</span>
          <h2 className="section-title">The Artisanal Menu</h2>
          <p className="section-subtitle">
            Every dish is cooked over fire or slow-baked in our hearth using certified organic, locally sourced
            seasonal ingredients.
          </p>
        </div>

        {/* Category Tabs & Filter Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          {/* Main Category Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            {MENU_CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 22px',
                    borderRadius: 'var(--radius-md)',
                    background: isActive ? 'var(--accent-ember)' : 'var(--bg-surface)',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    border: isActive ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                    fontSize: '14px',
                    fontWeight: 600,
                    transition: 'all var(--transition-fast)',
                    boxShadow: isActive ? '0 4px 18px rgba(230, 126, 34, 0.35)' : 'none',
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sub-toolbar: Search & Dietary Filter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '12px 20px',
            }}
          >
            {/* Search Box */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1', minWidth: '220px' }}>
              <Search size={16} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Search ingredients, dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
              />
            </div>

            {/* Dietary Toggle (Veg / Non-Veg / All) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setDietFilter('all')}
                style={{
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 500,
                  borderRadius: 'var(--radius-sm)',
                  background: dietFilter === 'all' ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: dietFilter === 'all' ? 'var(--text-primary)' : 'var(--text-muted)',
                }}
              >
                All
              </button>
              <button
                onClick={() => setDietFilter('veg')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 500,
                  borderRadius: 'var(--radius-sm)',
                  background: dietFilter === 'veg' ? 'rgba(46, 204, 113, 0.15)' : 'transparent',
                  color: dietFilter === 'veg' ? '#2ecc71' : 'var(--text-muted)',
                  border: dietFilter === 'veg' ? '1px solid rgba(46, 204, 113, 0.3)' : '1px solid transparent',
                }}
              >
                <span className="diet-indicator veg" />
                <span>Vegetarian</span>
              </button>
              <button
                onClick={() => setDietFilter('non-veg')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 500,
                  borderRadius: 'var(--radius-sm)',
                  background: dietFilter === 'non-veg' ? 'rgba(231, 76, 60, 0.15)' : 'transparent',
                  color: dietFilter === 'non-veg' ? '#e74c3c' : 'var(--text-muted)',
                  border: dietFilter === 'non-veg' ? '1px solid rgba(231, 76, 60, 0.3)' : '1px solid transparent',
                }}
              >
                <span className="diet-indicator non-veg" />
                <span>Non-Veg</span>
              </button>
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid-3">
          {filteredItems.map((item) => {
            const isAdded = !!addedItemIds[item.id];
            return (
              <div
                key={item.id}
                className="card-elevated"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  padding: '24px',
                  position: 'relative',
                }}
              >
                {/* Visual Header with Micro-Interactive Graphic */}
                <div
                  style={{
                    position: 'relative',
                    height: '160px',
                    borderRadius: 'var(--radius-md)',
                    background: 'radial-gradient(circle at center, #271d15 0%, #16120f 85%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {/* Subtle warm backlight */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(230, 126, 34, 0.25) 0%, transparent 70%)',
                      filter: 'blur(20px)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Animated Emoji Graphic with hover reaction */}
                  <div
                    style={{
                      fontSize: '68px',
                      transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                      filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.6))',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = 'scale(1.15) rotate(6deg)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
                    }}
                  >
                    {getItemIcon(item.category)}
                  </div>

                  {/* Top Right: Dietary Indicator (Clean & Standard) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(15, 12, 10, 0.8)',
                      backdropFilter: 'blur(6px)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span className={`diet-indicator ${item.isVeg ? 'veg' : 'non-veg'}`} />
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {item.isVeg ? 'Veg' : 'Meat'}
                    </span>
                  </div>

                  {/* Top Left: Signature Marker if applicable */}
                  {item.isSignature && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'rgba(230, 126, 34, 0.9)',
                        color: '#fff',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Sparkles size={11} /> Signature
                    </div>
                  )}
                </div>

                {/* Card Title & Price */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: '12px',
                    marginBottom: '10px',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '20px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      lineHeight: 1.25,
                    }}
                  >
                    {item.name}
                  </h3>
                  <span
                    className="tabular-nums"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '19px',
                      fontWeight: 700,
                      color: 'var(--accent-gold)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '18px',
                    flex: '1',
                  }}
                >
                  {item.description}
                </p>

                {/* Clean Unboxed Metadata (Zero-Pill Rule) */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    marginBottom: '18px',
                  }}
                >
                  <span className="tabular-nums">{item.calories} kcal</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{item.prepTimeMinutes} min prep</span>
                  {item.spiceLevel && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span style={{ color: 'var(--accent-flame)' }}>{item.spiceLevel}</span>
                    </>
                  )}
                </div>

                {/* Card Footer: Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(item)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '11px 18px',
                    borderRadius: 'var(--radius-md)',
                    background: isAdded ? '#27ae60' : 'rgba(255, 255, 255, 0.05)',
                    color: isAdded ? '#ffffff' : 'var(--text-primary)',
                    border: isAdded ? '1px solid #27ae60' : '1px solid var(--border-medium)',
                    fontSize: '13px',
                    fontWeight: 600,
                    transition: 'all var(--transition-fast)',
                  }}
                  aria-label={`Add ${item.name} to order`}
                >
                  {isAdded ? (
                    <>
                      <Check size={16} />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <Plus size={16} color="var(--accent-gold)" />
                      <span>Add to Order</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Empty state if search finds nothing */}
        {filteredItems.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🍽️</div>
            <div style={{ fontSize: '18px', fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              No dishes found matching your criteria
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px' }}>
              Try searching for different ingredients or clearing your dietary filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
