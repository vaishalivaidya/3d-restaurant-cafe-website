import React, { useState } from 'react';
import { ShoppingBag, Calendar, Menu as MenuIcon, X } from 'lucide-react';
import { useCart } from '../lib/cartContext';
import { RESTAURANT_DATA } from '../lib/restaurant';

export const Navbar: React.FC = () => {
  const { itemCount, setIsCartOpen, setIsReservationOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="top-nav">
        <div className="container top-nav-inner">
          {/* Zone 1: Single text wordmark */}
          <a href="#" className="brand-wordmark" aria-label="Ember & Craft Home">
            {RESTAURANT_DATA.name.split('&')[0]}
            <span>&</span>
            {RESTAURANT_DATA.name.split('&')[1]}
          </a>

          {/* Zone 2: 5 Clean text navigation links */}
          <nav className="nav-links" aria-label="Main Navigation">
            <a href="#story" className="nav-link">Craft Story</a>
            <a href="#pizza" className="nav-link">Handcrafted Pizza</a>
            <a href="#menu" className="nav-link">Menu</a>
            <a href="#signature" className="nav-link">Signature Dish</a>
            <a href="#about" className="nav-link">About Us</a>
            <a href="#location" className="nav-link">Find Us</a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="nav-actions">
            <button
              onClick={() => setIsReservationOpen(true)}
              className="btn-secondary"
              style={{ padding: '9px 18px', fontSize: '13px' }}
              aria-label="Reserve a table"
            >
              <Calendar size={15} color="var(--accent-gold)" />
              <span className="hidden sm:inline">Reserve Table</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="cart-trigger-btn"
              aria-label={`View cart with ${itemCount} items`}
            >
              <ShoppingBag size={18} />
              {itemCount > 0 && <span className="cart-count-badge tabular-nums">{itemCount}</span>}
            </button>

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '76px',
            backgroundColor: 'rgba(15, 12, 10, 0.98)',
            backdropFilter: 'blur(20px)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            padding: '32px 24px',
            gap: '24px',
          }}
        >
          <a
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '20px', fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Craft Story (3D)
          </a>
          <a
            href="#pizza"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '20px', fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Handcrafted Pizza (3D)
          </a>
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '20px', fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Explore Menu
          </a>
          <a
            href="#signature"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '20px', fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Signature Creation
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '20px', fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            About Us
          </a>
          <a
            href="#chef"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '20px', fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Meet Our Chef
          </a>
          <a
            href="#location"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '20px', fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Location & Hours
          </a>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsReservationOpen(true);
              }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Calendar size={16} /> Reserve a Table
            </button>
            <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
              Open Today: 11:00 AM – 11:00 PM
            </div>
          </div>
        </div>
      )}
    </>
  );
};
