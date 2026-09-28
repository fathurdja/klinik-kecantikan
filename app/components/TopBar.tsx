'use client';

import { useState } from 'react';

interface TopBarProps {
  onMenuToggle: () => void;
  notifications?: any[];
  onMarkAllRead?: () => void;
}

export default function TopBar({ onMenuToggle, notifications = [], onMarkAllRead }: TopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <button className="mobile-menu-toggle" onClick={onMenuToggle}>
        ☰
      </button>
      <header className="top-bar">
        <div className="top-bar-left">
          <div className="top-bar-search">
            <span className="top-bar-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Cari pasien, treatment, transaksi..."
              className="form-input"
              style={{ paddingLeft: 40, width: '100%', maxWidth: 360 }}
            />
          </div>
        </div>
        <div className="top-bar-right">
          <div className="branch-selector">
            <span>🏥</span>
            <span>GlowCare Seminyak</span>
            <span style={{ fontSize: 10 }}>▼</span>
          </div>
          
          <div style={{ position: 'relative' }}>
            <button className="top-bar-btn" title="Notifikasi" onClick={() => setShowNotifications(!showNotifications)}>
              🔔
              {unreadCount > 0 && <span className="badge-dot" style={{ background: 'red', right: 6, top: 6 }} />}
            </button>
            
            {showNotifications && (
              <div style={{
                position: 'absolute', top: '100%', right: 0, width: 320, background: 'white',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)', borderRadius: 12, padding: 16, zIndex: 1000
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <h4 style={{ margin: 0 }}>Notifikasi ({unreadCount})</h4>
                  <button onClick={onMarkAllRead} style={{ background: 'none', border: 'none', color: 'var(--primary-main)', cursor: 'pointer', fontSize: 12 }}>Tandai sudah dibaca</button>
                </div>
                <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                  {notifications.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#888', fontSize: 13, margin: '20px 0' }}>Tidak ada notifikasi baru</p>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} style={{ padding: '10px 0', borderBottom: '1px solid #eee', opacity: n.read ? 0.6 : 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{n.title}</div>
                        <div style={{ fontSize: 12, color: '#666' }}>{n.body}</div>
                        <div style={{ fontSize: 10, color: '#aaa', marginTop: 4 }}>{n.time}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <button className="top-bar-btn" title="Pesan">
            💬
          </button>
          <button className="top-bar-btn" title="Bantuan">
            ❓
          </button>
        </div>
      </header>
    </>
  );
}
