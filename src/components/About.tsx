import React from 'react';
import { Flame, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { RESTAURANT_DATA } from '../lib/restaurant';

export const About: React.FC = () => {
  return (
    <section
      id="about"
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
          <span className="section-kicker">Our Philosophy</span>
          <h2 className="section-title">More Than Food. It's an Experience.</h2>
          <p className="section-subtitle">
            Born from an obsession with elemental heat and generational culinary traditions.
            Every plate is a tribute to pure flavor, pristine sourcing, and unforgettable hospitality.
          </p>
        </div>

        {/* 2-Column Story Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '50px',
            marginBottom: '64px',
          }}
        >
          {/* Left: Atmospheric Architectural Card */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              minHeight: '440px',
              background: 'radial-gradient(circle at 70% 30%, #302014 0%, #120e0b 80%)',
              border: '1px solid var(--border-medium)',
              boxShadow: 'var(--shadow-medium)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: ' clamp(24px, 4vw, 40px)',
            }}
          >
            {/* Visual Ambiance Backdrop Glow */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                background: `
                  radial-gradient(circle at 80% 20%, rgba(230, 126, 34, 0.25) 0%, transparent 60%),
                  radial-gradient(circle at 20% 80%, rgba(243, 156, 18, 0.15) 0%, transparent 50%)
                `,
                pointerEvents: 'none',
              }}
            />

            {/* Hearth Emblem */}
            <div
              style={{
                position: 'absolute',
                top: '32px',
                left: '32px',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(230, 126, 34, 0.15)',
                border: '1px solid var(--border-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Flame size={26} color="var(--accent-gold)" />
            </div>

            {/* Stylized Restaurant Quote */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: '12px',
                  color: 'var(--accent-gold)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                Hearthside Ambiance
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  color: 'var(--text-primary)',
                  lineHeight: 1.25,
                  marginBottom: '14px',
                }}
              >
                "Where Ancient Wood Fire Meets Modern Gastronomy"
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Step into a sanctuary of exposed brick, live embers, and handcrafted walnut tables.
                Every evening is scored by the gentle crackle of kiln-dried oak and laughter shared over bountiful tables.
              </p>
            </div>
          </div>

          {/* Right: Four Core Pillars of Excellence */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Pillar 1 */}
            <div
              style={{
                display: 'flex',
                gap: '18px',
                padding: '20px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(230, 126, 34, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Flame size={22} color="var(--accent-gold)" />
              </div>
              <div>
                <h4 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  Handcrafted & Fire-Kissed
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  No shortcuts or microwave heat lamps. From our 72-hour naturally leavened doughs to our slow-rendered
                  dry-aged smash patties, everything is made from scratch daily.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div
              style={{
                display: 'flex',
                gap: '18px',
                padding: '20px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(46, 204, 113, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <HeartHandshake size={22} color="#2ecc71" />
              </div>
              <div>
                <h4 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  Regenerative Farm Partnerships
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  We work hand-in-hand with family-owned regional pastures and organic produce growers who practice
                  regenerative agriculture to deliver peak nutrient density and flavor.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div
              style={{
                display: 'flex',
                gap: '18px',
                padding: '20px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(52, 152, 219, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ShieldCheck size={22} color="#3498db" />
              </div>
              <div>
                <h4 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  Uncompromising Hygiene & Safety
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Our open-hearth culinary theatre operates under rigorous Grade-A hygiene protocols with transparent
                  prep stations so you can observe the care invested into every dish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
