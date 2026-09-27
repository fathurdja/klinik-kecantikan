'use client';

import { useState } from 'react';
import { packages, membershipTiers, formatCurrency, formatNumber } from '../data/dummy';

export default function PaketPage() {
  const [activeTab, setActiveTab] = useState<'paket' | 'membership'>('paket');
  const [packageList, setPackageList] = useState(packages);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1>Paket & Membership</h1>
            <p className="subtitle">Kelola paket treatment dan program membership</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            ➕ {activeTab === 'paket' ? 'Buat Paket' : 'Tambah Member'}
          </button>
        </div>
      </div>

      <div className="page-content">
        <div className="tabs">
          <button className={`tab ${activeTab === 'paket' ? 'active' : ''}`} onClick={() => setActiveTab('paket')}>
            🎁 Paket Treatment
          </button>
          <button className={`tab ${activeTab === 'membership' ? 'active' : ''}`} onClick={() => setActiveTab('membership')}>
            👑 Membership
          </button>
        </div>

        {activeTab === 'paket' ? (
          <>
            {/* Stats */}
            <div className="stats-grid" style={{ marginBottom: 24 }}>
              <div className="stat-card">
                <div className="stat-icon accent">🎁</div>
                <div className="stat-info">
                  <h4>Total Paket Aktif</h4>
                  <div className="stat-value">{packageList.filter(p => p.isActive).length}</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon success">📊</div>
                <div className="stat-info">
                  <h4>Total Terjual</h4>
                  <div className="stat-value">{packageList.reduce((s, p) => s + p.sold, 0)}</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon primary">💰</div>
                <div className="stat-info">
                  <h4>Revenue Paket</h4>
                  <div className="stat-value" style={{ fontSize: 20 }}>
                    {formatCurrency(packageList.reduce((s, p) => s + p.packagePrice * p.sold, 0))}
                  </div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon gold">🏆</div>
                <div className="stat-info">
                  <h4>Paket Terlaris</h4>
                  <div className="stat-value" style={{ fontSize: 16 }}>
                    {packageList.sort((a, b) => b.sold - a.sold)[0]?.name.split(' ').slice(0, 2).join(' ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Packages Table */}
            <div className="card">
              <div className="card-header">
                <h3>Daftar Paket Treatment</h3>
              </div>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Nama Paket</th>
                      <th>Treatment</th>
                      <th>Sesi</th>
                      <th>Masa Berlaku</th>
                      <th>Harga Normal</th>
                      <th>Harga Paket</th>
                      <th>Hemat</th>
                      <th>Terjual</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packageList.map(pkg => {
                      const savings = pkg.originalPrice - pkg.packagePrice;
                      const savingsPercent = Math.round((savings / pkg.originalPrice) * 100);
                      return (
                        <tr key={pkg.id}>
                          <td>
                            <div style={{ fontWeight: 600 }}>{pkg.name}</div>
                            <div className="text-sm text-muted">{pkg.id}</div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                              {pkg.treatments.map((t, i) => (
                                <span key={i} className="text-sm">• {t}</span>
                              ))}
                            </div>
                          </td>
                          <td style={{ fontWeight: 600 }}>{pkg.sessions}x</td>
                          <td>{pkg.validDays} hari</td>
                          <td style={{ textDecoration: 'line-through', color: 'var(--color-text-muted)' }}>
                            {formatCurrency(pkg.originalPrice)}
                          </td>
                          <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                            {formatCurrency(pkg.packagePrice)}
                          </td>
                          <td>
                            <span className="badge badge-completed">
                              🏷️ Hemat {savingsPercent}%
                            </span>
                          </td>
                          <td style={{ fontWeight: 600 }}>{pkg.sold}x</td>
                          <td>
                            <span className={`badge ${pkg.isActive ? 'badge-active' : 'badge-cancelled'}`}>
                              {pkg.isActive ? '✅ Aktif' : '❌ Nonaktif'}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: 4 }}>
                              <button className="btn btn-ghost btn-sm">✏️</button>
                              <button className="btn btn-ghost btn-sm">📊</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Membership Stats */}
            <div className="stats-grid" style={{ marginBottom: 24 }}>
              <div className="stat-card">
                <div className="stat-icon primary">👑</div>
                <div className="stat-info">
                  <h4>Total Member</h4>
                  <div className="stat-value">
                    {membershipTiers.reduce((s, t) => s + t.members, 0)}
                  </div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon gold">🥇</div>
                <div className="stat-info">
                  <h4>Member Gold</h4>
                  <div className="stat-value">{membershipTiers.find(t => t.name === 'Gold')?.members}</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon accent">💎</div>
                <div className="stat-info">
                  <h4>Member Platinum</h4>
                  <div className="stat-value">{membershipTiers.find(t => t.name === 'Platinum')?.members}</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon success">📈</div>
                <div className="stat-info">
                  <h4>Retensi Rate</h4>
                  <div className="stat-value">87%</div>
                </div>
              </div>
            </div>

            {/* Membership Tier Cards */}
            <div className="tier-cards">
              {membershipTiers.map(tier => (
                <div key={tier.id} className={`tier-card ${tier.color}`}>
                  <div className="tier-card-icon">
                    {tier.name === 'Silver' ? '🥈' : tier.name === 'Gold' ? '🥇' : '💎'}
                  </div>
                  <h3>{tier.name}</h3>
                  <div className="tier-price">
                    {formatCurrency(tier.minSpend)}<span>/min. spend</span>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <span className="badge" style={{ background: 'rgba(31,100,101,0.1)', color: 'var(--color-primary)' }}>
                      {tier.members} member aktif
                    </span>
                  </div>
                  <div style={{ marginBottom: 16, textAlign: 'center' }}>
                    <span className="text-sm text-muted">Diskon {tier.discount}% • Poin {tier.pointMultiplier}x</span>
                  </div>
                  <ul className="tier-benefits">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                  <button className="btn btn-outline" style={{ width: '100%', marginTop: 20 }}>
                    Kelola Tier
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {showAddModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: 500, padding: 24 }}>
            <h2 style={{ marginBottom: 16 }}>➕ {activeTab === 'paket' ? 'Buat Paket Baru' : 'Tambah Member Baru'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {activeTab === 'paket' ? (
                <>
                  <div className="form-group">
                    <label className="form-label">Nama Paket</label>
                    <input type="text" className="form-input" id="newPkgName" placeholder="Contoh: Paket Acne Series" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div className="form-group">
                      <label className="form-label">Jumlah Sesi</label>
                      <input type="number" className="form-input" id="newPkgSessions" defaultValue="3" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Masa Berlaku (Hari)</label>
                      <input type="number" className="form-input" id="newPkgDays" defaultValue="90" />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div className="form-group">
                      <label className="form-label">Harga Normal</label>
                      <input type="number" className="form-input" id="newPkgPriceOrg" defaultValue="3000000" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Harga Paket</label>
                      <input type="number" className="form-input" id="newPkgPrice" defaultValue="2500000" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label className="form-label">Pilih Pasien</label>
                    <select className="form-select">
                      <option>Siti Aminah (P-001)</option>
                      <option>Budi Santoso (P-002)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pilih Tier</label>
                    <select className="form-select">
                      <option>Silver</option>
                      <option>Gold</option>
                      <option>Platinum</option>
                    </select>
                  </div>
                </>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
                <button className="btn btn-outline" onClick={() => setShowAddModal(false)}>Batal</button>
                <button className="btn btn-primary" onClick={() => {
                  if (activeTab === 'paket') {
                    const newPkg = {
                      id: `PKG-${Math.floor(Math.random() * 100).toString().padStart(3, '0')}`,
                      name: (document.getElementById('newPkgName') as HTMLInputElement).value || 'Paket Baru',
                      treatments: ['Treatment Custom'],
                      sessions: parseInt((document.getElementById('newPkgSessions') as HTMLInputElement).value) || 3,
                      validDays: parseInt((document.getElementById('newPkgDays') as HTMLInputElement).value) || 90,
                      originalPrice: parseInt((document.getElementById('newPkgPriceOrg') as HTMLInputElement).value) || 3000000,
                      packagePrice: parseInt((document.getElementById('newPkgPrice') as HTMLInputElement).value) || 2500000,
                      sold: 0,
                      isActive: true
                    };
                    setPackageList([newPkg, ...packageList]);
                    alert('Paket berhasil ditambahkan!');
                  } else {
                    alert('Member berhasil ditambahkan!');
                  }
                  setShowAddModal(false);
                }}>Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
