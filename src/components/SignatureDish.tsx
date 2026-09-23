import React, { useState } from 'react';
import { Star, ShieldCheck, Flame, Plus, Sparkles, Film } from 'lucide-react';
import { Burger3D } from './3d/Burger3D';
import { useCart } from '../lib/cartContext';
import { MENU_ITEMS } from '../lib/menu';

export const SignatureDish: React.FC = () => {
  const { addItem } = useCart();
  const [dishView, setDishView] = useState<'video' | '3d'>('video');

  const signatureBurger = MENU_ITEMS.find((i) => i.id === 'b-double-cheese') || MENU_ITEMS[1];

  return (
    <section
      id="signature"
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
          <span className="section-kicker">Chef's Masterpiece</span>
          <h2 className="section-title">Our Signature Creation</h2>
          <p className="section-subtitle">
            An uncompromising pursuit of flavor. Hand-pressed double smash patties, 18-month aged sharp cheddar,
            organic heirloom greens, and artisan brioche crown.
          </p>
        </div>

        {/* Advertisement Showcase Card */}
        <div
          style={{
            position: 'relative',
            background: 'linear-gradient(180deg, #1b1612 0%, #100d0a 100%)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(28px, 5vw, 60px)',
            boxShadow: 'var(--shadow-medium)',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Ambient Radial Backlight */}
          <div
            style={{
              position: 'absolute',
              top: '30%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(230, 126, 34, 0.16) 0%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              alignItems: 'center',
              gap: '48px',
            }}
          >
            {/* Left: Product Information */}
            <div style={{ zIndex: 2 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                }}
              >
                <div style={{ display: 'flex', gap: '2px', color: 'var(--accent-gold)' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Rated #1 Smash Burger 2026
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 3.8vw, 44px)',
                  lineHeight: 1.12,
                  color: 'var(--text-primary)',
                  marginBottom: '16px',
                }}
              >
                The Ember Double Smoked Truffle Burger
              </h3>

              <div
                className="tabular-nums"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '32px',
                  fontWeight: 700,
                  color: 'var(--accent-gold)',
                  marginBottom: '20px',
                }}
              >
                $18.50
              </div>

              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  marginBottom: '28px',
                }}
              >
                Two prime dry-aged smashed beef patties crisped over white oak embers, smothered in molten smoked Vermont
                cheddar, sweet house onion jam, and black winter truffle aioli within a buttered artisanal brioche bun.
              </p>

              {/* Technical Specifications */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '16px',
                  marginBottom: '32px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Patty Blend</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    45-Day Dry-Aged Angus
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Cheese</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    18-Mo Smoked Cheddar
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Sear Technique</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    650°F Cast Iron Lacy Edges
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Brioche</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Golden Butter Toasted
                  </div>
                </div>
              </div>

              <button
                onClick={() => addItem(signatureBurger, 1)}
                className="btn-primary"
                style={{ padding: '14px 32px', fontSize: '15px' }}
              >
                <Plus size={18} />
                <span>Add Signature Creation to Order</span>
              </button>
            </div>

            {/* Right: Interactive 3D Model or Flying Burger Video */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 'clamp(440px, 55vh, 600px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Quick Toggle Controls */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  display: 'flex',
                  gap: '6px',
                  zIndex: 20,
                }}
              >
                <button
                  onClick={() => setDishView('video')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    background: dishView === 'video' ? 'var(--accent-ember)' : 'rgba(20, 16, 13, 0.85)',
                    color: dishView === 'video' ? '#ffffff' : 'var(--text-secondary)',
                    border: dishView === 'video' ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <Film size={12} color={dishView === 'video' ? '#ffffff' : 'var(--accent-gold)'} />
                  <span>Cinematic Motion</span>
                </button>

                <button
                  onClick={() => setDishView('3d')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    background: dishView === '3d' ? 'var(--accent-ember)' : 'rgba(20, 16, 13, 0.85)',
                    color: dishView === '3d' ? '#ffffff' : 'var(--text-secondary)',
                    border: dishView === '3d' ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <Sparkles size={12} color={dishView === '3d' ? '#ffffff' : 'var(--accent-gold)'} />
                  <span>3D Model</span>
                </button>
              </div>

              {dishView === 'video' ? (
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '400px',
                    height: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid rgba(243, 156, 18, 0.35)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(230, 126, 34, 0.2)',
                    background: '#0a0807',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <video
                    src="/assets/burger_pin/burger_animation.mp4"
                    poster="/assets/burger_pin/burger_poster.jpg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      background: 'rgba(15, 12, 10, 0.85)',
                      backdropFilter: 'blur(8px)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '10px',
                      color: 'var(--accent-gold)',
                      fontWeight: 600,
                    }}
                  >
                    Culinary Feature: The Grand Artisan Smash
                  </div>
                </div>
              ) : (
                <Burger3D
                  mode="signature"
                  showLabels={true}
                  interactive={true}
                  className="signature-burger-canvas"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
