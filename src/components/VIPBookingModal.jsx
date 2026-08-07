import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, UserCheck, Video } from 'lucide-react';

export default function VIPBookingModal({ isOpen, onClose }) {
  const [consultationType, setConsultationType] = useState('virtual');
  const [boutique, setBoutique] = useState('Paris - Place Vendôme');
  const [specialist, setSpecialist] = useState('Senior Diamond Gemologist');
  const [date, setDate] = useState('2026-07-28');
  const [time, setTime] = useState('14:00');
  const [booked, setBooked] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', width: '100%', padding: '36px', border: '1px solid var(--gold-primary)', position: 'relative' }}>
        
        <button className="btn-icon" onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px' }}>
          <X size={20} />
        </button>

        {!booked ? (
          <form onSubmit={handleSubmit}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span className="badge-gold" style={{ marginBottom: '8px' }}>PRIVATE CONCIERGE APPOINTMENT</span>
              <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', marginTop: '6px' }}>
                Book Your Atelier Consultation
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Enjoy one-on-one guidance with our master gemologists for custom ring creation or high jewelry preview.
              </p>
            </div>

            {/* Type selector */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <button
                type="button"
                onClick={() => setConsultationType('virtual')}
                style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  background: consultationType === 'virtual' ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.03)',
                  border: consultationType === 'virtual' ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                  color: '#FFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <Video size={18} color="var(--gold-primary)" />
                <div style={{ textAlign: 'left' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block' }}>Virtual Private Call</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>HD 4K Video Showcase</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setConsultationType('in-person')}
                style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  background: consultationType === 'in-person' ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.03)',
                  border: consultationType === 'in-person' ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                  color: '#FFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <MapPin size={18} color="var(--gold-primary)" />
                <div style={{ textAlign: 'left' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block' }}>Flagship Boutique</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Private Salon Suite</span>
                </div>
              </button>
            </div>

            {/* In-Person Boutique Dropdown */}
            {consultationType === 'in-person' && (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--gold-light)', display: 'block', marginBottom: '6px' }}>Select Boutique Salon</label>
                <select
                  value={boutique}
                  onChange={(e) => setBoutique(e.target.value)}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', padding: '10px', color: '#FFF', borderRadius: 'var(--radius-sm)' }}
                >
                  <option value="Paris - Place Vendôme" style={{ background: '#10111A' }}>Paris - 12 Place Vendôme</option>
                  <option value="New York - Fifth Avenue" style={{ background: '#10111A' }}>New York - 740 Fifth Avenue</option>
                  <option value="Tokyo - Ginza" style={{ background: '#10111A' }}>Tokyo - Ginza Chuo-dori</option>
                  <option value="Dubai - Dubai Mall Fashion Avenue" style={{ background: '#10111A' }}>Dubai - Fashion Avenue</option>
                </select>
              </div>
            )}

            {/* Date & Time Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--gold-light)', display: 'block', marginBottom: '6px' }}>Preferred Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', color: '#FFF', borderRadius: 'var(--radius-sm)' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--gold-light)', display: 'block', marginBottom: '6px' }}>Preferred Time Slot</label>
                <select value={time} onChange={(e) => setTime(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', color: '#FFF', borderRadius: 'var(--radius-sm)' }}>
                  <option value="11:00" style={{ background: '#10111A' }}>11:00 AM</option>
                  <option value="14:00" style={{ background: '#10111A' }}>02:00 PM</option>
                  <option value="16:30" style={{ background: '#10111A' }}>04:30 PM</option>
                  <option value="18:00" style={{ background: '#10111A' }}>06:00 PM</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '0.95rem' }}>
              Confirm Appointment Booking
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle2 size={54} color="#00A86B" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)', marginBottom: '8px', color: 'var(--gold-light)' }}>
              Appointment Reserved
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
              We have dispatched your private invite for <strong>{date} at {time}</strong>. Your assigned specialist looks forward to greeting you.
            </p>
            <button className="btn-gold" onClick={onClose} style={{ padding: '10px 24px' }}>
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
