import React from 'react';
import { ShoppingBag, MessageSquare, Phone, Truck, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { useCart } from '../lib/cartContext';
import { RESTAURANT_DATA } from '../lib/restaurant';

export const OnlineOrderSection: React.FC = () => {
  const { setIsCartOpen, generateWhatsAppOrderUrl } = useCart();

  const handleCallOrder = () => {
    window.location.href = `tel:${RESTAURANT_DATA.contact.phone}`;
  };

  const handleWhatsAppOrder = () => {
    const url = generateWhatsAppOrderUrl();
    window.open(url || `https://wa.me/${RESTAURANT_DATA.contact.whatsAppNumber.replace(/[^0-9]/g, '')}`, '_blank');
  };

  return (
    <section
      id="order-online"
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
          <span className="section-kicker">Fast, Hot & Fresh</span>
          <h2 className="section-title">Order Online to Your Door</h2>
          <p className="section-subtitle">
            Prefer dining at home? We pack our wood-fired pizzas and smashed burgers in thermally insulated packaging
            to guarantee restaurant-grade heat and crunch.
          </p>
        </div>

        {/* 3 Channels Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          {/* Channel 1: Order on Website */}
          <div
            className="card-elevated"
            style={{
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '20px',
              border: '1px solid var(--border-gold)',
              background: 'linear-gradient(180deg, #221812 0%, #15100d 100%)',
            }}
          >
            <div>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(230, 126, 34, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <ShoppingBag size={24} color="var(--accent-gold)" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                Order on Website
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Browse full interactive visual menu, customize your toppings, earn loyalty rewards, and enjoy seamless instant checkout.
              </p>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Order on Website</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Channel 2: WhatsApp Order */}
          <div
            className="card-elevated"
            style={{
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '20px',
            }}
          >
            <div>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(37, 211, 102, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <MessageSquare size={24} color="#25D366" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                WhatsApp Direct Order
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Chat directly with our dispatch manager on WhatsApp. Ideal for rapid repeat orders, custom catering, or special dietary notes.
              </p>
            </div>

            <button
              onClick={handleWhatsAppOrder}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', borderColor: 'rgba(37, 211, 102, 0.4)' }}
            >
              <MessageSquare size={16} color="#25D366" />
              <span>WhatsApp Order</span>
            </button>
          </div>

          {/* Channel 3: Call to Order */}
          <div
            className="card-elevated"
            style={{
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '20px',
            }}
          >
            <div>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(52, 152, 219, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <Phone size={24} color="#3498db" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                Call to Order
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Speak directly with our host for curbside pickup staging, large party banquet orders, or immediate telephone service.
              </p>
            </div>

            <button
              onClick={handleCallOrder}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Phone size={16} color="var(--accent-gold)" />
              <span>Call to Order</span>
            </button>
          </div>
        </div>

        {/* Delivery Guarantee Value Props */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            padding: '24px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Clock size={22} color="var(--accent-gold)" />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                30–40 Min Delivery
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Dispatched straight from the hearth</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Truck size={22} color="var(--accent-gold)" />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Thermal Insulated Bags
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Crispy crust & melted cheese guarantee</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <ShieldCheck size={22} color="var(--accent-gold)" />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Tamper-Evident Packaging
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Sanitary sealed for your peace of mind</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
