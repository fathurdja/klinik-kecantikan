'use client';

interface TopBarProps {
  onMenuToggle: () => void;
}

export default function TopBar({ onMenuToggle }: TopBarProps) {
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
          <button className="top-bar-btn" title="Notifikasi">
            🔔
            <span className="badge-dot" />
          </button>
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
