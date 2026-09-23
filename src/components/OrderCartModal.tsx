import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageSquare, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCart, OrderType } from '../lib/cartContext';
import { RESTAURANT_DATA } from '../lib/restaurant';

export const OrderCartModal: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    orderType,
    setOrderType,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    tax,
    deliveryFee,
    tipPercentage,
    setTipPercentage,
    total,
    generateWhatsAppOrderUrl,
  } = useCart();

  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  if (!isCartOpen) return null;

  const handleWebCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const num = 'EC-' + Math.floor(1000 + Math.random() * 9000);
    setOrderNumber(num);
    setCheckoutComplete(true);
  };

  const handleCallOrder = () => {
    window.location.href = `tel:${RESTAURANT_DATA.contact.phone}`;
  };

  const handleWhatsAppOrder = () => {
    const url = generateWhatsAppOrderUrl();
    if (url) window.open(url, '_blank');
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsCartOpen(false)}>
      <div
        className="drawer-right"
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-surface-elevated)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="var(--accent-gold)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--text-primary)' }}>
              Your Culinary Bag
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="btn-ghost"
            style={{ padding: '6px' }}
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Order Type Toggle (Delivery / Pickup / Dine-in) */}
        {!checkoutComplete && (
          <div
            style={{
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.02)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              gap: '8px',
            }}
          >
            {(['DELIVERY', 'PICKUP', 'DINE_IN'] as OrderType[]).map((type) => (
              <button
                key={type}
                onClick={() => setOrderType(type)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: orderType === type ? 'var(--accent-ember)' : 'transparent',
                  color: orderType === type ? '#ffffff' : 'var(--text-secondary)',
                  border: orderType === type ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {type === 'DELIVERY' ? 'Delivery' : type === 'PICKUP' ? 'Curbside Pickup' : 'Table Service'}
              </button>
            ))}
          </div>
        )}

        {/* Body Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {checkoutComplete ? (
            /* Checkout Receipt Success Screen */
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(46, 204, 113, 0.15)',
                  border: '2px solid #2ecc71',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                  color: '#2ecc71',
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                Order #{orderNumber} Confirmed
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Our kitchen has received your order. Prep is underway over live flame!
              </p>

              <div
                style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  textAlign: 'left',
                  fontSize: '13px',
                  marginBottom: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Estimated Time:</span>
                  <span style={{ fontWeight: 600, color: 'var(--accent-gold)' }}>25–35 Minutes</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Order Type:</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{orderType}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Total Charged:</span>
                  <span className="tabular-nums" style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  clearCart();
                  setCheckoutComplete(false);
                  setIsCartOpen(false);
                }}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                Done
              </button>
            </div>
          ) : items.length === 0 ? (
            /* Empty Cart View */
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛍️</div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                Your Bag is Empty
              </h4>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>
                Explore our fire-grilled smash burgers, wood-fired pizzas, and handmade pastas to add your first dish.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            /* Items List */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {items.map((cartItem) => (
                <div
                  key={cartItem.menuItem.id}
                  style={{
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {cartItem.menuItem.name}
                      </h4>
                      <div className="tabular-nums" style={{ fontSize: '13px', color: 'var(--accent-gold)' }}>
                        ${cartItem.menuItem.price.toFixed(2)} each
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(cartItem.menuItem.id)}
                      style={{ color: 'var(--text-muted)', padding: '4px' }}
                      aria-label={`Remove ${cartItem.menuItem.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Quantity Stepper & Line Total */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'rgba(0, 0, 0, 0.4)',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(cartItem.menuItem.id, -1)}
                        style={{ color: 'var(--text-secondary)' }}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="tabular-nums" style={{ fontSize: '13px', fontWeight: 600, minWidth: '18px', textAlign: 'center' }}>
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(cartItem.menuItem.id, 1)}
                        style={{ color: 'var(--text-secondary)' }}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="tabular-nums" style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)' }}>
                      ${(cartItem.menuItem.price * cartItem.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}

              {/* Tip Selection */}
              <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  Kitchen & Courier Gratuity
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[10, 15, 20, 25].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => setTipPercentage(pct)}
                      style={{
                        flex: 1,
                        padding: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        borderRadius: 'var(--radius-sm)',
                        background: tipPercentage === pct ? 'var(--accent-ember)' : 'var(--bg-surface-elevated)',
                        color: tipPercentage === pct ? '#fff' : 'var(--text-secondary)',
                        border: tipPercentage === pct ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                      }}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Calculations */}
              <div
                style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  fontSize: '13px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Subtotal</span>
                  <span className="tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Estimated Tax</span>
                  <span className="tabular-nums">${tax.toFixed(2)}</span>
                </div>
                {orderType === 'DELIVERY' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span>Delivery Fee</span>
                    <span className="tabular-nums">{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Gratuity ({tipPercentage}%)</span>
                  <span className="tabular-nums">${(subtotal * (tipPercentage / 100)).toFixed(2)}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '8px',
                    borderTop: '1px solid var(--border-subtle)',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--accent-gold)',
                  }}
                >
                  <span>Grand Total</span>
                  <span className="tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer with the 3 Requested Action Buttons */}
        {!checkoutComplete && items.length > 0 && (
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface-elevated)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {/* 1. Order on Website */}
            <button
              onClick={handleWebCheckout}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '15px' }}
            >
              <span>Order on Website · ${total.toFixed(2)}</span>
              <ArrowRight size={17} />
            </button>

            {/* Sub-actions: WhatsApp Order & Call to Order */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                onClick={handleWhatsAppOrder}
                className="btn-secondary"
                style={{ padding: '10px', fontSize: '13px' }}
                aria-label="Order via WhatsApp"
              >
                <MessageSquare size={15} color="#25D366" />
                <span>WhatsApp Order</span>
              </button>

              <button
                onClick={handleCallOrder}
                className="btn-secondary"
                style={{ padding: '10px', fontSize: '13px' }}
                aria-label="Call to order by phone"
              >
                <Phone size={15} color="var(--accent-gold)" />
                <span>Call to Order</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
