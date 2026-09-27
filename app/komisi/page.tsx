'use client';

import { useState } from 'react';
import { staff, commissionDetails, formatCurrency } from '../data/dummy';

export default function KomisiPage() {
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [periodFilter, setPeriodFilter] = useState('bulan-ini');

  const totalCommissionThisMonth = staff.reduce((s, st) => s + st.thisMonthCommission, 0);
  const totalTreatments = staff.reduce((s, st) => s + st.treatments, 0);

  const selectedStaffData = selectedStaff ? staff.find(s => s.id === selectedStaff) : null;
  const selectedDetails = selectedStaff ? commissionDetails.filter(c => c.staffId === selectedStaff) : [];

  return (
    <>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1>Komisi Staf</h1>
            <p className="subtitle">Perhitungan komisi dokter, beautician, dan staf</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <select
              className="form-select"
              value={periodFilter}
              onChange={e => setPeriodFilter(e.target.value)}
              style={{ width: 'auto', minWidth: 180 }}
            >
              <option value="bulan-ini">📅 September 2026</option>
              <option value="bulan-lalu">📅 Agustus 2026</option>
              <option value="3-bulan">📅 3 Bulan Terakhir</option>
            </select>
            <button className="btn btn-outline" onClick={() => alert('Mengekspor laporan komisi...')}>📥 Export</button>
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon primary">💰</div>
            <div className="stat-info">
              <h4>Total Komisi Bulan Ini</h4>
              <div className="stat-value" style={{ fontSize: 22 }}>{formatCurrency(totalCommissionThisMonth)}</div>
              <span className="stat-change up">↑ 8% dari bulan lalu</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon accent">👥</div>
            <div className="stat-info">
              <h4>Total Staf</h4>
              <div className="stat-value">{staff.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon success">💆</div>
            <div className="stat-info">
              <h4>Total Treatment</h4>
              <div className="stat-value">{totalTreatments}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon gold">🏆</div>
            <div className="stat-info">
              <h4>Komisi Tertinggi</h4>
              <div className="stat-value" style={{ fontSize: 16 }}>
                {staff.sort((a, b) => b.thisMonthCommission - a.thisMonthCommission)[0]?.name.split(' ').slice(0, 2).join(' ')}
              </div>
            </div>
          </div>
        </div>

        <div className="content-grid">
          {/* Staff Commission Table */}
          <div className="card">
            <div className="card-header">
              <h3>👥 Ringkasan Komisi per Staf</h3>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Staf</th>
                    <th>Role</th>
                    <th>Skema</th>
                    <th>Treatment</th>
                    <th>Penjualan</th>
                    <th>Komisi Bulan Ini</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map(s => (
                    <tr key={s.id} style={{ background: selectedStaff === s.id ? 'var(--color-primary-light)' : undefined }}>
                      <td>
                        <div className="patient-card">
                          <div className="patient-avatar">
                            {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <div className="patient-name">{s.name}</div>
                            <div className="patient-id">{s.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-confirmed">{s.role}</span>
                      </td>
                      <td className="text-sm">{s.commissionScheme}</td>
                      <td style={{ fontWeight: 600 }}>{s.treatments}x</td>
                      <td>{s.productSales}x</td>
                      <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                        {formatCurrency(s.thisMonthCommission)}
                      </td>
                      <td>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => setSelectedStaff(selectedStaff === s.id ? null : s.id)}
                        >
                          {selectedStaff === s.id ? '✕ Tutup' : '📊 Detail'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Row */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '16px',
              borderTop: '2px solid var(--color-primary)',
              fontWeight: 700,
              fontSize: 16
            }}>
              <span>Total Komisi</span>
              <span style={{ color: 'var(--color-primary)' }}>{formatCurrency(totalCommissionThisMonth)}</span>
            </div>
          </div>

          {/* Commission Detail */}
          <div className="card">
            <div className="card-header">
              <h3>📋 Detail Komisi</h3>
            </div>
            {selectedStaff && selectedStaffData ? (
              <>
                {/* Staff Summary */}
                <div style={{ padding: '16px', background: 'var(--color-background)', borderRadius: 12, marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div className="patient-avatar">
                      {selectedStaffData.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h4>{selectedStaffData.name}</h4>
                      <span className="text-sm text-muted">{selectedStaffData.role} • {selectedStaffData.commissionScheme}</span>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div style={{ padding: 12, background: 'var(--color-surface)', borderRadius: 8, textAlign: 'center' }}>
                      <div className="text-sm text-muted">Bulan Ini</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-primary)' }}>
                        {formatCurrency(selectedStaffData.thisMonthCommission)}
                      </div>
                    </div>
                    <div style={{ padding: 12, background: 'var(--color-surface)', borderRadius: 8, textAlign: 'center' }}>
                      <div className="text-sm text-muted">Total Kumulatif</div>
                      <div style={{ fontSize: 20, fontWeight: 700 }}>
                        {formatCurrency(selectedStaffData.totalCommission)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detail Table */}
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>Tanggal</th>
                        <th>Pasien</th>
                        <th>Layanan</th>
                        <th>Nominal</th>
                        <th>Rate</th>
                        <th>Komisi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedDetails.map(d => (
                        <tr key={d.id}>
                          <td>{d.date}</td>
                          <td style={{ fontWeight: 500 }}>{d.patientName}</td>
                          <td className="text-sm">{d.service}</td>
                          <td>{formatCurrency(d.serviceAmount)}</td>
                          <td><span className="badge badge-confirmed">{d.rate}%</span></td>
                          <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                            {formatCurrency(d.commission)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">📊</div>
                <h3>Pilih Staf</h3>
                <p>Klik tombol &quot;Detail&quot; pada salah satu staf untuk melihat rincian komisi.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
