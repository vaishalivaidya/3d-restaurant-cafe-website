import React from 'react';
import { Award, Utensils, Clock, Flame, Quote } from 'lucide-react';
import { RESTAURANT_DATA } from '../lib/restaurant';

export const Chef: React.FC = () => {
  const chef = RESTAURANT_DATA.chef;

  return (
    <section
      id="chef"
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
          <span className="section-kicker">Culinary Leadership</span>
          <h2 className="section-title">Meet Our Chef</h2>
          <p className="section-subtitle">
            Mastery forged over wood smoke and intense cast-iron sear.
            Discover the culinary vision guiding every recipe at Ember & Craft.
          </p>
        </div>

        {/* Chef Presentation Card */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-medium)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
          }}
        >
          {/* Left: Chef Visual Showcase */}
          <div
            style={{
              position: 'relative',
              minHeight: '460px',
              height: '100%',
              background: 'radial-gradient(circle at 40% 30%, #3a2215 0%, #150f0a 80%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
              borderRight: '1px solid var(--border-subtle)',
            }}
          >
            {/* Ambient Chef Lighting Glow */}
            <div
              style={{
                position: 'absolute',
                width: '260px',
                height: '260px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(243, 156, 18, 0.2) 0%, transparent 70%)',
                filter: 'blur(35px)',
                pointerEvents: 'none',
              }}
            />

            {/* Chef Emblem & Artistic Silhouette */}
            <div
              style={{
                position: 'relative',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2c1e15 0%, #17110c 100%)',
                border: '2px solid var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
              }}
            >
              <span style={{ fontSize: '72px' }}>👨‍🍳</span>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                textAlign: 'center',
                marginBottom: '6px',
              }}
            >
              {chef.name}
            </div>

            <div
              style={{
                fontSize: '13px',
                color: 'var(--accent-gold)',
                fontFamily: 'var(--font-accent)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textAlign: 'center',
                marginBottom: '20px',
              }}
            >
              {chef.title}
            </div>

            {/* Accolades Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                padding: '6px 16px',
                borderRadius: 'var(--radius-md)',
                fontSize: '12px',
                color: 'var(--text-secondary)',
              }}
            >
              <Award size={15} color="var(--accent-gold)" />
              <span>Michelin Guide Recognized Veteran</span>
            </div>
          </div>

          {/* Right: Bio & Credentials */}
          <div style={{ padding: 'clamp(28px, 4vw, 56px)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Quote Block */}
            <div
              style={{
                position: 'relative',
                paddingLeft: '24px',
                borderLeft: '2px solid var(--accent-gold)',
              }}
            >
              <Quote
                size={22}
                color="var(--accent-gold)"
                style={{ opacity: 0.4, position: 'absolute', top: '-10px', left: '-12px' }}
              />
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '17px',
                  fontStyle: 'italic',
                  color: 'var(--text-primary)',
                  lineHeight: 1.6,
                }}
              >
                "{chef.quote}"
              </p>
            </div>

            {/* Bio Narrative */}
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              {chef.bio}
            </p>

            {/* Key Chef Specifications */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>
                  <Clock size={13} color="var(--accent-gold)" />
                  <span>Culinary Experience</span>
                </div>
                <div className="tabular-nums" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {chef.experienceYears}+ Years Craft
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>
                  <Flame size={13} color="var(--accent-flame)" />
                  <span>Signature Cuisine</span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Wood-Fired Hearth & Grill
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>
                  <Utensils size={13} color="var(--accent-gold)" />
                  <span>Culinary Speciality</span>
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  {chef.speciality}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
