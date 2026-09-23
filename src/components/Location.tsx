import React from 'react';
import { Phone, Navigation, MessageSquare, Calendar, Clock, Mail, MapPin } from 'lucide-react';
import { RESTAURANT_DATA } from '../lib/restaurant';
import { useCart } from '../lib/cartContext';

export const Location: React.FC = () => {
  const { setIsReservationOpen } = useCart();

  const handleWhatsApp = () => {
    const cleanNumber = RESTAURANT_DATA.contact.whatsAppNumber.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(`Hello ${RESTAURANT_DATA.name}, I would like to inquire about dining and reservations.`);
    window.open(`https://wa.me/${cleanNumber}?text=${msg}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${RESTAURANT_DATA.contact.phone}`;
  };

  const handleDirections = () => {
    window.open(RESTAURANT_DATA.links.googleMapsDirectionsUrl, '_blank');
  };

  return (
    <section
      id="location"
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
          <span className="section-kicker">Visit Our Hearth</span>
          <h2 className="section-title">Find Us in San Francisco</h2>
          <p className="section-subtitle">
            Located in the vibrant culinary corridor of the city. We welcome walk-ins and reservations seven days a week.
          </p>
        </div>

        {/* 2-Column Location & Interactive Map Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'stretch',
          }}
        >
          {/* Left: Contact Details & Hours Card */}
          <div
            className="card-elevated"
            style={{
              padding: 'clamp(28px, 4vw, 44px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '32px',
            }}
          >
            <div>
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
                Hearth & Table
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  color: 'var(--text-primary)',
                  marginBottom: '20px',
                }}
              >
                {RESTAURANT_DATA.name}
              </h3>

              {/* Address */}
              <div style={{ display: 'flex', gap: '14px', marginBottom: '18px' }}>
                <MapPin size={20} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Location</div>
                  <div style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {RESTAURANT_DATA.address.fullFormatted}
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', gap: '14px', marginBottom: '18px' }}>
                <Phone size={20} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Reservations & Inquiries</div>
                  <div style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {RESTAURANT_DATA.contact.phoneDisplay}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', gap: '14px', marginBottom: '24px' }}>
                <Mail size={20} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Private Dining Concierge</div>
                  <div style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {RESTAURANT_DATA.contact.email}
                  </div>
                </div>
              </div>

              {/* Opening Hours Schedule */}
              <div
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '20px',
                  marginBottom: '28px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <Clock size={16} color="var(--accent-ember)" />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Dining & Kitchen Hours
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {RESTAURANT_DATA.openingHours.map((h, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '13px',
                      }}
                    >
                      <span style={{ color: 'var(--text-secondary)' }}>{h.days}</span>
                      <span className="tabular-nums" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4 Action Buttons Requested */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
              }}
            >
              <button onClick={handleCall} className="btn-secondary" style={{ padding: '12px' }}>
                <Phone size={15} color="var(--accent-gold)" />
                <span>Call Now</span>
              </button>

              <button onClick={handleDirections} className="btn-secondary" style={{ padding: '12px' }}>
                <Navigation size={15} color="var(--accent-gold)" />
                <span>Get Directions</span>
              </button>

              <button onClick={handleWhatsApp} className="btn-secondary" style={{ padding: '12px' }}>
                <MessageSquare size={15} color="#25D366" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => setIsReservationOpen(true)}
                className="btn-primary"
                style={{ padding: '12px' }}
              >
                <Calendar size={15} />
                <span>Reserve a Table</span>
              </button>
            </div>
          </div>

          {/* Right: Interactive Google Maps Embed with Custom Overlay Marker */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              minHeight: '440px',
              border: '1px solid var(--border-medium)',
              boxShadow: 'var(--shadow-medium)',
            }}
          >
            {/* Real Google Maps Embed with Configurable URL */}
            <iframe
              title="Restaurant Location Map"
              src={RESTAURANT_DATA.links.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: 'invert(90%) hue-rotate(180deg) contrast(1.1) brightness(0.9)',
                minHeight: '440px',
              }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Custom Restaurant Marker Overlay */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: 'rgba(15, 12, 10, 0.92)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border-gold)',
                padding: '12px 18px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-flame)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  boxShadow: '0 0 15px rgba(211, 84, 0, 0.6)',
                }}
              >
                <MapPin size={20} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>
                  {RESTAURANT_DATA.name}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--accent-gold)' }}>
                  Valet Parking Available
                </div>
              </div>
            </div>

            {/* Bottom Address Bar */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                background: 'rgba(15, 12, 10, 0.88)',
                backdropFilter: 'blur(8px)',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '12px',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>{RESTAURANT_DATA.address.street}, {RESTAURANT_DATA.address.city}</span>
              <a
                href={RESTAURANT_DATA.links.googleMapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--accent-gold)', fontWeight: 600 }}
              >
                Open in Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
