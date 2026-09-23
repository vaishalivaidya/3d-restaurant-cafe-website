import React, { useState } from 'react';
import { Flame, Instagram, Facebook, Twitter, Mail, ArrowRight, Check } from 'lucide-react';
import { RESTAURANT_DATA } from '../lib/restaurant';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer
      style={{
        backgroundColor: '#0a0807',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '80px',
        paddingBottom: '40px',
        position: 'relative',
        color: 'var(--text-secondary)',
      }}
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          {/* Col 1: Brand & Philosophy */}
          <div style={{ maxWidth: '300px' }}>
            <a
              href="#"
              className="brand-wordmark"
              style={{ display: 'inline-block', marginBottom: '16px' }}
            >
              {RESTAURANT_DATA.name.split('&')[0]}
              <span>&</span>
              {RESTAURANT_DATA.name.split('&')[1]}
            </a>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '24px' }}>
              Handcrafted wood-fired pizzas, 45-day dry-aged smash burgers, and elemental hospitality.
              Crafted with passion, served with flavor.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href={RESTAURANT_DATA.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ width: '38px', height: '38px', padding: 0 }}
                aria-label="Follow on Instagram"
              >
                <Instagram size={17} />
              </a>
              <a
                href={RESTAURANT_DATA.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ width: '38px', height: '38px', padding: 0 }}
                aria-label="Follow on Facebook"
              >
                <Facebook size={17} />
              </a>
              <a
                href={RESTAURANT_DATA.social.twitter}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ width: '38px', height: '38px', padding: 0 }}
                aria-label="Follow on Twitter"
              >
                <Twitter size={17} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '12px',
                color: 'var(--accent-gold)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '18px',
              }}
            >
              Quick Navigation
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li>
                <a href="#story" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}>
                  From Ingredients to Plate (3D)
                </a>
              </li>
              <li>
                <a href="#pizza" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}>
                  Handcrafted Pizza (3D)
                </a>
              </li>
              <li>
                <a href="#menu" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}>
                  Artisanal Food Menu
                </a>
              </li>
              <li>
                <a href="#signature" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}>
                  Signature Double Truffle Burger
                </a>
              </li>
              <li>
                <a href="#about" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}>
                  Our Fire & Earth Philosophy
                </a>
              </li>
              <li>
                <a href="#chef" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}>
                  Meet Chef Matteo Rossi
                </a>
              </li>
              <li>
                <a href="#location" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}>
                  Directions & Reservations
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Kitchen & Dining Hours */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '12px',
                color: 'var(--accent-gold)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '18px',
              }}
            >
              Hours of Hospitality
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              {RESTAURANT_DATA.openingHours.map((h, i) => (
                <div key={i}>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{h.days}</div>
                  <div className="tabular-nums" style={{ color: 'var(--accent-gold)' }}>{h.time}</div>
                </div>
              ))}
              <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                Kitchen takes last orders 30 minutes prior to closing.
              </div>
            </div>
          </div>

          {/* Col 4: Hearth Journal (Newsletter Signup) */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '12px',
                color: 'var(--accent-gold)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '18px',
              }}
            >
              The Hearth Journal
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '16px' }}>
              Receive monthly invitations to private chef tastings, secret off-menu releases, and seasonal harvest events.
            </p>

            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ fontSize: '13px', padding: '10px 14px' }}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '10px 16px', flexShrink: 0 }}
                  aria-label="Subscribe to newsletter"
                >
                  {subscribed ? <Check size={16} /> : <ArrowRight size={16} />}
                </button>
              </div>
              {subscribed && (
                <span style={{ fontSize: '12px', color: '#2ecc71' }}>
                  Thank you! You have been added to our private table.
                </span>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Declarations */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '12px',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © {new Date().getFullYear()} {RESTAURANT_DATA.name}. All rights reserved. Handcrafted with passion.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Allergen Notice</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
