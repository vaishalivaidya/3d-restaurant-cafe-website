import React, { useState } from 'react';
import { Calendar, Users, Clock, CheckCircle2, Sparkles, X } from 'lucide-react';
import { RESTAURANT_DATA } from '../lib/restaurant';
import { useCart } from '../lib/cartContext';

interface ReservationSectionProps {
  isModal?: boolean;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ isModal = false }) => {
  const { isReservationOpen, setIsReservationOpen } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '19:00',
    guests: '2',
    specialRequest: '',
    seatingPreference: 'Indoor Dining Room',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  if (isModal && !isReservationOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email address is required';
    }
    if (!formData.date) errs.date = 'Date is required';
    if (!formData.time) errs.time = 'Time is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate random luxury confirmation code
    const code = 'EC-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(code);
    setIsSubmitted(true);
  };

  const content = (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        padding: 'clamp(28px, 4vw, 48px)',
        boxShadow: 'var(--shadow-medium)',
        maxWidth: isModal ? '560px' : '780px',
        width: '100%',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {isModal && (
        <button
          onClick={() => setIsReservationOpen(false)}
          className="btn-ghost"
          style={{ position: 'absolute', top: '20px', right: '20px', padding: '8px' }}
          aria-label="Close reservation modal"
        >
          <X size={20} />
        </button>
      )}

      {!isSubmitted ? (
        <>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="section-kicker">Intimate Hospitality</span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(26px, 3.5vw, 36px)',
                color: 'var(--text-primary)',
                marginBottom: '8px',
              }}
            >
              Reserve Your Table
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Join us by the fire. We reserve seats up to 30 days in advance.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {/* Name */}
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && <span style={{ fontSize: '11px', color: '#e74c3c' }}>{errors.name}</span>}
              </div>

              {/* Phone */}
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="e.g. (555) 000-0000"
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                {errors.phone && <span style={{ fontSize: '11px', color: '#e74c3c' }}>{errors.phone}</span>}
              </div>

              {/* Email */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Email Address (for confirmation) *</label>
                <input
                  type="email"
                  placeholder="e.g. eleanor@example.com"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <span style={{ fontSize: '11px', color: '#e74c3c' }}>{errors.email}</span>}
              </div>

              {/* Date */}
              <div className="form-group">
                <label className="form-label">Date *</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
                {errors.date && <span style={{ fontSize: '11px', color: '#e74c3c' }}>{errors.date}</span>}
              </div>

              {/* Time */}
              <div className="form-group">
                <label className="form-label">Time *</label>
                <select
                  className="form-select"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                >
                  <option value="12:00">12:00 PM (Lunch)</option>
                  <option value="13:00">1:00 PM (Lunch)</option>
                  <option value="17:30">5:30 PM (Early Dinner)</option>
                  <option value="18:30">6:30 PM (Dinner)</option>
                  <option value="19:00">7:00 PM (Prime Dinner)</option>
                  <option value="19:30">7:30 PM (Prime Dinner)</option>
                  <option value="20:30">8:30 PM (Late Dinner)</option>
                  <option value="21:30">9:30 PM (Late Dinner)</option>
                </select>
              </div>

              {/* Guests */}
              <div className="form-group">
                <label className="form-label">Number of Guests</label>
                <select
                  className="form-select"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                >
                  <option value="1">1 Guest (Bar / Counter)</option>
                  <option value="2">2 Guests (Intimate Table)</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests (Standard Booth)</option>
                  <option value="5">5 Guests</option>
                  <option value="6">6 Guests (Large Table)</option>
                  <option value="8">8+ Guests (Chef's Hearth Tasting)</option>
                </select>
              </div>

              {/* Seating Preference */}
              <div className="form-group">
                <label className="form-label">Seating Area</label>
                <select
                  className="form-select"
                  value={formData.seatingPreference}
                  onChange={(e) => setFormData({ ...formData, seatingPreference: e.target.value })}
                >
                  <option value="Indoor Dining Room">Indoor Hearth Dining</option>
                  <option value="Chef Counter">Open Kitchen Chef's Counter</option>
                  <option value="Covered Patio">Heated Garden Terrace</option>
                </select>
              </div>

              {/* Special Request */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Special Requests or Dietary Allergies</label>
                <textarea
                  rows={3}
                  placeholder="Anniversary, birthday, gluten allergy, quiet table..."
                  className="form-textarea"
                  value={formData.specialRequest}
                  onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                />
              </div>
            </div>

            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '15px' }}
              >
                <Sparkles size={17} />
                <span>Reserve My Table</span>
              </button>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '10px' }}>
                Instant confirmation email will be sent · No cancellation fee up to 2 hours prior
              </div>
            </div>
          </form>
        </>
      ) : (
        /* Success State */
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
              margin: '0 auto 20px auto',
              color: '#2ecc71',
            }}
          >
            <CheckCircle2 size={36} />
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '28px',
              color: 'var(--text-primary)',
              marginBottom: '10px',
            }}
          >
            Table Reserved Successfully
          </h3>

          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            We look forward to welcoming you, <strong style={{ color: '#fff' }}>{formData.name}</strong>.
            A confirmation email has been dispatched to <strong style={{ color: '#fff' }}>{formData.email}</strong>.
          </p>

          <div
            style={{
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              marginBottom: '28px',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              textAlign: 'left',
              fontSize: '13px',
            }}
          >
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Confirmation Code:</span>
              <div style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>{confirmationCode}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Date & Time:</span>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {formData.date} at {formData.time}
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Party Size:</span>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{formData.guests} Guests</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Area:</span>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{formData.seatingPreference}</div>
            </div>
          </div>

          <button
            onClick={() => {
              setIsSubmitted(false);
              if (isModal) setIsReservationOpen(false);
            }}
            className="btn-secondary"
          >
            {isModal ? 'Done' : 'Make Another Reservation'}
          </button>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="modal-backdrop" onClick={() => setIsReservationOpen(false)}>
        <div onClick={(e) => e.stopPropagation()}>{content}</div>
      </div>
    );
  }

  return (
    <section
      id="reservation"
      style={{
        paddingTop: '100px',
        paddingBottom: '110px',
        backgroundColor: 'var(--bg-canvas)',
        position: 'relative',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">{content}</div>
    </section>
  );
};
