'use client';

import { useState } from 'react';

export default function PengaturanPage() {
  const [activeTab, setActiveTab] = useState('umum');

  return (
    <>
      <div className="page-header">
        <h1>Pengaturan</h1>
        <p className="subtitle">Konfigurasi sistem dan pengaturan klinik</p>
      </div>

      <div className="page-content">
        <div className="tabs">
          <button className={`tab ${activeTab === 'umum' ? 'active' : ''}`} onClick={() => setActiveTab('umum')}>
            🏥 Umum
          </button>
          <button className={`tab ${activeTab === 'user' ? 'active' : ''}`} onClick={() => setActiveTab('user')}>
            👥 User & Role
          </button>
          <button className={`tab ${activeTab === 'notifikasi' ? 'active' : ''}`} onClick={() => setActiveTab('notifikasi')}>
            🔔 Notifikasi
          </button>
          <button className={`tab ${activeTab === 'integrasi' ? 'active' : ''}`} onClick={() => setActiveTab('integrasi')}>
            🔗 Integrasi
          </button>
        </div>

        {activeTab === 'umum' && (
          <div className="content-grid">
            <div className="card">
              <div className="card-header">
                <h3>🏥 Informasi Klinik</h3>
              </div>
              <div className="form-group">
                <label className="form-label">Nama Klinik</label>
                <input type="text" className="form-input" defaultValue="GlowCare Seminyak" />
              </div>
              <div className="form-group">
                <label className="form-label">Alamat</label>
                <input type="text" className="form-input" defaultValue="Jl. Sunset Road No. 88, Seminyak, Bali" />
              </div>
              <div className="form-group">
                <label className="form-label">Telepon</label>
                <input type="text" className="form-input" defaultValue="+62 361 123 4567" />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" defaultValue="info@glowcare.co.id" />
              </div>
              <div className="form-group">
                <label className="form-label">Jam Operasional</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <input type="time" className="form-input" defaultValue="08:00" />
                  <input type="time" className="form-input" defaultValue="20:00" />
                </div>
              </div>
              <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={() => alert('Pengaturan Informasi Klinik berhasil disimpan!')}>💾 Simpan Perubahan</button>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>⚙️ Pengaturan Sistem</h3>
              </div>
              <div className="form-group">
                <label className="form-label">Zona Waktu</label>
                <select className="form-select" defaultValue="Asia/Makassar">
                  <option value="Asia/Jakarta">WIB (Jakarta)</option>
                  <option value="Asia/Makassar">WITA (Bali/Makassar)</option>
                  <option value="Asia/Jayapura">WIT (Papua)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Bahasa</label>
                <select className="form-select" defaultValue="id">
                  <option value="id">🇮🇩 Bahasa Indonesia</option>
                  <option value="en">🇬🇧 English</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Mata Uang</label>
                <select className="form-select" defaultValue="IDR">
                  <option value="IDR">IDR — Rupiah Indonesia</option>
                  <option value="USD">USD — US Dollar</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Buffer Time Antar Appointment (menit)</label>
                <input type="number" className="form-input" defaultValue="15" />
              </div>
              <div className="form-group">
                <label className="form-label">Session Timeout (menit)</label>
                <input type="number" className="form-input" defaultValue="30" />
              </div>
              <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={() => alert('Pengaturan Sistem berhasil disimpan!')}>💾 Simpan</button>
            </div>
          </div>
        )}

        {activeTab === 'user' && (
          <div className="card">
            <div className="card-header">
              <h3>👥 Daftar User</h3>
              <button className="btn btn-primary btn-sm">➕ Tambah User</button>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Cabang</th>
                    <th>Status</th>
                    <th>Login Terakhir</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Dr. Ayu Paramitha', email: 'ayu@glowcare.co.id', role: 'Owner', branch: 'Semua Cabang', status: 'active', lastLogin: '27 Sep 2026, 08:15' },
                    { name: 'Dr. Wayan Surya', email: 'wayan@glowcare.co.id', role: 'Dokter', branch: 'Seminyak', status: 'active', lastLogin: '27 Sep 2026, 09:00' },
                    { name: 'Beautician Dewi', email: 'dewi@glowcare.co.id', role: 'Beautician', branch: 'Seminyak', status: 'active', lastLogin: '27 Sep 2026, 08:30' },
                    { name: 'Beautician Rina', email: 'rina@glowcare.co.id', role: 'Beautician', branch: 'Ubud', status: 'active', lastLogin: '26 Sep 2026, 17:00' },
                    { name: 'Komang Sari', email: 'komang@glowcare.co.id', role: 'Resepsionis', branch: 'Seminyak', status: 'active', lastLogin: '27 Sep 2026, 07:55' },
                    { name: 'Made Putri', email: 'made@glowcare.co.id', role: 'Resepsionis', branch: 'Seminyak', status: 'inactive', lastLogin: '20 Sep 2026, 16:30' },
                    { name: 'Admin System', email: 'admin@glowcare.co.id', role: 'Admin', branch: 'Semua Cabang', status: 'active', lastLogin: '27 Sep 2026, 00:00' },
                  ].map((user, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="patient-card">
                          <div className="patient-avatar">
                            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div className="patient-name">{user.name}</div>
                        </div>
                      </td>
                      <td className="text-sm">{user.email}</td>
                      <td><span className="badge badge-confirmed">{user.role}</span></td>
                      <td className="text-sm">{user.branch}</td>
                      <td>
                        <span className={`badge ${user.status === 'active' ? 'badge-active' : 'badge-cancelled'}`}>
                          {user.status === 'active' ? '✅ Aktif' : '⏸️ Nonaktif'}
                        </span>
                      </td>
                      <td className="text-sm text-muted">{user.lastLogin}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button className="btn btn-ghost btn-sm">✏️</button>
                          <button className="btn btn-ghost btn-sm">🔑</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'notifikasi' && (
          <div className="card">
            <div className="card-header">
              <h3>🔔 Pengaturan Notifikasi</h3>
            </div>
            {[
              { label: 'Reminder Appointment (WhatsApp)', desc: 'Kirim reminder H-1 dan H-2 jam sebelum appointment', enabled: true },
              { label: 'Konfirmasi Booking', desc: 'Kirim konfirmasi otomatis saat appointment dibuat', enabled: true },
              { label: 'Notifikasi Stok Rendah', desc: 'Alert ke admin ketika stok di bawah minimum', enabled: true },
              { label: 'Follow-up Pasca Treatment', desc: 'Kirim pesan follow-up H+3 setelah treatment', enabled: false },
              { label: 'Ucapan Ulang Tahun', desc: 'Kirim ucapan & voucher ulang tahun ke pasien', enabled: false },
              { label: 'Laporan Harian', desc: 'Kirim ringkasan harian ke owner setiap malam', enabled: true },
            ].map((notif, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 0',
                borderBottom: idx < 5 ? '1px solid rgba(38,50,56,0.06)' : 'none',
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{notif.label}</div>
                  <div className="text-sm text-muted">{notif.desc}</div>
                </div>
                <label style={{
                  position: 'relative', width: 48, height: 26, cursor: 'pointer',
                }}>
                  <input type="checkbox" defaultChecked={notif.enabled} style={{ display: 'none' }} />
                  <span style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: notif.enabled ? 'var(--color-primary)' : '#ccc',
                    borderRadius: 13, transition: 'background 0.3s',
                  }}>
                    <span style={{
                      position: 'absolute', top: 3, left: notif.enabled ? 24 : 3,
                      width: 20, height: 20, background: '#fff', borderRadius: '50%',
                      transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    }} />
                  </span>
                </label>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'integrasi' && (
          <div className="content-grid">
            {[
              { name: 'WhatsApp Business API', desc: 'Kirim notifikasi & reminder via WhatsApp', status: 'connected', icon: '💬' },
              { name: 'Payment Gateway (QRIS)', desc: 'Terima pembayaran QRIS via Midtrans', status: 'connected', icon: '💳' },
              { name: 'SATUSEHAT (FHIR)', desc: 'Integrasi rekam medis elektronik nasional', status: 'pending', icon: '🏥' },
              { name: 'Cloud Backup', desc: 'Backup otomatis ke cloud storage', status: 'connected', icon: '☁️' },
              { name: 'Google Calendar Sync', desc: 'Sinkronisasi jadwal dengan Google Calendar', status: 'disconnected', icon: '📅' },
              { name: 'Email Marketing', desc: 'Integrasi dengan platform email marketing', status: 'disconnected', icon: '📧' },
            ].map((integration, idx) => (
              <div key={idx} className="card">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: 'var(--color-background)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24, flexShrink: 0,
                  }}>
                    {integration.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4>{integration.name}</h4>
                    <p className="text-sm text-muted" style={{ marginTop: 2 }}>{integration.desc}</p>
                    <div style={{ marginTop: 12 }}>
                      <span className={`badge ${
                        integration.status === 'connected' ? 'badge-active' :
                        integration.status === 'pending' ? 'badge-checked-in' : 'badge-no-show'
                      }`}>
                        {integration.status === 'connected' ? '✅ Terhubung' :
                         integration.status === 'pending' ? '⏳ Fase 3' : '❌ Belum Terhubung'}
                      </span>
                    </div>
                  </div>
                  <button className={`btn btn-sm ${integration.status === 'connected' ? 'btn-outline' : 'btn-primary'}`}>
                    {integration.status === 'connected' ? '⚙️ Kelola' : '🔗 Hubungkan'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
